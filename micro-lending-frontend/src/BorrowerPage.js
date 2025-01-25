import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BrowserProvider , Contract, parseUnits } from "ethers";


import { loanRequestContract } from "./config"; 

const BorrowerPage = () => {
  const [borrowerAddress, setBorrowerAddress] = useState("");
  const [lenderAddress, setLenderAddress] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentTerms, setRepaymentTerms] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
  
    if (!borrowerAddress || !lenderAddress || !loanAmount || !interestRate || !repaymentTerms) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
  
    // Check if addresses are valid (0x format, 42 characters)
    if (!borrowerAddress.startsWith("0x") || borrowerAddress.length !== 42) {
      setError("Invalid borrower address. Please enter a valid 0x address.");
      setLoading(false);
      return;
    }
  
    if (!lenderAddress.startsWith("0x") || lenderAddress.length !== 42) {
      setError("Invalid lender address. Please enter a valid 0x address.");
      setLoading(false);
      return;
    }
    if (borrowerAddress.includes(".eth") || lenderAddress.includes(".eth")) {
      setError("ENS names are not supported on this network. Please provide a valid 0x address.");
      setLoading(false);
      return;
    }
    // Check if MetaMask is installed
    if (!window.ethereum) {
      setError("MetaMask is required to submit loan requests.");
      setLoading(false);
      return;
    }
  
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      // Initialize the provider without modifying _network
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Connected Network:", network);
      console.log("Detected Chain ID:", Number(network.chainId));
  
      if (Number(network.chainId) !== 43113) {  
        setError("Please connect to the Avalanche Fuji C-Chain network.");
        setLoading(false);
        return;
      }
  
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();  // ✅ Use getAddress() instead of resolveName()
      
      console.log("Signer Address:", walletAddress);
  
      const contract = new Contract(
        loanRequestContract.address,
        loanRequestContract.abi,
        signer
      );
  
      // Convert loan amount to Wei
      const loanAmountWei = parseUnits(loanAmount, "ether");
  
      // Fetch gas price safely
      const gasPrice = await provider.send("eth_gasPrice", []).catch(() => parseUnits("25", "gwei"));
      const gasLimit = 500000;
  
      // Send transaction
      const tx = await contract.createLoanRequest(
        loanAmountWei,
        interestRate,
        parseInt(repaymentTerms),
        { gasLimit, gasPrice }
      );
  
      await tx.wait();
  
      const loanCount = await contract.loanCount();  
  
      const loanRequest = {
        userId,
        borrowerAddress,
        lenderAddress,
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        repaymentTerms,
        loanId: loanCount.toString(),
      };
  
      const response = await axios.post("http://localhost:3000/api/loans", loanRequest);
  
      setSuccess(response.data.message || "Loan request submitted successfully!");
      setBorrowerAddress("");
      setLenderAddress("");
      setLoanAmount("");
      setInterestRate("");
      setRepaymentTerms("");
  
      setTimeout(() => navigate("/BorrowerDashboardPage"), 900000);
    } catch (error) {
      console.error("Error submitting loan request:", error);
      setError("Failed to submit loan request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div style={styles.container}>
      <h2>Request a Loan</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}
        {loading && <div style={styles.loadingMessage}>Submitting your loan request...</div>}

        <input type="text" placeholder="Your C-Chain Address" value={borrowerAddress} onChange={(e) => setBorrowerAddress(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Lender's C-Chain address" value={lenderAddress} onChange={(e) => setLenderAddress(e.target.value)} required style={styles.input} />
        <input type="number" placeholder="Loan Amount (tokens)" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required style={styles.input} />
        <input type="number" placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Repayment Terms (e.g., 12 months)" value={repaymentTerms} onChange={(e) => setRepaymentTerms(e.target.value)} required style={styles.input} />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Request Loan"}
        </button>
      </form>
      <Link to="/BorrowerDashboardPage" style={styles.link}>Back to Dashboard</Link>
    </div>
  );
};

// Styling
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },
  form: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    width: "400px",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "95%",
    padding: "15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
  },
  link: {
    marginTop: "15px",
    textDecoration: "none",
    color: "#007bff",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginBottom: "10px",
  },
  loadingMessage: {
    color: "blue",
    fontSize: "14px",
  },
};

export default BorrowerPage;

