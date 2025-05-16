import type { UserProfile } from '@/interface/user.interface';

export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;

  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function getActivityMultiplier(activity: string): number {
  switch (activity) {
    case 'low': return 1.2;
    case 'medium': return 1.55;
    case 'high': return 1.725;
    default: return 1.2;
  }
}

export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multiplier = getActivityMultiplier(profile.activity);
  let tdee = bmr * multiplier;

  switch (profile.goal) {
    case 'lose': tdee *= 0.8; break;
    case 'gain': tdee *= 1.15; break;
    case 'maintain': break;
  }

  return Math.round(tdee);
}
