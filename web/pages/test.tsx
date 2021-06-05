import Editor from '@components/Editor';
import { useMonaco } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';

const Test = () => {
  const monaco = useMonaco();
  useEffect(() => {
    let disposeProvider: () => void | undefined;

    if (monaco) {
      // Add intellisense for html closing tags
      const { dispose } = monaco.languages.registerCompletionItemProvider('html', {
        triggerCharacters: ['>'],
        provideCompletionItems: (model, position) => {
          const codePre: string = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          const tag = codePre.match(/.*<(\w+)>$/)?.[1];

          if (!tag) {
            return;
          }

          const word = model.getWordUntilPosition(position);

          return {
            suggestions: [
              {
                label: `</${tag}>`,
                kind: monaco.languages.CompletionItemKind.EnumMember,
                insertText: `</${tag}>`,
                range: {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn,
                  endColumn: word.endColumn,
                },
              },
            ],
          };
        },
      });
      disposeProvider = dispose;
    }
    return () => {
      // Dispose of the completion provider to prevent multiple of the same intellisense
      if (disposeProvider) {
        disposeProvider();
      }
    };
  }, [monaco]);

  const [code, setCode] = useState('');

  const srcDoc = `
    <html>
    ${code}
    </html>
`;
  return (
    <div className="flex max-h-screen">
      <div className="w-1/2  resize-x h-[90vh]">
        <Editor value={code} onChange={(val) => setCode(val || '')} />
      </div>
      <iframe
        title="Playground"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-orientation-lock allow-pointer-lock"
        className="max-h-screen"
        srcDoc={srcDoc}
      ></iframe>
    </div>
  );
};

export default Test;
