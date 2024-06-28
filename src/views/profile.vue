<template>
  <Navigation>
    <div class="user-profile">
      <h1>User Profile</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="form-group">
            <label for="displayName">Display Name:</label>
            <input type="text" v-model="displayName" id="displayName" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" required disabled />
          </div>
          <button type="submit" class="update-button">Update Profile</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>
      </div>
    </div>
  </Navigation>
</template>

<script>
import { ref, onMounted } from 'vue';
import { projectFirestore, projectAuth } from '@/firebase/Config';
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    Navigation
  },
  setup() {
    const user = projectAuth.currentUser;
    const displayName = ref('');
    const email = ref('');
    const error = ref(null);
    const success = ref(null);
    const loading = ref(true);

    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await projectFirestore.collection('Users').doc(user.uid).get();
          if (userDoc.exists) {
            displayName.value = userDoc.data().displayName;
            email.value = userDoc.data().email;
          } else {
            throw new Error('User document does not exist.');
          }
        } catch (err) {
          error.value = 'Failed to load user data';
          console.error(err);
        } finally {
          loading.value = false;
        }
      } else {
        loading.value = false;
        console.warn('User not authenticated.');
      }
    };

    const updateProfile = async () => {
      error.value = null;
      success.value = null;
      try {
        await projectFirestore.collection('Users').doc(user.uid).update({
          displayName: displayName.value,
        });
        await user.updateProfile({ displayName: displayName.value });
        success.value = 'Profile updated successfully';
      } catch (err) {
        error.value = 'Failed to update profile';
        console.error(err);
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      displayName,
      email,
      error,
      success,
      loading,
      updateProfile,
    };
  },
};
</script>


<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-profile h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  margin-top: 2rem;
}

.profile-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus {
  outline: none;
  border-color: #3f51b5;
}

.update-button {
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.update-button:hover {
  background-color: #5c6bc0;
}

.error,
.success {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 5px;
  text-align: center;
}

.error {
  background-color: #f44336;
  color: white;
}

.success {
  background-color: #4caf50;
  color: white;
}
</style>
