<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
		<header-bar left="back" :title="title"></header-bar>
		<div class="banner">
			<div class="blur" :style="{backgroundImage: 'url('+ image +')'}"></div>
			<div class="info">
				<div class="img"><img :src="image" alt=""></div>
				<div class="txt">
					<h1 class="ui-nowrap">{{title}}</h1>
					<p class="ui-nowrap"><star :score="score" size="large"></star></p>
					<p class="ui-nowrap">类型：{{genres.join(' ')}}</p>
					<p class="ui-nowrap">导演：<span v-for="cast in casts">{{cast.name}} </span></p>
					<p class="ui-nowrap">地区：{{countries.join(' ')}}</p>
				</div>
			</div>	
		</div>
		<section class="ui-panel summary">
            <h2 class="ui-arrowlink"><a>剧情简介</a><span class="ui-panel-subtitle"></span></h2>
            <div class="ui-whitespace ui-txt-justify ui-txt-sub ui-txt-info">{{summary}}</div>
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
				summary: ''
			}
		},
		route: {
			data (transition) {
				var params = transition.to.params

				this.$http.jsonp('http://api.douban.com/v2/movie/subject/' + params.id).then((response) => {
					this.title = response.data.title
					this.image = response.data.images.large
					this.genres = response.data.genres
					this.casts = response.data.casts
					this.score = response.data.rating.average
					this.countries = response.data.countries
					this.summary = response.data.summary
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

<style lang="sass">
	.banner {
		position: relative;
		overflow: hidden;

		.blur {
			height: 180px;
			filter: blur(5px);
			background-position: top;
			background-size: cover;

			&:before {
				content: '';
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.3;
			}
		}

		.info {
			position: absolute;
			width: 100%;
			height: 180px;
			top: 0px;
			left: 0px;

			.img {
				float: left;
				border: 2px solid #fff;
				box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
				margin-left: 10px;
				margin-top: 20px;

				img {
					width: 100px;
					height: 140px;
					display: block;
				}
			}

			.txt {
				padding-top: 21px;
				color: #fff;
				padding-left: 130px;
				padding-right: 10px;

				p {
					margin-top: 5px;
					text-shadow: 0px 0px 3px rgba(0,0,0,0.3)
				}
			}
		}
	}

	.summary {
		padding-bottom: 10px;
	}
</style>