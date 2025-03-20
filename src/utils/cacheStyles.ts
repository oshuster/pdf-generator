import path from 'path';
import fsPromises from 'fs/promises';

// Глобальний кеш для всіх стилів
export const stylesCache: Map<string, string> = new Map();

/**
 * Зчитує всі CSS-файли у вказаній директорії та кешує їх у пам’яті.
 * @param stylesDir - Шлях до директорії зі стилями.
 * @returns {Promise<string[]>} - Масив назв закешованих файлів.
 */

export const loadStylesIntoCache = async (
  stylesDir: string
): Promise<string[]> => {
  try {
    const files = await fsPromises.readdir(stylesDir);
    let cachedFiles = [];

    for (const file of files) {
      if (file.endsWith('.css')) {
        const filePath = path.join(stylesDir, file);
        const fileContent = await fsPromises.readFile(filePath, 'utf-8');
        stylesCache.set(file, fileContent);
        cachedFiles.push(file);
      }
    }

    return cachedFiles;
  } catch (error) {
    throw new Error(`Error caching styles: ${(error as Error).message}`);
  }
};
