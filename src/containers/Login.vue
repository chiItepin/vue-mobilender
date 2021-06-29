<template>
  <ElCard class="box-card">
    <ElRow
      type="flex"
      class="margin-top-10 align-center"
    >
      <ElCol :span="24">
        <ElInput
          :model-value="email"
          placeholder="Email"
          prefix-icon="el-icon-user"
          @input="(event) => email = event"
        />
      </ElCol>

      <ElCol :span="24">
        <ElInput
          :model-value="password"
          placeholder="Contraseña"
          type="password"
          prefix-icon="el-icon-user"
          @input="(event) => password = event"
        />
      </ElCol>

      <ElCol :span="12">
        <ElButton
          :disabled="!email || !password"
          @click="submitLogin"
        >
          Iniciar
        </ElButton>
      </ElCol>
    </ElRow>
  </ElCard>
</template>

<script>
import {
  ElButton,
  ElNotification,
  ElCol,
  ElRow,
  ElInput,
  ElCard,
} from 'element-plus';
import { store } from '../main';
import api from '../services/api';

export default {
  name: 'LoginView',
  components: {
    ElCol,
    ElRow,
    ElInput,
    ElButton,
    ElCard,
  },
  data() {
    return {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
      loaded: false,
    }
  },
  methods: {
    submitLogin() {
      api.auth.login({
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          store.setAuth(response.data.token, this.email);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', this.email);
          ElNotification({
            title: 'Info',
            message: 'Inicio exitoso',
            type: 'info',
          });
          this.$router.push('/');
        })
        .catch((error) => {
          ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
          });
        })
    },
  },
}
</script>
<style scoped>
.el-col {
  padding: 14px;
}
.el-card {
    max-width: 500px;
    margin: auto;
    background-color: #181a26;
}
</style>