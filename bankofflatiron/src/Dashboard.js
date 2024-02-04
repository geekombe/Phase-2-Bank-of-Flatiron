import React, { useState, useEffect } from 'react';
import './App.css';
export default function Dashboard() {
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/transactions")
            .then(response => response.json())
            .then(data => {
                updateTotals(data);
            });
    }, []); // An empty dependency array means this effect runs only once after the initial render

    const updateTotals = (transactions) => {
        let earnings = 0;
        let spendings = 0;

        transactions.forEach(transaction => {
            if (transaction.type === 'earning') {
                earnings += parseFloat(transaction.amount);
            } else if (transaction.type === 'spending') {
                spendings += parseFloat(transaction.amount);
            }
        });

        setTotalEarnings(earnings);
        setTotalSpendings(spendings);
        setTotalBalance(earnings - spendings);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div id="dashboard">
                <div id="totalEarnings">Total Earnings: ${totalEarnings.toFixed(2)}</div>
                <div id="totalSpendings">Total Spendings: ${totalSpendings.toFixed(2)}</div>
                <div id="balance">Balance: ${totalBalance.toFixed(2)}</div>
            </div>
        </div>
    );
}
