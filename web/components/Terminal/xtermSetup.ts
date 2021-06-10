import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const getArgs = (cmd: string) => {
  const args = cmd.split(' ');
  const allButFirst = args.slice(1).join(' ');
  const firstArg = args[0];
  return {
    args,
    allButFirst,
    firstArg,
  };
};

export const xtermSetup = () => {
  const term = new Terminal({
    theme: {
      background: '#181818',
    },
  });

  // xterm fit
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  fitAddon.fit();

  // Our propmt
  const termPrompt = () => {
    term.write('\r\n$ ');
  };

  let cmd = '';
  term.onKey(({ key, domEvent: e }) => {
    if (e.key === 'Enter') {
      const { allButFirst, firstArg } = getArgs(cmd);

      console.log(firstArg, allButFirst);
      if (firstArg === 'echo') {
        term.write('\r\n' + allButFirst);
      }

      termPrompt();
      cmd = '';
    } else if (e.key === 'Backspace') {
      // Prevent the deletion of prompt
      if (term.buffer.normal.cursorX > 2) {
        term.write('\b \b');

        // Remove last letter from string
        cmd = cmd.slice(0, -1);
      }
    } else {
      term.write(key);
      cmd += key;
    }
  });

  return { term, fitAddon, termPrompt };
};
