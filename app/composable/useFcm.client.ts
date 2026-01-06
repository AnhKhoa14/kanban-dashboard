import { getToken, onMessage } from "firebase/messaging"
import { useFirebase } from "./useFirebase.client"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "./useAuth"

export const useFcm = async () => {
  const { user } = await useAuth()
  const config = useRuntimeConfig()
  const { messaging, db } = await useFirebase()

  if (!messaging || !user.value) return null

  const permission = await Notification.requestPermission()
  if (permission !== "granted") return null

  const token = await getToken(messaging, {
    vapidKey: config.public.firebaseVapidKey,
  })

  await setDoc(
    doc(db, "users", user.value.uid),
    {
      fcmToken: {
        [token]: true,
      },
    },
    { merge: true }
  )

  onMessage(messaging, (payload) => {
    if (Notification.permission === "granted") {
      new Notification(
        payload.notification?.title || "New message",
        {
          body: payload.notification?.body,
        }
      )
    }
  })

  return token
}
