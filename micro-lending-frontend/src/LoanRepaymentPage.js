import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loanRequestContract, loanRepaymentContract } from "./config";
import { ethers } from "ethers";
import axios from "axios";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import styled, { keyframes, css } from "styled-components";
import { FiArrowLeft, FiCheckCircle, FiDollarSign, FiClock, FiPercent, FiUser, FiHash, FiZap } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";

// ===== MAGICAL ANIMATIONS =====
const spellCast = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 0; }
  20% { transform: scale(1.2) rotate(5deg); opacity: 1; }
  40% { transform: scale(0.95) rotate(-5deg); }
  60% { transform: scale(1.1) rotate(3deg); }
  80% { transform: scale(0.98) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const etherFloat = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const runeGlow = keyframes`
  0% { opacity: 0.3; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.5); }
  100% { opacity: 0.3; filter: brightness(1); }
`;

const wizardBeam = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const particleExplode = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
`;

// ===== ENCHANTED COMPONENTS =====
const WizardPortal = styled(motion.div)`
  font-family: 'Cinzel', serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #0a0e23, #1a1b3a, #2d2b5a);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(94, 231, 223, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.15) 0%, transparent 25%);
    z-index: 0;
    animation: ${runeGlow} 8s infinite alternate;
  }
`;

const SpellbookForm = styled(motion.form)`
  background: rgba(15, 23, 42, 0.8);
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 
    0 0 25px rgba(94, 231, 223, 0.3),
    0 0 50px rgba(138, 43, 226, 0.2);
  width: 100%;
  max-width: 550px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      transparent 45%,
      rgba(94, 231, 223, 0.1) 50%,
      transparent 55%
    );
    transform: rotate(20deg);
    animation: ${wizardBeam} 6s linear infinite;
    z-index: -1;
  }
`;

const ArcaneInput = styled(motion.div)`
  width: 100%;
  margin: 1.5rem 0;
  position: relative;
  transform-style: preserve-3d;

  input {
    width: 100%;
    padding: 1.3rem 1.3rem 1.3rem 4rem;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(94, 231, 223, 0.3);
    border-radius: 15px;
    font-size: 1.1rem;
    color: #e2e8f0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    font-family: 'Cinzel', serif;
    
    &:focus {
      outline: none;
      border-color: #5ee7df;
      box-shadow: 
        0 0 0 3px rgba(94, 231, 223, 0.3),
        0 0 20px rgba(94, 231, 223, 0.2);
      background: rgba(30, 41, 59, 0.8);
      transform: translateZ(10px);
    }
    
    &::placeholder {
      color: rgba(226, 232, 240, 0.6);
      font-style: italic;
    }
  }

  svg {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #5ee7df;
    transition: all 0.4s ease;
    filter: drop-shadow(0 0 5px rgba(94, 231, 223, 0.7));
  }

  &:hover {
    svg {
      transform: translateY(-50%) scale(1.2);
      animation: ${spellCast} 0.8s ease;
    }
  }
