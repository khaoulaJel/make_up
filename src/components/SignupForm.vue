<template>
  <div class="form-container">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
    <form @submit.prevent="handleSignUp" class="flex flex-col space-y-6">
      <input type="text" required placeholder="Display Name" v-model="displayName" class="input-field">
      <input type="email" required placeholder="Email" v-model="email" class="input-field">
      <input type="password" required placeholder="Password" v-model="password" class="input-field">
      <button class="signup-button">Sign Up</button>
      <div class="error text-red-500 mt-4 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useSignup from '@/firebase/Authentification/useSignup';

const emit = defineEmits(['signup']);
const displayName = ref('');
const email = ref('');
const password = ref('');

const { error, signup } = useSignup();

const handleSignUp = async () => {
  await signup(email.value, password.value, displayName.value);
  if (!error.value) {
    emit('signup');
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.input-field {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 10px;
  width: 300px;
}

.signup-button {
  background: #1e3a8a;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1rem 1.5rem; /* Adjusted padding for larger button */
  border-radius: 0.5rem;
  transition: background 0.3s ease;
  font-size: 1rem; /* Adjusted font size */
}

.signup-button:hover {
  background: #3b82f6;
}

.error {
  color: red;
  font-size: 0.875rem;
}
</style>
