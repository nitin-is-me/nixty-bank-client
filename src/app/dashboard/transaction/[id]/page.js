"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import AuthCheck from '@/app/components/AuthCheck';

const TransactionDetails = () => {
  const params = useParams();
  const { id } = params;
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://nixty-bank-hosted-backend.vercel.app/transaction/getTransaction/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        setError('Could not fetch transaction details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (!transaction) {
    return <div className="text-danger text-center mt-5">Transaction not found.</div>;
  }

  return (
    <AuthCheck>
      <div className="container mt-5">
      <button
          className="btn btn-secondary position-fixed"
          onClick={() => router.push('/dashboard')}
          style={{ top: '0.5rem', left: '0.5rem', zIndex: 1000, fontSize: "0.85rem" }}
        >
          <i className="bi bi-arrow-left"></i> Dashboard
        </button>
        <h1 className='text-center mb-4'>Transaction Details</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5>Sender's Information</h5>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {transaction.sender.name}</p>
                <p><strong>Username:</strong> {transaction.sender.username}</p>
                <p><strong>Account No:</strong> {transaction.sender.accountNumber}</p>
                <p><strong>Email:</strong> {transaction.sender.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5>Receiver's Information</h5>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {transaction.receiver.name}</p>
                <p><strong>Username:</strong> {transaction.receiver.username}</p>
                <p><strong>Account No:</strong> {transaction.receiver.accountNumber}</p>
                <p><strong>Email:</strong> {transaction.receiver.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <h5>Transaction Details</h5>
          </div>
          <div className="card-body">
            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
            <p><strong>Description:</strong> {transaction.description}</p>
            <p><strong>Amount Paid:</strong> ${transaction.amount.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default TransactionDetails;
