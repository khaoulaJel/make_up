<template>
  <div class="bg-gradient">
    <div class="container">
      <div class="auth-form-container">
        <div class="toggle-buttons">
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
  background: linear-gradient(to right, #000000, #4a4a4a);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(31, 38, 135, 0.37);
  padding: 3rem;
  border-radius: 1.5rem;
  max-width: 600px;
  width: 100%;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.toggle-button {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  margin: 0 0.75rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-button.active {
  background: rgba(0, 0, 0, 0.6);
}

.toggle-button:hover {
  background: rgba(0, 0, 0, 0.5);
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
