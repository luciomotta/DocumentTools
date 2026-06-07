<script lang="ts">
  import AlertBanner from '$lib/components/ui/AlertBanner.svelte';

  type OfficeRow = Record<string, string>;

  let selectedOfficeFile = $state<File | null>(null);
  let officeHeaders = $state<string[]>([]);
  let officeRows = $state<OfficeRow[]>([]);
  let alertMessage = $state('');
  let alertType = $state<'success' | 'error' | 'info'>('info');
  let isReading = $state(false);
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
    selectedOfficeFile = input.files?.[0] ?? null;

    if (selectedOfficeFile) {
      void renderOfficeFile(selectedOfficeFile);
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    selectedOfficeFile = readFiles(event.dataTransfer?.files ?? null)[0] ?? null;

    if (selectedOfficeFile) {
      void renderOfficeFile(selectedOfficeFile);
    }
  }

  async function renderOfficeFile(file: File) {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !['xlsx', 'xls'].includes(extension)) {
      officeHeaders = [];
      officeRows = [];
      showAlert('Por enquanto, a visualização foca em arquivos Excel (.xlsx e .xls).', 'error');
      return;
    }

    isReading = true;

    try {
      const xlsxModule = await import('xlsx');
      const buffer = await file.arrayBuffer();
      const workbook = xlsxModule.read(new Uint8Array(buffer), { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        throw new Error('Planilha vazia');
      }

      const sheet = xlsxModule.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[firstSheetName], {
        defval: ''
      });

      officeRows = sheet.map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key, value === null || value === undefined ? '' : String(value)])
        )
      );
      officeHeaders = officeRows.length > 0 ? Object.keys(officeRows[0]) : [];

      if (!officeRows.length) {
        showAlert('O arquivo Excel está vazio.', 'error');
        return;
      }

      showAlert('Arquivo Excel carregado com sucesso.', 'success');
    } catch (error) {
      console.error(error);
      officeHeaders = [];
      officeRows = [];
      showAlert('Não foi possível ler o arquivo Excel.', 'error');
    } finally {
      isReading = false;
    }
  }
</script>

<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40">
  <div class="flex items-start justify-between gap-4">
    <div>
      <p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Office Tools</p>
      <h3 class="mt-2 font-heading text-2xl font-bold text-white">Visualizar Excel</h3>
    </div>
    <div class="rounded-2xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">XLSX / XLS</div>
  </div>

  <p class="mt-4 text-sm leading-7 text-slate-300">
    Leia arquivos de planilha e renderize os dados em uma tabela responsiva com scroll horizontal.
  </p>

  <div
    class="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-slate-900/60 p-5 transition hover:border-emerald-400/40 hover:bg-slate-900/80"
    role="button"
    tabindex="0"
    aria-label="Área para adicionar arquivo Excel"
    ondragover={(event) => event.preventDefault()}
    ondrop={handleDrop}
  >
    <label class="block cursor-pointer space-y-3">
      <span class="text-sm font-semibold text-white">Selecionar arquivo Office</span>
      <input class="hidden" type="file" accept=".xlsx,.xls" onchange={handleInput} />
      <span class="block rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">
        Clique para escolher ou arraste um XLSX/XLS aqui
      </span>
    </label>
  </div>

  {#if selectedOfficeFile}
    <div class="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
      Arquivo atual: <span class="font-semibold text-white">{selectedOfficeFile.name}</span>
    </div>
  {/if}

  {#if isReading}
    <div class="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
      Lendo planilha...
    </div>
  {:else if officeRows.length}
    <div class="mt-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50">
      <div class="max-h-[420px] overflow-auto">
        <table class="min-w-full border-collapse text-left text-sm text-slate-300">
          <thead class="sticky top-0 bg-slate-900 text-slate-100">
            <tr>
              {#each officeHeaders as header (header)}
                <th class="border-b border-white/10 px-4 py-3 font-semibold">{header}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each officeRows as row, index (index)}
              <tr class="border-b border-white/5 hover:bg-white/5">
                {#each officeHeaders as header (header)}
                  <td class="max-w-[240px] truncate px-4 py-3">{row[header]}</td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}

  <div class="mt-4">
    <AlertBanner message={alertMessage} type={alertType} />
  </div>
</article>