import { Page } from 'playwright';

export interface GeneratePdfOptions {
  html: string;
  docType: number;
  landscape?: boolean;
  page: Page;
}

export interface GenerateDocumentPdfOptions {
  html: string;
  docName: string[];
  landscape?: boolean;
  page: Page;
}
