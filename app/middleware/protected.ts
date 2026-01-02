export default defineNuxtRouteMiddleware(async () => {
  const user = useUserSession();
  if (!user.loggedIn) return navigateTo("/auth/signin");
});