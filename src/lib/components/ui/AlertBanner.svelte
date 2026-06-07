<script lang="ts">
  import type { AlertType } from '$lib/utils/document-tools';

  type Props = {
    message?: string;
    type?: AlertType;
  };

  let { message = '', type = 'info' }: Props = $props();

  const toneClass = $derived(
    type === 'success'
      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
      : type === 'error'
        ? 'border-rose-400/30 bg-rose-400/10 text-rose-100'
        : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100'
  );
</script>

{#if message}
  <div class={`rounded-3xl border px-5 py-4 text-sm ${toneClass}`} role="status" aria-live="polite">
    {message}
  </div>
{/if}