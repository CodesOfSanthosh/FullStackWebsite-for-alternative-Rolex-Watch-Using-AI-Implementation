import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Search, Menu, User, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: scrolled || isMenuOpen || isSearchOpen ? 'var(--rolex-green)' : 'transparent',
        transition: 'all 0.3s ease',
        padding: scrolled ? '0px 0' : '20px 0',
        color: 'white',
        borderBottom: scrolled ? 'none' : '1px solid rgba(255,255,255,0.2)'
    };

    const navLinkStyle = {
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0
    };

    return (
        <>
            <nav style={navbarStyle}>
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    height: '80px'
                }}>
                    {/* Left Section */}
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                        <button onClick={() => setIsMenuOpen(true)} style={navLinkStyle}>
                            <Menu size={20} /> <span className="hide-mobile">Menu</span>
                        </button>
                        <Link to="/shop" style={navLinkStyle} className="hide-mobile">Watches</Link>
                        <Link to="/world-of-rolex" style={navLinkStyle} className="hide-mobile">World of Rolex</Link>
                    </div>

                    {/* Center Section - Logo */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                            <svg width="40" height="25" viewBox="0 0 50 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 0L30 8H20L25 0Z" fill="var(--rolex-gold)" />
                                <circle cx="12" cy="6" r="3" fill="var(--rolex-gold)" />
                                <circle cx="38" cy="6" r="3" fill="var(--rolex-gold)" />
                                <circle cx="4" cy="14" r="2.5" fill="var(--rolex-gold)" />
                                <circle cx="46" cy="14" r="2.5" fill="var(--rolex-gold)" />
                                <path d="M25 10L12 25H38L25 10Z" fill="var(--rolex-gold)" />
                            </svg>
                            <span style={{
                                fontFamily: 'var(--font-serif)',
                                fontWeight: 'bold',
                                fontSize: '1.4rem',
                                letterSpacing: '0.2em',
                                color: 'var(--rolex-gold)'
                            }}>ROLEX</span>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button onClick={() => setIsSearchOpen(true)} style={navLinkStyle} className="hide-mobile">
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Search</span>
                            <Search size={18} />
                        </button>

                        <Link to={user ? "/cart" : "/login"} style={navLinkStyle} aria-label="Cart">
                            <ShoppingBag size={18} />
                        </Link>

                        {user ? (
                            <Link to={user.role === 'ADMIN' ? '/dashboard/admin' : user.role === 'OWNER' ? '/dashboard/owner' : '/dashboard/customer'} style={navLinkStyle}>
                                <User size={18} />
                            </Link>
                        ) : (
                            <Link to="/login" style={navLinkStyle}>
                                <User size={18} />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Menu Drawer */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: isMenuOpen ? 0 : '-100%',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'var(--rolex-green)',
                zIndex: 2000,
                transition: 'left 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div className="container" style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: 'var(--rolex-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 'bold' }}>ROLEX</div>
                    <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Close</span>
                        <X size={30} />
                    </button>
                </div>

                <div className="container" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', padding: '40px 0' }}>
                    <div>
                        <MenuLink to="/shop" text="All Watches" onClick={() => setIsMenuOpen(false)} />
                        <MenuLink to="/shop?collection_type=CLASSIC" text="Classic Watches" onClick={() => setIsMenuOpen(false)} />
                        <MenuLink to="/shop?collection_type=PROFESSIONAL" text="Professional Watches" onClick={() => setIsMenuOpen(false)} />
                        <MenuLink to="/shop" text="Configure Your Watch" onClick={() => setIsMenuOpen(false)} />
                    </div>
                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '40px' }}>
                        <MenuLink to="/world-of-rolex" text="World of Rolex" small onClick={() => setIsMenuOpen(false)} />
                        <MenuLink to="#" text="Buying a Rolex" small />
                        <MenuLink to="#" text="Care & Servicing" small />
                        <MenuLink to="#" text="Find a Store" small />
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <style>{`
                @media (max-width: 900px) {
                    .hide-mobile { display: none !important; }
                }
            `}</style>
        </>
    );
};

const MenuLink = ({ to, text, onClick, small }) => (
    <Link to={to} onClick={onClick} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontSize: small ? '1.5rem' : '3rem',
        fontFamily: small ? 'var(--font-sans)' : 'var(--font-serif)',
        marginBottom: '20px',
        textDecoration: 'none',
        transition: 'color 0.3s'
    }} className="menu-link">
        {text}
        {!small && <ChevronRight size={30} style={{ opacity: 0.5 }} />}
        <style>{`.menu-link:hover { color: var(--rolex-gold) !important; }`}</style>
    </Link>
);

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const search = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            };
            try {
                const res = await api.get(`products/watches/?search=${query}`);
                setResults(res.data.results ? res.data.results : res.data);
            } catch (err) {
                console.error(err);
            }
        };
        const timeout = setTimeout(search, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--rolex-green)',
            zIndex: 2000,
            padding: '40px 0',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <X size={40} />
                    </button>
                </div>

                <input
                    autoFocus
                    type="text"
                    placeholder="Search for a watch..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '2px solid rgba(255,255,255,0.2)',
                        fontSize: '3rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'white',
                        padding: '20px 0',
                        outline: 'none'
                    }}
                />

                <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px' }}>
                    {results.map(watch => (
                        <Link to={`/watch/${watch.id}`} key={watch.id} onClick={onClose} style={{ textDecoration: 'none', color: 'white' }}>
                            <div style={{ background: 'white', padding: '20px', borderRadius: '4px', textAlign: 'center' }}>
                                <img src={watch.image || 'https://via.placeholder.com/150'} alt={watch.name} style={{ height: '150px', objectFit: 'contain', marginBottom: '10px' }} />
                                <h4 style={{ color: 'var(--rolex-black)', fontSize: '0.9rem', margin: '0' }}>{watch.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{watch.brand_name}</p>
                            </div>
                        </Link>
                    ))}
                    {query.length > 2 && results.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)' }}>No timepieces found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
