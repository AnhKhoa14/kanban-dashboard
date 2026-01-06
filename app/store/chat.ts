// store/chat.ts
export const useChatStore = defineStore('chat', {
  state: () => ({
    activeChatUserId: null as string | null
  }),

  actions: {
    setActiveChat(uid: string | null) {
      this.activeChatUserId = uid
    }
  }
})
