<template>
  <div class="app-layout">
    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <!-- Logo -->
      <img src="@/assets/image.png" alt="Logo" class="logo">

      <!-- Navigation Links -->
      <ul class="nav-links">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/browse" class="nav-link">Events</router-link></li>
        <li><router-link to="/profile" class="nav-link">Profile</router-link></li>
        <li v-if="isAdmin"><router-link to="/admin" class="nav-link">Admin Dashboard</router-link></li>
        <li><router-link to="/add" class="nav-link">Add an Event</router-link></li>

      </ul>

      <!-- Logout / Login Section -->
      <div class="auth-buttons">
        <div v-if="isAuthenticated">
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
        <div v-else>
          <router-link to="/auth"><button class="login-btn">Login / Register</button></router-link>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import { ref } from 'vue';
import { getUser, isLogged, waitForAuthInit, getUserById } from '@/firebase/Authentification/getUser';
import signOut from '@/firebase/Authentification/SignOut';

export default {
  name: 'Navigation',
  setup() {
    const isSidebarOpen = ref(false);
    const isAdmin = ref(false);
    const isAuthenticated = ref(false); 

    // Initialize authentication and set the authentication status
    waitForAuthInit().then(() => {
      isAuthenticated.value = isLogged();
      
      // Fetch the user details if the user is authenticated
      if (isAuthenticated.value){
        getUser().then(user => {
        if (user) {
          getUserById(user.uid).then(userDetail => {
            isAdmin.value = userDetail.isAdmin;
          }).catch(error => console.error("Failed to fetch user details:", error));
        }}).catch(error => console.error("Failed to fetch user:", error));
      }
    }).catch(error => console.error("Authentication initialization failed:", error));


    async function logout() {
      await signOut();
    }

    return {
      isAdmin,
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}

.nav-bar {
  display: flex;
  align-items: center;
  background-color: #080808;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 50px; /* Adjust size as needed */
  margin-right: 1rem;
}

.nav-links {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
  flex-grow: 1;
}

.nav-links li {
  margin-right: 1rem; /* Space between items */
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #5c6bc0;
}

.auth-buttons {
  display: flex;
}

.logout-btn, .login-btn {
  background-color: #ee0909;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover, .login-btn:hover {
  background-color: #7986cb;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
