<template>
    <v-container fluid class="pa-0 h-100">
        <v-row no-gutters class="h-100">

            <v-col cols="12" md="6" class="d-flex align-center justify-center">
                <div class="register-form">
                    <h1 class="text-h5 font-weight-bold mb-2">
                        Create your account
                    </h1>

                    <v-form>
                        <div class="d-flex justify-space-between align-center mb-2">
                            <span class="text-body-2 font-weight-medium">Name</span>
                        </div>
                        <v-text-field v-model="name" placeholder="Enter your name" variant="outlined"
                            density="comfortable" class="mb-2" tabindex="1" />
                        <div class="d-flex justify-space-between align-center mb-2">
                            <span class="text-body-2 font-weight-medium">Email</span>
                        </div>
                        <v-text-field v-model="email" placeholder="Enter your email" variant="outlined"
                            density="comfortable" class="mb-2" tabindex="2" />

                        <div class="d-flex justify-space-between align-center mb-2">
                            <span class="text-body-2 font-weight-medium">Password</span>
                        </div>

                        <v-text-field v-model="password" placeholder="••••••••" type="password" variant="outlined"
                            density="comfortable" class="mb-2" tabindex="3" />

                        <v-checkbox label="Remember for 30 days" density="compact" class="mb-4" />

                        <v-btn block height="44" color="green-darken-3" class="mb-4" :loading="loading"
                            :disabled="loading" @click="signUp">
                            Sign Up
                        </v-btn>
                        <p v-if="success" class="text-success text-body-2 mt-2 text-center">
                            Registration successful! Redirecting to sign in...
                        </p>
                        <p v-if="error" class="text-error text-body-2 mt-2">
                            {{ error }}
                        </p>

                        <div class="divider my-6">Or</div>

                        <v-btn block variant="outlined" class="mb-3" prepend-icon="mdi-google">
                            Sign in with Google
                        </v-btn>

                        <p class="text-body-2 text-center mt-6">
                            Have an account?
                            <a class="text-decoration-none text-primary font-weight-medium cursor-pointer" @click="goToSignIn">
                                Sign In
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
import { registerWithEmailPassword } from '~/services/auth.service';
import { saveUserToFirestore } from '~/services/user.service';

const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const success = ref(false);
const error = ref('');

const goToSignIn = () => {
    navigateTo('/auth/sign-in');
};

const signUp = async () => {
    try {
        loading.value = true;
        error.value = '';
        success.value = false;
        const user = await registerWithEmailPassword(name.value, email.value, password.value);
        success.value = true;

        await saveUserToFirestore({
            uid: user.uid,
            email: email.value,
            displayName: name.value,
            photoURL: null,
        })
        setTimeout(() => {
            navigateTo('/auth/sign-in');
        }, 1000);
    } catch (err: any) {
        error.value = err.message || 'An error occurred during sign up.';
    } finally {
        loading.value = false;
    }
};

</script>

<style scoped>
.register-form {
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
