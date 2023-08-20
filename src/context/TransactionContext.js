import React, { createContext, useContext, useEffect, useState } from 'react';

const TransactionsContext = createContext();

export const TransactionProvider = ({ children }) => {
    
    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem('budget');
        return savedBudget ? JSON.parse(savedBudget) : {
            food: 100,
            entertainment: 50,
            utilities: 75,
            other: 75,
            // ... other categories
        };
    });    

    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    const [portfolioBalance, setPortfolioBalance] = useState(() => {
        const savedBalance = localStorage.getItem('portfolioBalance');
        console.log('Initial saved balance:', savedBalance);  // check the fetched value from localStorage
        return savedBalance ? parseFloat(savedBalance) : 0;
    });
    
    useEffect(() => {
        console.log('Effect triggered, saving to localStorage:', portfolioBalance);
        localStorage.setItem('portfolioBalance', portfolioBalance);
    }, [portfolioBalance]);
    
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    // New effect to save budget to localStorage
    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    }, [budget]);

    const deleteTransaction = (id) => {
        const transactionToDelete = transactions.find(trans => trans.id === id);
    
        if (transactionToDelete) {
            // Parse the amount to a float to ensure it's a number. If it's not a number, default to 0.
            const parsedAmount = parseFloat(transactionToDelete.amount);
            if (!isNaN(parsedAmount)) {
                // Add back the transaction amount to portfolioBalance.
                setPortfolioBalance(prevBalance => prevBalance + parsedAmount);
            }
        }
    
        setTransactions(transactions => transactions.filter(transaction => transaction.id !== id));
    }      

    const editTransaction = (id, updatedTransactionData) => {
        const oldTransaction = transactions.find(trans => trans.id === id);
    
        if (oldTransaction) {
            const difference = oldTransaction.amount - updatedTransactionData.amount;
            // Adjust the portfolioBalance based on the difference.
            setPortfolioBalance(prevBalance => prevBalance + difference);
        }
    
        setTransactions(prevTransactions => prevTransactions.map(transaction => {
            if (transaction.id === id) {
                return { ...transaction, ...updatedTransactionData };
            } else {
                return transaction;
            }
        }));
    }    

    const addTransaction = (transaction) => {
        const parsedAmount = parseFloat(transaction.amount);
        const newTransaction = { 
            ...transaction, 
            id: Date.now(),
            amount: isNaN(parsedAmount) ? 0 : parsedAmount
        };
        console.log('New portfolio balance after adding transaction:', portfolioBalance);
    
        // Reduce the portfolioBalance by the transaction amount.
        setPortfolioBalance(prevBalance => prevBalance - parsedAmount);
    
        setTransactions(prev => [...prev, newTransaction]);
    };      

    return (
        <TransactionsContext.Provider value={{ transactions, addTransaction, deleteTransaction, editTransaction, budget, setBudget, portfolioBalance, setPortfolioBalance }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionsContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
};