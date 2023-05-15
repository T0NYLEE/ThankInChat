<template>
	<NModal v-model:show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
		<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" scrolling="no" width="400" height="400" frameBorder="0" allowTransparency="true" :src="setSrc"></iframe>
	</NModal>
</template>
<script setup lang='ts'>
import {ref,onMounted} from 'vue'
import {NModal} from 'naive-ui'
import {getQrCode,getLoginState} from '@/api'
	const setSrc: any =ref();
	const show=ref(true);
	let intervalId: any=null;
	onMounted(()=>{
		createQrocde();
	})
	const createQrocde=async()=>{
		try{
			const uuid=guid2();
			const ticket:any=await getQrCode(uuid);
			setSrc.value=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket.ticket}`;
			getState('75bf0717-c727-4476-9746');
		}catch(e){console.error(e)}
	}
	function guid2(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g,function(c){
			const r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);
			return v.toString(16);
		});
	}
	function getState(uuid:string){
		intervalId=setInterval(async ()=>{
			const msg:any=await getLoginState(uuid);
			if(msg.msg=='Success'){
				console.log(msg.data)
				show.value=false;
				clearInterval(intervalId);
			}
		}, 3000);
		
	}
</script>
<style scoped>
h3{margin:40px 0 0;}
ul{list-style-type:none;padding:0;}
li{display:inline-block;margin:0 10px;}
a{color:#42b983;}
</style>