<template>
  <ElSkeleton v-if="!users.length" />

  <ElRow
    v-else
    type="flex"
    class="margin-top-10 align-center"
  >
    <ElCol
      :span="12"
    >
      <h2>Usuarios</h2>
    </ElCol>

    <ElCol
      :span="12"
      class="align-right"
    >
      <ElButton @click="isSearchFieldShown = !isSearchFieldShown">
        <i class="el-icon-search" />
        Inspeccionar
      </ElButton>
    </ElCol>

    <ElCol
      v-if="isSearchFieldShown"
      :span="24"
    >
      <SearchField
        :search-value="searchValue"
        property="searchValue"
        :set-value="(property, value) => setValue(property, value)"
        placeholder="Buscar usuario por correo electrónico o apellido"
      />
    </ElCol>

    <ElCol :span="24">
      <ElTable
        ref="filterTable"
        row-key="date"
        :data="getFilteredUsers"
        style="width: 100%"
      >
        <ElTableColumn
          label="Avatar"
        >
          <template #default="scope">
            <ElAvatar :src="scope.row.avatar" />
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="first_name"
          label="First Name"
        />
        <ElTableColumn
          prop="last_name"
          label="Last Name"
        />
        <ElTableColumn
          prop="email"
          label="Email"
        />
        <ElTableColumn
          fixed="right"
          width="120"
          label="Acciones"
        >
          <template #default="scope">
            <ElButton
              type="text"
              size="small"
              @click.prevent="deleteUser(scope.row.id)"
            >
              Eliminar
            </ElButton>
            <RouterLink
              :to="'/users/' + scope.row.id"
              class="redirect-link"
            >
              <i class="el-icon-arrow-right" />
            </RouterLink>
          </template>
        </ElTableColumn>
      </ElTable>
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
  ElTable,
  ElTableColumn,
  ElAvatar,
} from 'element-plus';
import { RouterLink } from 'vue-router';
import api from '../services/api';
import SearchField from '../components/SearchField.vue';

export default {
  name: 'Home',
  components: {
    ElButton,
    ElSkeleton,
    ElCol,
    ElRow,
    ElTable,
    ElTableColumn,
    ElAvatar,
    SearchField,
  },
  data() {
    return {
      users: [],
      searchValue: '',
      isSearchFieldShown: false,
    }
  },
  computed: {
    getFilteredUsers() {
      return this.users.filter((user) =>
        user.email.toLowerCase().includes(this.searchValue.toLowerCase())
        || user.last_name.toLowerCase().includes(this.searchValue.toLowerCase()))
    },
  },
  created() {
    api.users.listUsers()
      .then((response) => {
        this.users = response.data.data;
      })
      .catch((error) => {
        ElNotification({
          title: 'Error',
          message: error.message,
          type: 'error',
        });
      })
  },
  methods: {
    setValue(property, value) {
      this[property] = value;
    },
    deleteUser(userId) {
      api.users.deleteUser(userId)
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
        })
        .catch((error) => {
          ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
          });
        })
    },
    getUserRow(name) {
      this.users.map((user) => ({
        text: user[name],
        value: user[name],
      }));
    },
  },
}
</script>
