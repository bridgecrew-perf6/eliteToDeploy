<template>
  <v-dialog v-model="show" scrollable max-width="700px" persistent>
    <v-card>
      <v-toolbar style="background-color: #003f5f; color: #d9d9d9; font-family: Copperplate,serif;">Nouveau rendez-vous le : {{dateEventComputed}}
        <v-spacer></v-spacer>
        <v-icon @click=toggleDialog() color="#d9d9d9">mdi-close</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-form fill-width ref="addEventForm" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="6" class="py-0">
                <v-text-field
                    cols="6"
                    class="py-7"
                    v-model="timerInput"
                    label="Heure du rendez-vous"
                    type="time"
                    :rules="[rules.required]"
                    @input="timeEventChange"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="">
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.firstname"
                    label="Prénom"
                    :rules="[rules.required, rules.minTwoChar]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.lastname"
                    label="Nom"
                    :rules="[rules.required, rules.minTwoChar]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.phone"
                    label="Numéro de téléphone"
                    :rules="[rules.required, rules.phone]"

                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="form.email"
                    label="E-Mail"
                    :rules="[rules.required, rules.email]"
                />
              </v-col>
              <v-col>
                <v-textarea
                    v-model="form.comment"
                    label="Objet du rendez-vous"
                    :rules="[rules.required, rules.minTwoChar]"
                />
              </v-col>
              <template>
                <v-container
                    class="px-0"
                    fluid
                >
                  <v-checkbox
                      v-if="isAdmin"
                      v-model="form.status"
                      :label="`Rendez-vous: ${checkboxText}`"
                      @change="changeCheckboxText"
                  ></v-checkbox>
                </v-container>
              </template>
            </v-row>
            <div class="text-center">
              <v-progress-circular v-if="isLoading" indeterminate color="#003f5f"></v-progress-circular>
            </div>
            <v-card-title v-if="this.formErrors.length > 0" style="">
              <v-icon color="red" style='padding-right: 20px' class="material-icons">mdi-alert</v-icon>
              <span  style="font-family: Copperplate,serif; color: #003f5f">Tous les champs sont requis !</span>
            </v-card-title>
            <v-card-actions style="font-family: Copperplate,serif;">
              <v-spacer></v-spacer>
              <v-btn color="#003f5f" text @click=toggleDialog()>Annuler</v-btn>
              <v-btn
                  color="#003f5f"
                  text
                  @click="checkAddForm"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card-text>
      <v-form id="sendMailForm" action="https://formsubmit.co/1ff900ac249a96a1c3d359fb15edf8bd" method="POST">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_subject" value="Nouvelle demande de rendez-vous!">
        <input type="hidden" :value="form.firstname" name="Nom"/>
        <input type="hidden" :value="form.lastname" name="Prénom" />
        <input type="hidden" :value="form.phone" name="Téléphone" />
        <input type="hidden" :value="dateEventComputed" name="Date" />
        <input type="hidden" :value="timerInput" name="Heure du rendez-vous"  />
        <input type="hidden" name="_next" value="https://preprodelitecoaching42.herokuapp.com/submit">
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import CalendarService from "./service/CalendarService";
import {mapGetters} from "vuex";

export default {
  name: "AddEvent.vue",
  props: ['visible', 'dateEvent'],
  created() {
    this.show = this.visible
  },
  watch: {
    visible (v) {
      this.show = v
    },
  },
  computed: {
    ...mapGetters(['rules', 'isAdmin', 'allEvents']),
    dateEventComputed: {
      get() { return moment(this.dateEvent).format('DD/MM/YYYY'); },
      set: function (newValue) {
        this.form.start = newValue
      }
    }
  },
  data() {
    return{
      show: false,
      dateMenu:'',
      dateInput: '',
      timerInput: '',
      form: {
        id: null,
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        comment: '',
        start: '',
        end: '',
        status: false,
      },
      checkboxText: "À confirmer",
      formErrors: [],
      isLoading: false
    }
  },
  methods: {
    toggleDialog () {
      this.show = !this.show
      this.$emit('close', this.show)
    },
    saveAndCloseDate(ref, date) {
      ref.save(date)
    },
    timeEventChange: function (time) {
      this.timerInput = time
    },
    changeCheckboxText(){
      if(this.form.status === false) {
        this.checkboxText = "À confirmer"
      } else this.checkboxText = "Confirmé !"
    },

    checkAddForm() {
      if(this.form.firstname &&
          this.form.lastname &&
          this.form.comment &&
          this.form.email &&
          this.form.phone &&
          this.dateEvent &&
          this.timerInput
      ) this.addEvent()
      else this.formErrors.push("errors")
    },

    resetAddForm() {
      this.form.id= null
      this.form.firstname = ''
      this.form.lastname = ''
      this.form.phone = ''
      this.form.email = ''
      this.form.comment = ''
      this.form.start = ''
      this.form.end = ''
      this.form.status = false
      this.timerInput = ''
      this.formErrors = []
    },

    async sendMail() {
        document.getElementById('sendMailForm').submit()
    },

    async addEvent() {
      this.isLoading = true
      var data = {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        phone: this.form.phone,
        email: this.form.email,
        comment: this.form.comment,
        status: this.form.status,
        start: moment(this.dateEvent + ' ' + this.timerInput).add('1', "hour").format(),
        end: moment(this.dateEvent+ ' ' + this.timerInput).add("2", "hours").format()
      };
      CalendarService.create(data)
          .then(response => {
            this.form.id = response.data.id
            if (!this.isAdmin) this.sendMail()
            this.resetAddForm()
            this.isLoading = false
            this.$emit('close', this.show)
          })
    }
  }
}
</script>

<style scoped>

</style>