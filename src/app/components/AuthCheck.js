"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthCheck = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");
                
                // console.log("Verifying token:", token);

                await axios.post('https://nixty-bank-hosted-backend.vercel.app/auth/verifyToken', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token verification failed:', error);
                setIsAuthenticated(false);
                // router.push('/auth/login');  redirecting to login if user is not verified, but im already showing login button
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="text-center" style={{ marginTop: '50px' }}>
                <h2>You're not logged in</h2>
                <button className="btn btn-primary" onClick={() => router.push('/auth/login')}>
                    Login
                </button>
            </div>
        );
    }

    return children;
};

export default AuthCheck;
