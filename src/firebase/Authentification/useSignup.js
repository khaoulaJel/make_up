import { projectFirestore, projectAuth } from "@/firebase/Config"; 
import { ref } from "vue";

const error = ref(null);

const signup = async (email, password, displayName) => {
    error.value = null;
    try {
        const response = await projectAuth.createUserWithEmailAndPassword(email, password);
        
        const newDATA = {
            createdAt: new Date(),
            displayName: displayName,
            isAdmin: false,
            email: email,
            created: [] 
        };
        await projectFirestore.collection('users').doc(response.user.uid).set(newDATA);

        await response.user.updateProfile({displayName: displayName, isAdmin: false});
        error.value = null;
        return response;
    } catch (err) {
        console.log(err);
        error.value = err.message;
        throw err;
    }
};

const useSignup = () => {
    return { error, signup };
};

export default useSignup;
