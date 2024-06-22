import fetchData from '@/utils/fetchData'
import type { DirectiveBinding, VNode } from 'vue'

interface PermissionObject {
  isHide?: boolean // Скрыт ли блок по некому, другому свойству
  name: string // Название права доступа
  permission: string // Значение права доступа
  reverse?: boolean // Обратное сравнение права (было ===, станет !==)
  hideRevers?: boolean // Смена значения сокрытия, было (отобразить, станет скрыть)
}

interface permissionResponse {
  permission: string | boolean | undefined
}

const permissionDirective = {
  mounted(
    // @ts-ignore
    el: HTMLElement,
    binding: DirectiveBinding<PermissionObject>,
    vNode: VNode
  ) {
    checkPermission(el, binding, vNode)
  },
  updated(
    // @ts-ignore
    el: HTMLElement,
    binding: DirectiveBinding<PermissionObject>,
    vNode: VNode
  ) {
    checkPermission(el, binding, vNode)
  }
}

async function checkPermission(
  // @ts-ignore
  el: HTMLElement,
  binding: DirectiveBinding<PermissionObject>,
  vNode: VNode
) {
  fetchData('POST', {
    patch: 'permission',
    body: JSON.stringify({ permissionName: binding.value.name })
  })
    .then((resp) => resp.json())
    .then((data) => {
      const permissionData = data as permissionResponse
      console.log(el)
      console.log(!binding.value.isHide)
      console.log(!!!binding.value.hideRevers)
      if (
        !binding.value.isHide &&
        ((!binding.value.reverse && permissionData.permission === binding.value.permission) ||
          (binding.value.reverse && permissionData.permission !== binding.value.permission))
      ) {
        // @ts-ignore
        vNode.el.hidden = !!binding.value.hideRevers
        return
      }
      // @ts-ignore
      vNode.el.hidden = !!!binding.value.hideRevers
    })
}

export default permissionDirective
