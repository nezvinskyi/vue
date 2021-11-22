<template>
  <div class="">
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <router-link
      v-if="page != 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      >PrevPage</router-link
    >
    <template v-if="page > 1 && hasNextPage"> | </template>

    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >NextPage</router-link
    >
    <!-- <BaseButton>Test</BaseButton> -->
    <!-- <p>
      <router-link :to="{ name: 'event-show', params: { id: '1' } }"
        >First Event</router-link
      >
    </p> -->
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    EventCard,
    // BaseButton,
  },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: this.perPage,
      page: this.page,
    });
    // EventService.getEvents()
    //   .then(response => {
    //     this.events = response.data;
    //   })
    //   .catch(error => {
    //     console.log(`error`, error.response);
    //   });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    perPage() {
      return parseInt(this.$route.query.limit) || 3;
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage;
    },
    ...mapState(["event", "user"]),
  },
};
</script>
