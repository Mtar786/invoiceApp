<template>
  <div class="invoice-form">
    <h2>{{ invoice ? 'Edit Invoice' : 'Add New Invoice' }}</h2>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="clientName">Client Name</label>
        <input
          id="clientName"
          v-model="form.clientName"
          type="text"
          required
          placeholder="e.g. Acme Corporation"
        />
      </div>
      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input
          id="dueDate"
          v-model="form.dueDate"
          type="date"
          required
        />
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          id="amount"
          v-model.number="form.amount"
          type="number"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="save">{{ invoice ? 'Update' : 'Save' }}</button>
        <button type="button" class="cancel" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'InvoiceForm',
  props: {
    invoice: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      form: {
        clientName: '',
        dueDate: '',
        amount: '',
        status: 'Pending'
      }
    };
  },
  watch: {
    // When the invoice prop changes, prefill the form or reset it
    invoice: {
      immediate: true,
      handler(newInvoice) {
        if (newInvoice) {
          this.form = {
            clientName: newInvoice.clientName || '',
            dueDate: newInvoice.dueDate || '',
            amount: newInvoice.amount || '',
            status: newInvoice.status || 'Pending'
          };
        } else {
          this.form = {
            clientName: '',
            dueDate: '',
            amount: '',
            status: 'Pending'
          };
        }
      }
    }
  },
  methods: {
    /**
     * Emit the form data to the parent component.  Basic validation is
     * performed by HTML required attributes and type checking.
     */
    submit() {
      const data = {
        clientName: this.form.clientName.trim(),
        dueDate: this.form.dueDate,
        amount: parseFloat(this.form.amount),
        status: this.form.status
      };
      this.$emit('save', data);
    },
    /**
     * Cancel editing/creating and reset the form.
     */
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.invoice-form {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
h2 {
  margin-top: 0;
}
.form-group {
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 0.25rem;
  font-weight: bold;
}
.form-group input,
.form-group select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.save {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}
.cancel {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}
.save:hover {
  background-color: #45a049;
}
.cancel:hover {
  background-color: #da190b;
}
</style>