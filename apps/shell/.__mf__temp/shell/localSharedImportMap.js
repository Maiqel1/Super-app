
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "react": async () => {
          let pkg = await import("__mf__virtual/shell__prebuild__react__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/shell__prebuild__react_mf_2_dom__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "react": {
            name: "react",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "shell",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react"}' must be provided by host`);
              }
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "shell",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom"}' must be provided by host`);
              }
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "todoApp",
                  name: "todoApp",
                  type: "module",
                  entry: "http://localhost:3001/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "notesApp",
                  name: "notesApp",
                  type: "module",
                  entry: "http://localhost:3002/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "weatherApp",
                  name: "weatherApp",
                  type: "module",
                  entry: "http://localhost:3003/remoteEntry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      