import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import fetchData from '@/utils/fetchData'
import type IUserData from '@/types/IUserData'

export const useUserStore = defineStore('useUserStore', () => {
  const isAuth = ref<boolean>(false)
  const userName = ref<string | null>(null)
  const userID = ref<number | null>(null)
  const userGroup = ref<string | null>(null)

  const auth = (login: string, password: string) => {
    fetchData('POST', { patch: 'auth/', body: JSON.stringify({ login, password }) })
      .then((response) => response.json())
      .then((data: IUserData | unknown) => {
        const userData = data as IUserData
        userName.value = userData.name
        userID.value = userData.id
        userGroup.value = userData.group
        isAuth.value = true
      })
      .catch(() => {
        // Тут реализуется обработка ошибки, вывод ошибки и тп
      })
  }

  return {
    userName,
    userID,
    userGroup,
    isAuth,
    auth
  }
})
