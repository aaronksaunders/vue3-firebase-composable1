//
// firebaseservice - a composable for managing the interaction
// with firebase
//
// REFERENCE
// @see https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api
//
import { onMounted, ref } from "vue";

// FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase
  .initializeApp({ projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID })
  .firestore();

const userCollection = db.collection("users");

const users = ref<any>([]);
const error = ref<any>(null);
const loading = ref<any>(false);

export default () => {
  /**
   *
   * @param collection returns data for specified collections
   */
  const getCollectionData = async (collection: any) => {
    loading.value = true;
    try {
      const querySnapshot = await collection.get();
      const results = querySnapshot.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id };
      });
      loading.value = false;
      return results;
    } catch (e) {
      error.value = e;
      loading.value = false;
    }
  };

  /**
   * get document from firebase and not local users
   * 
   * @param collection 
   * @param id 
   */
  const getCollectionDoc = async (collection: any, id: string) => {
    loading.value = true;
    try {
      const doc = await collection.doc(id).get();
      loading.value = false;
      return { ...doc.data(), id: doc.id };
    } catch (e) {
      error.value = e;
      loading.value = false;
    }
  };

  /**
   * get the user from the local array
   * @param userId
   */
  const getLocalUser = (userId: string) => {
    return users.value.find((u: any) => u.id === userId);
  };

  const loadUsers = async () => {
    users.value = await getCollectionData(userCollection);
  };

  onMounted(async () => {
    await loadUsers();
  });

  return {
    // functions
    loadUsers,
    getLocalUser,
    getUser : (id: string) => getCollectionDoc(userCollection,id),
    //properties
    users,
    loading,
    error,
  };
};
