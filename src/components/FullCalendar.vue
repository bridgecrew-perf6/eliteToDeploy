<template>
  <v-container>
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Mes Rendez-Vous</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="show = false"
          >
            Enregistrer
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
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon
                       @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.start"></span>
                <span v-html="selectedEvent.end"></span>
                <span v-html="selectedEvent.comment"></span>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </div>
    </v-card>
  </v-container>
</template>


<script>

export default {
  components: {
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
    }
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
    }
  },
  methods: {
    showEvent ({ nativeEvent, event }) {
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
    },

    //events à récupérer depuis API - DB
    getEvents () {
      this.events = [
        {color: 'blue', name: 'User Name', start: '2022-02-04 12:40', end: '2022-01-04 13:00', comment: "maux de tête"},
        {color: 'indigo', name: 'Céline Leroux', start: '2022-02-04 15:00', end: '2022-01-04 16:00'},
        {color: 'red', name: 'Sasha Leroux', start: '2022-02-17 13:00', end: '2022-01-17 14:00'},
        {color: 'red', name: 'Adeline', start: '2022-02-17 13:00', end: '2022-02-17 14:00'},
      ]
    },
  },
}
</script>
