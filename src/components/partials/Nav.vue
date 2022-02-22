<template>
  <div id="app">
      <v-app-bar style="background-color: #003f5f">
        <v-app-bar-nav-icon @click="drawer = true"
                            class="d-flex d-sm-none"
                            style="color: #d9d9d9"
        ></v-app-bar-nav-icon>
        <v-row v-if="!isMobile">
        <v-spacer></v-spacer>
          <router-link id="homePage" class="linkBtn" to="/" style="text-decoration: none; color: inherit;">
            <v-list-item>
              <v-list-item-title>
                <span class="navTitle">Accueil</span>
              </v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link id="articles" class="linkBtn" to="/articles" style="text-decoration: none; color: inherit;">
            <v-list-item>
              <v-list-item-title>
                <span class="navTitle" style="color: #d9d9d9">Blog</span>
              </v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link id="partners" class="linkBtn" to="/partners" style="text-decoration: none; color: inherit;">
            <v-list-item>
              <v-list-item-title>
                <span class="navTitle" style="color: #d9d9d9">Partenaires</span>
              </v-list-item-title>
            </v-list-item>
          </router-link>
          <v-spacer></v-spacer>
          <v-btn
              @click="openFullCalendar"
              outlined
              style="background-color: #003f5f"
          >
            <span class="eventTitle">Prendre RDV</span>

          </v-btn>
        </v-row>
      </v-app-bar>
      <!-- Add a navigation bar -->
      <v-navigation-drawer
          style="color: #003f5f; background-color: #d9d9d9;"
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
              <router-link class="linkBtn" to="/" style="text-decoration: none; color: inherit;">
                <v-list-item>
                  <v-list-item-title>
                    <span class="navTitleMobile">Accueil</span>
                  </v-list-item-title>
                </v-list-item>
              </router-link>
            <router-link class="linkBtn" to="/articles" style="text-decoration: none; color: inherit;">
              <v-list-item>
                <v-list-item-title>
                  <span class="navTitleMobile">Blog</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link class="linkBtn" to="/partners" style="text-decoration: none; color: inherit;">
              <v-list-item>
                <v-list-item-title>
                  <span class="navTitleMobile">Partenaires</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <v-btn
                @click="openFullCalendar"
                outlined
                style="background-color: #003f5f"
            >
              <span class="eventTitle">Prendre RDV</span>

            </v-btn>

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
import DataService from "../service/DataService";
export  default {
  components: {FullCalendar},
  computed: { ...mapGetters(['isMobile', 'isAdmin'])},
  created() {
    this.init(this.loadTokenInfoStore)
    if(screen.width <= 760) this.$store.commit('setIsMobile', true)
  },
  data() {
    return {
      showFullCalendar: false,
      drawer: false,
      tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news',
      ],
      allAdmins: {}
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
      await instance.getTokenSilently().then((accessToken) => {
        DataService.getAllAdmin(accessToken)
        .then(response => {
          this.allAdmins = response.data
          if (this.allAdmins.some(data => data.email === this.$auth.user.email)) {
            this.$store.commit('setIsAdmin', true)
          } else {
            console.log("this.isAdmin")
            console.log(this.isAdmin)
          }
        })
      //  if (this.$auth.user.name === "celine@leroux.com") {
      //    this.$store.commit('setIsAdmin', true)
      //  }
      //   else console.log(this.isAdmin)
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
<style>
.navTitle {
  color: #d9d9d9;
  font-family: Copperplate,serif;
  font-size: 20px;
}
.navTitleMobile{
  color: #003f5f;
  font-family: Copperplate,serif;
  font-size: 20px;
}
.eventTitle {
  color: #d9d9d9;
  font-family: Copperplate,serif;
  font-size: 15px;
}
</style>