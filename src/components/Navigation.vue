<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <div :class="['sidebar', { open: isSidebarOpen }]">
      <!-- Toggle Button -->
      <button class="toggle-btn" @click="toggleSidebar">
        <i class="fas" :class="isSidebarOpen ? 'fa-angle-double-left' : 'fa-angle-double-right'"></i>
      </button>

      <!-- Logo -->
      <img src="@/assets/logo2.png" alt="QuizApp Logo" class="logo" v-if="isSidebarOpen">

      <!-- Sidebar Navigation -->
      <ul v-if="isSidebarOpen">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/quizzes" class="nav-link">Quizzes</router-link></li>
        <li><router-link to="/profile" class="nav-link">Profile</router-link></li>
        <li v-if="isAdmin"><router-link to="/admin" class="nav-link">Admin Dashboard</router-link></li>
      </ul>

      <!-- Logout / Login section -->
      <div class="logout-button">
        <div v-if="isAuthenticated">
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
        <div v-else>
          <router-link to="/auth"><button class="login-btn">Login / Register</button></router-link>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'with-sidebar': isSidebarOpen }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { getUser, isLogged, waitForAuthInit, getUserById } from '@/firebase/Authentification/getUser';
import signOut from '@/firebase/Authentification/SignOut';

export default {
  name: 'Navigation',
  setup() {
    const isSidebarOpen = ref(true);
    const isAdmin = ref(false);
    const isAuthenticated = isLogged();

    async function toggleSidebar() {
      isSidebarOpen.value = !isSidebarOpen.value;
    }

    async function logout() {
      await signOut();
    }

    async function checkAdmin() {
      const user = await getUser();
      if (user) {
        const userDetail = await getUserById(user.uid);
        if (userDetail) {
          isAdmin.value = userDetail.isAdmin;
        }
      }
    }

    waitForAuthInit().then(() => {
      checkAdmin();
    });

    return {
      isSidebarOpen,
      isAdmin,
      isAuthenticated,
      toggleSidebar,
      logout,
    };
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #3f51b5;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: -250px;
  height: 100%;
  transition: left 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
  left: 0;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: -3rem;
  transform: rotate(90deg);
  transition: transform 0.3s ease;
  color: #fff;
}

.toggle-btn i {
  color: #fff;
}

.logo {
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
  display: block;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.sidebar ul li {
  margin-bottom: 1rem;
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

.main-content {
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
  margin-left: 0;
}

.main-content.with-sidebar {
  margin-left: 250px;
}

.logout-button {
  position: absolute;
  bottom: 2rem;
  left: 1rem;
  width: calc(100% - 2rem);
}

.logout-btn,
.login-btn {
  background-color: #5c6bc0;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s;
}

.logout-btn:hover,
.login-btn:hover {
  background-color: #7986cb;
}
</style>
