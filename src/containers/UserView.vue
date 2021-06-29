<template>
  <ElSkeleton v-if="!loaded" />

  <ElRow
    v-else
    type="flex"
    class="margin-top-10 align-center"
  >
    <ElCol
      v-if="$route.params.id"
      :span="12"
    >
      <ElAvatar :src="user.avatar" />
    </ElCol>

    <ElCol :span="12">
      <ElInput
        :model-value="user.first_name"
        placeholder="Nombre"
        prefix-icon="el-icon-user"
        @input="(event) => setUser('first_name', event)"
      />
    </ElCol>

    <ElCol :span="12">
      <ElInput
        :model-value="user.last_name"
        placeholder="Apellido"
        prefix-icon="el-icon-user"
        @input="(event) => setUser('last_name', event)"
      />
    </ElCol>

    <ElCol :span="12">
      <ElInput
        :model-value="user.email"
        placeholder="Email"
        prefix-icon="el-icon-user"
        @input="(event) => setUser('email', event)"
      />
    </ElCol>

    <ElCol :span="12">
      <ElButton
        :disabled="!user.first_name || !user.last_name"
        @click="saveUser"
      >
        Guardar
      </ElButton>
    </ElCol>
  </ElRow>
</template>

<script>
import {
  ElButton,
  ElSkeleton,
  ElNotification,
  ElCol,
  ElRow,
  ElAvatar,
  ElInput,
} from 'element-plus';
import api from '../services/api';
import SearchField from '../components/SearchField.vue';

export default {
  name: 'UserView',
  components: {
    ElSkeleton,
    ElCol,
    ElRow,
    ElInput,
    ElAvatar,
    ElButton,
  },
  data() {
    return {
      user: {},
      loaded: false,
    }
  },
  created() {
    if (this.$route.params.id) {
      api.users.getUser(this.$route.params.id)
        .then((response) => {
          this.user = response.data.data;
          this.loaded = true;
        })
        .catch((error) => {
          ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
          });
        })
    } else {
      this.loaded = true;
    }
  },
  methods: {
    setUser(property, value) {
      this.user[property] = value;
    },
    updateUser() {
      api.users.updateUser(this.$route.params.id, this.user)
        .then(() => {
          ElNotification({
            title: 'Info',
            message: 'Actualizado con éxito',
            type: 'success',
          });
        })
        .catch((error) => {
          ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
          });
        })
    },
    saveUser() {
      if (this.$route.params.id) {
        this.updateUser();
      } else {
        api.users.createUser(this.user)
          .then(() => {
            ElNotification({
              title: 'Info',
              message: 'Creado con éxito',
              type: 'success',
            });
          })
          .catch((error) => {
            ElNotification({
              title: 'Error',
              message: error.message,
              type: 'error',
            });
          })
      }
    },
  },
}
</script>
<style scoped>
.el-col {
  padding: 14px;
}
</style>