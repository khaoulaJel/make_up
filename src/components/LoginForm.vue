<template>
  <div class="form-container">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>
    <form @submit.prevent="handleLogin" class="flex flex-col space-y-6">
      <input type="email" required placeholder="Email" v-model="email" class="input-field">
      <input type="password" required placeholder="Password" v-model="password" class="input-field">
      <div class="flex justify-between items-center">
        <a href="#" class="text-sm text-white">Forgot Password?</a>
        <button class="login-button">Sign In</button>
      </div>
      <div class="error text-red-500 mt-4 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useLogin from '@/firebase/Authentification/useLogin';

const emit = defineEmits(['login']);
const email = ref('');
const password = ref('');

const { error, login } = useLogin();

const handleLogin = async () => {
  await login(email.value, password.value);
  if (!error.value) {
    emit('login');
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

.login-button {
  background: #1e3a8a;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1rem 1.5rem; /* Adjust padding to make the button larger */
  border-radius: 0.5rem;
  transition: background 0.3s ease;
  font-size: 1rem; /* Adjust font size */
}

.login-button:hover {
  background: #3b82f6;
}

.error {
  color: red;
  font-size: 0.875rem;
}
</style>
