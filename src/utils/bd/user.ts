import type { User } from '@/interface/user.interface';
import { initDB } from './index';

export async function addUser(user: User): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');

    store.put(user);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function getUser(username: string): Promise<User | null> {
  const db = await initDB();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');

  return new Promise((resolve, reject) => {
    const request = store.get(username);

    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? (result as User) : null);
    };

    request.onerror = () => reject(request.error);
  });
}
