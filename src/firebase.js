/**
 * Firebase configuration and helper functions
 *
 * This module initialises Firebase and exposes helper functions for
 * interacting with the Firestore database.  Update the `firebaseConfig`
 * object with your own credentials from your Firebase console.
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// TODO: Replace the following with your own Firebase project configuration.
// You can find these values in your Firebase console under
// Project Settings → General → Your apps.
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);

// A reference to the invoices collection
const invoicesCollection = collection(db, 'invoices');

/**
 * Fetch all invoices from Firestore.
 * @returns {Promise<Array>} An array of invoice objects with id and data
 */
export async function getInvoices() {
  const snapshot = await getDocs(invoicesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Add a new invoice to Firestore.
 * @param {Object} invoice The invoice data to store
 * @returns {Promise} A promise that resolves with the document reference
 */
export async function addInvoice(invoice) {
  return await addDoc(invoicesCollection, invoice);
}

/**
 * Update an existing invoice in Firestore.
 * @param {string} id The ID of the invoice document
 * @param {Object} data The fields to update
 * @returns {Promise} A promise that resolves when the update is complete
 */
export async function updateInvoice(id, data) {
  const invoiceRef = doc(db, 'invoices', id);
  return await updateDoc(invoiceRef, data);
}

/**
 * Delete an invoice from Firestore.
 * @param {string} id The ID of the invoice document
 * @returns {Promise} A promise that resolves when the document is deleted
 */
export async function deleteInvoice(id) {
  const invoiceRef = doc(db, 'invoices', id);
  return await deleteDoc(invoiceRef);
}

export default db;