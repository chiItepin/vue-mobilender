<template>
  <div class="breadcrumb-wrapper">
    <ElBreadcrumb separator="/">
      <ElBreadcrumbItem :to="{ path: '/' }">
        Inicio
      </ElBreadcrumbItem>

      <ElBreadcrumbItem v-if="$route && $route?.name?.includes('User')">
        Usuarios
      </ElBreadcrumbItem>
    </ElBreadcrumb>
  </div>
</template>

<script>
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
} from 'element-plus';

export default {
  name: 'Breadcrumbs',
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem,
  },
}
</script>
