import { defineStore } from 'pinia';
import { getDiaryEntry, saveDiaryEntry } from '@/utils/bd/diary';
import type { DiaryEntry } from '@/interface/diary.interface';
import { calculateTDEE } from '@/utils/calculations';
import { useUserStore } from '@/stores/user';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export const useProgressStore = defineStore('progress', {
  state: () => ({
    totalKcal: 0,
    remainingKcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    username: '',
    date: getTodayDate()
  }),

  actions: {
    async loadTodayProgress(username: string) {
      const today = getTodayDate();
      const entry = await getDiaryEntry(username, today);
      this.username = username;
      this.date = today;

      if (entry) {
        this.totalKcal = entry.totalKcal;
        this.remainingKcal = entry.remainingKcal;
        this.protein = entry.protein;
        this.fat = entry.fat;
        this.carbs = entry.carbs;
      }
    },

    updateProgress(progress: Omit<DiaryEntry, 'username' | 'date'>) {
      this.totalKcal = progress.totalKcal;
      this.remainingKcal = progress.remainingKcal;
      this.protein = progress.protein;
      this.fat = progress.fat;
      this.carbs = progress.carbs;
    },

    async saveTodayProgressToDB() {
      if (!this.username || !this.date) return;
      await saveDiaryEntry({
        username: this.username,
        date: this.date,
        totalKcal: this.totalKcal,
        remainingKcal: this.remainingKcal,
        protein: this.protein,
        fat: this.fat,
        carbs: this.carbs
      });
    },

    async initializeProgress() {
      const userStore = useUserStore();
      if (!userStore.currentUser?.profile) return;

      const totalKcal = calculateTDEE(userStore.currentUser.profile);

      this.username = userStore.currentUser.username;
      this.totalKcal = totalKcal;
      this.remainingKcal = totalKcal;
      this.protein = 0;
      this.fat = 0;
      this.carbs = 0;

      await this.saveTodayProgressToDB();
    }
  }
});
