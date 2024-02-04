import React, { useState } from 'react';
import './App.css';

export default function AddTransactionForm({ onTransactionAdded }) {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState('');

    const handleSubmit = (event) => {

        const transaction = {
            amount: parseFloat(amount),
            type,
            description,
            date,
            category,
        };

        fetch("http://localhost:3000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(transaction)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {

            setAmount('');
            setType('');
            setDescription('');
            setDate(new Date().toISOString().split('T')[0]);
            setCategory('');
            if(onTransactionAdded) {
                onTransactionAdded(data);
            }
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    };

  

    return (
        <form id="addTransaction" onSubmit={handleSubmit}>
            <input
                type="number"
                id="amount"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <select
                id="type"
                value={type}
                onChange={e => setType(e.target.value)}
            >
                <option value="">Select Type</option>
                <option value="spending">spending</option>
                <option value="earning">earning</option>
            </select>
            <input
                type="date"
                id="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <input
                type="text"
                id="description"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <input
                type="text"
                id="category"
                placeholder="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
            />
            <button type="submit" >Add Transaction</button>
        </form>
    );
}
