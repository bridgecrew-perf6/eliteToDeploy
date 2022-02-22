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
    <UpdateArticle v-model="showUpdateForm" @close="closeUpdateForm" :articleToUpdate="articleToUpdate" />
  </v-dialog>
</template>

<script>
// import DataService from "./service/DataService";
import moment from 'moment';
import 'moment/locale/fr';
import {mapGetters} from "vuex";
import UpdateArticle from "./UpdateArticle";
// import {mapGetters} from "vuex";
// import axios from "axios";
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
      this.articleToUpdate = this.currentArticle
      this.showUpdateForm = true
      this.toggleDialog()
    },
    closeUpdateForm() {
      this.showUpdateForm = false
    },
    // getArticle(id) {
    //   DataService.get(id)
    //       .then(response => {
    //         this.currentArticle = response.data;
    //         this.createdDate = moment(this.currentArticle.createdAt).format('Do MMMM YYYY')
    //         this.myImage = "http://localhost:8080/file/" + this.currentArticle.image
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    // },


    // async updatePublished(status) {
    //   var data = {
    //     id: this.currentArticle.id,
    //     title: this.currentArticle.title,
    //     description: this.currentArticle.content,
    //     published: status
    //   };
    //   const accessToken = await this.$auth.getTokenSilently()
    //
    //   DataService.update(this.currentArticle.id, data, accessToken)
    //       .then(response => {
    //         this.currentArticle.published = status;
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    // },

  },
  // mounted() {
  //   this.message = '';
  //   this.getArticle(this.$route.params.id);
  // }
};
</script>

<style>
</style>