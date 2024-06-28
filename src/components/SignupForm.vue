<template>
  <div class="form-container">
    <h2 class="form-title">Sign Up</h2>
    <form @submit.prevent="handleSignUp" class="form">
      <input type="text" required placeholder="Display Name" v-model="displayName" class="input-field">
      <input type="email" required placeholder="University Email" v-model="email" class="input-field">
      <input type="password" required placeholder="Password" v-model="password" class="input-field">
      <button class="signup-button">Sign Up</button>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useSignup from '@/firebase/Authentification/useSignup';
import { isLogged } from '@/firebase/Authentification/getUser';

const emit = defineEmits(['signup']);
const displayName = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const { signup } = useSignup();

const isUniversityEmail = (email) => {
  const universityDomain = '@um6p.ma';
  return email.endsWith(universityDomain);
};

const handleSignUp = async () => {
  if (!isUniversityEmail(email.value)) {
    error.value = 'Please use your university email (@um6p.ma) to sign up.';
    return;
  }
  else {
    error.value = null;
  }
  await signup(email.value, password.value, displayName.value);
  if (!error.value && isLogged()) {
    emit('signup');
  }
};
</script>


<style scoped>
.form-container {
  width: 500px;
  margin: 0 auto;
  padding: 3rem;
  background: transparent;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(15px);
  text-align: center;
}

.form-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: white;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.input-field {
  background: rgba(239, 233, 233, 0.3);
  border: none;
  outline: none;
  color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 350px;
  transition: background 0.3s ease;
}

.input-field:focus {
  background: rgba(255, 255, 255, 0.4);
}

.signup-button {
  background: linear-gradient(135deg, #db1313, #1f1f1f);
   border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  transition: background 0.3s ease;
}

.signup-button:hover {
  background: linear-gradient(135deg, #3b82f6, #1e3a8a);
}

.error {
  color: red;
  font-size: 1rem;
}
</style>
