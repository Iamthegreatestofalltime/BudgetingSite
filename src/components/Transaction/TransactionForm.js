import React, { useState } from 'react';
import { useTransactions } from '../../context/TransactionContext';

const TransactionForm = () => {
    const { addTransaction } = useTransactions();
    const [details, setDetails] = useState({
        date: '',
        description: '',
        amount: 0,
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(details);
        setDetails({
            date: '',
            description: '',
            amount: 0,
            category: ''
        });
    }

    return (
        <div className="TransactionForm">
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={details.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={details.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={details.amount}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    value={details.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Select Category--</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}

export default TransactionForm;