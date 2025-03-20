import { stylesCache } from './cacheStyles';

/**
 * Отримує закешовані стилі для масиву документів.
 * @param docNames - Масив назв документів, для яких потрібно знайти стилі.
 * @returns {string} - Об'єднані стилі у вигляді рядка.
 */

export const getCachedStylesForDocuments = (docNames: string[]): string => {
  let combinedStyles = '';

  // Додаємо спільні стилі, якщо вони є
  const resetStyles = stylesCache.get('reset-styles.css') || '';
  const commonStyles = stylesCache.get('common-document.css') || '';

  combinedStyles += resetStyles;

  let stylesFound = resetStyles !== '' || commonStyles !== '';

  docNames.forEach((docName) => {
    const matchingStyles = [...stylesCache.keys()].filter((file) =>
      file.includes(docName)
    );

    if (matchingStyles.length > 0) {
      matchingStyles.forEach((styleFile) => {
        combinedStyles += stylesCache.get(styleFile) || '';
      });
      stylesFound = true;
    }
  });

  combinedStyles += commonStyles;

  if (!stylesFound) {
    throw new Error(`No styles found for documents: ${docNames.join(', ')}`);
  }

  return combinedStyles;
};

/**
 * Отримує закешовані стилі для певного типу документа.
 * @param docType - Числовий тип документа (напр. `1`, `2`, `3`).
 * @returns {string} - Об'єднані стилі у вигляді рядка.
 */

export const getCachedStylesForType = (docType: number): string => {
  const styleKey = `${docType}.css`;
  const combinedStyles = stylesCache.get(styleKey) || '';

  if (!combinedStyles) {
    throw new Error(`No styles found for type: ${styleKey}`);
  }

  return combinedStyles;
};
