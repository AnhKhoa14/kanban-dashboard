import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { useFirebase } from "~/composable/useFirebase.client";

export type Task = {
  id?: string;
  name: string;
  tags: string;
  description: string;
  status: string;
};

export const createTask = async (task: Task): Promise<Task> => {
  const { auth, db } = await useFirebase();

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const id = crypto.randomUUID();

  const taskRef = doc(db, "users", user.uid, "tasks", id);

  const newTask: Task = {
    id,
    ...task,
  };

  await setDoc(taskRef, {
    ...task,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

  return newTask;
};

export const getMyTasks = async (): Promise<Task[]> => {
  const { auth, db } = await useFirebase();

  const user = auth.currentUser;
  if (!user) return [];

  const colRef = collection(db, "users", user.uid, "tasks");
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }));
};
