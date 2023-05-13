<template>
	<NModal v-model:show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
		<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" scrolling="no" width="400" height="400" frameBorder="0" allowTransparency="true" :src="setSrc"></iframe>
	</NModal>
</template>
<script setup lang='ts'>
import {ref,onMounted} from 'vue'
import {NModal} from 'naive-ui'
import {getQrCode} from '@/api'
	const setSrc: any =ref();

	onMounted(() => {
		createQrocde();
	})
	const createQrocde = async () => {
	try {
		const ticket: any = await getQrCode('1');
		setSrc.value=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket.ticket}`
	}
	catch (error: any) {
		console.log(error)
	}
}

	const show=true;
</script>
<style scoped>
h3{margin:40px 0 0;}
ul{list-style-type:none;padding:0;}
li{display:inline-block;margin:0 10px;}
a{color:#42b983;}
</style>