`;

const EnchantedButton = styled(motion.button)`
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(94, 231, 223, 0.8),
    rgba(138, 43, 226, 0.8)
  );
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow: 
    0 5px 15px rgba(94, 231, 223, 0.4),
    0 5px 30px rgba(138, 43, 226, 0.3);
  position: relative;
  overflow: hidden;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: 'Cinzel', serif;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.6s;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-5px) translateZ(10px);
    box-shadow: 
      0 10px 20px rgba(94, 231, 223, 0.6),
      0 10px 40px rgba(138, 43, 226, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  ${props => props.$loading && css`
    &::after {
      content: '';
      width: 24px;
      height: 24px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  `}
`;

const RuneBadge = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(94, 231, 223, 0.8),
    rgba(138, 43, 226, 0.8)
  );
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  margin: 2rem 0;
  box-shadow: 
    0 5px 15px rgba(94, 231, 223, 0.4),
    0 5px 30px rgba(138, 43, 226, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  font-family: 'Cinzel', serif;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    z-index: -1;
    filter: blur(15px);
    opacity: 0.7;
  }
`;

const PortalExit = styled(motion(Link))`
  margin-top: 3rem;
  text-decoration: none;
  color: #5ee7df;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(94, 231, 223, 0.3);
  font-family: 'Cinzel', serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(94, 231, 223, 0.2);
    transform: translateY(-5px);
    box-shadow: 
      0 5px 15px rgba(94, 231, 223, 0.3),
      0 5px 30px rgba(138, 43, 226, 0.2);
  }
`;

const SpellEffect = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(
    circle at center,
    rgba(94, 231, 223, 0.4) 0%,
    transparent 70%
  );
  z-index: -1;
  pointer-events: none;
`;

const EthereumGlyph = styled(motion.div)`
  position: absolute;
  color: rgba(94, 231, 223, 0.1);
  font-size: 20rem;
  z-index: 0;
  pointer-events: none;
  animation: ${etherFloat} 15s ease-in-out infinite;
`;

const MagicParticle = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.color || '#ff0'};
  border-radius: 50%;
  z-index: 10;
  animation: ${particleExplode} 1s ease-out forwards;
`;

const LoanRepaymentPage = () => {
  const [lender, setLender] = useState("");
  const [borrower, setBorrower] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentDeadline, setRepaymentDeadline] = useState("");
  const [loanId, setLoanId] = useState("");
  const [loanCreated, setLoanCreated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSpell, setActiveSpell] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const controls = useAnimation();

  const castSpell = async () => {
    setActiveSpell(true);
    
    // Create magic particles
    const colors = ['#5ee7df', '#8a2be2', '#ff0', '#f0f', '#0ff'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
    
    await controls.start({
      scale: [1, 1.5, 1],
      opacity: [0, 1, 0],
      transition: { duration: 1.5 }
    });
    
    setActiveSpell(false);
    setTimeout(() => setParticles([]), 1000);
  };

  const LoanRequest = async (e) => {
    e.preventDefault();
    if (!lender || !borrower || !amount || !interestRate || !repaymentDeadline) {
      alert("Please fill all fields.");
      return;
    }
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    
    setIsProcessing(true);
    await castSpell();
    
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(loanRequestContract.address, loanRequestContract.abi, signer);
      const loanAmountWei = ethers.utils.parseEther(amount.toString());
      const tx = await contract.createLoanRequest(loanAmountWei, interestRate, repaymentDeadline);
      await tx.wait();
      const loanCount = await contract.loanCount();
      setLoanId(loanCount.toString());
      setLoanCreated(true);
      setShowSuccess(true);
      
      await axios.post("http://localhost:3000/api/loans/createLoan", {
        loanId,
        lender,
        borrower,
        amount,
        interestRate,
        repaymentDeadline,
      });
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating loan:", error);
      alert(`Failed to create loan: ${error.reason || error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const repayLoan = async (e) => {
    e.preventDefault();
    if (!loanId || !amount) {
      alert("Please provide loan ID and amount.");
      return;
    }

    setIsProcessing(true);
    await castSpell();
    
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(loanRepaymentContract.address, loanRepaymentContract.abi, signer);
      const loan = await contract.loans(loanId);
      const principalAmountWei = loan[0];
      const interestRate = loan[1];
      const interestAmountWei = principalAmountWei.mul(interestRate).div(100);
      const totalFundingAmountWei = principalAmountWei.add(interestAmountWei);
      const userAmountWei = ethers.utils.parseUnits(amount.toString(), "ether");

      if (userAmountWei.lt(totalFundingAmountWei)) {
        alert(`Funding amount must be at least ${ethers.utils.formatEther(totalFundingAmountWei)} AVAX (including interest).`);
        return;
      }

      const tx = await contract.lendFunds(loanId, { value: userAmountWei });
      await tx.wait();
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/BorrowerDashboardPage");
      }, 2000);
    } catch (error) {
      console.error("Error funding loan:", error);
      alert(`Failed to fund loan: ${error.reason || error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <WizardPortal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Ethereum Glyphs */}
      <EthereumGlyph style={{ top: '15%', left: '10%' }}>
        <FaEthereum />
      </EthereumGlyph>
      <EthereumGlyph style={{ bottom: '20%', right: '15%', animationDelay: '3s' }}>
        <FaEthereum />
      </EthereumGlyph>

      {/* Magic Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <MagicParticle
            key={particle.id}
            color={particle.color}
            initial={{ 
              x: `${particle.x}%`, 
              y: `${particle.y}%`,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              scale: [0, 1, 1.5],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1, 
              delay: particle.delay 
            }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </AnimatePresence>

      {/* Spell Effects */}
      <AnimatePresence>
        {activeSpell && (
          <SpellEffect
            initial={{ scale: 0.5, opacity: 0 }}
            animate={controls}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Success Rune */}
      <AnimatePresence>
        {showSuccess && (
          <RuneBadge
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 100,
              fontSize: '1.5rem'
            }}
          >
            <FiZap /> {loanCreated ? "LOAN REPAID!" : "LOAN CREATED!"}
          </RuneBadge>
        )}
      </AnimatePresence>

      <SpellbookForm
        onSubmit={loanCreated ? repayLoan : LoanRequest}
        initial={{ y: 50, opacity: 0, rotateY: 15 }}
        animate={{ y: 0, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      >
        <motion.h2 
          style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            color: '#5ee7df',
            textShadow: '0 0 10px rgba(94, 231, 223, 0.7)',
            fontSize: '2.2rem'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {loanCreated ? "REPAYMENT PORTAL" : "LOAN SCROLL"}
        </motion.h2>

        <ArcaneInput
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FiUser />
          <input 
            type="text" 
            placeholder="Lender's Ethereum Rune" 
            value={lender} 
            onChange={(e) => setLender(e.target.value)} 
            required 
          />
        </ArcaneInput>

        <ArcaneInput
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <FiUser />
          <input 
            type="text" 
            placeholder="Your Ethereum Rune" 
            value={borrower} 
            onChange={(e) => setBorrower(e.target.value)} 
            required 
          />
        </ArcaneInput>

        <ArcaneInput
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <FiDollarSign />
          <input 
            type="number" 
            placeholder="AVAX Amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </ArcaneInput>

        {!loanCreated && (
          <>
            <ArcaneInput
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <FiPercent />
              <input 
                type="number" 
                placeholder="Interest Rate (%)" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)} 
                required 
              />
            </ArcaneInput>

            <ArcaneInput
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <FiClock />
              <input 
                type="text" 
                placeholder="Moon Cycle Deadline" 
                value={repaymentDeadline} 
                onChange={(e) => setRepaymentDeadline(e.target.value)} 
                required 
              />
            </ArcaneInput>
          </>
        )}

        {!loanCreated ? (
          <EnchantedButton
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            $loading={isProcessing}
          >
            {isProcessing ? (
              "CASTING SPELL..."
            ) : (
              <>
                <FiZap /> INVOKE LOAN
              </>
            )}
          </EnchantedButton>
        ) : (
          <>
            <EnchantedButton
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              $loading={isProcessing}
            >
              {isProcessing ? (
                "UNLEASHING MAGIC..."
              ) : (
                <>
                  <FiZap /> REPAY DEBT
                </>
              )}
            </EnchantedButton>

            <RuneBadge
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.7 }}
            >
              <FiHash /> SCROLL ID: {loanId}
            </RuneBadge>
          </>
        )}
      </SpellbookForm>

      <PortalExit
        to="/BorrowerDashboardPage"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <FiArrowLeft /> RETURN TO HOME
      </PortalExit>
    </WizardPortal>
  );
};

export default LoanRepaymentPage;