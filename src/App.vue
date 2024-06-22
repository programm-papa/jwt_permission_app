<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import regServiceWorker from './utils/regServiceWorker'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

// @ts-ignore
if ('serviceWorker' in navigator) {
  regServiceWorker()
}
</script>

<template>
  <header class="header">
    <div>
      <router-link :to="{ name: 'home' }" class="header__link"> Главная страница </router-link>
    </div>
    <div
      v-permission="{
        isHide: !userStore.$state.isAuth,
        name: 'users',
        permission: true
      }"
    >
      <router-link :to="{ name: 'users' }" class="header__link"> Пользователи </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'profile' }" class="header__link"> Личный кабинет </router-link>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #3a435e;
  div {
    flex: 1;
  }
  &__link {
    padding: 20px 0;
    border: 1px solid white;
    color: rgb(189, 189, 189);
    text-align: center;
    &:hover {
      color: #ffffff;
    }
    &.router-link-active {
      background-color: #232f53;
    }
  }
}
</style>
