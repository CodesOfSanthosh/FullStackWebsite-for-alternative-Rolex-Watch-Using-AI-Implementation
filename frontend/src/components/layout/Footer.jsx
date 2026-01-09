import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#101010',
            color: '#999',
            padding: '60px 0 30px',
            fontFamily: 'var(--font-sans)'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {/* Brand */}
                    <div>
                        <span style={{
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            letterSpacing: '0.1em',
                            color: 'var(--rolex-gold)',
                            display: 'block',
                            marginBottom: '20px'
                        }}>ROLEX</span>
                    </div>

                    {/* Rolex Watches */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '20px' }}>Rolex Watches</h4>
                        <ul className="footer-links">
                            <li><Link to="/shop">New Watches 2026</Link></li>
                            <li><Link to="/shop">Find your Rolex</Link></li>
                            <li><Link to="/shop">Configure your Rolex</Link></li>
                            <li><Link to="/shop">Men's Watches</Link></li>
                            <li><Link to="/shop">Women's Watches</Link></li>
                            <li><Link to="/shop">Gold Watches</Link></li>
                        </ul>
                    </div>

                    {/* World of Rolex */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '20px' }}>World of Rolex</h4>
                        <ul className="footer-links">
                            <li><a href="#">Sports, Arts & Exploration</a></li>
                            <li><a href="#">Rolex & Golf</a></li>
                            <li><a href="#">Rolex & Tennis</a></li>
                            <li><a href="#">Rolex & Yachting</a></li>
                            <li><a href="#">Perpetual Planet</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '20px' }}>Services</h4>
                        <ul className="footer-links">
                            <li><a href="#">Buying a Rolex</a></li>
                            <li><a href="#">Watch Care & Service</a></li>
                            <li><a href="#">Your Guarantee</a></li>
                            <li><a href="#">Frequently Asked Questions</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid #333',
                    paddingTop: '30px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                        <a href="#" className="social-icon"><Youtube size={20} /></a>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
                        <a href="#">Legal Notice</a>
                        <a href="#">Privacy Notice</a>
                        <a href="#">Cookies</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-links li { margin-bottom: 12px; }
                .footer-links a { color: #999; font-size: 0.9rem; transition: color 0.3s; }
                .footer-links a:hover { color: var(--rolex-gold); }
                .social-icon { color: #999; transition: color 0.3s; }
                .social-icon:hover { color: white; }
            `}</style>
        </footer>
    );
};

export default Footer;
