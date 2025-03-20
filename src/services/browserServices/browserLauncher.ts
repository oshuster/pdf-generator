import { Browser, chromium, Page } from 'playwright';

let browserInstance: Browser | null = null;
const pagePool: Page[] = [];
let maxPages = 5;

/**
 * Ініціалізує браузер Playwright з можливістю налаштування.
 * @param options - Опції для запуску браузера (maxPages, headless)
 */
export const browserLauncher = async (
  options: { maxPages?: number; headless?: boolean } = {}
): Promise<Browser> => {
  if (!browserInstance) {
    try {
      maxPages = options.maxPages || maxPages;
      browserInstance = await chromium.launch({
        headless: options.headless ?? true,
      });

      // Створюємо початковий пул сторінок
      for (let i = 0; i < maxPages; i++) {
        const page = await browserInstance.newPage();
        pagePool.push(page);
      }
    } catch (error) {
      throw new Error(`Browser launch error: ${(error as Error).message}`);
    }
  }
  return browserInstance;
};

/**
 * Отримує вільну сторінку з пулу або створює нову.
 */
export const getPage = async () => {
  if (pagePool.length > 0) {
    return pagePool.pop();
  }
  if (!browserInstance) {
    throw new Error(
      'Browser instance is not available. Call browserLauncher() first.'
    );
  }

  return await browserInstance.newPage();
};

/**
 * Повертає сторінку назад у пул або закриває її.
 */
export const releasePage = (page: Page) => {
  if (pagePool.length < maxPages) {
    pagePool.push(page);
  } else {
    page.close();
  }
};

/**
 * Закриває браузер при завершенні сервера.
 */
export const closeBrowser = async () => {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
};
