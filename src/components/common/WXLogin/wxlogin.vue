<template>
	<NModal v-model:show="show" :auto-focus="false" preset="card" style="width:95%; max-width:640px">
		<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" scrolling="no" width="400" height="400" frameBorder="0" allowTransparency="true" :src="setSrc"></iframe>
	</NModal>
</template>
<script setup lang='ts'>
import{ref,onMounted}from 'vue'
import{NModal}from 'naive-ui'
import{getQrCode,getLoginState,fetchPost}from '@/api'
import jwt_decode from 'jwt-decode'
import * as aa from '@/utils/aa'
import type {UserInfo} from '@/store/modules/user/helper'

const setSrc:any=ref();
const show=ref(false);
let intervalId:any=null;
const user:UserInfo=JSON.parse(window.localStorage.getItem('user') as string)||{avatar:'',name:'',openid:'',token:''}
onMounted(()=>{
	if(aa.ise(user.token)){//未登录
		show.value=true;
		createQrocde();
		return;
	}else{//已登录
		const {exp}=jwt_decode(user.token) as {exp:number,openid:string}
		if(exp*1000<Date.now()){//token过期
			window.localStorage.removeItem('user');
			window.location.reload();
		}
	}
	//if(authStore.token){
	//	console.log(jwt_decode(authStore.token))
	//	const {exp}=jwt_decode(authStore.token) as {exp:number,openid:string}
	//	if (Date.now()<exp*1000) {
	//	}else{
	//		authStore.removeToken();
	//		ss.remove(LOCAL_NAME);
	//	}
	//}
	//const localSetting:any=ss.get(LOCAL_NAME)
	//if(localSetting==undefined||localSetting==null){
	//	show.value=true;
	//	createQrocde();
	//	//window.location.reload();
	//}
})
const createQrocde=async()=>{
	try{
		const uuid=aa.uuid();
		const ticket:any=await getQrCode(uuid);
		setSrc.value=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket.ticket}`;
		getState(uuid);
	}catch(e){console.error(e)}
}

function getState(uuid:string){
	intervalId=setInterval(async()=>{
		try{
			const msg:any=await getLoginState(uuid);
			if(msg.msg=='Success'){
				const token:string=await fetchPost('HumanLogin',msg.data);
				window.localStorage.setItem('user',JSON.stringify({avatar:msg.data.avatar,name:msg.data.nickname,openid:msg.data.openid,token:token}))
				show.value=false;
				clearInterval(intervalId);
				window.location.reload()
			}
		}catch(e){}
	},3000);
}
</script>
<style scoped>
h3{margin:40px 0 0;}
ul{list-style-type:none;padding:0;}
li{display:inline-block;margin:0 10px;}
a{color:#42b983;}
</style>