import { initDB } from '@/utils/bd/index';
import type { Progress } from '@/interface/progress.interface';

export async function getProgress(username: string): Promise<Progress | undefined> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('progress', 'readonly');
    const store = tx.objectStore('progress');
    const request = store.get(username);

    request.onsuccess = () => resolve(request.result as Progress | undefined);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProgress(data: Progress): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('progress', 'readwrite');
    const store = tx.objectStore('progress');
    const request = store.put(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
