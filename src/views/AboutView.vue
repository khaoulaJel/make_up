<template>
  <Navigation>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</Navigation>
</template>


<script>

//import { getUser, isLogged, waitForAuthInit, getUserById, observeUserState } from '@/firebase/Authentification/getUser'
//import {addNewQuiz, appendScoreToQuiz, deleteQuiz, UpdateQuiz, updateScoreToQuiz} from '@/firebase/Firestore/addQuiz'
//import { getQuizes, getQuiz} from '@/firebase/Firestore/getQuiz'
import Navigation from '@/components/Navigation.vue'

export default {
    name: 'AboutView',
    components: {
      Navigation
    }}
</script>