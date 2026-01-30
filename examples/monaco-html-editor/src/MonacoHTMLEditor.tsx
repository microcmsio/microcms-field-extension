import { useEffect, useRef, useCallback, useState } from "react";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import "./MonacoHTMLEditor.css";
import { useFieldExtension } from "microcms-field-extension-react";

const origin = import.meta.env.VITE_REACT_APP_MICROCMS_ORIGIN;

const minEditorHeight = 10;
const maxEditorHeight = 30;

export function MonacoHTMLEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const windowIdRef = useRef<string | null>(null);
  const [lineHeight, setLineHeight] = useState<number>(18);
  const { data, sendMessage } = useFieldExtension<{ code: string }>(
    { code: "" },
    {
      origin: origin,
      onDefaultData: (e: MessageEvent<{ id?: string | null }>) => {
        windowIdRef.current = String(e.data.id ?? "");
        const editorElement = document.querySelector<HTMLDivElement>(".editor");
        if (editorElement !== null) {
          editorElement.classList.add("ready");
        }
        updateEditorStyle();
      },
    }
  );

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

  useEffect(() => {
    updateEditorStyle();
  }, [data, updateEditorStyle]);

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

      sendMessage({
        description: value.replaceAll(/\s/g, ""),
        data: { code: value },
      });
    },
    [sendMessage]
  );

  return (
    <Editor
      className="editor"
      defaultLanguage="html"
      value={data.code}
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
