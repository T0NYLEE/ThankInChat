<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import wxlogin from './components/common/WXLogin/wxlogin.vue'

const { theme, themeOverrides } = useTheme()
const { language } = useLanguage()
const appid = 'wx28fe4099f54d1edf'
const scope = 'snsapi_login'
const redirect_uri = 'http://127.0.0.1:1002'
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
