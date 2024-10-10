"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container text-center mt-3">
      {/* Logo Section */}
      <div className="mb-4" style={{ backgroundColor: '#343a40', padding: '20px', borderRadius: '0.5rem' }}>
        <h1 className='text-white mb-0'>Nixty Bank</h1>
      </div>

      <h1 className="display-4 font-weight-bold">Welcome to Nixty Bank</h1>
      <p className="lead mt-3">
        Nixty Bank is your reliable partner for managing your finances. 
        We provide a seamless banking experience with secure transactions, 
        easy access to your accounts, which is really fast and secure.
      </p>
      
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Fast & Secure Payment</h5>
              <p className="card-text">Experience quick transactions with top-notch security.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pay with Ease</h5>
              <p className="card-text">Pay either using username or account number for your convenience.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Check transaction history</h5>
              <p className="card-text">You can check detailed information of a specific transaction.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/dashboard">
          <button className="btn btn-primary mx-2">Go to Your Dashboard</button>
        </Link>
        <Link href="/auth/login">
          <button className="btn btn-secondary mx-2">Not Logged In? Login Here</button>
        </Link>
      </div>

      <p className="mt-3">
        <Link href="/auth/signup" className="link-primary">New User? Register here</Link>
      </p>

      <footer className="mt-5">
        <p className="text-muted">© {new Date().getFullYear()} Made by <a href="https://github.com/nitin-is-me" target="_blank" rel="noopener noreferrer">Nitin</a></p>
      </footer>
    </div>
  );
}
