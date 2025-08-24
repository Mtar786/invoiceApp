import { createStore } from 'vuex';
import {
  getInvoices as fetchFromFirebase,
  addInvoice as addToFirebase,
  updateInvoice as updateInFirebase,
  deleteInvoice as deleteFromFirebase
} from '../firebase';

/**
 * The Vuex store centralises all invoice state and provides actions
 * to interact with Firebase.  Components dispatch actions to perform
 * asynchronous tasks and commit mutations to update the state.
 */
const store = createStore({
  state() {
    return {
      invoices: []
    };
  },
  getters: {
    /**
     * Return invoices sorted by due date descending.
     * @param {Object} state
     * @returns {Array}
     */
    sortedInvoices(state) {
      return [...state.invoices].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateB - dateA;
      });
    }
  },
  mutations: {
    /**
     * Replace all invoices in the state.
     * @param {Object} state
     * @param {Array} invoices
     */
    setInvoices(state, invoices) {
      state.invoices = invoices;
    },
    /**
     * Add a new invoice to the state.
     * @param {Object} state
     * @param {Object} invoice
     */
    addInvoice(state, invoice) {
      state.invoices.push(invoice);
    },
    /**
     * Update an existing invoice in the state.
     * @param {Object} state
     * @param {Object} payload Contains id and data to update
     */
    updateInvoice(state, { id, data }) {
      const index = state.invoices.findIndex(inv => inv.id === id);
      if (index !== -1) {
        state.invoices.splice(index, 1, { id, ...data });
      }
    },
    /**
     * Remove an invoice from the state.
     * @param {Object} state
     * @param {string} id
     */
    removeInvoice(state, id) {
      state.invoices = state.invoices.filter(inv => inv.id !== id);
    }
  },
  actions: {
    /**
     * Load all invoices from Firebase into the store.
     * Called when the component is mounted.
     */
    async fetchInvoices({ commit }) {
      const invoices = await fetchFromFirebase();
      commit('setInvoices', invoices);
    },
    /**
     * Create a new invoice and persist it to Firebase.
     * @param {Object} context
     * @param {Object} invoice
     */
    async createInvoice({ commit }, invoice) {
      const docRef = await addToFirebase(invoice);
      commit('addInvoice', { id: docRef.id, ...invoice });
    },
    /**
     * Update an existing invoice both locally and in Firebase.
     * @param {Object} context
     * @param {Object} payload Contains id and data
     */
    async editInvoice({ commit }, { id, data }) {
      await updateInFirebase(id, data);
      commit('updateInvoice', { id, data });
    },
    /**
     * Delete an invoice from Firebase and remove it from the state.
     * @param {Object} context
     * @param {string} id
     */
    async deleteInvoice({ commit }, id) {
      await deleteFromFirebase(id);
      commit('removeInvoice', id);
    }
  }
});

export default store;