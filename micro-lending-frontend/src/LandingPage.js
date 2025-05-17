import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ConnectButton } from "@rainbow-me/rainbowkit"

const FloatingShapes = () => {
  const shapes = ['🔵', '🟢', '🔶', '🟣', '⭐'];
  
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: 0, left: 0, pointerEvents: 'none' }}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${Math.random() * 20 + 10}px`,
            opacity: 0.6
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            rotate: [null, Math.random() * 360 + 360],
            transition: {
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }
          }}
        >
          {shape}
        </motion.div>
      ))}
    </div>
  );
};

const ParticleButton = ({ children, ...props }) => {
  const [particles, setParticles] = useState([]);

  const handleClick = (e) => {
    if (props.onClick) props.onClick(e);
    
    // Create particles
    const newParticles = Array(10).fill().map((_, i) => ({
      id: Date.now() + i,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`
    }));
    
    setParticles([...particles, ...newParticles]);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.button
        {...props}
        onClick={handleClick}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 5px 25px rgba(0, 123, 255, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          ...props.style,
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden'
        }}
      >
        {children}
      </motion.button>
      
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: particle.color,
              pointerEvents: 'none',
              zIndex: 1,
              left: particle.x,
              top: particle.y
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * -100],
              opacity: [1, 0],
              scale: [1, 2]
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles(particles.filter(p => p.id !== particle.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.9]);

  const features = [
    {
      title: "Submit Loan Requests",
      desc: "Create and manage your loan requests with flexible terms",
      icon: "📝",
      color: "#6366f1"
    },
    {
      title: "Enforce Repayment Deadlines",
      desc: "Automated reminders and tracking for timely repayments",
      icon: "⏱️",
      color: "#10b981"
    },
    {
      title: "Automatic Penalties or Rewards",
      desc: "Smart contracts handle compliance automatically",
      icon: "⚖️",
      color: "#f59e0b"
    },
    {
      title: "Secure Transactions",
      desc: "Blockchain-powered security for all your transactions",
      icon: "🔒",
      color: "#3b82f6"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      fontFamily: "'Inter', system-ui, sans-serif",
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      minHeight: '100vh',
      overflowX: 'hidden',
      position: 'relative'
    },
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      color: '#1e293b',
      padding: '20px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      position: 'fixed',
      width: '100%',
      zIndex: 100,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
    },
    nav: {
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      gap: '30px'
    },
    navLink: {
      color: '#1e293b',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.1rem',
      position: 'relative',
      padding: '5px 0',
      transition: 'all 0.3s ease'
    },
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '0 20px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(255, 255, 255, 0) 50%)',
      zIndex: -1
    },
    section: {
      margin: '100px auto',
      padding: '40px',
      borderRadius: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
      maxWidth: '1200px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    featureCard: {
      padding: '40px',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    featureIcon: {
      fontSize: '4rem',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    },
    button: {
      display: 'inline-block',
      padding: '16px 40px',
      marginTop: '30px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1.1rem',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonHoverEffect: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%)',
      transform: 'rotate(30deg)',
      transition: 'all 0.6s ease'
    },
    floatingCard: {
      position: 'absolute',
      width: '300px',
      height: '200px',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: -1
    }
  };

  return (
    <div style={styles.container}>
      <FloatingShapes />
      
      <motion.header 
        style={{
          ...styles.header,
          y: headerY,
          opacity: headerOpacity
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700' }}>Micro-Lending System</h1>
          <nav style={styles.nav}>
            {['Home', 'Login', 'Signup'].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={index === 0 ? "/" : `/${item}Page`}
                  style={styles.navLink}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      </motion.header>

      <section style={styles.hero}>
        <div style={styles.heroBg} />
        
        {/* Floating cards in background */}
        <motion.div 
          style={{ ...styles.floatingCard, top: '20%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          <span style={{ fontSize: '3rem' }}>💸</span>
        </motion.div>
        
        <motion.div 
          style={{ ...styles.floatingCard, bottom: '15%', right: '10%' }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 2
          }}
        >
          <span style={{ fontSize: '3rem' }}>📈</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Revolutionize Your Finance
          </h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Experience the future of peer-to-peer lending with blockchain-powered smart contracts that ensure transparency and security.
          </p>
          <ParticleButton>
  <motion.div
    whileHover={{
      boxShadow: '0 15px 30px rgba(99, 102, 241, 0.4)',
    }}
    as="a"
  >
    {/* RainbowKit ConnectButton with fallback */}
    <ConnectButton />
  </motion.div>
</ParticleButton>

        </motion.div>
      </section>

      <motion.section 
        style={styles.section}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px' }}>How It Works</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '400px' }}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeFeature}
                style={{
                  ...styles.featureCard,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${features[activeFeature].color}20 100%)`
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ ...styles.featureIcon, background: `linear-gradient(135deg, ${features[activeFeature].color} 0%, ${features[activeFeature].color}80 100%)` }}>
                  {features[activeFeature].icon}
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{features[activeFeature].title}</h3>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{features[activeFeature].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveFeature(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: index === activeFeature ? features[index].color : '#e2e8f0',
                padding: 0
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        style={{ ...styles.section, textAlign: 'center' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Join thousands of users who are already benefiting from our decentralized lending platform.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Link 
            to="/SignupPage" 
            style={{
              ...styles.button,
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Create Free Account</span>
            <motion.span
              style={styles.buttonHoverEffect}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
            />
          </Link>
        </motion.div>
      </motion.section>

      <motion.footer 
        style={{
          ...styles.section,
          margin: '100px auto 0',
          borderRadius: '0',
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#1e293b',
          color: 'white',
          maxWidth: 'none'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Micro-Lending System</h3>
          <p style={{ maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            The future of decentralized finance is here. Join us today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
            {['🏠', '📱', '📧', '🐦'].map((icon, i) => (
              <motion.div
                key={i}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}
                whileHover={{ 
                  y: -5,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
          <p>© 2025 Micro-Lending System. All rights reserved.</p>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;