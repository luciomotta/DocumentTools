<script lang="ts">
  import AlertBanner from '$lib/components/ui/AlertBanner.svelte';
  import { escapeHtml, normalizeFilename, sampleReport } from '$lib/utils/document-tools';
  import { onMount } from 'svelte';

  let reportTitle = $state('Relatório Executivo');
  let reportContent = $state(sampleReport);
  let alertMessage = $state('');
  let alertType = $state<'success' | 'error' | 'info'>('info');
  let isGenerating = $state(false);
  let alertTimeout: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    reportContent = `${sampleReport}\n\nData: ${new Date().toLocaleDateString('pt-BR')}`;
  });

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

  async function generateReport() {
    if (!reportTitle.trim() || !reportContent.trim()) {
      showAlert('Preencha o título e o conteúdo do relatório.', 'error');
      return;
    }

    isGenerating = true;

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;
      const formattedDate = new Date().toLocaleDateString('pt-BR');
      const filename = normalizeFilename(reportTitle);

      const element = document.createElement('div');
      element.innerHTML = `
        <div style="font-family: Manrope, sans-serif; padding: 48px; color: #0f172a;">
          <div style="border-bottom: 2px solid #0f766e; padding-bottom: 20px; margin-bottom: 32px;">
            <p style="margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.16em; color: #64748b; font-size: 12px;">DocumentTools</p>
            <h1 style="margin: 0; font-size: 32px; color: #0f172a;">${escapeHtml(reportTitle)}</h1>
            <p style="margin: 8px 0 0; color: #64748b;">Gerado em ${formattedDate}</p>
          </div>
          <div style="line-height: 1.85; font-size: 15px; white-space: pre-wrap;">${escapeHtml(reportContent).replaceAll('\n', '<br>')}</div>
          <p style="margin-top: 40px; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 16px;">Documento gerado automaticamente pela versão SvelteKit.</p>
        </div>`;

      await html2pdf()
        .set({
          margin: 12,
          filename: `${filename || 'relatorio'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save();

      showAlert('Relatório gerado com sucesso.', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Não foi possível gerar o relatório.', 'error');
    } finally {
      isGenerating = false;
    }
  }
</script>

<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40">
  <p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Relatórios</p>
  <h3 class="mt-2 font-heading text-2xl font-bold text-white">Gerar Relatório</h3>
  <p class="mt-4 text-sm leading-7 text-slate-300">
    Monte um relatório em texto, defina o título e exporte tudo em PDF com um layout mais limpo.
  </p>

  <div class="mt-6 space-y-4">
    <div>
      <label class="mb-2 block text-sm font-semibold text-white" for="report-title">Título</label>
      <input id="report-title" class="tool-input" bind:value={reportTitle} placeholder="Digite o título do relatório" />
    </div>

    <div>
      <label class="mb-2 block text-sm font-semibold text-white" for="report-content">Conteúdo</label>
      <textarea
        id="report-content"
        class="tool-input min-h-56"
        bind:value={reportContent}
        rows="10"
        placeholder="Digite o conteúdo do relatório"
      ></textarea>
    </div>

    <div class="flex flex-wrap gap-3">
      <button class="tool-button-emerald" type="button" onclick={generateReport} disabled={isGenerating}>
        {#if isGenerating}
          Gerando...
        {:else}
          Gerar Relatório
        {/if}
      </button>
      <button class="tool-button-ghost" type="button" onclick={() => (reportContent = sampleReport)}>
        Restaurar texto
      </button>
    </div>
  </div>

  <div class="mt-4">
    <AlertBanner message={alertMessage} type={alertType} />
  </div>
</article>