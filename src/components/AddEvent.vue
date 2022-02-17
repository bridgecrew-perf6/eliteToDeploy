<template>
  <v-dialog v-model="show" scrollable max-width="700px">
    <v-card>
      <v-toolbar color="blue-grey">Nouveau rendez-vous le : {{dateEventComputed}}</v-toolbar>
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
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="">
              <v-col cols="6">
                <v-text-field
                    v-model="form.firstname"
                    label="Prénom"
                    :rules="[rules.required, rules.minTwoChar]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="form.lastname"
                    label="Nom"
                    :rules="[rules.required, rules.minTwoChar]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="form.phone"
                    label="Numéro de téléphone"
                    :rules="[rules.required, rules.phone]"

                />
              </v-col>
              <v-col cols="6">
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
                    :rules="[rules.minTwoChar]"
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click=toggleDialog()>Annuler</v-btn>
              <v-btn
                  color="primary"
                  @click="addEvent"
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
        status: false
      },
      checkboxText: "À confirmer"
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
    // timeEventChange: function (time) {
    //   this.timeInput = moment(time).format('hh:mm')
    // },
    changeCheckboxText(){
      if(this.form.status === false) {
        this.checkboxText = "À confirmer"
      } else this.checkboxText = "Confirmé !"
    },

    resetAddForm() {
      this.form = {}
      this.timerInput = null
    },

    async addEvent() {
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
            this.$emit('close', this.show)
          })
    }
  }
}
</script>

<style scoped>

</style>