<template>
  <v-dialog v-model="show" scrollable max-width="700px" persistent>
    <v-card>
      <v-toolbar  style="background-color: #003f5f; color: #d9d9d9; font-family: Copperplate,serif;">Modification de l'article :  {{articleToUpdate.title}}
        <v-spacer></v-spacer>
        <v-btn
            dark
            text
            @click="show = false"
            color="#d9d9d9"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form fill-width ref="updateArticleForm" lazy-validation >
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                    v-model="articleToUpdate.title"
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
                      v-model="articleToUpdate.content"
                      :options="editorOption"
                  ></quill-editor>
                </v-card-text>
              </v-col>
            </v-row>
            <v-card-actions style="font-family: Copperplate,serif;">
              <v-btn  @click="deleteArticle">
                <v-icon color="#003f5f">mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="#003f5f" text @click=toggleDialog()>Annuler</v-btn>
              <v-btn
                  color="#003f5f"
                  text
                  @click="updateArticle"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import DataService from "./service/DataService";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import axios from "axios";

export default {
  name: "UpdateArticle.vue",
  components: {quillEditor},
  props: ['value', 'articleToUpdate'],
  data() {
    return {
      file: '',
      show: false,
      editorOption: {
        theme: 'snow',
        placeholder: "Taper l'article ici ...",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
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
    }
  },

  created() {
    this.show = this.value
  },
  watch: {
    value (v) {
      this.show = v
    }
  },
  methods: {
    toggleDialog () {
      this.show = !this.show
      this.$emit('close', this.show)
      this.article = {}
      this.file=""
      this.$refs.file.value = null
    },

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

    async updateArticle() {
      const accessToken = await this.$auth.getTokenSilently()
      if (this.$refs.file.files[0]) {
        this.articleToUpdate.image = this.file.name
      }
      DataService.update(this.articleToUpdate.id, this.articleToUpdate, accessToken).then(response => {
        console.log(response.data);
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
    async deleteArticle() {
      let res = await this.$confirm('Tu es sûre de vouloir supprimer cet article ?' )
      if(this.$refs.updateArticleForm.validate())
        if(res) {
          const accessToken = await this.$auth.getTokenSilently()

          DataService.delete(this.articleToUpdate.id, accessToken)
              .then(response => {
                console.log(response.data);
                this.$emit('close', this.show)
                location.reload()
              })
              .catch(e => {
                console.log(e);
              });
        }
    }
  }
}
</script>

<style scoped>

</style>