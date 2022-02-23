<template>
  <v-main>
    <section>
      <v-layout
          column
          wrap
          class="my-5"
          align-center
      >
        <v-flex>
          <h1 title="coaching développement personnel partenaire roanne" style="font-family: Copperplate,serif; font-size: 30px" class="animate__animated animate__bounce">ELITE COACHING 42</h1>
        </v-flex>
        <v-container>
          <v-row>
            <v-col xs="12" md="6">
              <v-img
                  alt="coaching developpement personnel roanne"
                  :src="require('../assets/images/agenda.jpg')"
                  class="my-3"
                  contain
                  height="300"
              />
              <div class="text-center">
                <h1 title="coaching développement personnel partenaire roanne">Votre demande de rendez-vous a bien été prise en compte.</h1>
                <h1 title="coaching développement personnel partenaire roanne">Vous recevrez un mail de confirmation sous 24h.</h1>
                <br>
                <v-spacer></v-spacer>
                <router-link
                    class="linkBtn"
                    to="/"
                    style="text-decoration: none; color: inherit;"
                >
                  <p style="text-align: right; padding-right: 10px" class="font-italic">Retour à la page d'accueil</p>
                </router-link>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
    </section>
  </v-main>
</template>

<script>
export default {
  name: "Submit.vue"
}
</script>

<style scoped>

</style>