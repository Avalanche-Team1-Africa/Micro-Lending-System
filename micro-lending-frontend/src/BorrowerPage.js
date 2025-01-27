import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ethers } from "ethers";
import { loanRequestContract } from "./config";

// ENS resolver function (you can move this to a separate utils file if preferred)
async function resolveENS(nameOrAddress, provider) {
  const network = await provider.getNetwork();

  // ENS is supported on Ethereum networks, not on Avalanche or other chains
  if (
    [1, 3, 4, 5, 42].includes(network.chainId) // Ethereum networks
  ) {
    try {
      const resolvedAddress = await provider.resolveName(nameOrAddress);
      return resolvedAddress || nameOrAddress;
    } catch (error) {
      console.error("Error resolving ENS name:", error);
      return nameOrAddress; // Return the original name if resolution fails
    }
  } else {
    console.warn("ENS resolution not supported on this network.");
    return nameOrAddress; // Return the input as-is
  }
}

const BorrowerPage = () => {
  const [borrower, setBorrower] = useState("");
  const [lender, setLender] = useState("");
  const [amount, setamount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentDeadline, setrepaymentDeadline] = useState("");
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

    if (!borrower || !lender || !amount || !interestRate || !repaymentDeadline) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Check if addresses are valid (0x format, 42 characters)
    if (!borrower.startsWith("0x") || borrower.length !== 42) {
      setError("Invalid borrower address. Please enter a valid 0x address.");
      setLoading(false);
      return;
    }

    if (!lender.startsWith("0x") || lender.length !== 42) {
      setError("Invalid lender address. Please enter a valid 0x address.");
      setLoading(false);
      return;
    }

    // Check for ENS addresses and resolve them
    if (borrower.includes(".eth") || lender.includes(".eth")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const resolvedBorrowerAddress = await resolveENS(borrower, provider);
      const resolvedLenderAddress = await resolveENS(lender, provider);

      if (resolvedBorrowerAddress && resolvedBorrowerAddress !== borrower) {
        setBorrower(resolvedBorrowerAddress);
      }

      if (resolvedLenderAddress && resolvedLenderAddress !== lender) {
        setLender(resolvedLenderAddress);
      }
    }

    if (!window.ethereum) {
      setError("MetaMask is required to submit loan requests.");
      setLoading(false);
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Connected Network:", network);
      console.log("Detected Chain ID:", Number(network.chainId));

      if (Number(network.chainId) !== 43113) {
        setError("Please connect to the Avalanche Fuji C-Chain network.");
        setLoading(false);
        return;
      }

      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      console.log("Signer Address:", walletAddress);

      const contract = new ethers.Contract(
        loanRequestContract.address,
        loanRequestContract.abi,
        signer
      );

      const loanAmountWei = ethers.utils.parseUnits(amount, "ether");

      let estimatedGas;
      try {
        estimatedGas = await contract.estimateGas.createLoanRequest(
          loanAmountWei,
          interestRate,
          parseInt(repaymentDeadline)
        );
      } catch (error) {
        console.error("Gas estimation failed, using fallback value.", error);
        estimatedGas = ethers.utils.parseUnits("300000", "wei"); // Adjust fallback
      }

      const feeData = await provider.getFeeData();
      console.log("Base Fee:", feeData.gasPrice?.toString());
      console.log("Max Fee Per Gas:", feeData.maxFeePerGas?.toString());
      console.log("Max Priority Fee Per Gas:", feeData.maxPriorityFeePerGas?.toString());

      try {
        const tx = await contract.createLoanRequest(
          loanAmountWei,
          interestRate,
          parseInt(repaymentDeadline),
          {
            gasLimit: estimatedGas.mul(1),
            maxFeePerGas: feeData.maxFeePerGas, 
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.div(2),
          }
        );

        const txReceipt = await tx.wait();
        console.log("Transaction Receipt:", txReceipt);

        const loanCreatedEvent = txReceipt.events?.find(
          (e) => e.event === "LoanCreated"
        );
        console.log("Transaction Events:", txReceipt.events);

        if (!loanCreatedEvent) {
          console.error("LoanCreated event not found. Check smart contract.");
          throw new Error("LoanCreated event not emitted.");
        }

        const loanId = loanCreatedEvent.args.loanId.toString();
        console.log("Extracted loan ID:", loanId);

        const loanRequest = {
          userId,
          borrower,
          lender,
          amount: parseFloat(amount),
          interestRate: parseFloat(interestRate),
          repaymentDeadline,
          loanId,
        };

        const response = await axios.post(
          "http://localhost:3000/api/loans/createLoan",
          loanRequest
        );

        setSuccess(response.data.message || "Loan request submitted successfully!");
        setBorrower("");
        setLender("");
        setamount("");
        setInterestRate("");
        setrepaymentDeadline("");

        setTimeout(() => navigate("/BorrowerDashboardPage"), 3000);
      } catch (error) {
        console.error("Error submitting loan request:", error);
        setError("Failed to submit loan request. Please try again.");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error estimating gas or sending transaction:", error);
      setError("Transaction failed. Please check gas settings and network status.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Request a Loan</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}
        {loading && (
          <div style={styles.loadingMessage}>Submitting your loan request...</div>
        )}

        <input
          type="text"
          placeholder="Your C-Chain Address"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Lender's C-Chain address"
          value={lender}
          onChange={(e) => setLender(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Loan Amount (tokens)"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Repayment Deadline (in months)"
          value={repaymentDeadline}
          onChange={(e) => setrepaymentDeadline(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Request Loan"}
        </button>
      </form>
      <Link to="/BorrowerDashboardPage" style={styles.link}>
        Back to Dashboard
      </Link>
    </div>
  );
};

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
