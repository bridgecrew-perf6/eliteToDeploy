<template>
  <v-dialog v-if="currentArticle"
            v-model="show"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
  >
    <v-toolbar color="blue-grey">Article :  {{currentArticle.title}}
      <v-spacer></v-spacer>
      <v-btn
          icon
          dark
          @click="toggleDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-img
          :src="myImage + currentArticle.image"
          class="align-end"
          max-height="300"
          contain
      >
        <v-row>
          <v-spacer></v-spacer>
          <v-card-subtitle v-text="'Publié le ' + formattedDate " style="padding-right: 50px"></v-card-subtitle>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click=toggleDialog()>Fermer</v-btn>
        <v-btn v-if="isAdmin" color="blue darken-1" text @click="openUpdateForm">Modifier</v-btn>
      </v-card-actions>
    </v-card>
    <UpdateArticle v-model="showUpdateForm" @close="closeUpdateForm" :articleToUpdate="articleToUpdate" />
  </v-dialog>
<!--  <div v-if="currentArticle">-->
<!--    <v-container>-->
<!--      <v-layout row wrap align-center>-->
<!--        <v-flex class="text-xs-center">-->
<!--          <v-card>-->
<!--            <v-img v-if="currentArticle.image === '' || currentArticle.image === null || currentArticle.image === undefined"-->
<!--                   :src="require('../assets/images/pexels-dhivakaran-s-783200.jpg')"-->
<!--                   class="white&#45;&#45;text align-end"-->
<!--                   max-height="300"-->
<!--            >-->
<!--              <v-row>-->
<!--                <v-card-title v-text="currentArticle.title"></v-card-title>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-card-subtitle v-text="'Publié le ' + createdDate" style="padding-right: 50px"></v-card-subtitle>-->
<!--              </v-row>-->
<!--            </v-img>-->
<!--            <v-img-->
<!--                v-else-->
<!--                :src="myImage"-->
<!--                class="white&#45;&#45;text align-end"-->
<!--                max-height="300"-->
<!--            >-->
<!--              <v-row>-->
<!--                <v-card-title v-text="currentArticle.title"></v-card-title>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-card-subtitle v-text="'Publié le ' + createdDate" style="padding-right: 50px"></v-card-subtitle>-->
<!--              </v-row>-->
<!--            </v-img>-->
<!--            <router-link-->
<!--                class="linkBtn"-->
<!--                to="/articles"-->
<!--                style="text-decoration: none; color: inherit;"-->
<!--            >-->
<!--              <p style="text-align: right; padding-right: 10px">Retour aux articles</p>-->
<!--            </router-link>-->
<!--            <div v-html="currentArticle.content"-->
<!--                 style="padding: 10px"-->
<!--            ></div>-->

<!--          </v-card>-->
<!--        </v-flex>-->
<!--      </v-layout>-->
<!--    </v-container>-->
<!--  </div>-->

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
      myImage: "http://localhost:8080/file/",
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