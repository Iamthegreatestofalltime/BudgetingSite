import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const BudgetSetter = () => {
    const {budget, setBudget} = useTransactions();

    const handleBudgetChange = (category, value) => {
        const parsedValue = parseFloat(value);
        setBudget(prevBudget => ({
            ...prevBudget, 
            [category]: isNaN(parsedValue) ? 0 : parsedValue
        }));
    }
    
    return(
        <div>
            <h2>Set Your Budget</h2>
            {Object.entries(budget).map(([category, amount]) => (
                <div key={category}>
                    <label>{category}:</label>
                    <input type='number' value={amount} onChange={(e) => handleBudgetChange(category, e.target.value)}/>
                </div>
            ))}
        </div>
    );
}

export default BudgetSetter;