import html2pdf from 'html2pdf.js';

export const exportToPDF = async (elementId, fileName = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return { success: false, blob: null };
  }

  // Configuration options for html2pdf
  const opt = {
    margin: [0, 0, 0, 0],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      windowWidth: 1024
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    const worker = html2pdf().set(opt).from(element);
    const pdfBlob = await worker.output('blob');
    await worker.save();
    return { success: true, blob: pdfBlob };
  } catch (error) {
    console.error('PDF Generation Error:', error);
    // Fallback to browser print dialog if html2pdf fails
    window.print();
    return { success: false, blob: null };
  }
};

export const generatePDFBlob = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return null;

  const opt = {
    margin: [0, 0, 0, 0],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, windowWidth: 1024 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
    return pdfBlob;
  } catch (err) {
    console.error('Blob generation error:', err);
    return null;
  }
};
