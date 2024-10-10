"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthCheck from '../components/AuthCheck';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://nixty-bank-hosted-backend.vercel.app/auth/userInfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching user info:', error);
      // router.push('/auth/login'); 
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://nixty-bank-hosted-backend.vercel.app/transaction/getTransactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
      await fetchTransactions();
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      localStorage.removeItem("token");
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
      setLoadingLogout(false);
    }
  };

  const handlePayClick = () => {
    setLoadingPayment(true);
    router.push('/dashboard/pay');
  };

  return (
    <AuthCheck>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-dark text-white text-center py-3">
            <h1 className="m-0">Nixty Bank</h1>
          </div>

          <div className="container mt-5">
            <h2 className="text-center">Welcome to your bank account, {userInfo.name}</h2>

            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <div className="card shadow-sm p-4 text-center">
                  <h3>My Balance</h3>
                  <h1 className="text-success">${balance?.toFixed(2)}</h1>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handlePayClick}
                    disabled={loadingPayment}
                  >
                    {loadingPayment ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Pay to Account'
                    )}
                  </button>
                  <div className="mt-3">My A/c no: <strong>{userInfo.accountNumber}</strong></div>
                  <div className="mt-3">My Email: <strong>{userInfo.email}</strong></div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow-sm w-100" style={{ height: '80vh' }}>
                  <div className="card-header">
                    <h4 className="mb-0">Transaction History</h4>
                  </div>
                  <div className="card-body overflow-auto">
                    <ul className="list-group">
                      {transactions.map((transaction) => {
                        const isSender = transaction.sender.username === userInfo.username;
                        const transactionAmount = Math.abs(transaction.amount).toFixed(2);
                        const transactionDescription = isSender
                          ? `To ${transaction.receiver.name}`
                          : `From ${transaction.sender.name}`;

                        const dateObj = new Date(transaction.date);
                        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()} - ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

                        return (
                          <li key={transaction._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong className="text-break">{transaction.description}</strong>
                              <br />
                              <small>{formattedDate}</small>
                              <br />
                              <small>{transactionDescription}</small>
                            </div>
                            <span className={isSender ? 'text-danger' : 'text-success'}>
                              {isSender ? '-' : '+'}${transactionAmount}
                            </span>
                            <button onClick={() => router.push(`/dashboard/transaction/${transaction._id}`)} className="btn btn-link">View Details</button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="position-fixed bottom-0 end-0 p-2">
              <button className="btn btn-danger" onClick={handleLogout} disabled={loadingLogout}>
                {loadingLogout ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthCheck>
  );
};

export default Dashboard;
