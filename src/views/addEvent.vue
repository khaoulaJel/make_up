<template>
    <div class="create-event">
      <h1 class="create-event-title">Create a New Event</h1>
      <form @submit.prevent="addEvent" class="event-form">
        <div class="form-group">
          <label for="title" class="form-label">Event Title:</label>
          <input type="text" id="title" v-model="title" class="form-input">
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Event Description:</label>
          <textarea id="description" v-model="description" class="form-textarea"></textarea>
        </div>
        <div class="form-group">
          <label for="date" class="form-label">Event Date:</label>
          <input type="datetime-local" id="date" v-model="text" class="form-input">
        </div>
        <button type="submit" class="submit-button">Create Event</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import { projectFirestore } from '@/firebase/Config';
  import { getUser } from '@/firebase/Authentification/getUser';
  
  export default {
    name: 'AddEvent',
    data() {
      return {
        title: '',
        description: '',
        date: ''
      };
    },
    methods: {
      async addEvent() {
        try {
          const user = await getUser();
          const eventData = {
            title: this.title,
            description: this.description,
            
            yesVotes: 0,
            noVotes: 0,
            createdBy: user.uid,
            createdAt: new Date()
          };
          await projectFirestore.collection('Events').add(eventData);
          this.$router.push({ path: '/browse' });
        } catch (error) {
          console.error('Error adding event:', error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .create-event {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
  }
  
  .create-event-title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  
  .event-form {
    background-color: black; /* Changed background color to black */
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 30px;
  }
  
  .form-label {
    font-size: 20px;
    display: block;
    margin-bottom: 10px;
    color: #f9f6f6;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 18px;
    color: #666;
    background-color: #fff; /* Set background color for input and textarea */
  }
  
  .submit-button {
    background-color: rgb(235, 18, 18);
    color: #fff;
    border: none;
    padding: 15px 40px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: rgb(189, 28, 60);
  }
  </style>
  