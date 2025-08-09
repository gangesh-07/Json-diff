// src/monaco-workers.js
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// Register language contributions on the main thread
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import 'monaco-editor/esm/vs/language/css/monaco.contribution';
import 'monaco-editor/esm/vs/language/html/monaco.contribution';

// Bundle workers (Vite ?worker)
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker   from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CssWorker    from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker   from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TsWorker     from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') return new JsonWorker();
    if (label === 'css' || label === 'scss' || label === 'less') return new CssWorker();
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new HtmlWorker();
    if (label === 'typescript' || label === 'javascript') return new TsWorker();
    return new EditorWorker();
  },
};

// Optional defaults — guard them so they don’t blow up if something changes
if (monaco.languages?.typescript) {
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
}
