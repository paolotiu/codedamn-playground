import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import 'xterm/css/xterm.css';

interface Props {
  dimensions?: { width: number; height: number };
}
const TerminalComponent = ({ dimensions }: Props) => {
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

  // Resize whenever the dimensions changes
  useEffect(() => {
    fitAddonRef.current?.fit();
  }, [dimensions]);

  return (
    <div className="h-full pane-content">
      <div ref={termRef} className="h-full" />
    </div>
  );
};

export default TerminalComponent;
