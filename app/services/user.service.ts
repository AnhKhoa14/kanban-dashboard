import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "~/configs/firebase";

export const saveUserToFirestore = async (user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}) => {
  const { db } = useFirebase();
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
