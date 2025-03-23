import { auth } from './firebase'; 
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         sendEmailVerification, 
         fetchSignInMethodsForEmail, 
         updatePassword } from 'firebase/auth';


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
    

    return userCredential; 
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; 
  }
};


export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error; 
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
      alert('User Registered Successfully')
      return true; 
    } else {
      throw new Error('Email is not verified. Please verify your email before updating the password.');
    }
  } catch (error) {
    console.error('Error during password update:', error.message);
    throw error; 
  }
};