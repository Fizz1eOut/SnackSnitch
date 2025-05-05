export interface User {
  username: string;
  password: string;
  profile?: UserProfile;
};

export interface UserProfile {
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  goal: 'lose' | 'maintain' | 'gain';
  activity: 'low' | 'medium' | 'high';
}
