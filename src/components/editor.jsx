// src/components/MonacoEditor.jsx
import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// Make sure you've imported Monaco's base CSS somewhere (e.g., in main.jsx):
// import 'monaco-editor/esm/vs/editor/editor.main.css';

export default function MonacoEditor({
  value = '',
  language = 'javascript',
  theme = 'vs-dark',
  options = {},
  onChange,
  className,
  minimap,
  style,
}) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const modelRef = useRef(null);
  const roRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a dedicated model so instances don't clash
    modelRef.current = monaco.editor.createModel(value, language);

    editorRef.current = monaco.editor.create(containerRef.current, {
      model: modelRef.current,
      theme,
      automaticLayout: false, // handled via ResizeObserver below
      minimap: { enabled: minimap },
      scrollBeyondLastLine: false,
      tabSize: 2,
      ...options,
    });

    // Emit changes upward
    const sub = editorRef.current.onDidChangeModelContent(() => {
      onChange?.(editorRef.current.getValue());
    });

    // Keep layout correct on container resize
    roRef.current = new ResizeObserver(() => editorRef.current?.layout());
    roRef.current.observe(containerRef.current);

    // Cleanup
    return () => {
      sub.dispose();
      roRef.current?.disconnect();
      editorRef.current?.dispose();
      modelRef.current?.dispose();
    };
    // mount once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update language without recreating editor
  useEffect(() => {
    if (modelRef.current) {
      monaco.editor.setModelLanguage(modelRef.current, language);
    }
  }, [language]);

  // Theme is global across all editors
  useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);

  // Controlled-ish external value updates (preserve cursor)
  useEffect(() => {
    const editor = editorRef.current;
    const model = modelRef.current;
    if (!editor || !model) return;

    const current = model.getValue();
    if (value !== undefined && value !== current) {
      const pos = editor.getPosition();
      model.pushEditOperations(
        editor.getSelections() ?? null,
        [{ range: model.getFullModelRange(), text: value }],
        () => null
      );
      if (pos) editor.setPosition(pos);
    }
  }, [value]);

  // Live options updates
  useEffect(() => {
    if (editorRef.current && options) {
      editorRef.current.updateOptions(options);
    }
  }, [options]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative', ...style }}
    />
  );
}
