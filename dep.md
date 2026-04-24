2026-04-24T09:34:44.607Z	Initializing build environment...
2026-04-24T09:34:46.975Z	Success: Finished initializing build environment
2026-04-24T09:34:47.567Z	Cloning repository...
2026-04-24T09:34:49.081Z	Restoring from dependencies cache
2026-04-24T09:34:49.084Z	Restoring from build output cache
2026-04-24T09:34:49.087Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2026-04-24T09:34:49.205Z	Installing project dependencies: npm clean-install --progress=false
2026-04-24T09:34:44.607Z	Initializing build environment...
2026-04-24T09:34:46.975Z	Success: Finished initializing build environment
2026-04-24T09:34:47.567Z	Cloning repository...
2026-04-24T09:34:49.081Z	Restoring from dependencies cache
2026-04-24T09:34:49.084Z	Restoring from build output cache
2026-04-24T09:34:49.087Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2026-04-24T09:34:49.205Z	Installing project dependencies: npm clean-install --progress=false
2026-04-24T09:34:57.167Z	
2026-04-24T09:34:57.167Z	added 197 packages, and audited 198 packages in 7s
2026-04-24T09:34:57.167Z	
2026-04-24T09:34:57.167Z	46 packages are looking for funding
2026-04-24T09:34:57.167Z	  run `npm fund` for details
2026-04-24T09:34:57.168Z	
2026-04-24T09:34:57.168Z	found 0 vulnerabilities
2026-04-24T09:34:57.512Z	Executing user build command: npm run build
2026-04-24T09:34:57.774Z	
2026-04-24T09:34:57.774Z	> temp-app@0.0.0 build
2026-04-24T09:34:57.774Z	> vite build
2026-04-24T09:34:57.775Z	
2026-04-24T09:34:58.053Z	vite v8.0.9 building client environment for production...
2026-04-24T09:34:58.387Z	
transforming...✓ 2163 modules transformed.
2026-04-24T09:34:58.495Z	rendering chunks...
2026-04-24T09:34:58.677Z	computing gzip size...
2026-04-24T09:34:58.689Z	dist/index.html                   0.83 kB │ gzip:   0.46 kB
2026-04-24T09:34:58.689Z	dist/assets/index-C3Ti98V3.css   45.07 kB │ gzip:   7.44 kB
2026-04-24T09:34:58.689Z	dist/assets/index-CUj-dHho.js   557.41 kB │ gzip: 182.26 kB
2026-04-24T09:34:58.689Z	
2026-04-24T09:34:58.690Z	[plugin builtin:vite-reporter] 
2026-04-24T09:34:58.691Z	(!) Some chunks are larger than 500 kB after minification. Consider:
2026-04-24T09:34:58.691Z	- Using dynamic import() to code-split the application
2026-04-24T09:34:58.691Z	- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
2026-04-24T09:34:58.691Z	- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
2026-04-24T09:34:58.691Z	✓ built in 637ms
2026-04-24T09:34:58.736Z	Success: Build command completed
2026-04-24T09:34:58.922Z	Executing user deploy command: npx wrangler deploy
2026-04-24T09:35:00.414Z	
2026-04-24T09:35:00.416Z	 ⛅️ wrangler 4.84.1
2026-04-24T09:35:00.416Z	───────────────────
2026-04-24T09:35:01.067Z	▲ [WARNING] It seems that you have run `wrangler deploy` on a Pages project, `wrangler pages deploy` should be used instead. Proceeding will likely produce unwanted results.
2026-04-24T09:35:01.068Z	
2026-04-24T09:35:01.068Z	
2026-04-24T09:35:01.069Z	? Are you sure that you want to proceed?
2026-04-24T09:35:01.069Z	🤖 Using fallback value in non-interactive context: yes
2026-04-24T09:35:01.080Z	
2026-04-24T09:35:01.080Z	Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
2026-04-24T09:35:01.082Z	
2026-04-24T09:35:01.084Z	✘ [ERROR] Missing entry-point to Worker script or to assets directory
2026-04-24T09:35:01.084Z	
2026-04-24T09:35:01.084Z	  
2026-04-24T09:35:01.084Z	  If there is code to deploy, you can either:
2026-04-24T09:35:01.084Z	  - Specify an entry-point to your Worker script via the command line (ex: `npx wrangler deploy src/index.ts`)
2026-04-24T09:35:01.084Z	  - Or add the following to your "wrangler.toml" file:
2026-04-24T09:35:01.085Z	  
2026-04-24T09:35:01.085Z	  ```
2026-04-24T09:35:01.085Z	  main = "src/index.ts"
2026-04-24T09:35:01.085Z	  
2026-04-24T09:35:01.085Z	  ```
2026-04-24T09:35:01.085Z	  
2026-04-24T09:35:01.085Z	  
2026-04-24T09:35:01.086Z	  If are uploading a directory of assets, you can either:
2026-04-24T09:35:01.086Z	  - Specify the path to the directory of assets via the command line: (ex: `npx wrangler deploy --assets=./dist`)
2026-04-24T09:35:01.086Z	  - Or add the following to your "wrangler.toml" file:
2026-04-24T09:35:01.086Z	  
2026-04-24T09:35:01.086Z	  ```
2026-04-24T09:35:01.086Z	  [assets]
2026-04-24T09:35:01.086Z	  directory = "./dist"
2026-04-24T09:35:01.087Z	  
2026-04-24T09:35:01.087Z	  ```
2026-04-24T09:35:01.087Z	  
2026-04-24T09:35:01.087Z	
2026-04-24T09:35:01.087Z	
2026-04-24T09:35:01.118Z	🪵  Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-2026-04-24_09-35-00_031.log"
2026-04-24T09:35:01.181Z	Failed: error occurred while running deploy command