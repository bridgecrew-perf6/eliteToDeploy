<template>
  <div id="app">
      <v-app-bar style="background-color: white">
        <v-app-bar-nav-icon @click="drawer = true"
                            class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <router-link id="homePage" class="linkBtn" to="/">
          <v-list-item>
            <v-list-item-title>
              <span>Accueil</span>
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link id="articles" class="linkBtn" to="/articles">
          <v-list-item>
            <v-list-item-title>
              <span>Blog</span>
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link id="partners" class="linkBtn" to="/partners">
          <v-list-item>
            <v-list-item-title>
              <span>Partenaires</span>
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <v-spacer></v-spacer>
        <v-icon @click="openArticleForm" v-if="isAdmin">
          mdi-pen
        </v-icon>
        <v-icon>
          mdi-calendar
        </v-icon>
      </v-app-bar>
      <!-- Add a navigation bar -->
      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
          >
              <router-link class="linkBtn" to="/">
                <v-list-item>
                  <v-list-item-title>
                    <span>Accueil</span>
                  </v-list-item-title>
                </v-list-item>
              </router-link>
            <router-link class="linkBtn" to="/articles">
              <v-list-item>
                <v-list-item-title>
                  <span>Blog</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link class="linkBtn" to="/partners">
              <v-list-item>
                <v-list-item-title>
                  <span>Partenaires</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    <AddArticle v-if="showArticleForm" />
  </div>
</template>

<script>
import AddArticle from "../AddArticle";
export  default {
  components: {AddArticle},
  data() {
    return {
      isAdmin: true,
      showArticleForm: false,
      drawer: false,
      tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news',
      ],
    }
  },
  methods: {
    openArticleForm() {
      this.showArticleForm = true;
    }
  }
}
</script>