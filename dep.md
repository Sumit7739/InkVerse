2026-04-24T09:29:53.331Z	Initializing build environment...
2026-04-24T09:29:54.751Z	Success: Finished initializing build environment
2026-04-24T09:29:55.362Z	Cloning repository...
2026-04-24T09:29:56.564Z	Restoring from dependencies cache
2026-04-24T09:29:56.566Z	Restoring from build output cache
2026-04-24T09:29:56.568Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2026-04-24T09:29:56.691Z	Installing project dependencies: npm clean-install --progress=false
2026-04-24T09:30:02.943Z	
2026-04-24T09:30:02.944Z	added 197 packages, and audited 198 packages in 6s
2026-04-24T09:30:02.944Z	
2026-04-24T09:30:02.944Z	46 packages are looking for funding
2026-04-24T09:30:02.944Z	  run `npm fund` for details
2026-04-24T09:30:02.945Z	
2026-04-24T09:30:02.945Z	found 0 vulnerabilities
2026-04-24T09:30:03.155Z	Executing user build command: npm run build
2026-04-24T09:30:03.400Z	
2026-04-24T09:30:03.402Z	> temp-app@0.0.0 build
2026-04-24T09:30:03.402Z	> vite build
2026-04-24T09:30:03.402Z	
2026-04-24T09:30:03.642Z	vite v8.0.9 building client environment for production...
2026-04-24T09:30:03.953Z	
transforming...✓ 2163 modules transformed.
2026-04-24T09:30:04.066Z	rendering chunks...
2026-04-24T09:30:04.200Z	computing gzip size...
2026-04-24T09:30:04.211Z	dist/index.html                   0.83 kB │ gzip:   0.46 kB
2026-04-24T09:30:04.211Z	dist/assets/index-C3Ti98V3.css   45.07 kB │ gzip:   7.44 kB
2026-04-24T09:30:04.211Z	dist/assets/index-CUj-dHho.js   557.41 kB │ gzip: 182.26 kB
2026-04-24T09:30:04.211Z	
2026-04-24T09:30:04.212Z	[plugin builtin:vite-reporter] 
2026-04-24T09:30:04.212Z	(!) Some chunks are larger than 500 kB after minification. Consider:
2026-04-24T09:30:04.213Z	- Using dynamic import() to code-split the application
2026-04-24T09:30:04.213Z	- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
2026-04-24T09:30:04.213Z	- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
2026-04-24T09:30:04.213Z	✓ built in 570ms
2026-04-24T09:30:04.252Z	Success: Build command completed
2026-04-24T09:30:04.418Z	Executing user deploy command: npx wrangler deploy
2026-04-24T09:30:05.738Z	
2026-04-24T09:30:05.738Z	 ⛅️ wrangler 4.84.1
2026-04-24T09:30:05.738Z	───────────────────
2026-04-24T09:30:05.752Z	
2026-04-24T09:30:05.831Z	✘ [ERROR] Processing wrangler.toml configuration:
2026-04-24T09:30:05.831Z	
2026-04-24T09:30:05.831Z	    - The name 'ASSETS' is reserved in Pages projects. Please use a different name for your R2 Bucket binding.
2026-04-24T09:30:05.831Z	
2026-04-24T09:30:05.831Z	
2026-04-24T09:30:05.921Z	🪵  Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-2026-04-24_09-30-05_469.log"
2026-04-24T09:30:06.016Z	Failed: error occurred while running deploy command