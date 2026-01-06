import { useAuth } from "~/composable/useAuth";

export default defineNuxtRouteMiddleware(async () => {
  const { user, ready } = await useAuth();
  if (!ready.value) return;
  if (!user.value) return navigateTo("/auth/sign-in");
});
