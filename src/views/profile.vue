<template>
  <div v-if="user" class="profile-container">
    <div class="profile-section">
      <div class="profile-header">
        <div v-if="!user.profilePicture" class="avatar" :style="{ backgroundColor: user.profileColor }">
          {{ initial }}
        </div>
        <img v-else class="profile-image" :src="user.profilePicture" alt="Profile Picture">
        <h2 class="user-name">@{{ user.displayName }} <span v-if="user.isAdmin" class="badge-admin">Admin</span></h2>
        <p class="user-email">{{ user.email }}</p>
        <p class="member-since">Member since: {{ user.creationDate }}</p>
      </div>
    </div>

    <div class="content-section">
      <h1 class="section-title">📝 Taken Quizzes:</h1>
      <fieldset v-if="user.quizzes && user.quizzes.length > 0" class="quizzes-fieldset">
        <div class="quizzes-grid">
          <!--<ScoredQuiz v-for="quiz in user.quizzes" :key="quiz.id" class="quiz-item" :quiz="quiz" /> -->
        </div>
      </fieldset>
      <fieldset v-else class="no-quizzes">
        No quizzes taken yet.
      </fieldset>

      <div v-if="user.isAdmin">
        <h1 class="section-title">📝 Created Quizzes:</h1>
        <fieldset v-if="user.created && user.created.length > 0" class="quizzes-fieldset">
          <div class="quizzes-grid">
            <router-link v-for="id in user.created" :key="id" :to="'/quizdetails/'+id">
              <!--<QuizPreview class="quiz-item" :quiz="id" :isAdmin="isVisitorAdmin" /> -->
            </router-link>
          </div>
        </fieldset>
        <fieldset v-else class="no-quizzes">
          <p>No quizzes created yet.</p>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
//import QuizPreview from '@/components/QuizPreview.vue';
//import ScoredQuiz from '@/components/ScoredQuiz.vue';
import { getUser, getUserById } from '@/firebase/Authentification/getUser';

export default {
  name: 'Profile',
  //components: { ScoredQuiz, QuizPreview },
  data() {
    return {
      user: null,
      initial: '',
      isVisitorAdmin: false,
    };
  },
  async created() {
    try {
      const userId = await getUser().uid;
      this.user = await getUserById(userId);
      if (this.user) {
        this.initial = this.user.displayName.charAt(0).toUpperCase();
        this.user.creationDate = this.user.createdAt.toDate().toLocaleDateString();
      } else {
        console.error('User not found.');
      }
    } catch (error) {
      console.log('Error fetching user:');
    }
    
    const curUser = await getUserById(getUser().uid);
    if ( curUser.isAdmin ){
      this.isVisitorAdmin = true;
    }
  },
  watch: {
    $route() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>.profile-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-header {
  margin-bottom: 1rem;
}

.avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  margin: 0 auto;
}

.profile-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 0 auto;
}

.user-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

.badge-admin {
  background-color: red;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
}

.user-email {
  color: #6b7280;
}

.member-since {
  color: #9ca3af;
}

.content-section {
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.quizzes-fieldset {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
}

.no-quizzes {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #6b7280;
}

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.quiz-item {
  margin-bottom: 1rem;
}

</style>