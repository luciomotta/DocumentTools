<script lang="ts">
  type Props = {
    showMessage?: string;
    showType?: 'success' | 'error' | 'info';
  };

  let { showMessage = '', showType = 'info' }: Props = $props();
</script>

<section class="mt-10 space-y-4 lg:mt-14" id="about">
  <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Sobre a reforma</p>
      <h2 class="mt-2 font-heading text-3xl font-bold text-white">A mesma proposta, em uma base moderna.</h2>
    </div>
    <p class="max-w-2xl text-sm leading-7 text-slate-400">
      Mantive a essência das ferramentas originais, mas reorganizei a experiência com navegação mais clara,
      visual mais atual e estrutura pronta para evoluir dentro do ecossistema SvelteKit.
    </p>
  </div>

  {#if showMessage}
    <div
      class={`rounded-3xl border px-5 py-4 text-sm ${showType === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100' : showType === 'error' ? 'border-rose-400/30 bg-rose-400/10 text-rose-100' : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100'}`}
      role="status"
      aria-live="polite"
    >
      {showMessage}
    </div>
  {/if}
</section>