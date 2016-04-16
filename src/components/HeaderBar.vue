<template>
	<header class="ui-header ui-header-positive ui-border-b header">
        <button class="btn back left" v-if="left == 'back'" @click="back">
        	<i class="ui-icon-return"></i>
        </button>

        <button class="btn menu left" v-if="left == 'menu'">
        	<i></i>
        	<i></i>
        	<i></i>
        </button>

        <button class="btn search right" v-if="right == 'search'" v-link="{name: 'search'}">
        	<i class="ui-icon-search"></i>
        </button>

        <h1>{{title}}</h1>

    </header>
</template>

<script>
	export default {
		props: ['left', 'title', 'right'],
		methods: {
			back (){
				window.history.back()
			}
		}
	}
</script>

<style lang="sass">
	.header {
		.btn {
			position: absolute;
			top: 0px;
			height: 45px;
			width: 45px;
		}

		.left {
			left: 0px;
		}

		.right {
			right: 0px;
		}

		.back {
			i {
				top: 1px;
			}
		}

		.search {
			right: 4px;

			i {
				font-size: 54px;
			}
		}

		.menu {

			i {
				width: 20px;
				height: 2px;
				display: block;
				background: #fff;
				margin: 5px 10px;
			}
		}

	}
</style>