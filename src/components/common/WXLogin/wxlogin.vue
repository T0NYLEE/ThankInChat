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
	let show=true;
	onMounted(() => {
		createQrocde();
	})
	const createQrocde = async () => {
		try {
			const uuid=guid2();
			const ticket: any = await getQrCode(uuid);
			setSrc.value=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket.ticket}`;
			getState(uuid);
		}
		catch (error: any) {
			console.log(error)
		}
	}
	function guid2(){
		let code = '';
		for(var i=0;i<10;i++){
    		code += parseInt((Math.random()*10).toString());
		}
		return code;
	}
	function getState(uuid:string){
		setInterval(async ()=>{
			const msg: any = await getLoginState(uuid);
			if(msg.msg=='Success'){
				console.log(msg.data)
				show=false;
				clearInterval();
			}
		}, 1000);
		
	}
</script>
<style scoped>
h3{margin:40px 0 0;}
ul{list-style-type:none;padding:0;}
li{display:inline-block;margin:0 10px;}
a{color:#42b983;}
</style>