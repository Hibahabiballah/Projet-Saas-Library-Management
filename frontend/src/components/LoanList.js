import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/loans')
      .then(response => {
        setLoans(response.data);
      })
      .catch(error => {
        setError('Error fetching loans');
        console.error('Error fetching loans:', error);
      });
  }, []);

  return (
    <div>
      <h3>Loans</h3>
      {error && <p>{error}</p>}
      {loans.length === 0 ? (
        <p>No loans available</p>
      ) : (
        <ul>
          {loans.map(loan => (
            <li key={loan.id}>
              Book ID: {loan.BookId}, User ID: {loan.UserId}, Due Date: {loan.dueDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanList;
