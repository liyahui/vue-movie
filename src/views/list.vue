<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
		<header-bar left="back" :title="title" right="search"></header-bar>
		<ul class="ui-list ui-list-link ui-border-tb list-one">
	        <li class="ui-border-t" v-for="r in list" v-link="{name: 'show', params: {id: r.id}}" track-by="id">
	            <div class="ui-list-img">
	                <img :src="r.images.large" alt="">
	            </div>
	            <div class="ui-list-info">
	                <h4 class="ui-nowrap">{{r.title}}</h4>
	                <p class="ui-nowrap"><star :score="r.rating.average"></app></p>
	                <p class="ui-nowrap">{{r.genres.join(' ')}}</p>
	                <p class="ui-nowrap"><span v-for="cast in r.casts">{{cast.name}} </span></p>
	            </div>
	        </li>
	    </ul>
	    <div class="ui-loading-wrap">
            <p class="ui-txt-info">{{ more ? '加载中' : '没有更多了～'}}</p>
            <i class="ui-loading" v-show="more"></i>
        </div>
   	</div> 
	<loading :show="$loadingRouteData"></loading>
</template>

<script>
	export default {
		data () {
			return {
				title: '列表',
				list: [],
				page: 1,
				count: 10,
				type: '',
				more: true,
				load: false
			}
		},
		route: {
			data (transition) {
				this.type = transition.to.params.type

				this.pageData()

				window.addEventListener('scroll', this.scroll)
			},
			deactivate (transition) {
				// 移除前删除对滚动事件
				window.removeEventListener('scroll', this.scroll)
				transition.next()
			}
		},
		methods: {
			// 监听网页滚动到底部
			scroll (e) {
				if(document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0 && !this.load) {
					this.load = true
					this.pageData()
				}
			},
			// 获取一页数据
			pageData () {
				this.$http.jsonp('http://api.douban.com/v2/movie/' + this.type, {
					count: this.count,
					start: (this.page - 1) * this.count
				}).then((response) => {
					if(this.page === 1){
						this.$loadingRouteData = false
						document.title = this.title = response.data.title.split('-')[0]
					}

					if(response.data && response.data.subjects.length){
						this.page ++
						this.list = this.list.concat(response.data.subjects)
					}else{
						this.more = false
					}

					this.load = false
				})
			}
		},
		components: {
			headerBar: require('../components/HeaderBar.vue'),
			star: require('../components/Star.vue'),
			loading: require('../components/Loading.vue')
		}
	}
</script>
