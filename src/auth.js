import { auth } from './firebase'; 
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         sendEmailVerification, 
         fetchSignInMethodsForEmail, 
         updatePassword } from 'firebase/auth';
import { getFirestore, doc, setDoc,getDoc,collection, query, where, getDocs  } from "firebase/firestore"; 
// import { deleteUser} from 'firebase/auth';
import { deleteDoc } from "firebase/firestore";

const db = getFirestore();




export const register = async (email, newPassword) => {
  try {
    
    const exists = await checkEmailExists(email);
    
    if (!exists) {
      throw new Error('Email is not registered. Please sign up first.');
    }

    const isVerified = await checkEmailVerified(email);
    
    if (!isVerified) {
      throw new Error('Email is not verified. Please verify your email before registering.');
    }


    const userCredential = await createUserWithEmailAndPassword(auth, email, newPassword);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      //role: role 
    });

    return userCredential; 
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; 
  }
};


export const login = async (email, password) => {
  try {
    // Attempt to si  gn in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Retrieve user document from Firestore
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User role:", userData);
      // return { userCredential, role: userData.role }; 
       return { userCredential }; 
    } else {
      throw new Error("User role not found.");
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error; // Rethrow for handling in the calling function
  }
};
export const logout = async () => {
  try {
    await signOut(auth); 
  } catch (error) {
    console.error('Error during logout:', error.message);
    throw error; 
  }
};


export const checkEmailExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods.length === 0) {
      console.log(`No sign-in methods found for ${email}. Checking if user exists...`);
      
      const user = auth.currentUser;

      if (user && user.email === email) {
        console.log(`User found with verified email: ${email}`);
        return true; 
      }

      return false;
    }

    return true; 
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error; 
  }
};

export const checkEmailVerified = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is currently logged in.');
  }

  await user.reload();
  return user.emailVerified;
};



export const updateUserPassword = async (email, tempPassword, newPassword) => {
  const auth = getAuth();

  try {
 
    const userCredential = await signInWithEmailAndPassword(auth, email, tempPassword);
    const currentUser = userCredential.user; 

   
    await currentUser.reload(); 
    if (currentUser.emailVerified) {

      await updatePassword(currentUser, newPassword);
      console.log('Password updated successfully');
    
      return true; 
    } else {
      throw new Error('Email is not verified. Please verify your email before updating the password.');
    }
  } catch (error) {
    console.error('Error during password update:', error.message);
    throw error; 
  }
};
export const getUserByEmail = async (email) => {
  try {
    // Create a query to find the user by email
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // Assuming email is unique and there's only one user with that email
      const userData = querySnapshot.docs[0].data();
      console.log('Fetched user data by email:', userData); // Log the fetched data
      return userData;
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error('Error fetching user data by email:', error.message);
    throw error;
  }
};


export const deleteUserByEmail = async (email) => {
  admin.auth().deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });

  try {
    // Create a query to find the user document by email
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // Assuming email is unique and there's only one user with that email
      const userDocRef = doc(db, "users", querySnapshot.docs[0].id); // Get the document reference using the first match
      await deleteDoc(userDocRef); // Delete the document
      console.log('User document deleted successfully by email');
      return true;
    } else {
      console.error('No user found with email:', email);
      throw new Error('User not found.');
    }
  } catch (error) {
    console.error('Error deleting user document by email:', error.message);
    throw error; // Rethrow the error for handling in the calling function
  }
};

