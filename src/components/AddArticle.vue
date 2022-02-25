<template>
  <v-dialog v-model="show" scrollable max-width="700px" persistent>
    <v-card>
      <v-toolbar style="background-color: #003f5f; color: #d9d9d9; font-family: Copperplate,serif;">Nouvel Article
        <v-spacer></v-spacer>
        <v-btn
            dark
            text
            @click="toggleDialog()"
            color="#d9d9d9"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form fill-width ref="addArticleForm" lazy-validation >
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="article.title"
              label="Titre"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="large-12 medium-12 small-12 cell">
              <label>Image
                <input type="file" id="file" ref="file" @change="selectFile()"/>
              </label>
            </div>
          </v-col>
          <v-col>
            <div>
              <quill-editor
                  v-model="article.content"
                  :options="editorOption"
                  style="min-height:300px;"
                  :rules="[rules.required]"
              ></quill-editor>
            </div>
          </v-col>
        </v-row>
        <v-card-title v-if="this.formErrors.length > 0" style="">
          <v-icon color="red" style='padding-right: 20px' class="material-icons">mdi-alert</v-icon>
          <span  style="font-family: Copperplate,serif; color: #003f5f">Tous les champs sont requis !</span>
        </v-card-title>
        <v-card-actions style="font-family: Copperplate,serif;">
          <v-spacer></v-spacer>
          <v-btn color="#003f5f" text @click=toggleDialog()>Annuler</v-btn>
          <v-btn
              color="#003f5f"
              @click="checkForm"
              text

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
// import DataService from "./service/DataService";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import axios from "axios";
// import moment from "moment";
import {mapGetters} from "vuex";

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
  computed: {
    ...mapGetters(['rules'])
  },
  components: {quillEditor},
  data() {
    return {
      article: {
        id: null,
        title: "",
        content: "",
      },
      imageUrl: '',
      formErrors: [],
      submitted: false,
      show: false,
      imageName:"",
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
      error: false
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0]
      this.error = false;
    },

    checkForm() {
      if(this.article.title &&
          this.article.content
      ) this.saveArticle()
      else this.formErrors.push("error")
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('/upload', formData ).then(res => {
          console.log("formData")
          console.log(formData)
          console.log("res.data")
          console.log(res.data)
          this.imageUrl = res.data.message
        })
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
    resetAddForm() {
      this.article.title = ''
      this.article.content = ''
    },

    async saveArticle() {
      if (this.$refs.file.files[0]) {
        await this.sendFile()
      }

      if(this.file) {
        this.imageName = this.imageUrl
      } else {
        this.imageName = "https://res.cloudinary.com/hghzq1rcq/image/upload/v1645784132/noimage_rxm5ck.jpg"
      }

     /* var data = {
        title: this.article.title,
        content: this.article.content,
        image: this.imageName,
        createdAt: moment.now()
      };
      const accessToken = await this.$auth.getTokenSilently()*/
    /*  DataService.create(data, accessToken)
          .then(response => {
            this.article.id = response.data.id;
            this.submitted = true;
            this.formErrors = [];
            this.resetAddForm();
            this.$emit('close', this.show)

          }).catch(e => {
        console.log(e);
      });*/

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