import React, { useState } from 'react';
import AddTransaction from './Transaction/AddTransaction';
import { useTransactions } from '../context/TransactionContext';
import BudgetSetter from './BudgetSetter';
import Reports from './Reports';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const Dashboard = () => {
    const { transactions, deleteTransaction, editTransaction, budget, portfolioBalance, setPortfolioBalance } = useTransactions();
    const [amount, setAmount] = useState("");

    // Local state to manage editing
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    const handleEditClick = (transaction) => {
        setEditingId(transaction.id);
        setFormData(transaction);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (id) => {
        editTransaction(id, formData);
        setEditingId(null);  // Reset the editing state
    };

    const foodExpenses = transactions.filter(t => t.category === 'food').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const foodBudgetLeft = budget.food - foodExpenses;

    const entertainmentExpenses = transactions.filter(t => t.category === 'entertainment').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const entertainmentBudgetLeft = budget.entertainment - entertainmentExpenses;

    const utilitiesExpenses = transactions.filter(t => t.category === 'utilities').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const utilitiesBudgetLeft = budget.utilities - utilitiesExpenses;

    const otherExpenses = transactions.filter(t => t.category === 'other').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const otherBudgetLeft = budget.other - otherExpenses;

    const budgetTotal = budget.other + budget.utilities + budget.entertainment + budget.food;

    const totalExpenses = parseFloat(foodExpenses) + parseFloat(entertainmentExpenses) + parseFloat(utilitiesExpenses) + parseFloat(otherExpenses);

    return (
        
        <div className="Dashboard">
            <h2>Portfolio Balance: {portfolioBalance ? `$${portfolioBalance.toFixed(2)}` : "Loading..."}</h2>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
            <div>
                <label>Amount:</label>
                <input 
                    type='number' 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={() => {
                    setPortfolioBalance(prev => prev + parseFloat(amount));
                    setAmount("");
                }}>Add to Portfolio</button>

                <button onClick={() => {
                    if (portfolioBalance >= parseFloat(amount)) {  // Ensure there's enough balance to withdraw
                        setPortfolioBalance(prev => prev - parseFloat(amount));
                        setAmount("");
                    } else {
                        alert("Not enough balance to withdraw!");
                    }
                }}>Withdraw from Portfolio</button>
            </div>
            <Reports />
            <BudgetSetter />
            Total Budget: ${budgetTotal}
            {foodBudgetLeft < 0 ? <p>You have exceeded your food budget by ${Math.abs(foodBudgetLeft)}</p> 
             : <p>You have ${foodBudgetLeft.toFixed(2)} left in your food budget.</p>}
            {entertainmentBudgetLeft < 0 ? <p>You have exceeded your entertainment budget by ${Math.abs(entertainmentBudgetLeft)}</p> 
             : <p>You have ${entertainmentBudgetLeft.toFixed(2)} left in your entertainment budget.</p>}
            {utilitiesBudgetLeft < 0 ? <p>You have exceeded your utilities budget by ${Math.abs(utilitiesBudgetLeft)}</p> 
             : <p>You have ${utilitiesBudgetLeft.toFixed(2)} left in your utilities budget.</p>}
            {otherBudgetLeft < 0 ? 
            <p>You have exceeded your other budget by ${Math.abs(otherBudgetLeft)}</p> 
            : 
            <p>You have ${otherBudgetLeft.toFixed(2)} left in your other budget.</p>}
            <AddTransaction />
            <TransitionGroup component="div">
                {transactions.map(transaction => (
                    <CSSTransition key={transaction.id} timeout={500} classNames="transaction">
                        <div>
                {editingId === transaction.id ? (
                    <div>
                                            <input name="description" value={formData.description} onChange={handleFormChange} />
                                            <input name="amount" value={formData.amount} onChange={handleFormChange} />
                                            <input name="date" value={formData.date} onChange={handleFormChange} />
                                            <input name="category" value={formData.category} onChange={handleFormChange} />
                                            <button onClick={() => handleFormSubmit(transaction.id)}>Update</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Date: {transaction.date}</p>
                                            <p>Description: {transaction.description}</p>
                                            <p>Amount: {transaction.amount}</p>
                                            <p>Category: {transaction.category}</p>
                                            <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                                            <button onClick={() => handleEditClick(transaction)}>Edit</button>
                                        </div>
                                    )}
                                    </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
}

export default Dashboard;