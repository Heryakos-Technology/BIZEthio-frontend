import { auth } from './firebase'; 
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         sendEmailVerification, 
         fetchSignInMethodsForEmail, 
         updatePassword } from 'firebase/auth';
import { getFirestore, doc, setDoc,getDoc } from "firebase/firestore"; 

const db = getFirestore();


export const register = async (email, newPassword,role) => {
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
      role: role 
    });

    return userCredential; 
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; 
  }
};


export const login = async (email, password) => {
  try {
    // Attempt to sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Retrieve user document from Firestore
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User role:", userData.role);
      return { userCredential, role: userData.role }; 
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
      alert('Registered Successfully')
      return true; 
    } else {
      throw new Error('Email is not verified. Please verify your email before updating the password.');
    }
  } catch (error) {
    console.error('Error during password update:', error.message);
    throw error; 
  }
};

