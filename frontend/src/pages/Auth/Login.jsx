import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch {
            setError('The credentials provided are invalid.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--rolex-beige)',
            paddingTop: '80px' // Offset for fixed navbar
        }}>
            <div className="fade-in" style={{
                width: '100%',
                maxWidth: '450px',
                backgroundColor: 'white',
                padding: '40px 20px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
            }}>
                {/* Crown Logo */}
                <div style={{ marginBottom: '30px', color: 'var(--rolex-gold)' }}>
                    <svg width="60" height="35" viewBox="0 0 50 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 0L30 8H20L25 0Z" />
                        <circle cx="12" cy="6" r="3" />
                        <circle cx="38" cy="6" r="3" />
                        <circle cx="4" cy="14" r="2.5" />
                        <circle cx="46" cy="14" r="2.5" />
                        <path d="M25 10L12 25H38L25 10Z" />
                    </svg>
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--rolex-green-dark)',
                    fontSize: '2rem',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Sign In
                </h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '0.9rem' }}>
                    Access your personal collection
                </p>

                {error && <div style={{
                    color: '#D32F2F',
                    marginBottom: '20px',
                    fontSize: '0.9rem',
                    borderLeft: '2px solid #D32F2F',
                    paddingLeft: '10px',
                    textAlign: 'left'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'var(--text-secondary)',
                            marginBottom: '5px'
                        }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                padding: '10px 0',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'var(--font-sans)',
                                transition: 'border-color 0.3s'
                            }}
                            className="auth-input"
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'var(--text-secondary)',
                            marginBottom: '5px'
                        }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                padding: '10px 0',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'var(--font-sans)',
                            }}
                            className="auth-input"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{
                        marginTop: '20px',
                        width: '100%',
                        backgroundColor: 'var(--rolex-green)',
                        color: 'white',
                        border: 'none',
                        padding: '18px',
                        fontSize: '0.9rem'
                    }}>
                        Enter World of Rolex
                    </button>
                </form>

                <div style={{ marginTop: '40px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Not a member? <Link to="/register" style={{ color: 'var(--rolex-gold)', fontWeight: 'bold', marginLeft: '5px' }}>create an account</Link>
                </div>
            </div>

            <style>{`
                .auth-input:focus { border-bottom-color: var(--rolex-green) !important; }
            `}</style>
        </div>
    );
};
export default Login;
