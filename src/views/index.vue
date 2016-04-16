<template>
	<div class="page index" v-if="!$loadingRouteData" transition="fade">
		<header-bar left="menu" title="电影"></header-bar>
		<section class="ui-panel" v-for="module in modules">
	        <h2 class="ui-arrowlink" v-link="{name:'list', params: {type: module.name}}">
	        	{{module.title}}
	        	<span class="ui-panel-subtitle">{{module.total}}个</span>
	    	</h2>
	        <ul class="ui-grid-trisect">
	            <li v-for="r in module.list" v-link="{name:'show', params:{id: r.id}}">
	                <div class="ui-grid-trisect-img">
	                	<img :src="r.images.large" alt="">
                		<p class="ui-nowrap">{{r.title}}</p>
	                </div>
	            </li>
	        </ul>
	    </section>
	</div>
	<loading :show="$loadingRouteData"></loading>
</template>

<script>

	export default {
		data (){
			return {
				modules: {},	
			}
		},
		route: {
			data (transition) {
				const actions = ['in_theaters', 'coming_soon', 'top250']

				var modules = []

				var promiseActions = actions.map((item, index) => {
					return () => {
						return this.$http.jsonp('http://api.douban.com/v2/movie/' + item, {count: 6}).then((response) => {
							modules.push({
								name: item,
								title: response.data.title.split('-')[0],
								total: response.data.total,
								list: response.data.subjects
							})
						})
					}
				})

				promiseActions.reduce((curr, next) => {
					return curr.then(next);
				}, Promise.resolve()).then(() => {
					transition.next({modules: modules})
					this.$loadingRouteData = false
				});
			}
		},
		components: {
			headerBar: require('../components/HeaderBar.vue'),
			loading: require('../components/Loading.vue')
		}
	}
</script>

<style lang="sass" scoped>
	.ui-panel {
		padding-bottom: 5px;

		.ui-grid-trisect {
			li {
				position: relative;

				p {
					position: absolute;
					bottom: 0px;
					height: 30px;
					line-height: 30px;
					color: #fff;
					width: 100%;
					text-align: center;
					font-size: 14px;
					background: rgba(0,0,0,0.6);
					padding:0px 5px;
				}
			}
		}

	}
</style>