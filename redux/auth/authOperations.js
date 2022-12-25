import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { app, auth } from "../../firebase";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getSatte) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        login
      );

      updateProfile(auth.currentUser, {
        displayName: login,
      }).then(() => {
        dispatch(
          updateUserProfile({
            userId: userCredential.user.uid,
            login: userCredential.user.displayName,
            email: userCredential.user.email,
          })
        );
      });
    } catch (error) {
      Alert.alert(error.message);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
        // console.log(`userCredential.user`, userCredential.user);
    } catch (error) {
      Alert.alert(`${error.message}`);
      console.log("error.message", error.message);
      showLoginError(error);
    }
  };

export const authStateCahngeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email:user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getSatte) => {
  signOut(auth)
    .then(() => {
      console.log(`Sign-out successful`);
      dispatch(authSignOut());
    })
    .catch((error) => {
      console.log(error);
    });
};
