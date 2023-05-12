<template>
	<div class="p-4">
		<h1>Humans</h1>
		<n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
	</div>
</template>
<script setup lang='ts'>
import{h}from 'vue'
import{NButton,NDataTable,useMessage}from 'naive-ui'
import type{DataTableColumns}from 'naive-ui'
import {fetchHumanALL} from '@/api'

const createColumns=({
	play
}:{
	play:(row:any)=>void
}):DataTableColumns<any>=>{
	return [
		{title:'姓名',key:'realname'},
		{title:'昵称',key:'nickname'},
		{title:'头像',key:'avatar'},
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

const data:any= await fetchHumanALL()

const message=useMessage()
const columns=createColumns({
	play(row:any){message.info(`Play ${row.title}`)}
})
const pagination=false as const
</script>
<style scoped>
h1{font-size:2em;font-weight:bold;background-color:#eee;margin:-1rem;margin-bottom:1rem;padding:.5rem 1rem;}
</style>
