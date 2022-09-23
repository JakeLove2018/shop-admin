<script setup>
import FHeaderVue from './components/FHeader.vue';
import FMenuVue from './components/FMenu.vue';
import FTaglistVue from './components/FTaglist.vue';
</script>

<template>
	<el-container>
		<el-header>
			<FHeaderVue />
		</el-header>
		<el-container>
			<el-aside :style="$store.state.asideWidte">
				<FMenuVue />
			</el-aside>
			<el-main>
				<FTaglistVue />
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<style>
	.el-aside{
		transition: all .5s;
	}
</style>
