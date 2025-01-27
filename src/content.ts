async function main() {
  const lints = await chrome.runtime.sendMessage({
    type: 'lint',
    name: 'This is a example of how to use `harper.js`.',
  });

  console.debug('[Harper] Content script: Linting completed.');
  console.log('Here are the results of linting the above text:');

  for (const lint of lints) {
    console.log(' - ', lint.span().start, ':', lint.span().end, lint.message());

    if (lint.suggestion_count() !== 0) {
      console.log('Suggestions:');

      for (const sug of lint.suggestions()) {
        console.log(
          '\t - ',
          sug.kind() === 1 ? 'Remove' : 'Replace with',
          sug.get_replacement_text(),
        );
      }
    }
  }
}

main();
