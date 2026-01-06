import { ref, readonly } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebase } from './useFirebase.client'


const _user = ref<any>(null)
const _ready = ref(false)
let _initialized = false

export const useAuth = async () => {
  const { auth } = await useFirebase()

  if (!_initialized) {
    _initialized = true

    onAuthStateChanged(auth, (u) => {
      _user.value = u
      _ready.value = true
    })
  }

  return {
    user: readonly(_user),
    ready: readonly(_ready)
  }
}
