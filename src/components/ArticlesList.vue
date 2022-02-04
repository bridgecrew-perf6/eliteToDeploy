<template>
  <section>
    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">
    <v-img
        :src="require('../assets/images/pexels-pixabay-262508.jpg')"
        class="my-3"
        contain
        height="300"
    />

    <v-container fluid style="margin: 20px">
      <v-row>
        <v-col cols="11">
          <h1>Articles en lien avec Elite Coaching 42</h1>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  @click="openArticleForm"
                  v-bind="attrs"
                  v-on="on"
                  v-if="isAdmin"
              >
                mdi-pen-plus</v-icon>
            </template>
            <span>Créer un nouvel article</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-layout row wrap>
        <v-col
            v-for="(article, index) in articlesWithShow"
            :key="index"
            class="col-sm-4 col-xs-12"
            >
          <v-card>
            <v-img v-if="article.image === '' || article.image === null || article.image === undefined"
                   :src="require('../assets/images/pexels-dhivakaran-s-783200.jpg')"
                   class="white--text align-end"
                   gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                   height="300px"
            >

              <v-card-title v-text="article.title"></v-card-title>
            </v-img>
            <v-img
                v-else
                :src="require('../assets/articlesImages/' + article.image)"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
            >
              <v-card-title v-text="article.title"></v-card-title>

            </v-img>
            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
                @click.native="article.show = !article.show"
              >
                Explore
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="openActiveArticle(article, index)">
                <v-icon>mdi-magnify-plus</v-icon>
              </v-btn>
              <v-btn icon @click="updateLike(article, index)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <span>{{ article.likeNumber }}</span>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="article.show">
                <v-divider></v-divider>
                <v-card-text>
                  <div v-html="article.content.substring(0, 500)"> ... </div>
                  <v-btn text @click="openActiveArticle(article, index)">
                    <span>Lire l'article en entier</span>
                  </v-btn>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>

<!--  <div class="list row">-->
<!--    <div class="col-md-8">-->
<!--      <div class="input-group mb-3">-->
<!--        <input type="text" class="form-control" placeholder="Search by title"-->
<!--               v-model="title"/>-->
<!--        <div class="input-group-append">-->
<!--          <button class="btn btn-outline-secondary" type="button"-->
<!--                  @click="searchTitle"-->
<!--          >-->
<!--            Search-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="col-md-6">-->
<!--      <h4>Articles List</h4>-->
<!--      <ul class="list-group">-->
<!--        <li class="list-group-item"-->
<!--            :class="{ active: index == currentIndex }"-->
<!--            v-for="(article, index) in articles"-->
<!--            :key="index"-->
<!--            @click="setActiveArticle(article, index)"-->
<!--        >-->
<!--          {{ article.title }}-->
<!--        </li>-->
<!--      </ul>-->

<!--      <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">-->
<!--        Remove All-->
<!--      </button>-->
<!--    </div>-->
<!--    <div class="col-md-6">-->
<!--      <div v-if="currentArticle">-->
<!--        <h4>Article</h4>-->
<!--        <div>-->
<!--          <label><strong>Title:</strong></label> {{ currentArticle.title }}-->
<!--        </div>-->
<!--        <div>-->
<!--          <label><strong>Description:</strong></label> {{ currentArticle.description }}-->
<!--        </div>-->
<!--        <a class="badge badge-warning"-->
<!--           :href="'/articles/' + currentArticle.id"-->
<!--        >-->
<!--          Edit-->
<!--        </a>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <br />-->
<!--        <p>Please click on an article...</p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
      </v-flex>
    </v-layout>
    <AddArticle v-model="showArticleForm" @close="closeArticleForm"/>
  </section>
</template>

<script>
import DataService from "./service/DataService";
import AddArticle from "./AddArticle";

export default {
  name: "articles-list",
  components: {AddArticle},
  created() {
    console.log(this.articles)
  },
  data() {
    return {
      articles: [],
      articlesWithShow: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      showArticleForm: false,
      isAdmin: true,

    };
  },
  methods: {
    addShow() {
      this.articlesWithShow = this.articles.map(article => ({
        ...article,
        show: false
      }))
    },
    openArticleForm() {
      this.showArticleForm = true;
    },
    closeArticleForm() {
      this.showArticleForm = false;
    },
    retrieveArticles() {
      DataService.getAll()
          .then(response => {
            this.articles = response.data;
            this.addShow()
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },

    openActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      window.open("http://localhost:8081/articles/" + article.id, "_self")
    },

    removeAllArticles() {
      DataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchTitle() {
      DataService.findByTitle(this.title)
          .then(response => {
            this.articles = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    //TODO comment limiter à un seul clic
    updateLike(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      var data = {
        id: this.currentArticle.id,
        title: this.currentArticle.title,
        content: this.currentArticle.content,
        likeNumber: this.currentArticle.likeNumber + 1,
      };

      DataService.update(this.currentArticle.id, data)
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