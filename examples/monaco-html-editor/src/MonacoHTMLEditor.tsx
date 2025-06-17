import { useEffect, useRef, useCallback, useState } from "react";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import "./MonacoHTMLEditor.css";

const origin = import.meta.env.VITE_REACT_APP_MICROCMS_ORIGIN;

const minEditorHeight = 10;
const maxEditorHeight = 30;

export function MonacoHTMLEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const windowIdRef = useRef<string | null>(null);
  const [lineHeight, setLineHeight] = useState<number>(18);

  const updateEditorStyle = useCallback(() => {
    if (editorRef.current === null) {
      return;
    }

    const model = editorRef.current.getModel();
    if (model === null) {
      return;
    }

    const editorHeight =
      Math.min(
        Math.max(minEditorHeight, model.getLineCount()),
        maxEditorHeight
      ) * lineHeight;

    window.parent.postMessage(
      {
        id: windowIdRef.current,
        action: "MICROCMS_UPDATE_STYLE",
        message: {
          height: editorHeight,
          width: "100%",
        },
      },
      origin
    );
  }, [lineHeight]);

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;

    // エディターの1行の高さを計算
    const container = editor.getContainerDomNode();
    const lineElement = container.querySelector(".monaco-editor .view-line");
    if (lineElement !== null) {
      const height = lineElement.getBoundingClientRect().height;
      setLineHeight(Math.round(height));
    }
  }, []);

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value === undefined || editorRef.current === null) {
        return;
      }
      updateEditorStyle();

      window.parent.postMessage(
        {
          id: windowIdRef.current,
          action: "MICROCMS_POST_DATA",
          message: {
            description: value.replaceAll(/\s/g, ""),
            data: {
              code: value,
            },
          },
        },
        origin
      );
    },
    [updateEditorStyle]
  );

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      // 初期値の設定
      if (e.isTrusted && e.data.action === "MICROCMS_GET_DEFAULT_DATA") {
        windowIdRef.current = String(e.data.id ?? "");
        const data = String(e.data?.message?.data?.code ?? "");

        if (editorRef.current !== null) {
          editorRef.current.setValue(data);
        }

        updateEditorStyle();

        const editorElement = document.querySelector<HTMLDivElement>(".editor");
        if (editorElement !== null) {
          editorElement.classList.add("ready");
        }
      }
    };

    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [updateEditorStyle]);

  return (
    <Editor
      className="editor"
      defaultLanguage="html"
      theme="vs-dark"
      options={{
        lineNumbers: "on",
        roundedSelection: true,
        scrollBeyondLastLine: false,
        readOnly: false,
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
      }}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
}
