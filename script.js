// Document Tools - Main JavaScript File
class DocumentTools {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    setupEventListeners() {
        // PDF Merger
        document.getElementById('pdf-files').addEventListener('change', this.handlePdfFiles.bind(this));
        document.getElementById('merge-pdf-btn').addEventListener('click', this.mergePdfs.bind(this));

        // HTML to PDF
        document.getElementById('generate-pdf-btn').addEventListener('click', this.generatePdfFromHtml.bind(this));

        // Office File Renderer
        document.getElementById('office-file').addEventListener('change', this.handleOfficeFile.bind(this));

        // Report Generator
        document.getElementById('generate-report-btn').addEventListener('click', this.generateReport.bind(this));

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavigation.bind(this));
        });
    }

    setupDragAndDrop() {
        const dropZones = document.querySelectorAll('.file-input-label');
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        const input = e.currentTarget.previousElementSibling;
        
        if (input.multiple) {
            input.files = files;
        } else if (files.length > 0) {
            const dt = new DataTransfer();
            dt.items.add(files[0]);
            input.files = dt.files;
        }
        
        input.dispatchEvent(new Event('change'));
    }

    // PDF Merger Functions
    handlePdfFiles(e) {
        const files = e.target.files;
        const fileList = document.getElementById('pdf-file-list');
        const filesDisplay = document.getElementById('pdf-files-display');
        const mergeBtn = document.getElementById('merge-pdf-btn');
        
        if (files.length > 0) {
            filesDisplay.innerHTML = '';
            Array.from(files).forEach((file, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <i class="fas fa-file-pdf"></i>
                    ${file.name} (${this.formatFileSize(file.size)})
                `;
                filesDisplay.appendChild(li);
            });
            
            fileList.classList.remove('hidden');
            mergeBtn.disabled = files.length < 2;
        } else {
            fileList.classList.add('hidden');
            mergeBtn.disabled = true;
        }
    }

    async mergePdfs() {
        const button = document.getElementById('merge-pdf-btn');
        const files = document.getElementById('pdf-files').files;
        
        if (files.length < 2) {
            this.showAlert('Selecione pelo menos 2 arquivos PDF para mesclar.', 'error');
            return;
        }

        this.setButtonLoading(button, true, 'Mesclando...');

        try {
            const pdfDocs = [];
            
            // Load all PDF documents
            for (let i = 0; i < files.length; i++) {
                const pdfBytes = await files[i].arrayBuffer();
                const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
                pdfDocs.push(pdfDoc);
            }

            // Create merged PDF
            const mergedPdf = await PDFLib.PDFDocument.create();
            
            for (const pdfDoc of pdfDocs) {
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            // Save and download
            const mergedPdfBytes = await mergedPdf.save();
            this.downloadFile(mergedPdfBytes, 'documento_mesclado.pdf', 'application/pdf');
            
            this.showAlert('PDFs mesclados com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao mesclar PDFs:', error);
            this.showAlert('Erro ao mesclar PDFs. Verifique se os arquivos são válidos.', 'error');
        } finally {
            this.setButtonLoading(button, false, 'Mesclar PDFs');
        }
    }

    // HTML to PDF Functions
    async generatePdfFromHtml() {
        const button = document.getElementById('generate-pdf-btn');
        const htmlContent = document.getElementById('html-content').value.trim();
        
        if (!htmlContent) {
            this.showAlert('Digite o conteúdo HTML primeiro.', 'error');
            return;
        }

        this.setButtonLoading(button, true, 'Gerando PDF...');

        try {
            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            element.style.padding = '20px';
            element.style.fontFamily = 'Arial, sans-serif';
            element.style.lineHeight = '1.6';
            
            const options = {
                margin: [10, 10, 10, 10],
                filename: 'documento.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            await html2pdf().set(options).from(element).save();
            this.showAlert('PDF gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            this.showAlert('Erro ao gerar PDF. Verifique o conteúdo HTML.', 'error');
        } finally {
            this.setButtonLoading(button, false, 'Gerar PDF');
        }
    }

    // Office File Functions
    handleOfficeFile(e) {
        const file = e.target.files[0];
        
        if (!file) return;
        
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (['xlsx', 'xls'].includes(fileExtension)) {
            this.renderExcelFile(file);
        } else if (['docx', 'doc'].includes(fileExtension)) {
            this.showAlert('Visualização de documentos Word não está disponível nesta versão.', 'error');
        } else if (['pptx', 'ppt'].includes(fileExtension)) {
            this.showAlert('Visualização de apresentações PowerPoint não está disponível nesta versão.', 'error');
        } else {
            this.showAlert('Formato de arquivo não suportado.', 'error');
        }
    }

    async renderExcelFile(file) {
        const results = document.getElementById('office-results');
        const table = document.getElementById('office-table');
        
        try {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                
                if (sheet.length === 0) {
                    this.showAlert('O arquivo Excel está vazio ou não pode ser lido.', 'error');
                    return;
                }
                
                this.renderTable(sheet, table);
                results.classList.remove('hidden');
                this.showAlert('Arquivo Excel carregado com sucesso!', 'success');
            };
            
            reader.readAsArrayBuffer(file);
            
        } catch (error) {
            console.error('Erro ao processar arquivo Excel:', error);
            this.showAlert('Erro ao processar arquivo Excel.', 'error');
        }
    }

    renderTable(data, tableElement) {
        if (!data || data.length === 0) return;
        
        let tableHtml = '<thead><tr>';
        
        // Header
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            tableHtml += `<th>${header}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
        
        // Rows
        data.forEach(row => {
            tableHtml += '<tr>';
            headers.forEach(header => {
                const cellValue = row[header] || '';
                tableHtml += `<td>${cellValue}</td>`;
            });
            tableHtml += '</tr>';
        });
        
        tableHtml += '</tbody>';
        tableElement.innerHTML = tableHtml;
    }

    // Report Generator
    async generateReport() {
        const button = document.getElementById('generate-report-btn');
        const title = document.getElementById('report-title').value.trim();
        const content = document.getElementById('report-content').value.trim();
        
        if (!title || !content) {
            this.showAlert('Preencha o título e o conteúdo do relatório.', 'error');
            return;
        }

        this.setButtonLoading(button, true, 'Gerando Relatório...');

        try {
            const currentDate = new Date().toLocaleDateString('pt-BR');
            const reportHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
                    <header style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
                        <h1 style="color: #2563eb; margin: 0; font-size: 28px;">${title}</h1>
                        <p style="color: #64748b; margin: 10px 0 0 0;">Gerado em ${currentDate}</p>
                    </header>
                    
                    <main style="line-height: 1.8; color: #1e293b;">
                        ${content.replace(/\n/g, '<br>')}
                    </main>
                    
                    <footer style="margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
                        <p>Documento gerado automaticamente pela Ferramenta de Manipulação de Documentos</p>
                    </footer>
                </div>
            `;
            
            const element = document.createElement('div');
            element.innerHTML = reportHtml;
            
            const options = {
                margin: [15, 15, 15, 15],
                filename: `relatorio_${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            await html2pdf().set(options).from(element).save();
            this.showAlert('Relatório gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            this.showAlert('Erro ao gerar relatório.', 'error');
        } finally {
            this.setButtonLoading(button, false, 'Gerar Relatório');
        }
    }

    // Utility Functions
    handleNavigation(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    }

    setButtonLoading(button, loading, text) {
        if (loading) {
            button.disabled = true;
            button.innerHTML = `
                <span class="spinner"></span>
                ${text}
            `;
        } else {
            button.disabled = false;
            button.innerHTML = `
                <i class="${button.dataset.icon || 'fas fa-check'}"></i>
                ${text}
            `;
        }
    }

    showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        // Insert at the top of main content
        const main = document.querySelector('.main .container');
        main.insertBefore(alert, main.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
        
        // Scroll to alert
        alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    downloadFile(data, filename, mimeType) {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocumentTools();
    
    // Store original button icons for loading states
    document.querySelectorAll('.btn').forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            btn.dataset.icon = icon.className;
        }
    });
});

// Add some sample HTML content for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const htmlTextarea = document.getElementById('html-content');
    if (htmlTextarea) {
        htmlTextarea.value = `<h1>Exemplo de Documento</h1>
<h2>Introdução</h2>
<p>Este é um exemplo de como converter HTML para PDF usando nossa ferramenta.</p>

<h2>Características</h2>
<ul>
    <li>Conversão rápida e eficiente</li>
    <li>Preservação da formatação</li>
    <li>Suporte a imagens e estilos</li>
    <li>Interface intuitiva</li>
</ul>

<h2>Conclusão</h2>
<p>Nossa ferramenta oferece uma solução completa para manipulação de documentos, combinando funcionalidades de PDF e Office em uma única interface moderna e responsiva.</p>

<p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>`;
    }
});
