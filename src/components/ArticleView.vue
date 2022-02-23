<template>
  <v-dialog v-if="currentArticle"
            v-model="show"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
  >
    <v-toolbar style="
    font-family: Copperplate,serif;
    background-color: #003f5f;
    color: #d9d9d9;
    font-size: 30px"
    >Article :  {{currentArticle.title}}
      <v-spacer></v-spacer>
      <v-btn
          icon
          dark
          @click="toggleDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card style="background-color: #d9d9d9">
      <v-img
          :src="myImage + currentArticle.image"
          class="align-end"
          max-height="300"
          contain
      >
        <v-row>
          <v-spacer></v-spacer>
          <v-card-subtitle
              v-text="'Publié le ' + formattedDate "
              style="padding-right: 50px; font-family: Copperplate,serif;"></v-card-subtitle>
        </v-row>
      </v-img>
      <router-link
          class="linkBtn"
          to="/articles"
          style="text-decoration: none; color: inherit;"
      >
      </router-link>
      <div v-html="currentArticle.content"
           style="padding: 10px"
      ></div>
      <v-card-actions style="font-family: Copperplate,serif;">
        <v-spacer></v-spacer>
        <v-btn color="#003f5f" text @click=toggleDialog()>Fermer</v-btn>
        <v-btn v-if="isAdmin" color="#003f5f" text @click="openUpdateForm">Modifier</v-btn>
      </v-card-actions>
    </v-card>
    <UpdateArticle ref="updateArticleForm" v-model="showUpdateForm" @close="closeUpdateForm"/>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import 'moment/locale/fr';
import {mapGetters} from "vuex";
import UpdateArticle from "./UpdateArticle";
moment.locale('fr')

export default {
  name: "articlesView",
  components: {UpdateArticle},
  computed: {
    ...mapGetters(['isAdmin']),
    formattedDate() {
      return moment(this.currentArticle.createdAt).format('Do MMMM YYYY')
    }
  },
  props: ['value', 'currentArticle'],
  created() {
    this.show = this.value
  },
  watch: {
    value (v) {
      this.show = v
    }
  },
  data() {
    return {
      show: false,
      message: '',
      createdDate: '',
      myImage: "https://afternoon-castle-40052.herokuapp.com/file/",
      showUpdateForm: false,
      articleToUpdate: {}
    };
  },
  methods: {
    toggleDialog () {
      this.show = !this.show
      this.$emit('close', this.show)
    },
    openUpdateForm() {
      this.$refs.updateArticleForm.setForm(this.currentArticle)
      this.showUpdateForm = true
      this.toggleDialog()
    },
    closeUpdateForm() {
      this.showUpdateForm = false
      this.$refs.updateArticleForm.formErrors = []
    },
  },
};
</script>

<style>
</style>