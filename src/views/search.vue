<template>
	<div class="page" transition="fade">
		<header class="ui-header">
			<div class="ui-searchbar-wrap ui-border-b focus">
                <div class="ui-searchbar ui-border-radius">
                    <i class="ui-icon-search"></i>
                    <div class="ui-searchbar-input">
                    	<input value="" type="text" placeholder="请输入关键字" v-el:keywords autocapitalize="off" v-model="keywords" debounce="500">
                    </div>
                    <i class="ui-icon-close" v-if="keywords" @click="clear"></i>
                </div>
                <button class="ui-searchbar-cancel" @click="cancel">取消</button>
            </div>
	    </header>
	   	<div class="hotwords" v-show="!suggest.length">
	   		<h4>大家都在搜</h4>
	   		<div class="hot-search ui-txt-info">
	   			<span class="ui-label" v-for="hotword in hotwords" v-link="{name: 'show', params: {id: hotword.id}}" track-by="$index" track-by="id">{{hotword.title}}</span>
	   		</div>
	   	</div>
	   	<div class="suggest" v-show="suggest.length">
		   	<ul class="ui-list ui-list-text ui-list-link ui-txt-info">
		   		<li v-for="r in suggest" class="ui-border-b" transition="staggered" stagger="50" track-by="$index" v-link="{name: 'show', params: {id: r.id}}">{{r.title}}</li>
		   	</ul>
	   	</div>
    </div>
    <loading :show="loading" near="top"></loading>
</template>

<script>
	export default {
		data () {
			return {
				title: '搜索',
				keywords: '',
				hotwords: [],
				suggest: [],
				loading: false
			}
		},
		ready () {
			this.$els.keywords.focus()
		},
		route: {
			data (transition) {
				document.title = this.title
				this.hotwords = JSON.parse(sessionStorage.hotwords)
			}
		},
		watch: {
			keywords (val, oldVal) {
				if(val.trim()){
					this.loading = true
					this.$http.jsonp('http://api.douban.com/v2/movie/search?q=' + val).then((response) => {
						this.suggest = response.data.subjects
						this.loading = false
					})
				}else{
					this.suggest = []
				}
			}
		},
		transitions: {

		},
		methods: {
			cancel () {
				history.back()
			},
			clear () {
				this.keywords = ''
				this.$els.keywords.focus()
			}
		},
		components: {
			loading: require('../components/Loading.vue')
		}
	}
</script>

<style lang="sass" scoped>
	.ui-header {
		.ui-searchbar {
			margin-right: 0px;
			height: 34px;
			line-height: 34px;
		}

		.ui-searchbar-cancel {
			margin-right: 2px;
		}
	}	

	.hotwords {
	 	padding: 10px 0px;

	 	h4 {
	 		padding-left: 10px;
	 	}

	 	.hot-search {
	 		background: #fff;
	 		margin-top: 10px;
	 		padding-right: 10px;
	 		padding-bottom: 10px;

	 		.ui-label {
				font-size: 14px;
				margin-left: 10px;
				margin-top: 10px;
	 		}
	 	}
	}

	.suggest {
		position: absolute;
		top: 0px;
		left: 0px;
		height: 100vh;
		padding-top: 45px;
		width: 100%;

		.ui-list {
			li {
				padding-right: 10px;
				transition: all .4s ease;
			    overflow: hidden;
			    height: 40px;
			    padding: 0px;
			    line-height: 40px;
			    display: block;
			}
			.staggered-enter, .staggered-leave {
			    opacity: 0;
			    height: 0;
			}

			.staggered-leave {
				transition-duration: 0s;
			}
		}
	}
</style>