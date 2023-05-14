<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import {ref} from 'vue'
import wxlogin from './components/common/WXLogin/wxlogin.vue'

const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()
const appid=ref('wx28fe4099f54d1edf')
const scope=ref('snsapi_login')
const redirect_uri=ref('https://thankin.com')
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
	<wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>
