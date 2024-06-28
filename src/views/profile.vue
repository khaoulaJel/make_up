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
        <h1 class="section-title">📝 Voted Events:</h1>
        <fieldset v-if="user.votedEvents && user.votedEvents.length > 0" class="events-fieldset">
          <div class="events-grid">
            <!--<VotedEvent v-for="event in user.votedEvents" :key="event.id" class="event-item" :event="event" /> -->
          </div>
        </fieldset>
        <fieldset v-else class="no-events">
          No events voted on yet.
        </fieldset>

        <div v-if="user.isAdmin">
          <h1 class="section-title">📝 Created Events:</h1>
          <fieldset v-if="createdEvents && createdEvents.length > 0" class="events-fieldset">
            <div class="events-grid">
              <router-link v-for="id in createdEvents" :key="id" :to="'/eventdetails/'+id">
                <!--<EventPreview class="event-item" :event="id" :isAdmin="isVisitorAdmin" /> -->
              </router-link>
            </div>
          </fieldset>
          <fieldset v-else class="no-events">
            <p>No events created yet.</p>
          </fieldset>
        </div>
      </div>
    </div>
</template>

<script>
//import EventPreview from '@/components/EventPreview.vue';
//import VotedEvent from '@/components/VotedEvent.vue';
import { projectFirestore } from '@/firebase/Config';
import { getUser, getUserById } from '@/firebase/Authentification/getUser';
export default {
  name: 'Profile',
  components: {
    Navigation
    //EventPreview,
    //VotedEvent
  },
  data() {
    return {
      user: null,
      initial: '',
      isVisitorAdmin: false,
      createdEvents: []
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
      console.log('Error fetching user:', error);
    }
    
    const curUser = await getUserById(getUser().uid);
    if (curUser.isAdmin) {
      this.isVisitorAdmin = true;
    }

    const userId = getUser().uid; 
    let voteQuery = projectFirestore.collection('Votes')
                                    .where('eventId', '==', route.params.id)
                                    .where('userId', '==', userId)
                                    .where('vote', '==', voteType);

    const querySnapshot = await voteQuery.get();
    querySnapshot.forEach((doc) => {
      this.createdEvents.push(doc.data());
    });
  },
  watch: {
    $route() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.profile-container {
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

.events-fieldset {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
}

.no-events {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #6b7280;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.event-item {
  margin-bottom: 1rem;
}
</style>
