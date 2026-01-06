import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "~/composable/useFirebase.client";

export const saveUserToFirestore = async (user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}) => {
  const { db } = await useFirebase();
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
      role: "user",
      createdAt: serverTimestamp(),
    });
  }
};
