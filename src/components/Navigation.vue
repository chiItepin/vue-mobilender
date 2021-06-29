<template>
  <ElMenu
    class="ElMenu-demo"
    mode="horizontal"
    background-color="#181a26"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <ElRow>
      <ElCol
        :span="6"
        class="hidden-xs-only"
      >
        <ElMenuItem index="1">
          Mobilender
        </ElMenuItem>
      </ElCol>
      <ElCol
        v-if="sharedState.email"
        :span="6"
        :offset="12"
        class="right-nav-tab"
      >
        <ElSubmenu index="2">
          <template #title>
            {{ sharedState.email }}
            <ElAvatar icon="el-icon-user-solid" />
          </template>
          <ElMenuItem @click="submitLogOut">
            Salir
          </ElMenuItem>
        </ElSubmenu>
      </ElCol>
    </ElRow>
  </ElMenu>
</template>

<script>
import {
  ElMenuItem,
  ElMenu,
  ElSubmenu,
  ElAvatar,
  ElCol,
  ElRow,
  ElNotification,
} from 'element-plus';
import { store } from '../main';

export default {
  name: 'Navigation',
  components: {
    ElMenuItem,
    ElMenu,
    ElSubmenu,
    ElAvatar,
    ElCol,
    ElRow,
  },
  computed: {
    sharedState() {
      return store.state;
    }
  },
  methods: {
    submitLogOut() {
      store.logOut();
      ElNotification({
        title: 'Info',
        message: 'Has salido de sesión',
        type: 'info',
      });
      this.$router.push('/login');
    }
  },
}
</script>
