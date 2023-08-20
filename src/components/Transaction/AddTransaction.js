import React, { useState } from 'react';
import TransactionForm from './TransactionForm';

const AddTransaction = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Transaction'}
            </button>
            {showForm && <TransactionForm />}
        </div>
    );
}

export default AddTransaction;