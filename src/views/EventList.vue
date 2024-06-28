<template>
  <div class="event-list-container">
    <h1>Events</h1>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search events by title...">
      <button @click="search">Search</button>
    </div>
    <div class="events">
      <div v-if="filteredEvents.length > 0" class="event-item" v-for="event in filteredEvents" :key="event.id">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p>{{ new Date(event.date).toLocaleString() }}</p>
        <p>Yes Votes: {{ event.yesVotes }} | No Votes: {{ event.noVotes }}</p>
        <router-link :to="'/vote/' + event.id" class="vote-link"> Vote</router-link>
      </div>
      <div v-else-if="events.length === 0">No events found.</div>
      <div v-else>Loading...</div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>

    <VoteModal v-if="selectedEvent" :event="selectedEvent" @close-modal="closeVoteModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getEvents } from '@/firebase/Firestore/getEvent.js';
import VoteModal from '@/views/VoteModal.vue'; // Ensure correct import path

const { events, error, loadEvents } = getEvents();
const searchQuery = ref('');
const selectedEvent = ref(null);

const filteredEvents = computed(() => {
  if (!searchQuery.value) {
    return events.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    return events.value.filter(event => 
      event.title.toLowerCase().includes(query)
    );
  }
});



const search = () => {
  
};

loadEvents().catch(err => {
  error.value = err.message;
});

const openVoteModal = (event) => {
  selectedEvent.value = event;
};

const closeVoteModal = () => {
  selectedEvent.value = null;
};
</script>

<style scoped>
.event-list-container {
  background-color: #fafafa; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
}

.events {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.event-list-container > h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

@media (min-width: 768px) {
  .events {
    grid-template-columns: repeat(3, 1fr);
  }
}

.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  padding: 10px;
  width: 60%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.search-bar button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #040404;
  color: #fff;
  cursor: pointer;
}

.event-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.event-item h2 {
  margin-top: 0;
}
.vote-link {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #e50c0c;
  color: white;
  text-align: center;
  text-decoration: none;
}

.error {
  color: red;
  text-align: center;
}
</style>
