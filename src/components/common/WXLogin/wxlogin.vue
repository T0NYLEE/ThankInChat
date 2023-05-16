<template>
	<NModal v-model:show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
		<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" scrolling="no" width="400" height="400" frameBorder="0" allowTransparency="true" :src="setSrc"></iframe>
	</NModal>
</template>
<script setup lang='ts'>
import {ref,onMounted} from 'vue'
import {NModal} from 'naive-ui'
import {getQrCode,getLoginState,fetchPost} from '@/api'
import {ss} from '@/utils/storage'
	const LOCAL_NAME = 'userStorage'
	const setSrc:any=ref();
	const show=ref(false);
	let intervalId:any=null;
	onMounted(()=>{
		const localSetting:any= ss.get(LOCAL_NAME)
		if(localSetting==undefined||localSetting==null){
			show.value=true;
			createQrocde();
		}
	})
	const createQrocde=async()=>{
		try{
			const uuid=guid2();
			const ticket:any=await getQrCode(uuid);
			setSrc.value=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket.ticket}`;
			getState(uuid);
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
				ss.set(LOCAL_NAME, {userInfo: {avatar: msg.data.avatar,name: msg.data.nickname,openid:msg.data.openid},})
				const token=await fetchPost('HumanAdd',msg.data);
				ss.set('token', {token: token})
				console.log(token)
				await getQrCode(uuid);
				show.value=false;
				clearInterval(intervalId);
				window.location.reload()
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