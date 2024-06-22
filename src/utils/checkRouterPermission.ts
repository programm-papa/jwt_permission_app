import { useUserStore } from '@/stores/user'
import fetchData from './fetchData'

interface permissionResponse {
  permission: boolean
}

export default async function checkRouterPermission(resourseName: string): Promise<boolean> {
  const userStore = useUserStore()
  return fetchData('POST', {
    patch: 'permission',
    body: JSON.stringify({ permissionName: resourseName })
  })
    .then((resp) => resp.json())
    .then((data) => {
      const permissionData = data as permissionResponse
      return !!permissionData.permission && userStore.isAuth
    })
}
