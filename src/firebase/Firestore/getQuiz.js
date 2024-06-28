import { projectFirestore } from '../Config.js'
import { ref } from 'vue'

const getQuizes = () => {
    const posts = ref([]);
    const error = ref(null);
    
    const load = async () => { 
     try {
        const querySnapshot = await projectFirestore.collection('quizz').get();
        
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        posts.value = documents;
     }
     catch(err) {
        error.value = err.message
     }
   }
    
   return {posts, error, load}   
}

const getQuiz = async (id) => {
   try {
      const doc = await projectFirestore.collection('quizz').doc(id).get();
      if (!doc.exists) {
         throw Error('That quiz does not exist');
      }
      return { id: doc.id, ...doc.data() };
   }
   catch(err) {
      console.error(err.message);
      return null;
   }
}


export { getQuizes, getQuiz}