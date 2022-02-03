<template>
  <v-app>
    <v-main>
      <Nav />
      <router-view/>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>

import Nav from "./components/partials/Nav";
import Footer from "./components/partials/Footer";
export default {
  name: 'App',

  components: {
    Footer,
    Nav
  },

  data: () => ({
  }),
  methods: {
  }
};
</script>
