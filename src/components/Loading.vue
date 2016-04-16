<template>
	<div class="ui-loading-block show" v-if="show">
        <div class="ui-loading-cnt">
            <i class="ui-loading-bright"></i>
        </div>
    </div>
</template>

<script>
	export default {
		props: ['show']
	}
</script>

<style lang="sass">
	.ui-loading-block {

		.ui-loading-cnt {
			width: 57px;
			height: 57px;

		}

		.ui-loading-bright {
			margin: 10px;
		}
	}
</style>
