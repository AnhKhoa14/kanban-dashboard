// ~/composables/useChatTest.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useFirebase } from './useFirebase.client'

export const sendTestMessage = async () => {
  const { db } = await useFirebase()
  await addDoc(collection(db, 'messages', 'test-room', 'messages'), {
    text: "Hello, this is a test message",
    senderId: "system",
    createdAt: serverTimestamp()
  })
  console.log("Test message sent!")
}
