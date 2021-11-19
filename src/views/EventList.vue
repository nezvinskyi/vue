<template>
  <div class="">
    <h1>Events Listing</h1>
    <EventCard />
    <BaseButton>Test</BaseButton>
    <!-- <p>
      <router-link :to="{ name: 'event-show', params: { id: '1' } }"
        >First Event</router-link
      >
    </p> -->
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
// import BaseButton from "@/components/BaseButton.vue";
export default {
  components: {
    EventCard,
    // BaseButton,
  },
};
</script>
