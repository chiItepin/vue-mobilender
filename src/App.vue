<template>
  <Navigation />
  <div class="container">
    <Breadcrumbs />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import router from './router';
import { store } from './main';

router.beforeEach((to, from, next) => {
  console.log('triggered');
  if (to.name !== 'LoginView' && !store.state.authToken) next({ name: 'LoginView' })
  else next()
})

export default {
  name: 'App',
  components: {
    Navigation,
    Breadcrumbs,
  },
}
</script>
