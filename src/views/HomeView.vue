<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import test from '@/components/testComponent.vue'

const userStore = useUserStore()

const login = ref<string>('')
const password = ref<string>('')

function auth() {
  userStore.auth(login.value, password.value)
}
</script>

<template>
  <main>
    <form class="auth-form" v-if="!userStore.$state.userName">
      <input type="text" name="login" v-model="login" class="auth-form__input" />
      <input
        type="password"
        name="password"
        v-model="password"
        class="auth-form__input"
        autocomplete="on"
      />
      <input
        type="button"
        value="Войти"
        @click="auth"
        class="auth-form__input auth-form__input_button"
      />
    </form>
    <h1 class="autch-result" v-else>
      Добро пожаловать, {{ userStore.$state.userName }}!<br />Вы успешно вошли в аккаунт.
    </h1>
    <hr />
    <div>
      <h1>Демонстрация информации</h1>
      <p
        v-permission="{
          isHide: !userStore.$state.isAuth,
          name: 'homePageText',
          permission: 'admin'
        }"
        class="permission-text"
      >
        Данную надпись видит только тот, кто имеет разрешение на ее отображение на уровне admin
      </p>
      <p
        v-permission="{
          isHide: !userStore.$state.isAuth,
          name: 'homePageText',
          permission: 'editor'
        }"
        class="permission-text"
      >
        Данную надпись видит только тот, кто имеет разрешение на ее отображение на уровне editor
      </p>
      <p
        v-permission="{
          isHide: !userStore.$state.isAuth,
          name: 'homePageText',
          permission: 'user'
        }"
        class="permission-text"
      >
        Данную надпись видит только тот, кто имеет разрешение на ее отображение на уровне user
      </p>
    </div>
    <hr />
    <div>
      <h1>Сокрытие информации</h1>
      <p
        v-permission="{
          isHide: !userStore.$state.isAuth,
          name: 'homePageText',
          permission: 'admin',
          hideRevers: true
        }"
        class="permission-text"
      >
        Данную текст скроется у admin
      </p>
      <p
        v-permission="{
          isHide: !userStore.$state.isAuth,
          name: 'homePageText',
          permission: 'editor',
          hideRevers: true
        }"
        class="permission-text"
      >
        Данную текст скроется у editor
      </p>
      <p
        v-permission="{
          isHide: !userStore.$state.isAuth,
          name: 'homePageText',
          permission: 'user',
          hideRevers: true
        }"
        class="permission-text"
      >
        Данную текст скроется у user
      </p>
    </div>
    <hr />
    <div>
      <router-link :to="{ name: 'users' }"
        >Ссылка для проверки защиты роутов со стороны фронта</router-link
      >
    </div>
  </main>
</template>

<style lang="scss">
.auth-form {
  width: 500px;
  padding: 50px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  &__input {
    height: 50px;
    background-color: gray;
    border: 1px solid white;
    padding: 0 10px;
    font-size: 30px;
    &_button {
      width: 50%;
    }
  }
}

.permission-text {
  padding: 20px 20px;
  font-size: 20px;
  color: lightgray;
}

hr {
  height: 5px;
  width: 100%;
  background-color: aliceblue;
}

a {
  display: block;
  padding: 50px 20px;
  font-size: 20px;
  color: rgb(12, 32, 164);
}
</style>
