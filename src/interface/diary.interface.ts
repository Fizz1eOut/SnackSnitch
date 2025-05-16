export interface DiaryEntry {
  username: string;
  date: string; // YYYY-MM-DD
  totalKcal: number;
  remainingKcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface DiaryResponse {
  entries: DiaryEntry[];
  offset: number;
  number: number;
  totalResults: number;
}
