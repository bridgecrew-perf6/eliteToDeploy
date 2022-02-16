<template>
  <v-dialog v-model="show" scrollable max-width="700px">
    <v-card>
      <v-toolbar color="blue-grey">Modification du rendez-vous de {{eventToUpdate.name}}</v-toolbar>
      <v-card-text>
        <v-form fill-width ref="updateEventForm" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="6" class="py-0">
                <v-menu
                  ref="dateMenu"
                  :close-on-content-click="false"
                  v-model="dateMenu"
                  nudge-right="40"
                  :return-value.sync="eventToUpdate.start"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      v-model="computedDateFormatted"
                      label="Date du rendez-vous"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    @change="dateEventChange"
                    v-model="eventToUpdate.start"
                    no-title
                    :open-date="new Date()"
                    locale="fr-fr"
                    first-day-of-week="1"
                    scrollable
                    color="primary"
                    @input="saveAndCloseDate($refs.dateMenu, eventToUpdate.start, dateMenu)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                    cols="6"
                    class="py-3"
                    @change="timeEventChange"
                    v-model="computedTimer"
                    label="Heure du rendez-vous"
                    type="time"
                ></v-text-field>
              </v-col>
            </v-row>


<!--            <v-text-field-->
<!--                v-model="eventToUpdate.start"-->
<!--            />-->
<!--            <v-text-field-->
<!--                v-model="eventToUpdate.end"-->
<!--            />-->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="eventToUpdate.firstname"
                  label="Prénom"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="eventToUpdate.lastname"
                    label="Nom"
                    required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="eventToUpdate.phone"
                    label="Numéro de téléphone"
                    required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="eventToUpdate.email"
                    label="E-Mail"
                    required
                />
              </v-col>
              <v-col>
                <v-textarea
                    v-model="eventToUpdate.comment"
                    label="Objet du rendez-vous"/>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click=toggleDialog()>Annuler</v-btn>
              <v-btn
                  color="primary"
                  @click="updateEvent"

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
import CalendarService from "./service/CalendarService";
import moment from "moment";

export default {
  name: "UpdateEvent.vue",
  props: ['visible', 'eventToUpdate'],
  computed: {
    computedDateFormatted: {
      get() { return moment(this.eventToUpdate.start).format('DD/MM/YYYY'); },
      set: function (newValue) {
        this.form.start = newValue
      }
    },
    computedTimer: {
      get() {return moment(this.eventToUpdate.start).format('HH:mm')},
      set: function (newValue) {
        this.timeStart = newValue
      }
    }
  },
  created() {
    this.show = this.visible
  },
  watch: {
    visible (v) {
      this.show = v
    }
  },
  data() {
    return {
      show: false,
      form: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        comment: '',
        start: '',
        end: ''
      },
      dateMenu: '',
      // eventDate: '',
      dateInput: '',
      timeStart: '',
      timeInput: ''
      // disabledDates: { weekdays: [1, 6]}
    }
  },
  methods: {
    toggleDialog () {
      this.show = !this.show
      this.$emit('close', this.show)
    },

    dateEventChange: function (date) {
      this.dateInput = moment(date).format('DD/MM/YYYY')
      console.log("date")
      console.log(date)
    },

    timeEventChange: function (time) {
      this.timeInput = moment(time).format('hh:mm')
      console.log("time")
      console.log(time)
    },

    saveAndCloseDate(ref, date) {
      ref.save(date)
    },

    getFormDate() {
      this.form = this.eventToUpdate;
      this.form.start = moment(this.computedDateFormatted + ' ' + this.timeStart).add("1", "hour").format('YYYY-DD-MM HH:mm:ss')
      //TODO : trouver un autre moyen d'ajouter une heure
      this.form.end = moment(this.form.start, 'YYYY-DD-MM HH:mm:ss').add("2", 'hour').format('YYYY-DD-MM HH:mm:ss')
      console.log(this.form)
      },

    updateEvent() {
      this.getFormDate()
      CalendarService.update(this.eventToUpdate.id, this.form).then(response => {
        console.log(this.form)
        console.log(response.data)
        this.$emit('close', this.show)
//todo mettre events dans le store
      })
    },
  }
}
</script>

<style scoped>

</style>