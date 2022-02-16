<template>
  <v-dialog v-model="show" scrollable max-width="700px">
    <v-card>
      <v-toolbar color="blue-grey">Nouveau rendez-vous le : {{dateEventComputed}}</v-toolbar>
      <v-card-text>
        <v-form fill-width ref="createEventForm" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="6" class="py-0">
                <v-text-field
                    cols="6"
                    class="py-0"
                    @change="timeEventChange"
                    v-model="timerInput"
                    label="Heure du rendez-vous"
                    type="time"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                    v-model="form.firstname"
                    label="Prénom"
                    required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="form.lastname"
                    label="Nom"
                    required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="form.phone"
                    label="Numéro de téléphone"
                    required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="form.email"
                    label="E-Mail"
                    required
                />
              </v-col>
              <v-col>
                <v-textarea
                    v-model="form.comment"
                    label="Objet du rendez-vous"/>
              </v-col>
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

export default {
  name: "AddEvent.vue",
  props: ['visible', 'dateEvent'],
  created() {
    this.show = this.visible
  },
  watch: {
    visible (v) {
      this.show = v
    }
  },
  computed: {
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
        end: ''
      },
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
    dateEventChange: function (date) {
      this.dateInput = moment(date).format('DD/MM/YYYY')
      console.log("date")
      console.log(date)
    },
    timeEventChange: function (time) {
      this.timeInput = moment(time).format('hh:mm:ss')
      console.log("time")
      console.log(time)
    },

    async addEvent() {
      var data = {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        phone: this.form.phone,
        email: this.form.email,
        comment: this.form.comment,
        //TODO : trouver un autre moyen d'ajouter une heure
        start: moment(this.dateEvent + ' ' + this.timerInput).add('1', "hour").format(),
        end: moment(this.dateEvent+ ' ' + this.timerInput).add("2", "hours").format()
      };
      const accessToken = await this.$auth.getTokenSilently()

      console.log(data)
      CalendarService.create(data, accessToken)
          .then(response => {
            this.form.id = response.data.id
            console.log(response)
            this.$emit('close', this.show)
            //TODO mettre events dans le store et actualiser ici ?
          })
    }
  }
}
</script>

<style scoped>

</style>