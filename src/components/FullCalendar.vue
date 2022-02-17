<template>
  <v-container>
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-toolbar-title>Rendez-Vous</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="show = false"
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
        >
          <v-btn
              icon
              @click="$refs.calendar.prev()"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
              icon
              @click="$refs.calendar.next()"
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
              @click:event="showEvent"
              @click:date="addEvent"
          ></v-calendar>
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card
                color="grey lighten-4"
                min-width="400px"
                flat
            >

              <v-toolbar
                  :color="selectedEvent.color"
                  dark
              >
                <v-btn icon
                       @click="openUpdateForm(selectedEvent)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title>{{this.selectedEvent.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon
                       @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span>{{ this.formattedDate(this.selectedEvent.start) }} - {{this.formattedDate(this.selectedEvent.end)}}</span>
                <h4>Objet du rendez-vous :</h4>
                <p>{{selectedEvent.comment}}</p>
                <h4>Coordonnées</h4>
                <span>Nom : {{this.selectedEvent.name}}</span><br>
                <span>Tél : {{this.selectedEvent.phone}}</span><br>
                <span>Email : {{this.selectedEvent.email}}</span><br>
                <br>
                <span class="font-italic" v-if="selectedEvent.status">Rendez-vous confirmé !</span>
                <span class="font-italic" v-else>Rendez-vous non confirmé</span>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="deleteEvent">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </div>
    </v-card>
    <AddEvent ref="addEventForm" :visible="showAddEventForm" v-model="showAddEventForm" @close="closeAddForm" :dateEvent="dateEvent"/>
    <UpdateEvent v-model="showUpdateForm" @close="closeUpdateForm" :visible="showUpdateForm" :eventToUpdate="eventToUpdate"/>
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
      weekday: [1, 2, 3, 4, 5, 6],
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
      this.eventToUpdate = event
      this.showUpdateForm = true
    },

    closeUpdateForm() {
      this.showUpdateForm = false
      this.getEvents()
    },

    showEvent ({ nativeEvent, event }) {
      if(this.isAdmin) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      }
    },

    getStatusColor(status) {
      if(status === true) {
        return "blue"
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
            color: "grey"
          }))
        }
        // console.log("this.events")
        // console.log(this.events)
        // console.log("this.allEvents")
        // console.log(this.allEvents)
      })
      // this.events = [
      //   {color: 'blue', name: 'User Name', start: '2022-02-04', end: '2022-01-04', comment: "maux de tête"},
      //   {color: 'indigo', name: 'Céline Leroux', start: '2022-02-04 15:00', end: '2022-01-04 16:00'},
      //   {color: 'red', name: 'Sasha Leroux', start: '2022-02-17 13:00', end: '2022-01-17 14:00'},
      //   {color: 'red', name: 'Adeline', start: '2022-02-17 13:00', end: '2022-02-17 14:00'},
      // ]
    },

    async deleteEvent() {
      let res = await this.$confirm("Tu es sûre de vouloir supprimer ce rendez-vous ?");
      if(res) {
        CalendarService.delete(this.selectedEvent.id)
            .then(response => {
              console.log(response.data)
              this.getEvents()
            })
      }
    }
  },
}
</script>
