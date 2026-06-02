/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { safeStorage } from './storage';

export interface WaitingListEntry {
  name: string;
  email: string;
  date: string;
  time: string;
  country: string;
  source: string;
  device?: string;
  browser?: string;
}

/**
 * Saves a waiting list entry to local storage for persistent storage,
 * dispatches appropriate console logs, and offers hooks for Firebase 
 * and Google Sheets integrations.
 */
export async function saveWaitingListEntry(entry: Omit<WaitingListEntry, 'date' | 'time'>): Promise<boolean> {
  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US');
    const timeStr = now.toLocaleTimeString('en-US');

    const fullEntry: WaitingListEntry = {
      ...entry,
      date: dateStr,
      time: timeStr,
    };

    // 1. Core storage: Local persistence
    const existingStr = safeStorage.getItem('sorrybaba_waiting_list');
    const existingList: WaitingListEntry[] = existingStr ? JSON.parse(existingStr) : [];
    
    // Prevent duplicate emails
    if (existingList.some(item => item.email.toLowerCase() === entry.email.toLowerCase())) {
      console.warn(`[Waiting List] Email '${entry.email}' is already registered in local storage.`);
    } else {
      existingList.push(fullEntry);
      safeStorage.setItem('sorrybaba_waiting_list', JSON.stringify(existingList));
    }

    // 2. Integration hook: Google Sheets (Placeholder)
    // To enable, set up a Google script and replace the code below:
    /*
    const gsheetsUrl = "YOUR_GSHEETS_WEBHOOK_URL";
    await fetch(gsheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullEntry)
    });
    */
    console.log('[Integration Link] Google Sheets webhook integration is ready to be enabled in src/lib/waitingList.ts');

    // 3. Integration hook: Firebase Firestore (Placeholder)
    // To enable, import your firebase db and run:
    /*
    import { db } from './firebase'; // Adjust to where your Firebase configuration is defined
    import { collection, addDoc } from 'firebase/firestore';
    await addDoc(collection(db, 'waiting_list'), fullEntry);
    */
    console.log('[Integration Link] Firebase Firestore integration is ready to be enabled in src/lib/waitingList.ts');

    // Visual console logs for developer transparency
    console.log(
      `%c[SorryBaba Waitlist] Successfully Saved Entry! 💖`,
      'color: #00E676; font-weight: bold; background-color: #1A3322; padding: 4px 8px; border-radius: 4px;',
      fullEntry
    );

    return true;
  } catch (error) {
    console.error('[SorryBaba Waitlist] Error saving registration:', error);
    return false;
  }
}

/**
 * Returns all saved waiting list entries.
 */
export function getWaitingListEntries(): WaitingListEntry[] {
  if (typeof window === 'undefined') return [];
  const listStr = safeStorage.getItem('sorrybaba_waiting_list');
  return listStr ? JSON.parse(listStr) : [];
}
