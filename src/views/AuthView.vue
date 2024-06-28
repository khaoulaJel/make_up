<template>
    <div class="bg-gradient min-h-screen flex items-center justify-center">
      <div class="container bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-md max-w-md w-full">
        <div class="auth-form-container">
          <div class="toggle-buttons flex justify-center mb-6">
            <button @click="showLogin = true" :class="['toggle-button', { active: showLogin }]">Sign In</button>
            <button @click="showLogin = false" :class="['toggle-button', { active: !showLogin }]">Sign Up</button>
          </div>
          <transition name="fade" mode="out-in">
            <div v-if="showLogin" key="login">
              <LoginForm @login="enterForum" />
            </div>
            <div v-else key="signup">
              <SignupForm @signup="enterForum" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue';
  import SignupForm from '@/components/SignupForm.vue';
  
  export default {
    components: { LoginForm, SignupForm },
    data() {
      return {
        showLogin: true,
      };
    },
    methods: {
      enterForum() {
        this.$router.push('/browse');
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-gradient {
    background: linear-gradient(to right, #7b2ff7, #f107a3);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensure background covers entire viewport height */
  }
  
  .container {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    padding: 2rem;
    border-radius: 1rem;
    max-width: 400px;
    width: 100%;
  }
  
  .toggle-buttons {
    display: flex;
    justify-content: center;
  }
  
  .toggle-button {
    background: rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    margin: 0 0.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .toggle-button.active {
    background: rgba(0, 0, 0, 0.5);
  }
  
  .toggle-button:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  .auth-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  