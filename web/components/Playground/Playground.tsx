import Editor from '@components/Editor/Editor';
import FileExplorer from '@components/FileExplorer/FileExplorer';
import {
  useGetPlaygroundQuery,
  File,
  useUpdateFileMutation,
  UpdateFileMutationVariables,
} from '@gql/generated';
import { graphqlClient } from '@utils/graphqlClient';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { useDebouncedCallback } from 'use-debounce';
import { getFileType } from '@utils/getFileType';
import Layout from '@components/Layout';
import EditorFilePicker from '@components/Editor/EditorFilePicker';
import { useEditorFilePicker } from '@components/Editor/useEditorPicker';
import EmptyEditor from '@components/Editor/EmptyEditor';
import { useBroadcastChannel } from '@utils/useBroadcastChannel';
import { useIframe } from '@utils/useIframe';
import PlaygroundHeader from './PlaygroundHeader';

import 'xterm/css/xterm.css';
import 'react-reflex/styles.css';

// Load it in the client-side since the monaco instance needs the document object
// Related: https://github.com/suren-atoyan/monaco-react#for-nextjs-users
const Terminal = dynamic(() => import('@components/Terminal/Terminal'), { ssr: false });

export type ChangeActiveFileFunc = (id: string) => void;

interface Props {
  id: string;
}

const Playground = ({ id: playgroundId }: Props) => {
  const { iframeRef, refreshIframe } = useIframe();
  const [files, setFiles] = useState<File[]>([]);
  const bc = useBroadcastChannel('playground');

  const {
    addToEditorFilePicker,
    filesInPicker,
    removeFromEditorFilePicker,
    activeFile,
    getActiveIndex,
  } = useEditorFilePicker();

  const updateFileMutation = useUpdateFileMutation(graphqlClient);

  const debouncedFileUpdate = useDebouncedCallback(
    async (variables: UpdateFileMutationVariables) => {
      await updateFileMutation.mutateAsync(variables);
      bc?.postMessage('update');
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

        refreshIframe();
      },
      retry: 0,
    },
  );

  const changeActiveFile: ChangeActiveFileFunc = (id) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      addToEditorFilePicker(file);
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

  if (playgroundQuery.isLoading || !playgroundQuery.isSuccess) return null;
  if (playgroundQuery.isError) return <p>Not found</p>;

  const { getPlayground } = playgroundQuery.data;

  return (
    <Layout title={getPlayground?.name}>
      <div className="flex flex-col h-screen">
        <PlaygroundHeader playgroundId={playgroundId} playgroundName={getPlayground?.name || ''} />

        {/* Fixes overflow bug */}
        <ReflexContainer orientation="horizontal">
          <ReflexElement>
            {/* ----------------- */}

            <ReflexContainer orientation="vertical">
              <ReflexElement className="left-pane" maxSize={300} flex={0.2}>
                <FileExplorer
                  files={files || []}
                  onFileClick={(file) => changeActiveFile(file.id)}
                />
              </ReflexElement>
              <ReflexSplitter className="border-0 w-[4px] bg-off-black" />
              <ReflexElement className="">
                <ReflexContainer orientation="horizontal">
                  <ReflexElement>
                    <div className="flex flex-col h-full pane-content">
                      <EditorFilePicker
                        activeIndex={getActiveIndex()}
                        changeActiveFile={(file) => changeActiveFile(file.id)}
                        files={filesInPicker}
                        removeFromPicker={removeFromEditorFilePicker}
                      />
                      {activeFile ? (
                        <Editor
                          defaultLanguage={getFileType(activeFile.name) || ''}
                          defaultValue={activeFile.value}
                          path={activeFile.name}
                          onChange={(value) => {
                            debouncedFileUpdate({ data: { id: activeFile.id, value } });
                          }}
                        />
                      ) : (
                        <EmptyEditor />
                      )}
                    </div>
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>

              <ReflexSplitter />

              <ReflexElement className="right-pane">
                <ReflexContainer orientation="horizontal">
                  <ReflexElement className="right-pane ">
                    <iframe
                      ref={iframeRef}
                      title="Playground"
                      className="w-full h-full pane-content"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-orientation-lock allow-pointer-lock"
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/playground/${playgroundId}`}
                    ></iframe>
                  </ReflexElement>

                  <ReflexSplitter />

                  <ReflexElement flex={0.35}>
                    <Terminal />
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </Layout>
  );
};

export default Playground;
