import path from 'node:path';
import { chromium } from 'playwright';

const pathToExtension = path.resolve(import.meta.dirname, '../dist');
const userDataDir = path.resolve(
  import.meta.dirname,
  '../node_modules/.cache/browser-user-data',
);
await chromium.launchPersistentContext(userDataDir, {
  channel: 'chromium',
  headless: false,
  args: [
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
  ],
});

// Test the background page as you would any other page.
// await browserContext.close();
