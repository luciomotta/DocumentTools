<script lang="ts">
  import AlertBanner from '$lib/components/ui/AlertBanner.svelte';
  import { downloadBlob, formatBytes } from '$lib/utils/document-tools';

  let selectedPdfFiles = $state<File[]>([]);
  let alertMessage = $state('');
  let alertType = $state<'success' | 'error' | 'info'>('info');
  let isMerging = $state(false);
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
    selectedPdfFiles = readFiles(input.files).filter((file) => file.name.toLowerCase().endsWith('.pdf'));
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    selectedPdfFiles = readFiles(event.dataTransfer?.files ?? null).filter((file) =>
      file.name.toLowerCase().endsWith('.pdf')
    );
  }

  async function mergePdfs() {
    if (selectedPdfFiles.length < 2) {
      showAlert('Selecione pelo menos 2 arquivos PDF para mesclar.', 'error');
      return;
    }

    isMerging = true;

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const file of selectedPdfFiles) {
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      downloadBlob(pdfBytes, 'documento_mesclado.pdf', 'application/pdf');
      showAlert('PDFs mesclados com sucesso.', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Não foi possível mesclar os PDFs.', 'error');
    } finally {
      isMerging = false;
    }
  }
</script>

<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40">
  <div class="flex items-start justify-between gap-4">
    <div>
      <p class="text-sm uppercase tracking-[0.22em] text-cyan-200">PDF Tools</p>
      <h3 class="mt-2 font-heading text-2xl font-bold text-white">Mesclar PDFs</h3>
    </div>
    <div class="rounded-2xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200">Múltiplos arquivos</div>
  </div>

  <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
    Envie vários arquivos PDF, revise a lista e gere um único documento pronto para download.
  </p>

  <div
    class="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-slate-900/60 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900/80"
    role="button"
    tabindex="0"
    aria-label="Área para adicionar arquivos PDF"
    ondragover={(event) => event.preventDefault()}
    ondrop={handleDrop}
  >
    <label class="block cursor-pointer space-y-3">
      <span class="text-sm font-semibold text-white">Selecionar arquivos PDF</span>
      <input class="hidden" type="file" accept=".pdf" multiple onchange={handleInput} />
      <span class="block rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">
        Clique para escolher ou arraste os PDFs aqui
      </span>
    </label>
  </div>

  {#if selectedPdfFiles.length}
    <div class="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
      <p class="text-sm font-semibold text-white">Arquivos selecionados</p>
      <ul class="mt-4 space-y-2">
        {#each selectedPdfFiles as file (file.name)}
          <li class="flex items-center justify-between rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            <span>{file.name}</span>
            <span class="text-slate-500">{formatBytes(file.size)}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="mt-6 flex flex-wrap gap-3">
    <button class="tool-button-primary" type="button" onclick={mergePdfs} disabled={isMerging}>
      {#if isMerging}
        Processando...
      {:else}
        Mesclar PDFs
      {/if}
    </button>
    <button class="tool-button-ghost" type="button" onclick={() => (selectedPdfFiles = [])}>
      Limpar seleção
    </button>
  </div>

  <div class="mt-4">
    <AlertBanner message={alertMessage} type={alertType} />
  </div>
</article>