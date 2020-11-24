export function register() {
  customElements.define(
    "ts-editor",
    class extends HTMLElement {
      constructor() {
        super();
        // debugger;
        console.log(this);
        this._editorValue = this.getAttribute("editorValue");
        //   "-- If you see this, the Elm code didn't set the value.";
      }

      get editorValue() {
        return this._editorValue;
      }

      set editorValue(value) {
        if (this._editorValue === value) return;
        this._editorValue = value;
        // if (!this._editor) return;
        // this._editor.setValue(value);
      }

      connectedCallback() {
        this.innerHTML = `<div id="loader">Loading...</div>
<div id="monaco-editor-embed" style="height: 800px; width: 800px;" />`;
        // First set up the VSCode loader in a script tag
        const getLoaderScript = document.createElement("script");
        getLoaderScript.src = "https://www.typescriptlang.org/js/vs.loader.js";
        getLoaderScript.async = true;
        getLoaderScript.onload = () => {
          // Now the loader is ready, tell require where it can get the version of monaco, and the sandbox
          // This version uses the latest version of the sandbox, which is used on the TypeScript website

          // For the monaco version you can use unpkg or the TypeSCript web infra CDN
          // You can see the available releases for TypeScript here:
          // https://typescript.azureedge.net/indexes/releases.json
          //
          require.config({
            paths: {
              vs: "https://typescript.azureedge.net/cdn/4.0.5/monaco/min/vs",
              // vs: 'https://unpkg.com/@typescript-deploys/monaco-editor@4.0.5/min/vs',
              sandbox: "https://www.typescriptlang.org/js/sandbox",
            },
            // This is something you need for monaco to work
            ignoreDuplicateModules: ["vs/editor/editor.main"],
          });

          // Grab a copy of monaco, TypeScript and the sandbox
          require([
            "vs/editor/editor.main",
            "vs/language/typescript/tsWorker",
            "sandbox/index",
          ], (main, _tsWorker, sandboxFactory) => {
            const isOK = main && window.ts && sandboxFactory;
            if (isOK) {
              document
                .getElementById("loader")
                .parentNode.removeChild(document.getElementById("loader"));
            } else {
              console.error(
                "Could not get all the dependencies of sandbox set up!"
              );
              console.error(
                "main",
                !!main,
                "ts",
                !!window.ts,
                "sandbox",
                !!sandbox
              );
              return;
            }

            // Create a sandbox and embed it into the the div #monaco-editor-embed
            const sandboxConfig = {
              text: this._editorValue,
              compilerOptions: {},
              domID: "monaco-editor-embed",
            };

            sandboxFactory.createTypeScriptSandbox(
              sandboxConfig,
              main,
              window.ts
            );
          });
        };

        document.body.appendChild(getLoaderScript);
      }
    }
  );
}
