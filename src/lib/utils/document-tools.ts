export type AlertType = 'success' | 'error' | 'info';

export const sampleHtml = `<div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0f172a;">
  <h1 style="color: #0f766e;">Exemplo de Documento</h1>
  <p>Este conteúdo demonstra a conversão de HTML para PDF diretamente no navegador.</p>
  <h2>Recursos</h2>
  <ul>
    <li>Renderização simples e rápida</li>
    <li>Preservação de estrutura básica</li>
    <li>Exportação para PDF com um clique</li>
  </ul>
</div>`;

export const sampleReport =
  'Descreva aqui os principais pontos do relatório, resultados, próximos passos e observações finais.';

export function formatBytes(bytes: number) {
  if (!bytes) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Number((bytes / 1024 ** index).toFixed(2))} ${sizes[index]}`;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function normalizeFilename(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function downloadBlob(data: BlobPart, filename: string, mimeType: string) {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}