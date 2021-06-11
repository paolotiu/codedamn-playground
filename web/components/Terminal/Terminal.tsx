import React, { useEffect, useRef } from 'react';
import ResizeObserver from 'react-resize-observer';
import { FitAddon } from 'xterm-addon-fit';

import 'xterm/css/xterm.css';
import { xtermSetup } from './xtermSetup';

const TerminalComponent = () => {
  const termRef = useRef<HTMLDivElement>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    const { term, fitAddon, termPrompt } = xtermSetup();
    fitAddonRef.current = fitAddon;
    if (termRef.current) {
      term.open(termRef.current);
      term.write('Hello, try the "echo" command :)');
      termPrompt();
      fitAddon.fit();
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
