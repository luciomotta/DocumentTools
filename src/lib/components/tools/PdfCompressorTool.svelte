<script lang="ts">
  import AlertBanner from '$lib/components/ui/AlertBanner.svelte';
  import { formatBytes } from '$lib/utils/document-tools';

  type CompressionMode = 'medium' | 'light' | 'super-light';

  type CompressionPreset = 'lossless' | 'balanced' | 'max';

  type CompressedResult = {
    name: string;
    originalSize: number;
    compressedSize: number;
    blob: Blob;
    mode: CompressionMode;
    percentageSaved: number;
    processingTime: number;
  };

  const modeConfig: Record<CompressionMode, { label: string; description: string; preset: CompressionPreset }> = {
    medium: {
      label: 'Médio',
      description: 'Equilibra tamanho e preservação visual.',
      preset: 'balanced'
    },
    light: {
      label: 'Leve',
      description: 'Redução mais agressiva para arquivos comuns.',
      preset: 'max'
    },
    'super-light': {
      label: 'Super leve',
      description: 'Máxima redução com maior perda de fidelidade.',
      preset: 'max'
    }
  };

  let selectedFiles = $state<File[]>([]);
  let compressionMode = $state<CompressionMode>('medium');
  let isCompressing = $state(false);
  let results = $state<CompressedResult[]>([]);
  let compressionProgress = $state(0);
  let compressionStatus = $state('');
  let alertMessage = $state('');
  let alertType = $state<'success' | 'error' | 'info'>('info');
  let alertTimeout: ReturnType<typeof setTimeout> | undefined;

  function showAlert(message: string, type: 'success' | 'error' | 'info' = 'info') {
    alertMessage = message;
    alertType = type;

    if (alertTimeout) {
      window.clearTimeout(alertTimeout);
    }

    alertTimeout = window.setTimeout(() => {
      alertMessage = '';
    }, 5000);
  }

  function readFiles(fileList: FileList | null) {
    return fileList ? Array.from(fileList) : [];
  }

  function handleInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    selectedFiles = readFiles(input.files).filter((file) => file.name.toLowerCase().endsWith('.pdf'));
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    selectedFiles = readFiles(event.dataTransfer?.files ?? null).filter((file) =>
      file.name.toLowerCase().endsWith('.pdf')
    );
  }

  async function compressSinglePdf(file: File, mode: CompressionMode) {
    const { compress } = await import('@quicktoolsone/pdf-compress');
    const pdfBytes = await file.arrayBuffer();

    const result = await compress(pdfBytes, {
      preset: modeConfig[mode].preset,
      onProgress: (event) => {
        compressionProgress = event.progress;
        compressionStatus = event.message ?? 'Processando PDF...';
      }
    });

    return {
      blob: new Blob([result.pdf], { type: 'application/pdf' }),
      originalSize: result.stats.originalSize,
      compressedSize: result.stats.compressedSize,
      percentageSaved: result.stats.percentageSaved,
      processingTime: result.stats.processingTime
    };
  }

  async function compressFiles() {
    if (!selectedFiles.length) {
      showAlert('Selecione um ou mais PDFs antes de comprimir.', 'error');
      return;
    }

    isCompressing = true;
    results = [];
    compressionProgress = 0;
    compressionStatus = 'Preparando arquivos...';

    try {
      const compressedResults: CompressedResult[] = [];

      for (const file of selectedFiles) {
        compressionStatus = `Comprimindo ${file.name}`;
        const compressed = await compressSinglePdf(file, compressionMode);
        compressedResults.push({
          name: file.name,
          originalSize: compressed.originalSize,
          compressedSize: compressed.compressedSize,
          blob: compressed.blob,
          mode: compressionMode,
          percentageSaved: compressed.percentageSaved,
          processingTime: compressed.processingTime
        });
      }

      results = compressedResults;
      showAlert('Arquivos comprimidos e prontos para download.', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Não foi possível comprimir os PDFs.', 'error');
    } finally {
      isCompressing = false;
      compressionStatus = '';
    }
  }

  function downloadResult(result: CompressedResult) {
    const url = URL.createObjectURL(result.blob);
    const anchor = document.createElement('a');
    const suffix = modeConfig[result.mode].label.toLowerCase().replace(/\s+/g, '_');

    anchor.href = url;
    anchor.download = result.name.replace(/\.pdf$/i, `_${suffix}.pdf`);
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    selectedFiles = [];
    results = [];
    compressionProgress = 0;
    compressionStatus = '';
  }
</script>

<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40">
  <div class="flex items-start justify-between gap-4">
    <div>
      <p class="text-sm uppercase tracking-[0.22em] text-cyan-200">PDF Tools</p>
      <h3 class="mt-2 font-heading text-2xl font-bold text-white">Comprimir PDFs</h3>
    </div>
    <div class="rounded-2xl bg-fuchsia-400/10 px-3 py-2 text-xs font-semibold text-fuchsia-200">Múltiplos arquivos</div>
  </div>

  <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
    Envie vários PDFs ao mesmo tempo, escolha um perfil de compressão e baixe cada arquivo individualmente quando a
    fila terminar.
  </p>

  <div class="mt-6 grid gap-3 sm:grid-cols-3">
    {#each Object.entries(modeConfig) as [value, config] (value)}
      <button
        class={`rounded-2xl border px-4 py-4 text-left transition ${compressionMode === value ? 'border-cyan-400/50 bg-cyan-400/10 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
        type="button"
        onclick={() => (compressionMode = value as CompressionMode)}
      >
        <p class="text-sm font-semibold">{config.label}</p>
        <p class="mt-1 text-xs leading-6 text-slate-400">{config.description}</p>
      </button>
    {/each}
  </div>

  <div
    class="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-slate-900/60 p-5 transition hover:border-fuchsia-400/40 hover:bg-slate-900/80"
    role="button"
    tabindex="0"
    aria-label="Área para adicionar arquivos PDF para compressão"
    ondragover={(event) => event.preventDefault()}
    ondrop={handleDrop}
  >
    <label class="block cursor-pointer space-y-3">
      <span class="text-sm font-semibold text-white">Selecionar PDFs para compressão</span>
      <input class="hidden" type="file" accept=".pdf" multiple onchange={handleInput} />
      <span class="block rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">
        Clique para escolher vários PDFs ou arraste-os aqui
      </span>
    </label>
  </div>

  {#if selectedFiles.length}
    <div class="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
      <p class="text-sm font-semibold text-white">Fila de arquivos</p>
      <ul class="mt-4 space-y-2">
        {#each selectedFiles as file (file.name)}
          <li class="flex items-center justify-between gap-4 rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            <div class="min-w-0">
              <p class="truncate font-medium text-white">{file.name}</p>
              <p class="mt-1 text-xs text-slate-500">Original: {formatBytes(file.size)}</p>
            </div>
            <span class="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
              {modeConfig[compressionMode].label}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="mt-6 flex flex-wrap gap-3">
    <button class="tool-button-primary" type="button" onclick={compressFiles} disabled={isCompressing}>
      {#if isCompressing}
        Comprimindo...
      {:else}
        Comprimir PDFs
      {/if}
    </button>
    <button class="tool-button-ghost" type="button" onclick={clearAll}>
      Limpar fila
    </button>
  </div>

  {#if isCompressing}
    <div class="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
        <span>Status</span>
        <span>{compressionProgress}%</span>
      </div>
      <p class="mt-2 text-sm text-slate-200">{compressionStatus}</p>
      <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-900/80">
        <div class="h-full rounded-full bg-cyan-400 transition-all" style={`width: ${compressionProgress}%`}></div>
      </div>
    </div>
  {/if}

  {#if results.length}
    <div class="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-semibold text-white">Arquivos comprimidos</p>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Download individual</p>
      </div>

      <ul class="mt-4 space-y-3">
        {#each results as result, index (result.name + index)}
          <li class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-white">{result.name}</p>
                <p class="mt-1 text-xs text-slate-400">
                  {formatBytes(result.originalSize)} → {formatBytes(result.compressedSize)} · {result.percentageSaved.toFixed(1)}% menor
                </p>
                <p class="mt-1 text-xs uppercase tracking-[0.2em] text-fuchsia-300">
                  Perfil {modeConfig[result.mode].label} · {Math.max(0, Math.round(result.processingTime / 1000))}s
                </p>
              </div>

              <button class="tool-button-ghost self-start sm:self-center" type="button" onclick={() => downloadResult(result)}>
                Baixar comprimido
              </button>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="mt-4">
    <AlertBanner message={alertMessage} type={alertType} />
  </div>
</article>