import React, { useState, useEffect } from 'react';
import './App.css';

export default function Logs() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    useEffect(() => {
        fetch("http://localhost:3000/transactions")
            .then(response => response.json())
            .then(data => {
                setData(data); 
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch data'); 
            });
    }, []); 

    // Filtered data based on the search term
    const filteredData = data.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Transaction History</h1>
            {error && <p>Error: {error}</p>}
            <input
                type="text"
                placeholder="Search by description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{margin: '20px 0', padding: '10px', width: 'calc(100% - 20px)', boxSizing: 'border-box'}}
            />
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((log, index) => (
                            <tr key={index}>
                                <td>{log.type}</td>
                                <td>{log.amount}</td>
                                <td>{log.description}</td>
                                <td>{log.date ? log.date : 'N/A'}</td>
                                <td>{log.category ? log.category : 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>No transactions match your search.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
