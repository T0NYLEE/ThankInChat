<script setup lang='ts'>
import type {CSSProperties} from 'vue'
import {computed,watch} from 'vue'
import {NLayoutSider} from 'naive-ui'
import {useRouter} from 'vue-router'
import Footer from './Footer.vue'
import {useAppStore} from '@/store'
import {useBasicLayout} from '@/hooks/useBasicLayout'

const router=useRouter()
function go(url:string){router.push(url)}
const appStore=useAppStore()
const {isMobile}=useBasicLayout()
const collapsed=computed(()=>appStore.siderCollapsed)
function handleUpdateCollapsed(){appStore.setSiderCollapsed(!collapsed.value)}
const getMobileClass=computed<CSSProperties>(()=>{
	if(isMobile.value)
		return {position:'fixed',zIndex:50}

	return {}
})
const mobileSafeArea=computed(()=>{
	if(isMobile.value){
		return {paddingBottom:'env(safe-area-inset-bottom)',}
	}
	return {}
})
watch(
	isMobile,
	(val)=>{appStore.setSiderCollapsed(val)},
	{immediate:true,flush:'post'},
)
</script>
<template>
	<NLayoutSider :collapsed="collapsed" :collapsed-width="0" :width="260" :show-trigger="isMobile? false:'arrow-circle'" collapse-mode="transform" position="absolute" bordered :style="getMobileClass" @update-collapsed="handleUpdateCollapsed">
		<div class="flex flex-col h-full" :style="mobileSafeArea">
			<main class="flex flex-col flex-1 min-h-0">
				<ul class="menu p-4">
					<li @click="go('/humans')">Humans</li>
					<li @click="go('/orders')">Orders</li>
					<li @click="go('/items')">Items</li>
					<li @click="go('/templates')">Templates</li>
					<li @click="go('/bots')">Bots</li>
				</ul>
			</main>
			<Footer/>
		</div>
	</NLayoutSider>
	<template v-if="isMobile">
		<div v-show="!collapsed" class="fixed inset-0 z-40 w-full h-full bg-black/40" @click="handleUpdateCollapsed"/>
	</template>
</template>
<style scoped>
.menu li{font-size:2em;cursor:pointer;color:darkcyan;}
.menu li:hover{color:chocolate;}
</style>
