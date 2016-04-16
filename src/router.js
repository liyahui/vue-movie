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
		}		
	})
}