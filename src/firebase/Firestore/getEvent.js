import { projectFirestore } from '../Config.js';
import { ref } from 'vue';

const getEvents = () => {
    const events = ref([]);
    const error = ref(null);
    
    const loadEvents = async () => {
        try {
            const querySnapshot = await projectFirestore.collection('Events').get();
            const documents = [];
            
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            
            events.value = documents;
        } catch (err) {
            error.value = err.message;
        }
    };

    return { events, error, loadEvents };
};

const getEvent = async (eventId) => {
    try {
        const doc = await projectFirestore.collection('Events').doc(eventId).get();
        
        if (!doc.exists) {
            throw Error('That event does not exist');
        }
        
        return { id: doc.id, ...doc.data() };
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

export { getEvents, getEvent };
