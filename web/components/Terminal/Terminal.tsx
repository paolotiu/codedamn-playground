import React, { useEffect, useRef } from 'react';
import ResizeObserver from 'react-resize-observer';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const termRef = useRef<HTMLDivElement>(null);
  const fitAddonRef = useRef<FitAddon>();
  useEffect(() => {
    const term = new Terminal({
      theme: {
        background: '#181818',
      },
    });
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;

    const prompt = () => {
      term.write('\r\n$ ');
    };

    if (termRef.current) {
      term.loadAddon(fitAddon);
      term.open(termRef.current);
      fitAddon.fit();

      term.write('Hello :)');
      // term.write('\x1b[?47h');
      prompt();
      term.onKey(({ key, domEvent: e }) => {
        if (e.key === 'Enter') {
          prompt();
        } else if (e.key === 'Backspace') {
          // Prevent the deletion of prompt
          if (term.buffer.normal.cursorX > 2) {
            term.write('\b \b');
          }
        } else {
          term.write(key);
        }
      });
    }

    return () => {
      term.dispose();
      fitAddon.dispose();
    };
  }, []);

  return (
    <div className="h-full overflow-hidden pane-content">
      {/* We're using a resize observer instead of the propagate dimensions prop of react reflex
          beacuse the div that react reflex gives does not always fill the provided space. Sometimes it 
          is off by 1-2px. Looks bad :( */}
      <ResizeObserver
        onResize={() => {
          fitAddonRef.current?.fit();
        }}
      />
      <div ref={termRef} className="h-full" />
    </div>
  );
};

export default TerminalComponent;
