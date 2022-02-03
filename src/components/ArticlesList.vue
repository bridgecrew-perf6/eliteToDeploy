<template>
  <section>
    <v-img
        :src="require('../assets/images/pexels-pixabay-262508.jpg')"
        class="my-3"
        contain
        height="300"
    />

    <v-container fluid>
      <h1>Articles en lien avec Elite Coaching 42</h1>
      <v-row dense>
        <v-col
            v-for="(article, index) in articlesWithShow"
            :key="index"
            :cols="4"
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
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <span>{{ article.likeNumber }}</span>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="article.show">
                <v-divider></v-divider>
                <v-card-text>
                  {{ article.content.substring(0, 200) }} ...
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  <div class="list row">
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
    <div class="col-md-6">
      <h4>Articles List</h4>
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

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentArticle">
        <h4>Article</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentArticle.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentArticle.description }}
        </div>
        <a class="badge badge-warning"
           :href="'/articles/' + currentArticle.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on an article...</p>
      </div>
    </div>
  </div>
    <Articles v-if="articleIsOpen"/>
  </section>
</template>

<script>
import DataService from "./service/DataService";
import Articles from "./ArticlesFormUpdate";

export default {
  name: "articles-list",
  components: {Articles},
  created() {
    console.log(this.articles)
  },
  data() {
    return {
      show: false,
      articles: [],
      articlesWithShow: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      articleIsOpen: false
    };
  },
  methods: {
    addShow() {
      this.articlesWithShow = this.articles.map(article => ({
        ...article,
        show: false
      }))
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
      window.open("http://localhost:8081/articles/" + article.id)
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