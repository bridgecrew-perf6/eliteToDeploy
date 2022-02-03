<template>
  <div v-if="currentArticle" class="edit-form">
    <h4>{{currentArticle.title}}</h4>
    <p>
      {{currentArticle.createdAt}}
    </p>
    <div>
      {{currentArticle.content}}
    </div>
  </div>
</template>

<script>
import DataService from "./service/DataService";

export default {
  name: "articles",
  data() {
    return {
      currentArticle: null,
      message: ''
    };
  },
  methods: {
    getArticle(id) {
      DataService.get(id)
          .then(response => {
            this.currentArticle = response.data;
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

    updateArticle() {
      DataService.update(this.currentArticle.id, this.currentArticle)
          .then(response => {
            console.log(response.data);
            this.message = 'The article was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteArticle() {
      DataService.delete(this.currentArticle.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "articles" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getArticle(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>