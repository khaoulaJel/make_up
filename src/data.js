const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCOqG9bUKu_3iKRR0ym5j_WOUyoFw561oQ",
  authDomain: "ratt-27.firebaseapp.com",
  projectId: "ratt-27",
  storageBucket: "ratt-27.appspot.com",
  messagingSenderId: "488910907351",
  appId: "1:488910907351:web:f7b7f715ea44e0f5638d92"
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

const sampleEvents = [
  {
    title: "Welcome Party",
    description: "A welcome party for new students to meet and greet.",
    date: "2024-09-01T18:00:00Z",
    yesVotes: 150,
    noVotes: 10,
    createdAt: "2024-08-01T12:00:00Z",
    updatedAt: "2024-08-25T15:30:00Z"
  },
  {
    title: "Tech Talk: AI Innovations",
    description: "A tech talk on the latest innovations in artificial intelligence.",
    date: "2024-10-15T14:00:00Z",
    yesVotes: 120,
    noVotes: 25,
    createdAt: "2024-09-10T10:00:00Z",
    updatedAt: "2024-09-20T16:00:00Z"
  },
  {
    title: "Charity Run",
    description: "A charity run to raise funds for local non-profits.",
    date: "2024-11-05T08:00:00Z",
    yesVotes: 200,
    noVotes: 5,
    createdAt: "2024-10-01T09:00:00Z",
    updatedAt: "2024-10-20T11:30:00Z"
  },
  {
    title: "Cultural Fest",
    description: "A festival to celebrate the diverse cultures within the university.",
    date: "2024-12-01T12:00:00Z",
    yesVotes: 180,
    noVotes: 15,
    createdAt: "2024-11-01T14:00:00Z",
    updatedAt: "2024-11-25T13:30:00Z"
  },
  {
    title: "Coding Bootcamp",
    description: "A week-long bootcamp to improve coding skills.",
    date: "2025-01-10T10:00:00Z",
    yesVotes: 250,
    noVotes: 30,
    createdAt: "2024-12-10T15:00:00Z",
    updatedAt: "2024-12-20T12:00:00Z"
  }
];

// Function to add events to Firestore
const addEventsToFirestore = async (eventsData) => {
  try {
    for (const event of eventsData) {
      await db.collection("Events").add(event);
      console.log(`Event "${event.title}" added successfully`);
    }
  } catch (error) {
    console.error("Error adding events to Firestore: ", error);
  }
};

// Call the function to add data to Firestore
const populateFirestore = async () => {
  await addEventsToFirestore(sampleEvents);
};

populateFirestore();
