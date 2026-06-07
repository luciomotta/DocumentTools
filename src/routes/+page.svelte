<script lang="ts">
  import AboutSection from '$lib/components/site/AboutSection.svelte';
  import AppHeader from '$lib/components/site/AppHeader.svelte';
  import HeroSection from '$lib/components/site/HeroSection.svelte';
  import HtmlToPdfTool from '$lib/components/tools/HtmlToPdfTool.svelte';
  import OfficeViewerTool from '$lib/components/tools/OfficeViewerTool.svelte';
  import PdfCompressorTool from '$lib/components/tools/PdfCompressorTool.svelte';
  import PdfMergerTool from '$lib/components/tools/PdfMergerTool.svelte';
  import ReportTool from '$lib/components/tools/ReportTool.svelte';
</script>

<svelte:head>
  <title>DocumentTools | SvelteKit + Tailwind</title>
  <meta
    name="description"
    content="Ferramenta moderna para mesclar PDFs, converter HTML em PDF e visualizar arquivos Excel em uma interface construída com SvelteKit e Tailwind."
  />
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_right,_rgba(16,185,129,0.16),_transparent_22%)]"></div>

  <AppHeader />

  <main class="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
    <HeroSection />
    <AboutSection />

    <section class="mt-10 grid gap-6 xl:grid-cols-2" id="pdf-tools">
      <PdfMergerTool />
      <HtmlToPdfTool />
    </section>

    <section class="mt-6 grid gap-6 xl:grid-cols-1">
      <PdfCompressorTool />
    </section>

    <section class="mt-6 grid gap-6 xl:grid-cols-2" id="office-tools">
      <OfficeViewerTool />
      <ReportTool />
    </section>
  </main>
</div>