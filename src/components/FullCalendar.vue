<template>
  <v-container>
    <v-card>
      <v-toolbar
          style="background-color: #003f5f; color: #d9d9d9; font-family: Copperplate,serif;">
        <v-toolbar-title v-if="isAdmin">Mes rendez-vous</v-toolbar-title>
        <v-toolbar-title v-else>Pour demander un rendez-vous, cliquez sur un jour</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="show = false"
              color="#d9d9d9"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div>
        <v-sheet
            tile
            height="54"
            class="d-flex"
            style="font-family: Copperplate,serif; color: #003f5f"
        >
          <v-btn
              icon
              @click="$refs.calendar.prev()"
              color="#003F5F"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
              icon
              @click="$refs.calendar.next()"
              color="#003F5F"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              @change="getEvents"
              locale="fr"
              style="font-family: Copperplate,serif; color: #003F5F;"
              @click:event="showEvent"
              @click:date="addEvent"
          ></v-calendar>
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :open-on-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card
                color="d9d9d9"
                flat
                persistant
            >

              <v-toolbar
                  :color="selectedEvent.color"
                  style="font-family: Copperplate,serif; color: #d9d9d9"
              >
                <v-btn icon
                       @click="openUpdateForm(selectedEvent)"
                       color="#d9d9d9"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title>{{this.selectedEvent.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon
                       @click="closeSelectedOpen"
                       color="#d9d9d9"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text scrollable style="font-family: Copperplate,serif; color: #003f5f">
                <v-row>
                  {{ this.formattedDate(this.selectedEvent.start) }} - {{this.formattedDate(this.selectedEvent.end)}}
                </v-row>
                <v-row class="text-decoration-underline" style="font-size: 15px">Objet du rendez-vous :</v-row>
                <v-row class="font-italic">" {{selectedEvent.comment}} "</v-row>
                <v-row class="text-decoration-underline" style="font-size: 15px">Coordonnées</v-row>
                <v-row class="font-italic"> Nom : {{this.selectedEvent.name}} </v-row>
                <v-row class="font-italic">Tél : {{this.selectedEvent.phone}} </v-row>
                <v-row class="font-italic">Mail : {{this.selectedEvent.email}} </v-row>
                <v-row class="font-italic" v-if="selectedEvent.status">Rendez-vous confirmé !</v-row>
                <v-row class="font-italic" v-else>Rendez-vous non confirmé</v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="deleteEvent">
                    <v-icon color="#003f5f">mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </div>
    </v-card>
    <AddEvent ref="addEventForm" :visible="showAddEventForm" v-model="showAddEventForm" @close="closeAddForm" :dateEvent="dateEvent"/>
    <UpdateEvent ref="updateEventForm" v-model="showUpdateForm" @close="closeUpdateForm" :visible="showUpdateForm"/>
  </v-container>
</template>


<script>

import CalendarService from "./service/CalendarService";
import {mapActions, mapGetters} from "vuex";
import moment from "moment";
import UpdateEvent from "./UpdateEvent";
import AddEvent from "./AddEvent";

export default {
  components: {
    UpdateEvent, AddEvent
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    ...mapGetters(['isAdmin', 'allEvents'])
  },
  props: ['visible'],
  data() {
    return {
      selectedEvent: {},
      selectedOpen: false,
      selectedElement: null,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      daysOfWeek: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
      weekday: [1, 2, 3, 4, 5],
      value: '',
      events: [],
      eventsWithGoodDate: [],
      showUpdateForm: false,
      eventToUpdate: {},
      showAddEventForm: false,
      dateEvent: ''
    }
  },
  methods: {
    ...mapActions(['getAllEvents']),
    formattedDate(date) {
      return moment(date).format('HH:mm')
    },

    openAddForm() {
      this.showAddEventForm = true
    },
    closeAddForm() {
      this.showAddEventForm = false
      this.getEvents()
      this.$refs.addEventForm.resetAddForm()
    },

    openUpdateForm(event) {
      this.showUpdateForm = true
      this.$refs.updateEventForm.setForm(event)
      this.selectedOpen = false
    },

    closeUpdateForm() {
      this.showUpdateForm = false
      this.$refs.updateEventForm.formErrors = []
      this.getEvents()
    },

    showEvent ({ nativeEvent, event }) {
      if(this.isAdmin) {
        const open = () => {
          this.selectedElement = nativeEvent.target
          this.selectedEvent = event
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      }
    },
    closeSelectedOpen() {
      this.selectedOpen = false
      this.getEvents()
    },

    getStatusColor(status) {
      if(status === true) {
        return "#003f5f"
      } else {
        return "red"
      }
    },

    addEvent() {
      this.dateEvent = this.value
      this.openAddForm()
    },

    getEvents () {
      CalendarService.getAllAppointments()
      .then(response => {
        this.$store.commit('setAllEvents', response.data)
        if (this.isAdmin) {
          this.events = response.data.map(appointments => ({
            ...appointments,
            color: this.getStatusColor(appointments.status),
          }))

        } else {
          this.events = response.data.map(appointments => ({
            ...appointments,
            name: "occupé",
            color: "#003f5f"
          }))
        }
      })
    },

    async deleteEvent() {
      const accessToken = await this.$auth.getTokenSilently()

      let res = await this.$confirm("Tu es sûre de vouloir supprimer ce rendez-vous ?");
      if(res) {
        CalendarService.delete(this.selectedEvent.id, accessToken)
            .then(response => {
              console.log(response.data)
              this.getEvents()
            })
      }
    },
  },
}
</script>
