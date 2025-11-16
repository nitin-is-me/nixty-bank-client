"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthCheck from '../components/AuthCheck';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const router = useRouter();

  const overallLoading = userLoading || transactionsLoading;

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://nixty-bank-hosted-backend.vercel.app/auth/userInfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(res.data);
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Error fetching user info:", err);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://nixty-bank-hosted-backend.vercel.app/transaction/getTransactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sorted);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setTransactionsLoading(false);
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
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
      setLoadingLogout(false);
    }
  };

  const handlePayClick = () => {
    setLoadingPayment(true);
    router.push("/dashboard/pay");
  };

  // 👇 Stronger guard — waits until real data exists
  if (overallLoading || !userInfo || balance === null) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthCheck>
      <div>
        <div className="bg-dark text-white text-center py-3">
          <h1 className="m-0">Nixty Bank</h1>
          <button
            className="btn btn-danger position-absolute"
            style={{ top: "1rem", right: "1rem", fontSize: "0.85rem" }}
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Logout"
            )}
          </button>
        </div>

        <div className="container mt-5">
          <h2 className="text-center">Welcome to your bank account, {userInfo.name}</h2>

          <div className="row justify-content-center mt-4">
            <div className="col-md-6">
              <div className="card shadow-sm p-4 text-center">
                <h3>My Balance</h3>
                <h1 className="text-success">${balance.toFixed(2)}</h1>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handlePayClick}
                  disabled={loadingPayment}
                >
                  {loadingPayment ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "Pay to Account"
                  )}
                </button>
                <div className="mt-3">My A/c no: <strong>{userInfo.accountNumber}</strong></div>
                <div className="mt-3">My Email: <strong>{userInfo.email}</strong></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm w-100" style={{ height: "80vh" }}>
                <div className="card-header">
                  <h4 className="mb-0">Transaction History</h4>
                </div>
                <div className="card-body overflow-auto">
                  <ul className="list-group">
                    {transactions.map((t) => {
                      const isSender = t.sender.username === userInfo.username;
                      const dateObj = new Date(t.date);
                      const formattedDate = `${dateObj.getDate().toString().padStart(2, "0")}/${(dateObj.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${dateObj.getFullYear()} - ${dateObj
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;

                      return (
                        <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="text-break">{t.description}</strong>
                            <br />
                            <small>{formattedDate}</small>
                            <br />
                            <small>{isSender ? `To ${t.receiver.name}` : `From ${t.sender.name}`}</small>
                          </div>
                          <span className={isSender ? "text-danger" : "text-success"}>
                            {isSender ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                          </span>
                          <button
                            onClick={() => router.push(`/dashboard/transaction/${t._id}`)}
                            className="btn btn-link"
                          >
                            View Details
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default Dashboard;
