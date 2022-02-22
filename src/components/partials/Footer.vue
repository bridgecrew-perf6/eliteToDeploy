<template>
  <v-footer
      dark
      padless
  >
    <v-card
        class="flex"
        flat
        tile
        style="background-color: #003f5f; color: #d9d9d9"
    >
      <v-card-title class="">
        <v-row>
          <v-col cols="6" md="8">
        <strong class="subheading">Suivez-nous sur les réseaux !</strong>
          </v-col>
        <v-spacer></v-spacer>

          <v-col cols="6" md="4">
            <v-btn
                v-for="icon in icons"
                :key="icon.id"
                class="mx-4"
                dark
                icon
            >
              <a v-bind:href="icon.link" target="_blank" style="color: inherit; text-decoration: none">
                <v-icon size="24px">
                  {{ icon.name }}
                </v-icon>
              </a>
            </v-btn>
          </v-col>
        </v-row>


      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Name</strong>
        <div v-if="!$auth.loading">
          <!-- show login when not authenticated -->
          <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark"
          >
            <v-icon>
              mdi-thumb-down-outline
            </v-icon>
          </a
          >
          <!-- show logout when authenticated -->
          <a v-if="$auth.isAuthenticated" @click="logout" class="button is-dark"
          >
            <v-icon>
              mdi-thumb-up-outline
            </v-icon>
          </a
          >
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data: () => ({
    icons: [
      {name: 'mdi-facebook', link: "https://www.facebook.com/profile.php?id=100068445123430&ref=pages_you_manage"},
      {name: 'mdi-linkedin', link: "https://www.linkedin.com/in/latifa-aski-19168a210/"},
      {name: 'mdi-instagram', link: "https://www.instagram.com/elitecoaching42/?hl=fr"}
    ],
  }),
  computed: {...mapGetters(['isAdmin'])},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();

    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>