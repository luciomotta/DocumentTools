export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Cdppb8EE.js",app:"_app/immutable/entry/app.DT-nZjMs.js",imports:["_app/immutable/entry/start.Cdppb8EE.js","_app/immutable/chunks/vEXiDHHB.js","_app/immutable/chunks/B0-9XtBW.js","_app/immutable/chunks/DhN0VwFx.js","_app/immutable/entry/app.DT-nZjMs.js","_app/immutable/chunks/BzJ2-qdv.js","_app/immutable/chunks/B0-9XtBW.js","_app/immutable/chunks/BEbjcVle.js","_app/immutable/chunks/DwknL6xK.js","_app/immutable/chunks/DhN0VwFx.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
