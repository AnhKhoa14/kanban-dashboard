import { getMessaging, isSupported } from 'firebase/messaging'
import { useFirebase } from './useFirebase.client'


export const useFirebaseMessaging = async () => {
  if (!(await isSupported())) return null

  const { app } = await useFirebase()
  return getMessaging(app)
}
