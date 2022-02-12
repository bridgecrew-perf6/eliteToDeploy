<template>
        <v-dialog v-model="show" scrollable max-width="700px">
          <v-card>
            <v-toolbar color="blue-grey">Nouvel Article</v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="saveArticle" fill-width ref="addArticleForm" lazy-validation >
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="article.title"
                    label="Titre"
                    required
                  />
                </v-col>
                <v-col cols="6">
                  <div class="large-12 medium-12 small-12 cell">
                    <label>Image
                      <input type="file" id="file" ref="file" @change="selectFile()"/>
                    </label>
                  </div>
                </v-col>
                <v-col>
                  <v-card-text>
                    <quill-editor
                        v-model="article.content"
                        :options="editorOption"
                        style="min-height:300px;"
                    ></quill-editor>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click=toggleDialog()>Annuler</v-btn>
                <v-btn
                    @click.prevent="saveArticle"
                    color="primary"
                    value="submit"
                    text type="submit"
                >
                  Valider
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
<!--  <div class="submit-form">-->
<!--    <div v-if="!submitted">-->
<!--      <div class="form-group">-->
<!--        <label for="title">Title</label>-->
<!--        <input-->
<!--            type="text"-->
<!--            class="form-control"-->
<!--            id="title"-->
<!--            required-->
<!--            v-model="article.title"-->
<!--            name="title"-->
<!--        />-->
<!--      </div>-->

<!--      <div class="form-group">-->
<!--        <label for="description">Contenu</label>-->
<!--        <input-->
<!--            class="form-control"-->
<!--            id="description"-->
<!--            required-->
<!--            v-model="article.content"-->
<!--            name="description"-->
<!--        />-->
<!--      </div>-->

<!--      <button @click="saveArticle" class="btn btn-success">Submit</button>-->
<!--    </div>-->

<!--    <div v-else>-->
<!--      <h4>You submitted successfully!</h4>-->
<!--      <button class="btn btn-success" @click="newArticle">Add</button>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import DataService from "./service/DataService";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import axios from "axios";

export default {
  name: "add-article",
  props: ['value'],
  created() {
    this.show = this.value
  },
  watch: {
    value (v) {
      this.show = v
    }
  },
  components: {quillEditor},
  data() {
    return {
      article: {
        id: null,
        title: "",
        content: "",
      },
      submitted: false,
      show: false,
      editorOption: {
        theme: 'snow',
        placeholder: "Taper l'article ici ...",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'font': []}],
            [{'color': []}, {'background': []}],
            [{'align': []}],
            ['link'],
          ],
        }
      },
      file: '',
      message: "",
      error: false
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0]
      this.error = false;
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('/upload', formData )
        this.file="";
        this.error = false
      } catch (err) {
        this.error = true
      }

    },
    toggleDialog () {
      this.show = !this.show
      this.$emit('close', this.show)
      this.article = {}
      this.file=""
      this.$refs.file.value = null
    },
    async saveArticle() {
      var data = {
        title: this.article.title,
        content: this.article.content,
        image: this.file.name
      };
      const accessToken = await this.$auth.getTokenSilently()

      DataService.create(data, accessToken)
          .then(response => {
            this.article.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            if (this.$refs.file.files[0]) {
              this.sendFile()
            }
            this.$emit('close', this.show)
            location.reload()
          })
          .catch(e => {
            console.log(e);
          });
    },

    newArticle() {
      this.submitted = false;
      this.article = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

</style>