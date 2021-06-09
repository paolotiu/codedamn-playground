import Editor from '@components/Editor/Editor';
import FileExplorer from '@components/FileExplorer/FileExplorer';
import {
  useGetPlaygroundQuery,
  File,
  useUpdateFileMutation,
  UpdateFileMutationVariables,
} from '@gql/generated';
import { graphqlClient } from '@utils/graphqlClient';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

import 'xterm/css/xterm.css';
import 'react-reflex/styles.css';
import { useDebouncedCallback } from 'use-debounce';
import { getFileType } from '@utils/getFileType';
import EditorFilePicker from '@components/Editor/EditorFilePicker';
import { useEditorFilePicker } from '@components/Editor/useEditorPicker';
import EmptyEditor from '@components/Editor/EmptyEditor';

// Load it in the client-side since the monaco instance needs the document object
// Related: https://github.com/suren-atoyan/monaco-react#for-nextjs-users
const Terminal = dynamic(() => import('@components/Terminal/Terminal'), { ssr: false });

export type ChangeActiveFileFunc = (id: string) => void;

interface Props {
  id: string;
}
const Playground = ({ id: playgroundId }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const {
    addToEditorFilePicker,
    filesInPicker,
    removeFromEditorFilePicker,
    activeFile,
    getActiveIndex,
    setActiveFile,
  } = useEditorFilePicker();

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

  if (playgroundQuery.isLoading) return null;
  if (playgroundQuery.isError) return <p>Not found</p>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between px-6 py-3 font-bold text-white bg-black border-b border-off-black ">
        <div>
          <input
            type="text"
            value={playgroundQuery.data?.getPlayground?.name}
            className="text-xl font-bold bg-transparent outline-none focus-visible:shadow-border-b-white"
          />
        </div>
        <div>
          <a
            href={`http://localhost:4000/playground/${playgroundId}`}
            target="_blank"
            rel="noreferrer"
          >
            out
          </a>
        </div>
      </div>

      <ReflexContainer orientation="horizontal">
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement className="left-pane" maxSize={300} flex={0.2}>
              <FileExplorer files={files || []} onFileClick={(file) => changeActiveFile(file.id)} />
            </ReflexElement>
            <ReflexSplitter className="border-0 w-[4px] bg-off-black" />
            <ReflexElement className="">
              <ReflexContainer orientation="horizontal">
                <ReflexElement>
                  <div className="flex flex-col h-full pane-content">
                    <EditorFilePicker
                      activeIndex={getActiveIndex()}
                      setActiveFile={setActiveFile}
                      files={filesInPicker}
                      removeFromPicker={removeFromEditorFilePicker}
                    />
                    {activeFile ? (
                      <Editor
                        value={activeFile.value}
                        language={getFileType(activeFile.name) || ''}
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
                    src={`http://localhost:4000/playground/${playgroundId}`}
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
  );
};

export default Playground;
