<template>
  <div style="color: #003f5f; background-color: #d9d9d9">
  <v-container>
    <v-card-actions  v-show="isAdmin" v-if="isMobile">
      <v-spacer></v-spacer>
      <v-icon
          @click="openArticleForm"
          float right
          style="padding-top: 1%"
      >
        mdi-pen-plus
      </v-icon>
    </v-card-actions>
    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">


        <v-img
            alt="coaching developpement personnel roanne"
            :src="require('../assets/images/pexels-pixabay-262508.jpg')"
            class="my-3"
            contain
            height="300"
        />
      </v-flex>
    </v-layout>
  </v-container>
    <section>
    <v-row>
        <v-col cols="11">
          <h1 title="coaching développement personnel articles roanne" style="font-family: Copperplate,serif; padding-left: 1%">Articles en lien avec Elite Coaching 42</h1>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  @click="openArticleForm"
                  v-bind="attrs"
                  v-on="on"
                  v-show="isAdmin"
                  v-if="!isMobile"
              >
                mdi-pen-plus</v-icon>
            </template>
            <span>Créer un nouvel article</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-layout row wrap style="margin: auto">
        <v-col
            v-for="(article, index) in articlesWithShow"
            :key="index"
            class="col-sm-4 col-xs-12"
            >
          <v-card>
            <v-img
                alt="coaching developpement personnel roanne"
                :src="myUrl + article.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
            >
              <v-card-title
                  style="font-family: Copperplate,serif;"
                  v-text="article.title"></v-card-title>

            </v-img>
            <v-card-actions style="background-color: #d9d9d9;">
              <v-btn
                color="#003f5f"
                text
                @click.native="article.show = !article.show"
                style="font-family: Copperplate,serif;"
              >
                Aperçu
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  icon
                  @click="openUpdateForm(article)"
                  v-if="isAdmin"
              >
                <v-icon>mdi-pen</v-icon>
              </v-btn>
              <v-btn icon @click="openArticleView(article, index)">
                <v-icon>mdi-magnify-plus</v-icon>
              </v-btn>
              <v-btn icon @click="updateLike(article, index)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <span>{{ article.likeNumber }}</span>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="article.show" style="background-color: #d9d9d9">
                <v-divider></v-divider>
                <v-card-text>
                  <div v-html="article.content.substring(0, 400) + '...'"></div>
                  <v-btn text @click="openArticleView(article, index)">
                    <span style="font-family: Copperplate,serif;">Lire l'article en entier</span>
                  </v-btn>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-layout>
    </section>
    <AddArticle ref="addArticleForm" v-model="showArticleForm" @close="closeArticleForm"/>
    <UpdateArticle ref="updateArticleForm" v-model="showUpdateForm" @close="closeUpdateForm" />
    <ArticlesView v-model="showArticleView" @close="closeArticleView" :currentArticle="currentArticle" :isAdmin="isAdmin"/>
  </div>
</template>

<script>
import DataService from "./service/DataService";
import AddArticle from "./AddArticle";
import {mapGetters} from "vuex";
import UpdateArticle from "./UpdateArticle"
import ArticlesView from "./ArticleView";

export default {
  name: "articles-list",
  components: {ArticlesView, UpdateArticle, AddArticle},
  computed: { ...mapGetters(['isAdmin', 'isMobile'])},
  created() {
  },
  data() {
    return {
      articles: [],
      articlesWithShow: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      showArticleForm: false,
      showUpdateForm: false,
      articleToUpdate : {},
      myUrl: "https://afternoon-castle-40052.herokuapp.com/file/",
      showArticleView: false
    };
  },
  methods: {
    addShow() {
      this.articlesWithShow = this.articles.map(article => ({
        ...article,
        show: false
      }))
    },
    openArticleView(currentArticle) {
      this.currentArticle = currentArticle
      this.showArticleView = true
    },
    closeArticleView() {
      this.showArticleView = false
    },
    openArticleForm() {
      this.showArticleForm = true;
    },
    openUpdateForm(article) {
      // this.articleToUpdate = article
      this.$refs.updateArticleForm.setForm(article)
      this.showUpdateForm = true
    },
    closeArticleForm() {
      this.showArticleForm = false;
      this.$refs.addArticleForm.formErrors = []
    },
    closeUpdateForm() {
      this.showUpdateForm = false
      this.$refs.updateArticleForm.formErrors = []
    },
    retrieveArticles() {
      DataService.getAll()
          .then(response => {
            this.articles = response.data;
            this.addShow()
          })
          .catch(e => {
            console.log(e);
          });
    },

    async updateLike(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      const data = {
        id: this.currentArticle.id,
        title: this.currentArticle.title,
        content: this.currentArticle.content,
        likeNumber: this.currentArticle.likeNumber + 1,
      };
      const accessToken = await this.$auth.getTokenSilently()

      DataService.update(this.currentArticle.id, data, accessToken)
      .then(() => {
        this.retrieveArticles()
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
  mounted() {
    this.retrieveArticles();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>