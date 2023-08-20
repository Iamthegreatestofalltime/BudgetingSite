import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTransactions } from '../context/TransactionContext';

const Reports = () => {
    const { transactions } = useTransactions();
    
    const dataByCategory = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.category]) {
            acc[transaction.category] = {
                name: transaction.category,
                value: 0
            };
        }
        acc[transaction.category].value += transaction.amount;
        return acc;
    }, {});

    const expensesOverTime = transactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
            acc[date] = {
                date,
                expense: 0
            };
        }
        acc[date].expense += transaction.amount;
        return acc;
    }, {});

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#FF6F91', '#FF9F40'];

    const dataForPieChart = Object.values(dataByCategory);
    const dataForLineChart = Object.values(expensesOverTime).sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(transactions);
    console.log(dataByCategory);

    return (
        <div>
            <h2>Expenses by Category</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={dataForPieChart}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        dataForPieChart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                <Legend />
            </PieChart>
            <h2>Expenses Over Time</h2>
            <LineChart
                width={500}
                height={300}
                data={dataForLineChart}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(tick) => tick.toFixed(2)} />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Line type="monotone" dataKey="expense" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
}

export default Reports;