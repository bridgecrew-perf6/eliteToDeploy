<template>
  <div v-if="currentArticle">
    <v-container>
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center">
        <v-card>
          <v-img v-if="currentArticle.image === '' || currentArticle.image === null || currentArticle.image === undefined"
                 :src="require('../assets/images/pexels-dhivakaran-s-783200.jpg')"
                 class="white--text align-end"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                 height="300px"
          >
            <v-row>
              <v-card-title v-text="currentArticle.title"></v-card-title>
              <v-spacer></v-spacer>
              <v-card-subtitle v-text="'Publié le ' + createdDate"></v-card-subtitle>
            </v-row>
          </v-img>
          <v-img
              v-else
            :src="require('../assets/articlesImages/' + currentArticle.image)"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <v-card-title v-text="currentArticle.title"></v-card-title>
          </v-img>
        </v-card>
      <h4>{{currentArticle.title}}</h4>
      <p>
        {{currentArticle.createdAt}}
      </p>
      <div v-html="currentArticle.content"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import DataService from "./service/DataService";
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr')

export default {
  name: "articles",
  data() {
    return {
      currentArticle: null,
      message: '',
      createdDate: '',
    };
  },
  methods: {
    getArticle(id) {
      DataService.get(id)
          .then(response => {
            this.currentArticle = response.data;
            this.createdDate = moment(this.currentArticle.createdAt).format('Do MMMM YYYY')
            console.log(this.createdDate)
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updatePublished(status) {
      var data = {
        id: this.currentArticle.id,
        title: this.currentArticle.title,
        description: this.currentArticle.content,
        published: status
      };

      DataService.update(this.currentArticle.id, data)
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