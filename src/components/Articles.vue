<template>
  <div v-if="currentArticle">
    <v-container>
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center">
        <v-card>
          <v-img
              alt="coaching developpement personnel roanne"
              :src="myImage"
              contain
              max-height="300"
          >
            <v-row>
              <v-card-title v-text="currentArticle.title"></v-card-title>
              <v-spacer></v-spacer>
              <v-card-subtitle v-text="'Publié le ' + createdDate" style="padding-right: 50px"></v-card-subtitle>
            </v-row>
          </v-img>
          <router-link
              class="linkBtn"
              to="/articles"
              style="text-decoration: none; color: inherit;"
          >
            <p style="text-align: right; padding-right: 10px">Retour aux articles</p>
          </router-link>
          <div v-html="currentArticle.content"
               style="padding: 10px"
          ></div>

        </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import DataService from "./service/DataService";
import moment from 'moment';
import 'moment/locale/fr';
import {mapGetters} from "vuex";
// import axios from "axios";
moment.locale('fr')

export default {
  name: "articles",
  computed: {...mapGetters(['isAdmin'])},
  data() {
    return {
      currentArticle: null,
      message: '',
      createdDate: '',
      myImage: ''
    };
  },
  methods: {
    getArticle(id) {
      DataService.get(id)
          .then(response => {
            this.currentArticle = response.data;
            this.createdDate = moment(this.currentArticle.createdAt).format('Do MMMM YYYY')
            this.myImage = "https://afternoon-castle-40052.herokuapp.com/file/" + this.currentArticle.image
          })
          .catch(e => {
            console.log(e);
          });
    },

    // async getFile(fileName) {
    //   await axios.get(`/file/${fileName}`).then(response => {
    //     this.myImage = response.data
    //   })
    // },

    async updatePublished(status) {
      var data = {
        id: this.currentArticle.id,
        title: this.currentArticle.title,
        description: this.currentArticle.content,
        published: status
      };
      const accessToken = await this.$auth.getTokenSilently()

      DataService.update(this.currentArticle.id, data, accessToken)
          .then(response => {
            this.currentArticle.published = status;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

  },
  mounted() {
    this.message = '';
    this.getArticle(this.$route.params.id);
  }
};
</script>

<style>
</style>