<template>
	<div :class="['star', size]">
		<div class="gray">
			<i class="ui-icon-star" v-for="n in 5"></i>
		</div>
		<div class="ligh" :style="{width: (score * 10) + '%'}">
			<i class="ui-icon-star" v-for="n in 5"></i>
		</div>
		<div class="score">
			{{score}}
		</div>
	</div>
</template>

<style lang="sass" scope>
	.star {
		position: relative;
		height: 20px;
		line-height: 20px;
		width: 100px;

		&.large {
			transform: scale(1.2);
			transform-origin: left center; 
		}

		.gray, .ligh {
			position: absolute;
			top: -13px;
			left: -8px;
			width: 100px;
			overflow: hidden;
		}

		.gray {
			.ui-icon-star {
				color: #ccc;
			}
		}

		.ligh {
			.ui-icon-star {
				color: #f3e319;
			}
		}

		.ui-icon-star {
			display: inline-block;
			width: 18px;
			height: 20px;
		}

		.score {
			padding-left: 100px;
		}
	}
</style>

<script>
	export default {
		props: ['score', 'size']
	}
</script>