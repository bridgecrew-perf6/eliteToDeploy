<template>
  <v-footer
      dark
      padless
  >
    <v-card
        class="flex"
        flat
        tile
    >
      <v-card-title class="">
        <strong class="subheading">Suivez-nous sur les réseaux !</strong>

        <v-spacer></v-spacer>

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
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Name</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {name: 'mdi-facebook', link: "https://www.facebook.com/profile.php?id=100068445123430&ref=pages_you_manage"},
      {name: 'mdi-linkedin', link: "https://www.linkedin.com/in/latifa-aski-19168a210/"},
      {name: 'mdi-instagram', link: "https://www.instagram.com/elitecoaching42/?hl=fr"}
    ],
  }),
}
</script>