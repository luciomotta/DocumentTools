import { a5 as attr_class, e as escape_html, a3 as derived, a6 as attr, a7 as ensure_array_like, a8 as head } from "../../chunks/index.js";
import "clsx";
function AboutSection($$renderer, $$props) {
  let { showMessage = "", showType = "info" } = $$props;
  $$renderer.push(`<section class="mt-10 space-y-4 lg:mt-14" id="about"><div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Sobre a reforma</p> <h2 class="mt-2 font-heading text-3xl font-bold text-white">A mesma proposta, em uma base moderna.</h2></div> <p class="max-w-2xl text-sm leading-7 text-slate-400">Mantive a essência das ferramentas originais, mas reorganizei a experiência com navegação mais clara,
      visual mais atual e estrutura pronta para evoluir dentro do ecossistema SvelteKit.</p></div> `);
  if (showMessage) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div${attr_class(`rounded-3xl border px-5 py-4 text-sm ${showType === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" : showType === "error" ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"}`)} role="status" aria-live="polite">${escape_html(showMessage)}</div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></section>`);
}
function AppHeader($$renderer) {
  $$renderer.push(`<header class="border-b border-white/10 bg-slate-950/60 backdrop-blur-xl"><div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8"><div class="flex items-center gap-3"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"><span class="font-heading text-lg font-bold">D</span></div> <div><p class="font-heading text-lg font-bold tracking-tight text-white">DocumentTools</p> <p class="text-xs uppercase tracking-[0.24em] text-slate-400">SvelteKit + Tailwind</p></div></div> <nav class="hidden items-center gap-6 text-sm text-slate-300 md:flex"><a class="transition hover:text-white" href="#pdf-tools">PDF</a> <a class="transition hover:text-white" href="#office-tools">Office</a> <a class="transition hover:text-white" href="#about">Sobre</a></nav></div></header>`);
}
function HeroSection($$renderer) {
  $$renderer.push(`<section class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><div class="space-y-8"><div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Refeito com SvelteKit e Tailwind</div> <div class="space-y-5"><h1 class="max-w-3xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">Uma central elegante para documentos, PDFs e planilhas.</h1> <p class="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Combine PDFs, converta HTML para PDF e visualize Excel direto no navegador com uma interface mais moderna,
        rápida e responsiva.</p></div> <div class="flex flex-wrap gap-3"><a class="tool-button-primary" href="#pdf-tools">Explorar ferramentas</a> <a class="tool-button-ghost" href="#about">Ver detalhes</a></div> <div class="grid gap-4 sm:grid-cols-3"><div class="glass-panel rounded-3xl p-5"><p class="text-sm text-slate-400">Ferramentas</p> <p class="mt-2 font-heading text-3xl font-bold text-white">4</p></div> <div class="glass-panel rounded-3xl p-5"><p class="text-sm text-slate-400">Stack</p> <p class="mt-2 font-heading text-3xl font-bold text-white">Kit</p></div> <div class="glass-panel rounded-3xl p-5"><p class="text-sm text-slate-400">UX</p> <p class="mt-2 font-heading text-3xl font-bold text-white">Dark</p></div></div></div> <aside class="glass-panel rounded-[2rem] p-6 lg:p-8"><div class="space-y-4"><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Preview do projeto</p> <div class="rounded-3xl border border-white/10 bg-slate-900/80 p-5"><p class="font-heading text-xl font-bold text-white">DocumentTools</p> <p class="mt-2 text-sm leading-7 text-slate-300">Uma experiência de produto mais polida, com brilho sutil, cartões em glassmorphism e foco nas ações
          principais do fluxo.</p></div> <div class="grid gap-3 sm:grid-cols-2"><div class="rounded-2xl bg-white/5 p-4"><p class="text-xs uppercase tracking-[0.18em] text-slate-500">PDF</p> <p class="mt-2 text-sm text-slate-200">Mesclar e exportar documentos</p></div> <div class="rounded-2xl bg-white/5 p-4"><p class="text-xs uppercase tracking-[0.18em] text-slate-500">Office</p> <p class="mt-2 text-sm text-slate-200">Ler planilhas diretamente no browser</p></div></div></div></aside></section>`);
}
function AlertBanner($$renderer, $$props) {
  let { message = "", type = "info" } = $$props;
  const toneClass = derived(() => type === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" : type === "error" ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-cyan-400/30 bg-cyan-400/10 text-cyan-100");
  if (message) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div${attr_class(`rounded-3xl border px-5 py-4 text-sm ${toneClass()}`)} role="status" aria-live="polite">${escape_html(message)}</div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
}
const sampleHtml = `<div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0f172a;">
  <h1 style="color: #0f766e;">Exemplo de Documento</h1>
  <p>Este conteúdo demonstra a conversão de HTML para PDF diretamente no navegador.</p>
  <h2>Recursos</h2>
  <ul>
    <li>Renderização simples e rápida</li>
    <li>Preservação de estrutura básica</li>
    <li>Exportação para PDF com um clique</li>
  </ul>
</div>`;
const sampleReport = "Descreva aqui os principais pontos do relatório, resultados, próximos passos e observações finais.";
function formatBytes(bytes) {
  if (!bytes) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Number((bytes / 1024 ** index).toFixed(2))} ${sizes[index]}`;
}
function HtmlToPdfTool($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let htmlContent = sampleHtml;
    let alertMessage = "";
    let alertType = "info";
    let isGenerating = false;
    $$renderer2.push(`<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40"><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">PDF Tools</p> <h3 class="mt-2 font-heading text-2xl font-bold text-white">HTML para PDF</h3> <p class="mt-4 text-sm leading-7 text-slate-300">Cole HTML, veja o conteúdo preparado e exporte um PDF com formatação limpa.</p> <div class="mt-6 space-y-4"><textarea class="tool-input min-h-64" rows="12" placeholder="Cole seu HTML aqui">`);
    const $$body = escape_html(htmlContent);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> <div class="flex flex-wrap gap-3"><button class="tool-button-primary" type="button"${attr("disabled", isGenerating, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Gerar PDF`);
    }
    $$renderer2.push(`<!--]--></button> <button class="tool-button-ghost" type="button">Restaurar exemplo</button></div></div> <div class="mt-4">`);
    AlertBanner($$renderer2, { message: alertMessage, type: alertType });
    $$renderer2.push(`<!----></div></article>`);
  });
}
function OfficeViewerTool($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let officeHeaders = [];
    let officeRows = [];
    let alertMessage = "";
    let alertType = "info";
    $$renderer2.push(`<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40"><div class="flex items-start justify-between gap-4"><div><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Office Tools</p> <h3 class="mt-2 font-heading text-2xl font-bold text-white">Visualizar Excel</h3></div> <div class="rounded-2xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">XLSX / XLS</div></div> <p class="mt-4 text-sm leading-7 text-slate-300">Leia arquivos de planilha e renderize os dados em uma tabela responsiva com scroll horizontal.</p> <div class="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-slate-900/60 p-5 transition hover:border-emerald-400/40 hover:bg-slate-900/80" role="button" tabindex="0" aria-label="Área para adicionar arquivo Excel"><label class="block cursor-pointer space-y-3"><span class="text-sm font-semibold text-white">Selecionar arquivo Office</span> <input class="hidden" type="file" accept=".xlsx,.xls"/> <span class="block rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">Clique para escolher ou arraste um XLSX/XLS aqui</span></label></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (officeRows.length) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="mt-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50"><div class="max-h-[420px] overflow-auto"><table class="min-w-full border-collapse text-left text-sm text-slate-300"><thead class="sticky top-0 bg-slate-900 text-slate-100"><tr><!--[-->`);
      const each_array = ensure_array_like(officeHeaders);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let header = each_array[$$index];
        $$renderer2.push(`<th class="border-b border-white/10 px-4 py-3 font-semibold">${escape_html(header)}</th>`);
      }
      $$renderer2.push(`<!--]--></tr></thead><tbody><!--[-->`);
      const each_array_1 = ensure_array_like(officeRows);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let row = each_array_1[index];
        $$renderer2.push(`<tr class="border-b border-white/5 hover:bg-white/5"><!--[-->`);
        const each_array_2 = ensure_array_like(officeHeaders);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let header = each_array_2[$$index_1];
          $$renderer2.push(`<td class="max-w-[240px] truncate px-4 py-3">${escape_html(row[header])}</td>`);
        }
        $$renderer2.push(`<!--]--></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-4">`);
    AlertBanner($$renderer2, { message: alertMessage, type: alertType });
    $$renderer2.push(`<!----></div></article>`);
  });
}
function PdfCompressorTool($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const modeConfig = {
      medium: {
        label: "Médio",
        description: "Equilibra tamanho e preservação visual.",
        factor: 0.85
      },
      light: {
        label: "Leve",
        description: "Redução mais agressiva para arquivos comuns.",
        factor: 0.7
      },
      "super-light": {
        label: "Super leve",
        description: "Máxima redução com maior perda de fidelidade.",
        factor: 0.55
      }
    };
    let selectedFiles = [];
    let compressionMode = "medium";
    let isCompressing = false;
    let results = [];
    let alertMessage = "";
    let alertType = "info";
    $$renderer2.push(`<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40"><div class="flex items-start justify-between gap-4"><div><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">PDF Tools</p> <h3 class="mt-2 font-heading text-2xl font-bold text-white">Comprimir PDFs</h3></div> <div class="rounded-2xl bg-fuchsia-400/10 px-3 py-2 text-xs font-semibold text-fuchsia-200">Múltiplos arquivos</div></div> <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Envie vários PDFs ao mesmo tempo, escolha um perfil de compressão e baixe cada arquivo individualmente quando a
    fila terminar.</p> <div class="mt-6 grid gap-3 sm:grid-cols-3"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(modeConfig));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [value, config] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`rounded-2xl border px-4 py-4 text-left transition ${compressionMode === value ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`)} type="button"><p class="text-sm font-semibold">${escape_html(config.label)}</p> <p class="mt-1 text-xs leading-6 text-slate-400">${escape_html(config.description)}</p></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-slate-900/60 p-5 transition hover:border-fuchsia-400/40 hover:bg-slate-900/80" role="button" tabindex="0" aria-label="Área para adicionar arquivos PDF para compressão"><label class="block cursor-pointer space-y-3"><span class="text-sm font-semibold text-white">Selecionar PDFs para compressão</span> <input class="hidden" type="file" accept=".pdf" multiple=""/> <span class="block rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">Clique para escolher vários PDFs ou arraste-os aqui</span></label></div> `);
    if (selectedFiles.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5"><p class="text-sm font-semibold text-white">Fila de arquivos</p> <ul class="mt-4 space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(selectedFiles);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let file = each_array_1[$$index_1];
        $$renderer2.push(`<li class="flex items-center justify-between gap-4 rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-300"><div class="min-w-0"><p class="truncate font-medium text-white">${escape_html(file.name)}</p> <p class="mt-1 text-xs text-slate-500">Original: ${escape_html(formatBytes(file.size))}</p></div> <span class="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">${escape_html(modeConfig[compressionMode].label)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-6 flex flex-wrap gap-3"><button class="tool-button-primary" type="button"${attr("disabled", isCompressing, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Comprimir PDFs`);
    }
    $$renderer2.push(`<!--]--></button> <button class="tool-button-ghost" type="button">Limpar fila</button></div> `);
    if (results.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5"><div class="flex items-center justify-between gap-3"><p class="text-sm font-semibold text-white">Arquivos comprimidos</p> <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Download individual</p></div> <ul class="mt-4 space-y-3"><!--[-->`);
      const each_array_2 = ensure_array_like(results);
      for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
        let result = each_array_2[index];
        $$renderer2.push(`<li class="rounded-2xl border border-white/10 bg-white/5 p-4"><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p class="font-medium text-white">${escape_html(result.name)}</p> <p class="mt-1 text-xs text-slate-400">${escape_html(formatBytes(result.originalSize))} → ${escape_html(formatBytes(result.compressedSize))}</p> <p class="mt-1 text-xs uppercase tracking-[0.2em] text-fuchsia-300">Perfil ${escape_html(modeConfig[result.mode].label)}</p></div> <button class="tool-button-ghost self-start sm:self-center" type="button">Baixar comprimido</button></div></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-4">`);
    AlertBanner($$renderer2, { message: alertMessage, type: alertType });
    $$renderer2.push(`<!----></div></article>`);
  });
}
function PdfMergerTool($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedPdfFiles = [];
    let alertMessage = "";
    let alertType = "info";
    let isMerging = false;
    $$renderer2.push(`<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40"><div class="flex items-start justify-between gap-4"><div><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">PDF Tools</p> <h3 class="mt-2 font-heading text-2xl font-bold text-white">Mesclar PDFs</h3></div> <div class="rounded-2xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200">Múltiplos arquivos</div></div> <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Envie vários arquivos PDF, revise a lista e gere um único documento pronto para download.</p> <div class="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-slate-900/60 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900/80" role="button" tabindex="0" aria-label="Área para adicionar arquivos PDF"><label class="block cursor-pointer space-y-3"><span class="text-sm font-semibold text-white">Selecionar arquivos PDF</span> <input class="hidden" type="file" accept=".pdf" multiple=""/> <span class="block rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">Clique para escolher ou arraste os PDFs aqui</span></label></div> `);
    if (selectedPdfFiles.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5"><p class="text-sm font-semibold text-white">Arquivos selecionados</p> <ul class="mt-4 space-y-2"><!--[-->`);
      const each_array = ensure_array_like(selectedPdfFiles);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let file = each_array[$$index];
        $$renderer2.push(`<li class="flex items-center justify-between rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-300"><span>${escape_html(file.name)}</span> <span class="text-slate-500">${escape_html(formatBytes(file.size))}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-6 flex flex-wrap gap-3"><button class="tool-button-primary" type="button"${attr("disabled", isMerging, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Mesclar PDFs`);
    }
    $$renderer2.push(`<!--]--></button> <button class="tool-button-ghost" type="button">Limpar seleção</button></div> <div class="mt-4">`);
    AlertBanner($$renderer2, { message: alertMessage, type: alertType });
    $$renderer2.push(`<!----></div></article>`);
  });
}
function ReportTool($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let reportTitle = "Relatório Executivo";
    let reportContent = sampleReport;
    let alertMessage = "";
    let alertType = "info";
    let isGenerating = false;
    $$renderer2.push(`<article class="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-slate-950/40"><p class="text-sm uppercase tracking-[0.22em] text-cyan-200">Relatórios</p> <h3 class="mt-2 font-heading text-2xl font-bold text-white">Gerar Relatório</h3> <p class="mt-4 text-sm leading-7 text-slate-300">Monte um relatório em texto, defina o título e exporte tudo em PDF com um layout mais limpo.</p> <div class="mt-6 space-y-4"><div><label class="mb-2 block text-sm font-semibold text-white" for="report-title">Título</label> <input id="report-title" class="tool-input"${attr("value", reportTitle)} placeholder="Digite o título do relatório"/></div> <div><label class="mb-2 block text-sm font-semibold text-white" for="report-content">Conteúdo</label> <textarea id="report-content" class="tool-input min-h-56" rows="10" placeholder="Digite o conteúdo do relatório">`);
    const $$body = escape_html(reportContent);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="flex flex-wrap gap-3"><button class="tool-button-emerald" type="button"${attr("disabled", isGenerating, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Gerar Relatório`);
    }
    $$renderer2.push(`<!--]--></button> <button class="tool-button-ghost" type="button">Restaurar texto</button></div></div> <div class="mt-4">`);
    AlertBanner($$renderer2, { message: alertMessage, type: alertType });
    $$renderer2.push(`<!----></div></article>`);
  });
}
function _page($$renderer) {
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>DocumentTools | SvelteKit + Tailwind</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Ferramenta moderna para mesclar PDFs, converter HTML em PDF e visualizar arquivos Excel em uma interface construída com SvelteKit e Tailwind."/>`);
  });
  $$renderer.push(`<div class="relative min-h-screen overflow-hidden"><div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_right,_rgba(16,185,129,0.16),_transparent_22%)]"></div> `);
  AppHeader($$renderer);
  $$renderer.push(`<!----> <main class="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">`);
  HeroSection($$renderer);
  $$renderer.push(`<!----> `);
  AboutSection($$renderer, {});
  $$renderer.push(`<!----> <section class="mt-10 grid gap-6 xl:grid-cols-2" id="pdf-tools">`);
  PdfMergerTool($$renderer);
  $$renderer.push(`<!----> `);
  HtmlToPdfTool($$renderer);
  $$renderer.push(`<!----></section> <section class="mt-6 grid gap-6 xl:grid-cols-1">`);
  PdfCompressorTool($$renderer);
  $$renderer.push(`<!----></section> <section class="mt-6 grid gap-6 xl:grid-cols-2" id="office-tools">`);
  OfficeViewerTool($$renderer);
  $$renderer.push(`<!----> `);
  ReportTool($$renderer);
  $$renderer.push(`<!----></section></main></div>`);
}
export {
  _page as default
};
