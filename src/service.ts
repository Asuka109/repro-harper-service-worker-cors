import * as harper from 'harper.js';
import { binary } from 'harper.js';

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
  const linter = new harper.LocalLinter({ binary });
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
