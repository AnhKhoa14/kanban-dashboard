import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useFirebase } from "~/composable/useFirebase.client";

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  const { auth } = await useFirebase();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const registerWithEmailPassword = async (
  name: string,
  email: string,
  password: string
) => {
  const { auth } = await useFirebase();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const { auth } = await useFirebase();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  })

  const result = await signInWithPopup(auth, provider)
  return result.user
}