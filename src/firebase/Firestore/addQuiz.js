import { projectFirestore } from '../Config.js'

const addNewQuiz = async (uid, data) => {
  if (data == null) {
    return;
  }
  // data.results = [{score: 0, user: uid}]
  const response = await projectFirestore.collection('quizz').add({...data, results: []});

  const userRef = projectFirestore.collection('users').doc(uid);
  const userDoc = await userRef.get();
  const user = userDoc.data();
  const quizzes = user.created || [];
  quizzes.push(response.id);
  await userRef.update({created: quizzes});
}

const appendScoreToQuiz = async (QuizID, uid, score) => {
  const QuizRef = projectFirestore.collection('quizz').doc(QuizID);

  try {
      const Doc = await QuizRef.get();
      if (!Doc.exists) {
          throw new Error('Thread document does not exist.');
      }
      const currentAnswers = Doc.data().results || [];
      currentAnswers.push({score: score, user: uid});
      await QuizRef.update({ results: currentAnswers });
      
      const userRef = projectFirestore.collection('users').doc(uid);
      const userDoc = await userRef.get();
      const user = userDoc.data();
      const quizzes = user.quizzes || [];
      quizzes.push({quizId: QuizID, score: score});
      await userRef.update({quizzes: quizzes});

      console.log('Answer appended successfully!');
  } catch (error) {
      console.error('Error appending answer:', error);
  }
};

const updateScoreToQuiz = async (QuizID, uid, score) => {
  const QuizRef = projectFirestore.collection('quizz').doc(QuizID);

  try {
      const Doc = await QuizRef.get();
      if (!Doc.exists) {
          throw new Error('Thread document does not exist.');
      }
      const currentAnswers = Doc.data().results || [];
      const index = currentAnswers.findIndex(answer => answer.user === uid);
      currentAnswers[index].score = score;
      await QuizRef.update({ results: currentAnswers });
      
      const userRef = projectFirestore.collection('users').doc(uid);
      const userDoc = await userRef.get();
      const user = userDoc.data();
      const quizzes = user.quizzes || [];
      const quizIndex = quizzes.findIndex(quiz => quiz.quizId === QuizID);
      quizzes[quizIndex].score = score;
      await userRef.update({quizzes: quizzes});

      console.log('Answer updated successfully!');
  } catch (error) {
      console.error('Error updating answer:', error);
  }
}

const deleteQuiz = async (QuizID) => {
  const QuizRef = projectFirestore.collection('quizz').doc(QuizID);

  try {
    const doc = await QuizRef.get();
    if (!doc.exists) {
      console.error('Quiz does not exist');
      return;
    }

    const createdBy = doc.data().createdBy;
    const userRef = projectFirestore.collection('users').doc(createdBy);
    const userDoc = await userRef.get();

    const created = userDoc.data().created;
    const index = created.findIndex(quiz => quiz === QuizID);
    if (index !== -1) {
      created.splice(index, 1);
      await userRef.update({ created: created });
    }

    const Userresults = userDoc.data().quizzes;
    const quizIndex = Userresults.findIndex(quiz => quiz.quizId === QuizID);
    if (quizIndex !== -1) {
      Userresults.splice(quizIndex, 1);
      await userRef.update({ quizzes: Userresults });
    }

    await QuizRef.delete();
  } catch (error) {
    console.error('Error deleting quiz:', error);
  }
};


const UpdateQuiz = async (QuizID, data) => {
  const QuizRef = projectFirestore.collection('quizz').doc(QuizID);
  try {
      await QuizRef.update(data);
  } catch (error) {
      console.error('Error updating quiz:', error);
  }
}

export {addNewQuiz, appendScoreToQuiz, deleteQuiz, UpdateQuiz, updateScoreToQuiz}