import Editor from '@components/Editor';
import FileExplorer from '@components/FileExplorer/FileExplorer';
import {
  useGetPlaygroundQuery,
  File,
  useUpdateFileMutation,
  UpdateFileMutationVariables,
} from '@gql/generated';
import { graphqlClient } from '@utils/graphqlClient';
import { monacoSetup } from '@utils/monacoSetup';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

import 'xterm/css/xterm.css';
import 'react-reflex/styles.css';
import { useDebouncedCallback } from 'use-debounce';
import { getFileType } from '@utils/getFileType';

const Terminal = dynamic(() => import('@components/Terminal/Terminal'), { ssr: false });

export type ChangeActiveFileFunc = (id: string) => void;

interface Props {
  id: string;
}
const Playground = ({ id: playgroundId }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [files, setFiles] = useState<File[]>([]);

  const [activeFile, setActiveFile] = useState(files[0]);
  const updateFileMutation = useUpdateFileMutation(graphqlClient);
  const refreshIframe = () => {
    if (iframeRef.current?.src) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  };
  const debouncedFileUpdate = useDebouncedCallback(
    async (variables: UpdateFileMutationVariables) => {
      await updateFileMutation.mutateAsync(variables);
      refreshIframe();
    },
    1000,
  );

  const playgroundQuery = useGetPlaygroundQuery(
    graphqlClient,
    { id: playgroundId },
    {
      onSuccess: (data) => {
        // Update state
        setFiles(data.getPlayground?.files || []);
        if (data.getPlayground?.files?.length) {
          setActiveFile(data.getPlayground.files[0]);
        }
        refreshIframe();
      },
      retry: 0,
    },
  );

  const changeActiveFile: ChangeActiveFileFunc = (id) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      setActiveFile(file);
    }
  };
  // useEffect(() => {
  //   const handler = (e: MessageEvent<any>) => {
  //     // Make sure message is from our iframe, extensions like React dev tools might use the same technique and mess up our logs
  //     if (e.data && e.data.source === 'iframe') {
  //       // Do whatever you want here.
  //       console.log(e.data.message);
  //     }
  //   };
  //   window.addEventListener('message', handler);
  //   return () => {
  //     window.removeEventListener('message', handler);
  //   };
  // }, []);

  if (playgroundQuery.isLoading) return null;
  if (playgroundQuery.isError) return <p>Not found</p>;

  return (
    <div className="h-screen">
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane" maxSize={300}>
          <FileExplorer files={files || []} onFileClick={(file) => changeActiveFile(file.id)} />
        </ReflexElement>
        <ReflexSplitter className="border-0 w-[4px] bg-off-black" />
        <ReflexElement className="overflow-hidden right-pane" style={{ overflow: 'hidden' }}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement>
              <div className="h-full overflow-hidden pane-content">
                {activeFile && (
                  <Editor
                    files={files}
                    value={activeFile.value}
                    language={getFileType(activeFile.name) || ''}
                    path={activeFile.name}
                    theme="myTheme"
                    options={{
                      wordWrap: 'on',
                      minimap: {
                        enabled: false,
                      },
                      scrollBeyondLastLine: false,
                    }}
                    beforeMount={monacoSetup}
                    onChange={(value) => {
                      debouncedFileUpdate({ data: { id: activeFile.id, value } });
                    }}
                  />
                )}
              </div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter />
        <ReflexElement className="right-pane">
          <ReflexContainer orientation="horizontal">
            <ReflexElement className="right-pane ">
              {activeFile && (
                <iframe
                  ref={iframeRef}
                  title="Playground"
                  className="w-full h-full pane-content"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-orientation-lock allow-pointer-lock"
                  src={`http://localhost:4000/playground/${playgroundId}`}
                ></iframe>
              )}
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
      </ReflexContainer>
    </div>
  );
};

export default Playground;
