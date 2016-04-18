<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
		<header-bar left="back" :title="title" right="search"></header-bar>
		<div class="banner">
			<div class="blur" :style="{backgroundImage: 'url('+ image +')'}"></div>
			<div class="info">
				<div class="img"><img :src="image" alt=""></div>
				<div class="txt">
					<h1 class="ui-nowrap">{{title}}</h1>
					<p class="ui-nowrap">性别：{{gender}}</p>
					<p class="ui-nowrap">地区：{{born_place}}</p>
				</div>
			</div>	
		</div>
		<section class="ui-panel summary">
            <h2><a>作品</a><span class="ui-panel-subtitle">{{works.length}} 个</span></h2>
            <ul class="ui-list ui-list-link ui-border-tb list-one">
		        <li class="ui-border-t" v-for="r in works" v-link="{name: 'show', params: {id: r.subject.id}}" track-by="subject.id">
		            <div class="ui-list-img">
		                <img :src="r.subject.images.large" alt="">
		            </div>
		            <div class="ui-list-info">
		                <h4 class="ui-nowrap">[{{r.roles}}]{{r.subject.title}}</h4>
		                <p class="ui-nowrap"><star :score="r.subject.rating.average"></app></p>
		                <p class="ui-nowrap">{{r.subject.genres.join(' ')}}</p>
		                <p class="ui-nowrap"><span v-for="cast in r.subject.casts">{{cast.name}} </span></p>
		            </div>
		        </li>
		    </ul>
        </section>
	</div>
	<loading :show="$loadingRouteData"></loading>
</template>

<script>
	export default {
		data () {
			return {
				title: '导演',
				image: '',
				gender: '',
				born_place: '',
				works: []
			}
		},
		route: {
			data (transition) {
				this.$http.jsonp('http://api.douban.com/v2/movie/celebrity/' + transition.to.params.id).then((response) => {
					document.title = this.title = response.data.name
					this.image = response.data.avatars.large
					this.gender = response.data.gender
					this.born_place = response.data.born_place
					this.works = response.data.works
					this.$loadingRouteData = false						
				})
			}
		},
		components: {
			headerBar: require('../components/HeaderBar.vue'),
			loading: require('../components/Loading.vue'),
			star: require('../components/Star.vue')
		}
	}
</script>

<style lang="sass" scoped>
	.ui-panel {
		.ui-panel-subtitle {
			right: 10px;
		}
	}
</style>