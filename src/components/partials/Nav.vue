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
<v-btn @click="openFullCalendar">
        <v-icon>
          mdi-calendar
        </v-icon>
</v-btn>
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
    <FullCalendar v-if="showFullCalendar" :visible="showFullCalendar" @close="closeFullCalendar" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FullCalendar from "../FullCalendar";
import {getInstance} from "../../auth";
export  default {
  components: {FullCalendar},
  computed: { ...mapGetters(['isMobile', 'isAdmin'])},
  created() {
    this.init(this.loadTokenInfoStore)
    // if(screen.width <= 760) this.$store.commit('setIsMobile', true)
  },
  data() {
    return {
      showFullCalendar: false,
      drawer: false,
      tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news',
      ],
    }
  },
  methods: {
    init(fn) {
      let instance = getInstance();
      instance.$watch("loading", loading => {
        if (loading === false) {
          fn(instance)
        }
      })
    },
    async loadTokenInfoStore(instance) {
      await instance.getTokenSilently().then(() => {
       if (this.$auth.user.name === "celine@leroux.com") {
         this.$store.commit('setIsAdmin', true)
       }
        else console.log(this.isAdmin)
      })
    },
    openFullCalendar() {
      this.showFullCalendar = true
    },
    closeFullCalendar() {
      this.showFullCalendar = false
    }
  }
}
</script>