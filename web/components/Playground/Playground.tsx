import Editor from '@components/Editor';
import FileExplorer from '@components/FileExplorer/FileExplorer';
import { useFilesQuery } from '@gql/generated';
import { graphqlClient } from '@utils/graphqlClient';
import { monacoSetup } from '@utils/monacoSetup';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

import 'xterm/css/xterm.css';
import 'react-reflex/styles.css';

const Terminal = dynamic(() => import('@components/Terminal/Terminal'), { ssr: false });

const Playground = () => {
  const filesQuery = useFilesQuery(graphqlClient);
  const [code, setCode] = useState('');

  const srcDoc = `
    <html>
    ${code}
    </html>
`;

  console.log(filesQuery.data);
  return (
    <div className="h-screen">
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane" maxSize={300}>
          <FileExplorer files={filesQuery.data?.me?.files || []} />
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement className="overflow-hidden right-pane" style={{ overflow: 'hidden' }}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement>
              <div className="h-full overflow-hidden pane-content">
                <Editor
                  value={code}
                  theme="myTheme"
                  onChange={(val) => setCode(val || '')}
                  options={{
                    wordWrap: 'on',
                    minimap: {
                      enabled: false,
                    },
                    scrollBeyondLastLine: false,
                  }}
                  beforeMount={monacoSetup}
                />
              </div>
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement
              propagateDimensions
              propagateDimensionsRate={200}
              flex={0.35}
              // style={{ overflow: 'hidden' }}
            >
              <Terminal />
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter />
        <ReflexElement className="middle-pane">
          <iframe
            title="Playground"
            className="w-full h-full"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-orientation-lock allow-pointer-lock"
            srcDoc={srcDoc}
          ></iframe>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default Playground;
