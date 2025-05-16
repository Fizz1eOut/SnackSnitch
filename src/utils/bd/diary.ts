import { initDB } from '@/utils/bd/index';
import type { DiaryEntry } from '@/interface/diary.interface';

export async function getDiaryEntry(username: string, date: string): Promise<DiaryEntry | undefined> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('diary', 'readonly');
    const store = tx.objectStore('diary');
    const request = store.get([username, date]);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDiaryEntry(entry: DiaryEntry): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('diary', 'readwrite');
    const store = tx.objectStore('diary');
    const request = store.put(entry);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
