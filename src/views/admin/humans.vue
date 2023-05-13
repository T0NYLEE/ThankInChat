<template>
	<div class="p-4">
		<h1>Humans</h1>
		<n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
		<!-- <n-data-table :rows="rows" :columns="columns" :pagination="pagination" :bordered="false"></n-data-table> -->
	</div>
</template>
<script setup lang='ts'>
import{ref,onMounted,h,computed}from 'vue'
import{NButton,NDataTable,useMessage}from 'naive-ui'
import type{DataTableColumns}from 'naive-ui'
import {fetchHumanALL} from '@/api'
const rows:any = ref([])
const createColumns=({
	play
}:{
	play:(row:any)=>void
}):DataTableColumns<any>=>{
	return [
		{title:'realname',key:'realname'},
		{title:'nickname',key:'nickname'},
		{title:'avatar',key:'avatar'},
		{title:'Action',key:'actions',
			render(row){
				return h(
					NButton,{strong:true,tertiary:true,size:'small',onClick:()=>play(row)},
					{default:()=>'Play'}
				)
			}
		}
	]
}
let data:any = computed(() => {return rows.value})
onMounted(() => {
	geRows();
})
const geRows = async () => {
	try {
		const humans: any = await fetchHumanALL();
		rows.value = humans
	}
	catch (error) {
		rows.value = error
	}
}
const message=useMessage()
const columns=createColumns({
	play(row:any){message.info(`Play ${row.title}`)}
})
const pagination=false as const
</script>
<style scoped>
h1{font-size:2em;font-weight:bold;background-color:#eee;margin:-1rem;margin-bottom:1rem;padding:.5rem 1rem;}
</style>
