2026-04-22T20:44:29.106Z	Initializing build environment...
2026-04-22T20:44:31.427Z	Success: Finished initializing build environment
2026-04-22T20:44:32.322Z	Cloning repository...
2026-04-22T20:44:33.846Z	Restoring from dependencies cache
2026-04-22T20:44:33.848Z	Restoring from build output cache
2026-04-22T20:44:33.852Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2026-04-22T20:44:33.991Z	Installing project dependencies: npm clean-install --progress=false
2026-04-22T20:44:41.606Z	
2026-04-22T20:44:41.606Z	added 197 packages, and audited 198 packages in 7s
2026-04-22T20:44:41.606Z	
2026-04-22T20:44:41.606Z	46 packages are looking for funding
2026-04-22T20:44:41.606Z	  run `npm fund` for details
2026-04-22T20:44:41.607Z	
2026-04-22T20:44:41.607Z	found 0 vulnerabilities
2026-04-22T20:44:42.117Z	Executing user build command: npm run build
2026-04-22T20:44:42.379Z	
2026-04-22T20:44:42.379Z	> temp-app@0.0.0 build
2026-04-22T20:44:42.379Z	> vite build
2026-04-22T20:44:42.379Z	
2026-04-22T20:44:42.661Z	vite v8.0.9 building client environment for production...
2026-04-22T20:44:43.012Z	
transforming...✓ 2148 modules transformed.
2026-04-22T20:44:43.016Z	✗ Build failed in 353ms
2026-04-22T20:44:43.017Z	error during build:
2026-04-22T20:44:43.017Z	Build failed with 3 errors:
2026-04-22T20:44:43.017Z	
2026-04-22T20:44:43.017Z	[UNRESOLVED_IMPORT] Error: Could not resolve '../lib/auth' in src/pages/Signup.jsx
2026-04-22T20:44:43.018Z	   ╭─[ src/pages/Signup.jsx:5:42 ]
2026-04-22T20:44:43.018Z	   │
2026-04-22T20:44:43.018Z	 5 │ import { signup, storeAuthSession } from "../lib/auth";
2026-04-22T20:44:43.018Z	   │                                          ──────┬──────  
2026-04-22T20:44:43.018Z	   │                                                ╰──────── Module not found.
2026-04-22T20:44:43.018Z	   │ 
2026-04-22T20:44:43.019Z	   │ Help: 'src/pages/Signup.jsx' is imported by the following path:
2026-04-22T20:44:43.019Z	   │         - src/pages/Signup.jsx
2026-04-22T20:44:43.020Z	   │         - src/App.jsx
2026-04-22T20:44:43.021Z	   │         - src/main.jsx
2026-04-22T20:44:43.021Z	   │         - index.html
2026-04-22T20:44:43.021Z	───╯
2026-04-22T20:44:43.021Z	
2026-04-22T20:44:43.022Z	[UNRESOLVED_IMPORT] Error: Could not resolve '../lib/auth' in src/pages/Bookmarks.jsx
2026-04-22T20:44:43.022Z	   ╭─[ src/pages/Bookmarks.jsx:4:68 ]
2026-04-22T20:44:43.025Z	   │
2026-04-22T20:44:43.025Z	 4 │ import { clearAuthSession, fetchCurrentUser, getAuthSession } from "../lib/auth";
2026-04-22T20:44:43.025Z	   │                                                                    ──────┬──────  
2026-04-22T20:44:43.025Z	   │                                                                          ╰──────── Module not found.
2026-04-22T20:44:43.025Z	   │ 
2026-04-22T20:44:43.025Z	   │ Help: 'src/pages/Bookmarks.jsx' is imported by the following path:
2026-04-22T20:44:43.025Z	   │         - src/pages/Bookmarks.jsx
2026-04-22T20:44:43.025Z	   │         - src/App.jsx
2026-04-22T20:44:43.025Z	   │         - src/main.jsx
2026-04-22T20:44:43.025Z	   │         - index.html
2026-04-22T20:44:43.025Z	───╯
2026-04-22T20:44:43.025Z	
2026-04-22T20:44:43.025Z	[UNRESOLVED_IMPORT] Error: Could not resolve '../lib/auth' in src/pages/Login.jsx
2026-04-22T20:44:43.025Z	   ╭─[ src/pages/Login.jsx:5:41 ]
2026-04-22T20:44:43.026Z	   │
2026-04-22T20:44:43.026Z	 5 │ import { login, storeAuthSession } from "../lib/auth";
2026-04-22T20:44:43.026Z	   │                                         ──────┬──────  
2026-04-22T20:44:43.026Z	   │                                               ╰──────── Module not found.
2026-04-22T20:44:43.026Z	   │ 
2026-04-22T20:44:43.026Z	   │ Help: 'src/pages/Login.jsx' is imported by the following path:
2026-04-22T20:44:43.026Z	   │         - src/pages/Login.jsx
2026-04-22T20:44:43.026Z	   │         - src/App.jsx
2026-04-22T20:44:43.026Z	   │         - src/main.jsx
2026-04-22T20:44:43.026Z	   │         - index.html
2026-04-22T20:44:43.026Z	───╯
2026-04-22T20:44:43.026Z	
2026-04-22T20:44:43.026Z	    at aggregateBindingErrorsIntoJsError (file:///opt/buildhome/repo/node_modules/rolldown/dist/shared/error-DAA7ncC5.mjs:48:18)
2026-04-22T20:44:43.026Z	    at unwrapBindingResult (file:///opt/buildhome/repo/node_modules/rolldown/dist/shared/error-DAA7ncC5.mjs:18:128)
2026-04-22T20:44:43.026Z	    at #build (file:///opt/buildhome/repo/node_modules/rolldown/dist/shared/rolldown-build-BPKCFYpX.mjs:3317:34)
2026-04-22T20:44:43.027Z	    at async buildEnvironment (file:///opt/buildhome/repo/node_modules/vite/dist/node/chunks/node.js:32999:64)
2026-04-22T20:44:43.029Z	    at async Object.build (file:///opt/buildhome/repo/node_modules/vite/dist/node/chunks/node.js:33421:19)
2026-04-22T20:44:43.029Z	    at async Object.buildApp (file:///opt/buildhome/repo/node_modules/vite/dist/node/chunks/node.js:33418:153)
2026-04-22T20:44:43.029Z	    at async CAC.<anonymous> (file:///opt/buildhome/repo/node_modules/vite/dist/node/cli.js:778:3) {
2026-04-22T20:44:43.029Z	  errors: [Getter/Setter]
2026-04-22T20:44:43.029Z	}
2026-04-22T20:44:43.056Z	Failed: error occurred while running build command