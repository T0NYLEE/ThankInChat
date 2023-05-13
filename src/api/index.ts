import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post,get } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()

  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  return post<T>({
    url: '/chat-process',
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}


export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

export function fetchHumanALL<T>() {
  return post<T>({
    url: '/HumanALL',
  })
}

export function fetchHumanFind<T>() {
  return post<T>({
    url: '/HumanFind',
    data: { openid: '1'},
  })
}
export function fetchHumanAdd<T>() {
  return post<T>({
    url: '/HumanAdd',
    data: { openid: '3',realname:'1',nickname:'2',avatar:'4'},
  })
}

export function getQrCode<T>(uuid: string) {
  // return get<T>({
  //   url: `http://localhost:9112/wechat/makeChatCode?uuid=${uuid}`,
  // })
  return get<T>({
    url: `https://thankin.com/wechat/makeChatCode?uuid=${uuid}`,
  })
}

export function getLoginState<T>(uuid: string) {
  return get<T>({
    url: `https://thankin.com/wechat/loginState?uuid=${uuid}`,
  })
}
