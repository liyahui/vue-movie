<template>
	<router-view ></router-view>
</template>

<style lang="sass">
	@import './assets/frozen/css/frozen.css';

	* {
		-webkit-box-sizing: border-box;
	}

	.block {
		display: block;
	}

	.page {
		position: absolute;
		width: 100%;
		left: 0px;
		top: 0px;
		padding-top: 44px;
	}

	.ui-panel {
		background: #fff;
	}

	.slide-transition {
		&.slide-enter {
			animation: slide-enter 500ms forwards;
		}

		&.slide-leave {
			animation: slide-leave 500ms forwards;
		}
	}

	@keyframes slide-enter {
		from {
			transform: translate3d(100%, 0, 0);
			opacity: 0.9;
		}
		to {
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}

	@keyframes slide-leave {
		from {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
		to {
			opacity: 0.5;
			transform: translate3d(-20%, 0, 0);
		}
	}


	.fade-transition {
		&.fade-enter {
			animation: fade-enter 400ms forwards;
			z-index: 2;
		}

		&.fade-leave {
			animation: fade-leave 400ms forwards;
			z-index: 1;
		}
	}

	@keyframes fade-enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fade-leave {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.5;
		}
	}
</style>