<template>
  <div>
    <div class="hero">
      <h1>Welcome to the Event Voting App!</h1>
      <p class="subtext">Participate in events and cast your vote to make a difference.</p>
      <div class="signup-container">
        <p class="signup" @click="goToSignUp">
          <span class="signup-text">Sign up</span>
          to vote on events, see results in real-time, and more!
        </p>
      </div>
      <div class="buttons">
        <router-link to="/browse" class="button">Explore Events</router-link>
        <span class="button" @click="scrollToAbout">Learn More About Us</span>
      </div>
    </div>
    <router-view />
    <div class="about" ref="about">
      <h2>About This Project</h2>
      <p>This Event Voting Application allows users to vote "Yes" or "No" on various events. The goal is to encourage participation and gather opinions on different activities.</p>
      <p>The application includes features such as user authentication, real-time vote updates, and event management. The project leverages Firebase for authentication and data storage, ensuring a secure and responsive user experience across different devices.</p>
    </div>
  </div>
</template>

<script>
import { projectFirestore, projectAuth } from '@/firebase/Config';
import { getUser } from "@/firebase/Authentification/getUser";
import signOut from '@/firebase/Authentification/SignOut.js';

export default {
  name: 'HomeView',
  data() {
    return {
      isAdmin: false,
      events: []
    };
  },
  computed: {
    isAuthenticated() {
      return !!getUser();
    }
  },
  async created() {
    await this.fetchEvents();
    const user = projectAuth.currentUser;
    if (user) {
      const userDoc = await projectFirestore.collection('Users').doc(user.uid).get();
      if (userDoc.exists) {
        this.isAdmin = userDoc.data().admin;
      }
    }
  },
  methods: {
    logout() {
      signOut();
      this.$router.push('/auth');
    },
    goToSignUp() {
      this.$router.push('/auth');
    },
    scrollToAbout() {
      this.$refs.about.scrollIntoView({ behavior: 'smooth' });
    },
    async fetchEvents() {
      const snapshot = await projectFirestore.collection('Events').get();
      this.events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

nav {
  background-color: #070707;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #5c6bc0;
  border-radius: 5px;
}

.hero {
  color: white;
  background: url('@/assets/image2.png') no-repeat center center;
  background-size: cover;
  padding: 5rem 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
}

.subtext {
  font-size: 1.25rem;
  margin: 0 0 2rem 0;
}

.signup-container {
  text-align: center;
  margin: 2rem 0;
}

.signup {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0c0c0d;
  cursor: pointer;
}

.signup-text {
  text-decoration: underline;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.button {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background-color: #dd1515;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.about {
  margin: 2rem auto;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
}

.about h2 {
  font-size: 2rem;
  color: #343a40;
  margin-bottom: 1rem;
  text-align: center;
}

.about p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
