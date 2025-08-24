<template>
  <div class="invoice-list">
    <p v-if="!invoices || invoices.length === 0" class="empty">No invoices found. Click <strong>Add Invoice</strong> to get started.</p>
    <table v-else class="invoice-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.clientName }}</td>
          <td>{{ formatDate(invoice.dueDate) }}</td>
          <td>{{ formatCurrency(invoice.amount) }}</td>
          <td>{{ invoice.status }}</td>
          <td>
            <button class="edit" @click="$emit('edit', invoice)">Edit</button>
            <button class="delete" @click="$emit('delete', invoice.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'InvoiceList',
  props: {
    invoices: {
      type: Array,
      default: () => []
    }
  },
  emits: ['edit', 'delete'],
  methods: {
    /**
     * Format a date string into the user's locale.
     * @param {string} dateStr
     * @returns {string}
     */
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    /**
     * Format a number as currency.
     * @param {number} value
     * @returns {string}
     */
    formatCurrency(value) {
      if (value == null) return '';
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  }
};
</script>

<style scoped>
.invoice-list {
  margin-top: 1rem;
}
.invoice-table {
  width: 100%;
  border-collapse: collapse;
}
.invoice-table th,
.invoice-table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}
.invoice-table th {
  background-color: #f2f2f2;
}
.edit {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  cursor: pointer;
  border-radius: 3px;
}
.delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 3px;
}
.edit:hover {
  background-color: #0b7dda;
}
.delete:hover {
  background-color: #da190b;
}
.empty {
  text-align: center;
  color: #777;
  margin-top: 2rem;
}
</style>