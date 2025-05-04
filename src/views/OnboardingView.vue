<script setup lang="ts">
  import { computed } from 'vue';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppSelect from '@/components/Inputs/AppSelect.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useRouter } from 'vue-router';
  import { addUser, getUser } from '@/utils/bd/user';
  import { useUserStore } from '@/stores/user';

  interface Option extends Record<string, unknown> {
    id: string;
    value: string
  }
  const genderOptions: Option[] = [
    { id: '', value: 'Select gender' },
    { id: 'male', value: 'Male' },
    { id: 'female', value: 'Female' }
  ];
  const goalOptions: Option[] = [
    { id: '', value: 'Select goal' },
    { id: 'lose', value: 'Weight loss' },
    { id: 'maintain', value: 'Maintain weight' },
    { id: 'gain', value: 'Muscle gain' }
  ];
  const activityOptions: Option[] = [
    { id: '', value: 'Select activity level' },
    { id: 'low', value: 'Low activity' },
    { id: 'medium', value: 'Medium activity' },
    { id: 'high', value: 'High activity' }
  ];

  const validationSchema = yup.object({
    height: yup.string().required('Enter your height').matches(/^\d+$/, 'Must be a number'),
    weight: yup.string().required('Enter your weight').matches(/^\d+$/, 'Must be a number'),
    age: yup.string().required('Enter your age').matches(/^\d+$/, 'Must be a number'),
    gender: yup.string().required('Select your gender').notOneOf(['', 'null'], 'Select your gender'),
    goal: yup.string().required('Select your goal').notOneOf(['', 'null'], 'Select your goal'),
    activity: yup.string().required('Select activity').notOneOf(['', 'null'], 'Select activity')
  });

  const { handleSubmit } = useForm({
    validationSchema
  });

  const { value: height, errorMessage: heightError } = useField<number | null>('height', undefined, { initialValue: null });
  const { value: weight, errorMessage: weightError } = useField<number | null>('weight', undefined, { initialValue: null });
  const { value: age, errorMessage: ageError } = useField<number | null>('age', undefined, { initialValue: null });
  const { value: gender, errorMessage: genderError } = useField<string>('gender', undefined, { initialValue: '' });
  const { value: goal, errorMessage: goalError } = useField<string>('goal', undefined, { initialValue: '' });
  const { value: activity, errorMessage: activityError } = useField<string>('activity', undefined, { initialValue: '' });

  // Trigger validation on form submit
  const onSubmit = handleSubmit(
    (values) => {
      console.log('✅ Submitted:', values);
    },
    (errors) => {
      console.warn('❌ Validation errors:', errors);
    }
  );

  const hasError = computed(() =>
    Boolean(heightError.value || weightError.value || ageError.value || 
      genderError.value || goalError.value || activityError.value)
  );
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <app-title>
      Customize Your Profile
    </app-title>
    <div class="form__body">
      <div class="form__item">
        <app-input 
          v-model="height" 
          type="number"
          placeholder="Enter your height"
          :class="{ 'has-error': heightError }"
        />
        <span class="error-message">{{ heightError }}</span>
      </div>

      <div class="form__item">
        <app-input 
          v-model="weight" 
          placeholder="Enter your weight"
          :class="{ 'has-error': weightError }"
        />
        <span class="error-message">{{ weightError }}</span>
      </div>

      <div class="form__item">
        <app-input 
          v-model="age" 
          placeholder="Enter your age"
          :class="{ 'has-error': ageError }"
        />
        <span class="error-message">{{ ageError }}</span>
      </div>

      <div class="form__item">
        <app-select 
          v-model="gender"
          :options="genderOptions"  
          valueKey="id"
          labelKey="value"
          :class="{ 'has-error': genderError }"
        />
        <span class="error-message">{{ genderError }}</span>
      </div>

      <div class="form__item">
        <app-select 
          v-model="goal"
          :options="goalOptions"
          valueKey="id"
          labelKey="value"
          :class="{ 'has-error': goalError }"
        />
        <span class="error-message">{{ goalError }}</span>  
      </div>

      <div class="form__item">
        <app-select 
          v-model="activity"
          :options="activityOptions"
          valueKey="id"
          labelKey="value"
          :class="{ 'has-error': activityError }"
        />
        <span class="error-message">{{ activityError }}</span>
      </div>

      <div class="form__button">
        <app-button
          :action="!hasError"
          :disabled="hasError"
          type="submit"
        >
          Apply
        </app-button>
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
  .has-error :deep(.input),
  .has-error :deep(select) {
    border: 1px solid var(--color-red);
    border-radius: var(--radius-lg);
  }
  .error-message {
    color: var(--color-red);
    font-size: 12px;
  }
</style>

