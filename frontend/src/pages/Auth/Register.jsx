import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/');
        } catch {
            setError('Registration failed. Username or email may be taken.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--rolex-beige)',
            paddingTop: '80px',
            paddingBottom: '40px'
        }}>
            <div className="fade-in" style={{
                width: '100%',
                maxWidth: '500px',
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
                    Create Account
                </h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '0.9rem' }}>
                    Join the world of prestige
                </p>

                {error && <div style={{
                    color: '#D32F2F',
                    marginBottom: '20px',
                    fontSize: '0.9rem',
                    borderLeft: '2px solid #D32F2F',
                    paddingLeft: '10px',
                    textAlign: 'left'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <label className="auth-label">First Name</label>
                            <input
                                name="first_name"
                                type="text"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="auth-input"
                            />
                        </div>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <label className="auth-label">Last Name</label>
                            <input
                                name="last_name"
                                type="text"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="auth-input"
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label className="auth-label">Username *</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label className="auth-label">Email *</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label className="auth-label">Password *</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{
                        marginTop: '20px',
                        width: '100%',
                        backgroundColor: 'var(--rolex-black)',
                        color: 'white',
                        border: 'none',
                        padding: '18px',
                        fontSize: '0.9rem'
                    }}>
                        Initialize Account
                    </button>
                </form>

                <div style={{ marginTop: '40px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--rolex-gold)', fontWeight: 'bold', marginLeft: '5px' }}>Sign In</Link>
                </div>
            </div>

            <style>{`
                .auth-label {
                    display: block;
                    fontSize: 0.75rem;
                    textTransform: uppercase;
                    letterSpacing: 0.1em;
                    color: var(--text-secondary);
                    marginBottom: 5px;
                }
                .auth-input {
                    width: 100%;
                    border: none;
                    borderBottom: 1px solid #ccc;
                    padding: 10px 0;
                    fontSize: 1rem;
                    outline: none;
                    fontFamily: var(--font-sans);
                    transition: border-color 0.3s;
                }
                .auth-input:focus { border-bottom-color: var(--rolex-green) !important; }
            `}</style>
        </div>
    );
};
export default Register;
