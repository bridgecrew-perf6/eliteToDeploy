<template>
  <section style="color: #003f5f; background-color: #d9d9d9">
    <v-row>
      <v-col class="text-center">
        <h1 title="mentions légales obligatoires disclaimer elite coaching roanne" style="font-family: Copperplate,serif; padding-left: 1%">
          MENTIONS LEGALES<br>
        </h1>
        <span style="font-family: Copperplate,serif; padding-left: 1%" class="font-italic">En vigueur au 01/03/2022</span>
      </v-col>
    </v-row>
    <br>
    <v-flex>
      <v-container style="font-family: Copperplate,serif;">
        Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance
        dans l'économie numérique, dite L.C.E.N, il est porté à la connaissance des utilisateurs et visiteurs, ci-après
        l'utilisateur, du site https://preprodelitecoachong42.herokuapp.com/, les présentes mentions légales.
        <br>
        La connexion et la navigation sur le site par l'utilisateur implique acceptation intégrale et sans réserve des
        présentes mentions légales.<br>
        Ces dernières sont accessibles sur le site à la rubrique "Mentions Légales".<br>
        <br>
        <h2 title="Informations Editeur" class="text-decoration-underline">Informations Editeur</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
          Site preprodelitecoaching42.herokuapp.com<br>
          Directrice de la publication : {{ Latifa }} <br>
          Contact : {{ latifaMail }}
        </v-flex>
        <br>
        <h2 title="Identité de l'entreprise" class="text-decoration-underline">Identité de l'entreprise</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
          Nom/Prénom/adresse
          Numéro d'immatriculation
          Contact : {{ latifaMail }}
          Numéro d'identifation à la TVA

        </v-flex>
        <br>
        <h2 title="Droit de reproduction" class="text-decoration-underline">Droit de reproduction</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
          Tout droit de reproduction et de représentation réservée au développeur du site {{ moi }}.<br>
          Toutes les informations reproduites dans ce site sont protégées par des droits de propriété intellectuelle détenus par {{ Latifa }}<br>
          Par conséquent, aucune de ces informations ne peut être reproduite, modifiée, rediffusée, traduite, exploitée commercialement ou réutilisée de quelque manière que ce soit sans l'accord préalable écrit de la propriétaire.
        </v-flex>
        <br>
        <h2 title="Informations hébergeur" class="text-decoration-underline">Information hébergeur</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
          Heroku <br>
          415 Mission Street Suite 300<br>
          San Francisco, CA<br>
          94105<br>
          support@heroku.com<br>
        </v-flex>
        <br>
        <h2 title="Crédits site internet" class="text-decoration-underline">Crédits site internet</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
        Conception et développement du site internet par {{ moi }}<br>
        Contact: {{ monMail }}
        </v-flex>
        <br>
        <h2 title="Accès au site" class="text-decoration-underline">Accès au site</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
          Le site est accessible en tout endroite, 7j/7, 24h/24, sauf cas de force majeure, interruption programmée ou non et pouvant découler d'une nécessite de maintenance.
          <br>
          En cas de modification, interruption ou suspension du Site, l'éditeur ne saurait être tenu responsable.
        </v-flex>
        <br>
        <h2 title="Collecte des données" class="text-decoration-underline">Collecte des données</h2>
        <v-flex class="text-xs-center" style="margin-top: 3%">
          Le site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect de la
          la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.
          <br>
          En vertu de la loi informatique et Libertés, en date du 6 janvier 1978, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses dnnées personnelles. L'utilisateur exerce ce droite :
          <br>
          <ul>
            <li>par mail à l'adresse email : elitecoaching42@gmail.com</li>
            <li>par voie postale au Elite Coaching 42, 28 rue Etienne Dolet 42300 Roanne</li>
            <li>via le formulaire de contact</li>
          </ul>
        </v-flex>
      </v-container>
    </v-flex>
  </section>
</template>

<script>
export default {
  name: "LegalNotice.vue",
  data() {
    return {
      moi: process.env.VUE_APP_ME,
      monMail: process.env.VUE_APP_MYMAIL,
      Latifa: process.env.VUE_APP_LATIFA,
      latifaMail: process.env.VUE_APP_LATIFAMAIL
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>