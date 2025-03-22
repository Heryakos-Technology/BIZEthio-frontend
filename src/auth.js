import { auth } from './firebase'; //
import { getAuth } from 'firebase/auth';
// Ensure this path is correct
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  fetchSignInMethodsForEmail 
} from 'firebase/auth';

// Register function
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user); // Send verification email
    return userCredential; // Return the user credential
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; // Propagate the error
  }
};

// Login function
export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password); // Return user credential
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error; // Propagate the error
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth); // Sign out the user
  } catch (error) {
    console.error('Error during logout:', error.message);
    throw error; // Propagate the error
  }
};

// Function to check if email exists
export const checkEmailExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    
    // If the signInMethods array is empty, check if the email is already linked to a verified user
    if (signInMethods.length === 0) {
      console.log(`No sign-in methods found for ${email}. Checking if user exists...`);
      
      // Attempt to get the user data
      const user = auth.currentUser;

      if (user && user.email === email) {
        console.log(`User found with verified email: ${email}`);
        return true; // User exists but is verified, so still valid
      }

      return false;
    }

    return true; // Sign-in methods exist, meaning email is registered
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error; // Propagate error for debugging
  }
};