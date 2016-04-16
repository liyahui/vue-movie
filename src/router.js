export default (router) => {
	router.map({
		'/': {
			name: 'index',
			component: (resolve) => {
				require(['./views/index.vue'], resolve)
			}
		},
		'/list/:type': {
			name: 'list',
			component: (resolve) => {
				require(['./views/list.vue'], resolve)
			}
		},
		'/show/:id': {
			name: 'show',
			component: (resolve) => {
				require(['./views/show.vue'], resolve)
			}
		},
		'/director/:id': {
			name: 'director',
			component: (resolve) => {
				require(['./views/director.vue'], resolve)
			}
		},
		'/search': {
			name: 'search',
			component: (resolve) => {
				require(['./views/search.vue'], resolve)
			}
		}		
	})
}