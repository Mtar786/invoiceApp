<template>
  <div class="container">
    <h1>Invoice Application</h1>
    <!-- Show button to add a new invoice when the form is hidden -->
    <button v-if="!showForm" class="add-button" @click="startAdd">Add Invoice</button>
    <!-- InvoiceForm handles both create and edit operations -->
    <invoice-form
      v-if="showForm"
      :invoice="editingInvoice"
      @save="onSave"
      @cancel="onCancel"
    />
    <!-- List of existing invoices -->
    <invoice-list
      :invoices="invoices"
      @edit="startEdit"
      @delete="deleteInvoice"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import InvoiceList from './components/InvoiceList.vue';
import InvoiceForm from './components/InvoiceForm.vue';

export default {
  name: 'App',
  components: {
    InvoiceList,
    InvoiceForm
  },
  setup() {
    const store = useStore();
    const showForm = ref(false);
    const editingInvoice = ref(null);

    // Computed property to get invoices from the store
    const invoices = computed(() => store.getters.sortedInvoices);

    // Load invoices on mount
    onMounted(() => {
      store.dispatch('fetchInvoices');
    });

    /**
     * Start adding a new invoice by showing the form with no data.
     */
    const startAdd = () => {
      editingInvoice.value = null;
      showForm.value = true;
    };

    /**
     * Start editing an existing invoice by showing the form with invoice data.
     * @param {Object} invoice
     */
    const startEdit = (invoice) => {
      editingInvoice.value = invoice;
      showForm.value = true;
    };

    /**
     * Handle saving of an invoice.  If editing, update the existing invoice;
     * otherwise create a new one.
     * @param {Object} data
     */
    const onSave = async (data) => {
      if (editingInvoice.value) {
        await store.dispatch('editInvoice', { id: editingInvoice.value.id, data });
      } else {
        await store.dispatch('createInvoice', data);
      }
      showForm.value = false;
      editingInvoice.value = null;
    };

    /**
     * Hide the form without saving.
     */
    const onCancel = () => {
      showForm.value = false;
      editingInvoice.value = null;
    };

    /**
     * Delete an invoice by its ID.
     * @param {string} id
     */
    const deleteInvoice = async (id) => {
      await store.dispatch('deleteInvoice', id);
    };

    return {
      invoices,
      showForm,
      editingInvoice,
      startAdd,
      startEdit,
      onSave,
      onCancel,
      deleteInvoice
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  font-family: sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
.add-button {
  display: block;
  margin: 0 auto 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.add-button:hover {
  background-color: #45a049;
}
</style>