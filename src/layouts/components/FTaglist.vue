<script setup>
import { ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRoute ,onBeforeRouteUpdate} from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
const route = useRoute();
const cookies = useCookies();
console.log(route.path)
const activeTab = ref(route.path)
const tabList = ref([
	{
		title: '后台首页',
		path:'/'
	},
])
const removeTab = (t) => {
	let tabs = tabList.value;
	let a = activeTab.value;
	if(a == t){
		tabs.forEach((tab,index)=>{
			if(tab.path == t){
				const nextTab =  tab[index] || tabs[index - 1];
				if(nextTab){
					a = nextTab.path
				}
			}
		})
	}
	activeTab.value = a;
	tabList.value = tabList.value.filter((tab)=>tab.path != t)
}	
// 添加标签导航
function addTab(tab){
	let noTab = tabList.value.findIndex(t=>t.path == tab.path) == -1;
	if(noTab){
		tabList.value.push(tab)
	}else{

	}
	cookies.set('tabList',tabList.value)
}
onBeforeRouteUpdate((to,from)=>{
	activeTab.value = to.path;
	addTab({ title:to.title,path:to.path});
})
const changeTab = (t)=>{
	activeTab.value = t;
	route.push(t);
}
// 初始化标签导航列表
function initList(){
	let tabs = cookies.get('tabList');
	if(tabs){
		tabList.value = tabs
	}
}
initList();
</script>

<template>
	<div class="f-tag-list" :style="{ left : $store.state.asideWidte}">
		<el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="min-width:100px;" @tab-change="changeTab">
			<el-tab-pane v-for="item in tabList" :key="item.name" :label="item.title" :name="item.path" :closable=" item.path!= '/'">
			</el-tab-pane>
		</el-tabs>
		<el-dropdown class="tag-btn">
			<span>
				<el-icon>
					<arrow-down />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>关闭所有</el-dropdown-item>
					<el-dropdown-item>关闭当前标签</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
	<div style="height:44px"></div>
</template>
<style scope lang="css">
.f-tag-list {
	@apply fixed bg-gray-100 flex items-center px-2;
	top: 64px;
	right: 0;
	height: 44px;
	line-height: 38px;
	z-index: 100;
}

.tag-btn {
	@apply bg-white rounded ml-auto flex items-center justify-center;
	height: 32px;
	width: 32px;
	margin-right: 10px;
}
.el-tabs__item{
	border: 0 !important;
	@apply	bg-white mx-1 rounded;
	height: 32px;
	line-height: 32px;


}
.el-tabs__header {
	@apply mb-0;
	border: none !important;
}
.el-tabs__nav{
	border: none !important;
}
.el-tabs__nav-next{
	line-height: 44px !important;
	height: 44px;
}
.is-disabled{
	cursor: not-allowed;
	@apply text-gray-400;
}
</style>