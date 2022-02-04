<template>
  <section>
  <v-layout justify-center>
    <v-flex class="formEdit">
      <div v-if="currentArticle" class="edit-form">
        <v-form ref="form">
          <v-text-field
              v-model="currentArticle.title"
              label="Titre"
              type="text"
              class="form-control"
              id="title"
          >
          </v-text-field>
          <quill-editor
              v-model="currentArticle.content"
              :options="editorOption"
          ></quill-editor>
        </v-form>
        <v-card-actions>
          <v-btn  @click="deleteArticle">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              type="submit"
              class="mr-4"
              @click="updateArticle"
          >
            Valider
          </v-btn>
        </v-card-actions>
        <p>{{ message }}</p>
      </div>
    </v-flex>
  </v-layout>
  </section>
</template>



<!--      <div class="form-group">-->
<!--        <label><strong>Status:</strong></label>-->
<!--        {{ currentArticle.published ? "Published" : "Pending" }}-->
<!--      </div>-->


<!--    <button class="badge badge-primary mr-2"-->
<!--            v-if="currentArticle.published"-->
<!--            @click="updatePublished(false)"-->
<!--    >-->
<!--      UnPublish-->
<!--    </button>-->
<!--    <button v-else class="badge badge-primary mr-2"-->
<!--            @click="updatePublished(true)"-->
<!--    >-->
<!--      Publish-->
<!--    </button>-->

<!--    <button class="badge badge-danger mr-2"-->
<!--            @click="deleteArticle"-->
<!--    >-->
<!--      Delete-->
<!--    </button>-->



<script>
import DataService from "./service/DataService";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: "articles",
  components: {quillEditor},
  data() {
    return {
      currentArticle: null,
      message: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link']
          ],
        },

      }
    };
  },
  methods: {
    getArticle(id) {
      DataService.get(id)
          .then(response => {
            this.currentArticle = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },
    //
    // updatePublished(status) {
    //   var data = {
    //     id: this.currentArticle.id,
    //     title: this.currentArticle.title,
    //     description: this.currentArticle.content,
    //     published: status
    //   };
    //
    //   DataService.update(this.currentArticle.id, data)
    //       .then(response => {
    //         this.currentArticle.published = status;
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    // },

    updateArticle() {
      DataService.update(this.currentArticle.id, this.currentArticle)
          .then(response => {
            console.log(response.data);
            this.message = 'MIS A JOUR!';
            this.$router.push({ name: "Articles" });
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteArticle() {
      DataService.delete(this.currentArticle.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "Articles" });
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
  max-width: 700px !important;
}
</style>