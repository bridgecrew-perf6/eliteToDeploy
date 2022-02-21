<template>
  <v-dialog v-model="show" scrollable max-width="700px">
    <v-card>
      <v-toolbar color="blue-grey">Modification du rendez-vous de {{form.name}}</v-toolbar>
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
                  :return-value.sync="startDate"
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
                      @input="onStartDateInput"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    @change="startDateChange"
                    v-model="startDate"
                    no-title
                    :open-date="new Date()"
                    locale="fr-fr"
                    first-day-of-week="1"
                    scrollable
                    color="primary"
                    @input="saveAndCloseDate($refs.dateMenu, startDate, dateMenu)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                    cols="6"
                    class="py-3"
                    v-model="timeStart"
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
            </v-row>
            <v-row>
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
            </v-row>
            <v-row>
              <v-col cols="9">
                <v-textarea
                    v-model="form.comment"
                    label="Objet du rendez-vous"/>
              </v-col>
              <v-col cols="3">
                <template>
                  <v-container
                      class="px-0"
                      fluid
                  >
                    <v-checkbox
                        v-model="form.status"
                        @change="changeCheckboxText"
                    ></v-checkbox>
                    <span v-if="form.status">Rendez-vous confirmé !</span>
                    <span v-else>Rendez-vous à confirmer ?</span>
                  </v-container>
                </template>
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
      get() { return moment(this.startDate).format('DD/MM/YYYY'); },
      set: function (newValue) {
        this.form.dateStart = newValue
      }
    },
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
        startDate: '',
        start: '',
        status: false
      },
      dateMenu: '',
      dateInputStart: '',
      timeStart: '',
      timeInput: '',
      checkboxText: '',
      timerInput: '',
      startDate: '',
      startTime: '',

    }
  },
  methods: {
    toggleDialog () {
      this.show = !this.show
      this.$emit('close', this.show)
    },

    changeCheckboxText(){
      if(this.form.status === false) {
        this.checkboxText = "À confirmer"
      } else this.checkboxText = "Confirmé !"
    },

    saveAndCloseDate(ref, date) {
      ref.save(date)
    },

    onStartDateInput(val) {
      const newDate = moment(val).format('DD/MM/YYYY')
      if (newDate.isValid()) {
        this.startDate = moment(newDate).format('YYYY-MM-DD')
        this.$refs.dateMenu.save(this.startDate)
      }
    },
    startDateChange: function (date) {
      this.dateInputStart = moment(date).format('DD/MM/YYYY')
    },

    setForm(event) {
      this.form.id = event.id
      this.form.firstname = event.firstname
      this.form.lastname = event.lastname
      this.form.email = event.email
      this.form.phone = event.phone
      this.form.comment = event.comment
      this.form.status = event.status
      this.startDate = moment(event.start).format('YYYY-MM-DD')
      this.timeStart = moment(event.start).format('HH:mm')
    },

    async updateEvent() {
      // this.toggleDialog()
      const accessToken = await this.$auth.getTokenSilently()
      const dateToStart = moment(this.startDate + ' ' + this.timeStart).add('1', 'hour').format('YYYY-MM-DD HH:mm')
      const dateToEnd = moment(this.startDate + ' ' + this.timeStart).add('2', 'hour').format('YYYY-MM-DD HH:mm')
      const data = {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        phone: this.form.lastname,
        email: this.form.email,
        comment: this.form.comment,
        status: this.form.status,
        start: dateToStart,
        end: dateToEnd,
      };

      CalendarService.update(this.form.id, data, accessToken)
          .then(response => {
        console.log(response.data)
            this.$emit('close', this.show)
          })
          .catch(e => {
            console.log(e);
          });
    },
  }
}
</script>

<style scoped>

</style>