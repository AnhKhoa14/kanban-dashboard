<template>
  <v-container fluid class="pa-0 h-100">
    <v-row no-gutters class="h-100">

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div class="login-form">
          <h1 class="text-h5 font-weight-bold mb-2">
            Welcome back!
          </h1>
          <p class="text-medium-emphasis mb-6">
            Enter your credentials to access your account
          </p>

          <v-form>
            <v-text-field v-model="email" label="Email address" placeholder="Enter your email" variant="outlined"
              density="comfortable" class="mb-4" tabindex="1" />

            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-body-2 font-weight-medium">Password</span>
              <v-btn variant="text" size="small" tabindex="-1">Forgot password</v-btn>
            </div>

            <v-text-field v-model="password" placeholder="••••••••" type="password" variant="outlined"
              density="comfortable" class="mb-2" tabindex="2" />

            <v-checkbox label="Remember for 30 days" density="compact" class="mb-4" />

            <v-btn block height="44" color="green-darken-3" class="mb-4" :loading="loading" @click="goToDashboard">
              Login
            </v-btn>
            <p v-if="error" class="text-error text-body-2 mt-2">
              {{ error }}
            </p>

            <div class="divider my-6">Or</div>

            <v-btn block variant="outlined" class="mb-3" prepend-icon="mdi-google" @click="loginGoogle">
              Sign in with Google
            </v-btn>

            <p class="text-body-2 text-center mt-6">
              Don’t have an account?
              <a class="text-decoration-none text-primary font-weight-medium cursor-pointer" @click="goToSignUp">
                Sign Up
              </a>
            </p>
          </v-form>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-none d-md-flex h-screen">
        <v-img width="100%" :src="bgAuth" cover class="auth-image"></v-img>
      </v-col>

    </v-row>
  </v-container>
</template>



<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});
import { ref } from 'vue';
import bgAuth from '../../../assets/image/bg-auth.png';
import { loginWithEmailPassword, loginWithGoogle } from '~/services/auth.service';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const goToSignUp = () => {
  navigateTo('/auth/sign-up');
};

const goToDashboard = async () => {
  try {
    loading.value = true;
    error.value = '';
    await loginWithEmailPassword(email.value, password.value);
    navigateTo('/dashboard');
  } catch (error: any) {
    error.value = error.message || 'An error occurred during login.';
  } finally {
    loading.value = false;
  }
};

const loginGoogle = async () => {
  try {
    loading.value = true;
    const user = await loginWithGoogle();
    console.log('Logged in user:', user);
    navigateTo('/dashboard');
  } catch (error: any) {
    error.value = error.message || 'An error occurred during Google login.';
  } finally {
    loading.value = false;

  }
}

</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 420px;
}

.auth-image {
  border-radius: 35px 0 0 35px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider::before {
  margin-right: 8px;
}

.divider::after {
  margin-left: 8px;
}
</style>
