import { getCachedStylesForType } from '../../utils/getCachedStyles';
import { pdfDefaultConfig } from '../../common/margin';
import { GeneratePdfOptions } from '../../types/types';

/**
 * Генерує PDF з HTML-коду та кешованих стилів
 * @param options - Параметри генерації PDF
 * @returns {Promise<Buffer>} - Буфер PDF
 */

export const generatePdfFromHtml = async ({
  html,
  docType,
  landscape = false,
  page,
}: GeneratePdfOptions): Promise<Buffer> => {
  try {
    const htmlContent = decodeURIComponent(html);

    // Пошук файлів стилів
    const combinedStyles = getCachedStylesForType(docType);

    if (!combinedStyles) {
      throw new Error('No document styles found');
    }

    const styledHtml = `<style>${combinedStyles}</style>${htmlContent}`;
    await page.setContent(styledHtml, { waitUntil: 'networkidle' });

    // Генеруємо PDF у вигляді буфера
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: landscape,
      printBackground: true,
      margin: pdfDefaultConfig,
    });

    return Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
  } catch (error) {
    throw new Error(`Error generating PDF: ${(error as Error).message}`);
  }
};
