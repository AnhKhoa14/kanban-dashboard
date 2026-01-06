import { ref } from 'vue'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, type Unsubscribe } from 'firebase/firestore'
import { useFirebase } from './useFirebase.client'
import { useAuth } from './useAuth'

const messages = ref<any[]>([])
let currentUnsubscribe: Unsubscribe | null = null

export const useChat = async () => {
  const { user } = await useAuth()

  const sendMessage = async (text: string, otherUid: string) => {
    if (!text.trim() || !user.value) return

    const { db } = await useFirebase()
    const roomId = [user.value.uid, otherUid].sort().join('_')

    await addDoc(collection(db, 'messages', roomId, 'messages'), {
      text,
      senderId: user.value.uid,
      createdAt: serverTimestamp()
    })
  }

  const subscribeMessages = async (otherUid: string) => {
    const { db } = await useFirebase()
    const roomId = [user.value.uid, otherUid].sort().join('_')

    messages.value = []
    currentUnsubscribe?.()

    const q = query(collection(db, 'messages', roomId, 'messages'), orderBy('createdAt', 'asc'))

    currentUnsubscribe = onSnapshot(q, snap => {
      messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    })

    return currentUnsubscribe
  }

  return { messages, sendMessage, subscribeMessages }
}
