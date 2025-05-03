<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useRouter } from 'vue-router';

  const validationSchema = yup.object({
    login: yup.string()
      .required('Enter your login')
      .matches(/^[a-zA-Z0-9_]+$/, 'Login can only contain letters, numbers, and underscores'),

    password: yup.string().required('Enter your password'),
  });

  const { handleSubmit } = useForm({ validationSchema });
  const { value: login, errorMessage: loginError } = useField<string>('login', undefined, { initialValue: '' });
  const { value: password, errorMessage: passwordError } = useField<string>('password', undefined, { initialValue: '' });

  const hasError = computed(() => !!loginError.value || !!passwordError.value);

  const onSubmit = handleSubmit((values) => {
    console.log('Login:', values);
  });

  const showPassword = ref(false);
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      showPassword.value = !showPassword.value;
    }
  };

  const router = useRouter();
  const goToPage = () => {
    router.push('/register');
  };
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <app-title>
      Welcome back!
    </app-title>
    <div class="form__body">
      <div class="form__item">
        <app-input 
          v-model="login" 
          placeholder="Login"
          autocomplete="username"
          :class="{ 'has-error': loginError }"
        />
        <span class="error-message">{{ loginError }}</span>
      </div>

      <div class="form__item">
        <app-input 
          v-model="password" 
          :type="showPassword ? 'text' : 'password'" 
          placeholder="Password"
          autocomplete="current-password"
          :class="{ 'has-error': passwordError }"
        />
        <app-button class="toggle-password" @click="togglePasswordVisibility('password')">
          <app-icon 
            :name="showPassword ? 'eye-off' : 'eye'"
            size="var(--icon-size-sm)" 
            style="color: var(--color-gray)"
          />
        </app-button>
        <span class="error-message">{{ passwordError }}</span>
      </div>

      <div class="form__button">
        <app-button 
          :action="!hasError"
          :disabled="hasError"
          type="submit"
          :class="{ 'has-error': loginError || passwordError }"
        >
          Log in
        </app-button>
      </div>
      <div class="signup">
        <app-button @click="goToPage" class="signup__button" >Don`t have an account? <span>Sign up</span></app-button>
      </div>
    </div>
  </form>
</template>

<style scoped>
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .form__body {
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: var(--section-title-gap);
  }
  .has-error :deep(.input) {
    border: 1px solid var(--color-red);
    border-radius: var(--radius-lg);
  }
  .error-message {
    color: var(--color-red);
    font-size: 12px;
  }
  .form__button {
    display: flex;
    justify-content: center;
  }
  .form__button .button {
    max-width: 250px;
    width: 100%;
  }
  .form__item {
    position: relative;
  }
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 10px;
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  .signup {
    display: flex;
    justify-content: center;
    align-items: center;
  } 
  .signup__button {
    max-width: 250px;
  }
  .signup__button span {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-blue-light);
  }
</style>
