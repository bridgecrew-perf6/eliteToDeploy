<template>
  <v-dialog v-model="show" scrollable max-width="700px" persistent>
    <v-card>
      <v-toolbar  style="background-color: #003f5f; color: #d9d9d9; font-family: Copperplate,serif;">Modification de l'article :  {{form.title}}
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
                    v-model="form.title"
                    label="Titre"
                    :rules="[rules.required]"
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
                      v-model="form.content"
                      :options="editorOption"
                      :rules="[rules.required]"
                  ></quill-editor>
                </v-card-text>
              </v-col>
            </v-row>
            <v-card-title v-if="this.formErrors.length > 0" style="">
              <v-icon color="red" style='padding-right: 20px' class="material-icons">mdi-alert</v-icon>
              <span  style="font-family: Copperplate,serif; color: #003f5f">Tous les champs sont requis !</span>
            </v-card-title>
            <v-card-actions style="font-family: Copperplate,serif;">
              <v-btn  @click="deleteArticle">
                <v-icon color="#003f5f">mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="#003f5f" text @click=toggleDialog()>Annuler</v-btn>
              <v-btn
                  color="#003f5f"
                  text
                  @click="checkUpdateForm"
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
import {mapGetters} from "vuex";

export default {
  name: "UpdateArticle.vue",
  components: {quillEditor},
  props: ['value'],
  computed: {
    ...mapGetters(['rules'])
  },
  data() {
    return {
      formErrors: [],
      file: '',
      form: {},
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

    setForm(event) {
      this.form.id = event.id
      this.form.title = event.title
      this.form.content = event.content
      this.form.image = event.image
    },

    checkUpdateForm() {
      if (this.form.title &&
          this.form.content
      ) this.updateArticle()
      else this.formErrors.push("error")
    },

    async updateArticle() {
      const accessToken = await this.$auth.getTokenSilently()
      if (this.$refs.file.files[0]) {
        this.form.image = this.file.name
      }
      DataService.update(this.form.id, this.form, accessToken).then(response => {
        console.log(response.data);
        if (this.$refs.file.files[0]) {
          this.sendFile()
        }
        this.$emit('close', this.show)
        this.formErrors = []
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

          DataService.delete(this.form.id, accessToken)
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