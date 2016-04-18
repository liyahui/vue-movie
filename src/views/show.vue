<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
		<header-bar left="back" :title="title" right="search"></header-bar>
		<div class="banner">
			<div class="blur" :style="{backgroundImage: 'url('+ image +')'}"></div>
			<div class="info">
				<div class="img"><img :src="image" alt=""></div>
				<div class="txt">
					<h1 class="ui-nowrap">{{title}}</h1>
					<p class="ui-nowrap"><star :score="score" size="large"></star></p>
					<p class="ui-nowrap">类型：{{genres.join(' ')}}</p>
					<p class="ui-nowrap">主演：<span v-for="cast in casts">{{cast.name}} </span></p>
					<p class="ui-nowrap">地区：{{countries.join(' ')}}</p>
				</div>
			</div>	
		</div>
		<section class="ui-panel summary">
            <h2><a>剧情简介</a><span class="ui-panel-subtitle"></span></h2>
            <div class="ui-whitespace ui-txt-justify ui-txt-sub ui-txt-info">{{summary}}</div>
        </section>
        <section class="ui-panel directors">
            <h2 class="ui-arrowlink"><a>导演</a><span class="ui-panel-subtitle"></span></h2>
            <div class="ui-row ui-whitespace">
                <div class="ui-col ui-col-33" v-for="director in directors" v-link="{name: 'director', params: {id: director.id}}">
                	<img :src="director.avatars.large">
                	<h5 class="ui-nowrap ui-arrow">{{director.name}} <a>(查看)</a></h5>
                </div>
            </div>
        </section>
   	</div> 
	<loading :show="$loadingRouteData"></loading>
</template>

<script>
	export default {
		data () {
			return {
				title: '详情',
				image: '',
				genres: [],
				casts: [],
				score: 0,
				countries: [],
				summary: '',
				directors: []
			}
		},
		route: {
			data (transition) {
				var params = transition.to.params

				this.$http.jsonp('http://api.douban.com/v2/movie/subject/' + params.id).then((response) => {
					document.title = this.title = response.data.title
					this.image = response.data.images.large
					this.genres = response.data.genres
					this.casts = response.data.casts
					this.score = response.data.rating.average
					this.countries = response.data.countries
					this.summary = response.data.summary
					this.directors = response.data.directors
					this.$loadingRouteData = false
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

<style lang="sass" scoped>
	.summary {
		padding-bottom: 10px;
	}

	.directors {
		padding-bottom: 10px;
		
		.ui-row {
			padding-left: 5px;
		}

		.ui-col {
			padding-left: 5px;
		}

		img {
			width: 100%;
		}
	}
</style>