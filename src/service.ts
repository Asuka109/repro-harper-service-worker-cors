import * as harper from 'harper.js';
import type { Constructor } from 'type-fest';

console.log('harper', harper);

function createLinter() {
  const Linter: Constructor<harper.Linter> =
    typeof self.chrome !== 'undefined' ||
    (typeof window !== 'undefined' && typeof window.Worker !== 'undefined')
      ? harper.WorkerLinter
      : harper.LocalLinter;
  return new Linter();
}

async function getLinter() {
  let linter = await chrome.storage.local.get('global-linter');
  if (!linter) {
    linter = createLinter();
    await chrome.storage.local.set({ 'global-linter': linter });
  }
  return linter;
}

chrome.runtime.onInstalled.addListener(() => {
  console.debug('[Harper] Service worker: installed.');
});

async function handleLintMessage(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  message: any,
  sender: chrome.runtime.MessageSender,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  sendResponse: (response?: any) => void,
) {
  const linter = new harper.LocalLinter();
  const lints = await linter.lint(message.name);
  console.debug('[Harper] Service worker: Linting completed.');
  sendResponse(lints);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'lint') {
    handleLintMessage(message, sender, sendResponse);
    return true;
  }
});
