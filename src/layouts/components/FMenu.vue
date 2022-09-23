<script setup>
import { ref,computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const asideMenu = computed(()=>store.state.menus)
const handleSelect = (e)=>{
	console.log(e)
	router.push(e)
}
const store = useStore()
const isCollapse = computed(()=> !(store.state.asideWidte == '250px'))
const defaultActive = ref(router.push)
</script>

<template>
	<div class="f_menu" :style="{ width:$store.state.asideWidte }">
		<el-menu class="border-0" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false" unique-opened :default-active="defaultActive">
			<template v-for="(item,index) in asideMenu" :key="index">
				<el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
					<template #title>
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item v-for="(item1,index1) in item.child" :key="index1" :index="item1.frontpath ">
						<el-icon>
						<component :is="item1.icon"></component>
					</el-icon>
					<span>{{ item1.name}}</span>
					</el-menu-item>
				</el-sub-menu>
				<el-menu-item :index="item.fontPath" v-else>
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					<span>{{ item.name }}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<style scoped lang="css">
.f_menu {
	transition: all .2s;
	top: 64px;
	bottom: 0;
	left: 0;
	overflow-y: auto;
	overflow-x:hidden; 
	@apply shadow-md fixed bg-line-50;
}
.f_menu::-webkit-scrollbar{
	width:0px
}
</style>
