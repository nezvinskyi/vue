<template>
  <div class="">
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <!-- <BaseButton>Test</BaseButton> -->
    <!-- <p>
      <router-link :to="{ name: 'event-show', params: { id: '1' } }"
        >First Event</router-link
      >
    </p> -->
  </div>
</template>

<script>
import axios from "axios";
import EventCard from "../components/EventCard.vue";
import EventService from "../services/EventService.js";
// import BaseButton from "@/components/BaseButton.vue";
export default {
  data() {
    return {
      events: [],
    };
  },
  components: {
    EventCard,
    // BaseButton,
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.log(`error`, error.response);
      });
  },
};
</script>
