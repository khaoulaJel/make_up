<template>
  <div v-if="event" class="vote-modal">
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p>{{ new Date(event.date).toLocaleString() }}</p>
    <div>
      <button @click="vote('yes')" :disabled="votedYes">Yes</button>
      <button @click="vote('no')" :disabled="votedNo">No</button>
    </div>
    <router-link :to="{ name: 'Browse' }">Back to Events</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { projectFirestore } from '@/firebase/Config';
import { getUser, waitForAuthInit } from '@/firebase/Authentification/getUser';

const route = useRoute();
const event = ref(null);
const votedYes = ref(false);
const votedNo = ref(false);

// Fetch event data and voting status when component is mounted
onMounted(async () => {
  const eventRef = projectFirestore.collection('Events').doc(route.params.id);
  const doc = await eventRef.get();
  if (doc.exists) {
    event.value = doc.data();
  }
  checkVotingStatus();
});

async function checkVotingStatus() {
  const voted = await hasVoted('yes') || await hasVoted('no');
  votedYes.value = voted;
  votedNo.value = voted;
}

const vote = async (voteType) => {
  try {
    const userId = getUser().uid;
    const voteRef = projectFirestore.collection('Votes').doc();

    await voteRef.set({
      eventId: route.params.id,
      userId,
      vote: voteType,
      createdAt: new Date().toISOString()
    });

    // Refresh voting status
    checkVotingStatus();

    const eventRef = projectFirestore.collection('Events').doc(route.params.id);
    if (voteType === 'yes') {
      await eventRef.update({
        yesVotes: event.value.yesVotes + 1
      });
    } else if (voteType === 'no') {
      await eventRef.update({
        noVotes: event.value.noVotes + 1
      });
    }
    
    console.log(`Voted ${voteType} for event ${event.value.title}`);
  } catch (error) {
    console.error('Error voting:', error.message);
  }
};

const hasVoted = async (voteType) => {
  await waitForAuthInit();
  const userId = getUser().uid; 
  let voteQuery = projectFirestore.collection('Votes')
                                  .where('eventId', '==', route.params.id)
                                  .where('userId', '==', userId)
                                  .where('vote', '==', voteType);

  const querySnapshot = await voteQuery.get();
  return !querySnapshot.empty;
};

</script>

<style scoped>
.vote-modal {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
