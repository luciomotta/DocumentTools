<script lang="ts">
  import AlertBanner from '$lib/components/ui/AlertBanner.svelte';
  import { sampleHtml } from '$lib/utils/document-tools';

  let htmlContent = $state(sampleHtml);
  let alertMessage = $state('');
  let alertType = $state<'success' | 'error' | 'info'>('info');
  let isGenerating = $state(false);
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

  async function generatePdfFromHtml() {
    if (!htmlContent.trim()) {
      showAlert('Digite o conteúdo HTML primeiro.', 'error');
      return;
    }

    isGenerating = true;

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      element.style.padding = '24px';
      element.style.fontFamily = 'Manrope, sans-serif';
      element.style.background = 'white';

      await html2pdf()
        .set({
          margin: 12,
          filename: 'documento-html.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save();

      showAlert('PDF gerado com sucesso.', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Não foi possível gerar o PDF.', 'error');
    } finally {
      isGenerating = false;
    }
  }
</script>

<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40">
  <p class="text-sm uppercase tracking-[0.22em] text-cyan-200">PDF Tools</p>
  <h3 class="mt-2 font-heading text-2xl font-bold text-white">HTML para PDF</h3>
  <p class="mt-4 text-sm leading-7 text-slate-300">
    Cole HTML, veja o conteúdo preparado e exporte um PDF com formatação limpa.
  </p>

  <div class="mt-6 space-y-4">
    <textarea class="tool-input min-h-64" bind:value={htmlContent} rows="12" placeholder="Cole seu HTML aqui"></textarea>
    <div class="flex flex-wrap gap-3">
      <button class="tool-button-primary" type="button" onclick={generatePdfFromHtml} disabled={isGenerating}>
        {#if isGenerating}
          Gerando...
        {:else}
          Gerar PDF
        {/if}
      </button>
      <button class="tool-button-ghost" type="button" onclick={() => (htmlContent = sampleHtml)}>
        Restaurar exemplo
      </button>
    </div>
  </div>

  <div class="mt-4">
    <AlertBanner message={alertMessage} type={alertType} />
  </div>
</article>