import Vue from "vue";
import VueRouter from "vue-router";
import ArticlesList from "./components/ArticlesList";
import HomePage from "./components/HomePage";
import Partners from "./components/Partners"
import Articles from "./components/Articles";
// import { authGuard } from "./auth/authGuard";
//
Vue.use(VueRouter);

   const routes = [
        {
            path: "/",
            name: "HomePage",
            component: HomePage
        },
        {
            path: "/articles",
            name: "Articles",
            component: ArticlesList
        },
       {
           path: "/partners",
           name: "Partners",
           component: Partners
       },
        {
            path: "/articles/:id",
            name: "articles-details",
            component: Articles
        },
    ]

const router = new VueRouter( {
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router