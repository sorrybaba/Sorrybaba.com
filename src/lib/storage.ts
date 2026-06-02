/**
 * Safe local storage wrapper preventing SecurityError when cookies/storage 
 * are disabled or inside sandboxed iframes (like AI Studio preview).
 */
export const safeStorage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`[Safe Storage] Failed to get item for key "${key}":`, e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[Safe Storage] Failed to set item for key "${key}":`, e);
    }
  },
  removeItem(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Safe Storage] Failed to remove item for key "${key}":`, e);
    }
  }
};
