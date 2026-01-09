import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Placeholder for a high-quality watch image since we don't have the video
const HERO_IMAGE = "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop";
const WATCH_1 = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop";
const WATCH_2 = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop";
const WATCH_3 = "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1988&auto=format&fit=crop";

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginTop: '-80px' // Compensate for fixed header
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${HERO_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white', padding: '0 20px' }}>
                    <h2 className="fade-in" style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em'
                    }}>New Watches 2026</h2>

                    <h1 className="fade-in" style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        marginBottom: '20px',
                        animationDelay: '0.2s',
                        lineHeight: 1.1,
                        color: 'white'
                    }}>
                        OYSTER PERPETUAL
                    </h1>

                    <div className="fade-in" style={{ animationDelay: '0.4s', marginTop: '30px' }}>
                        <Link to="/shop" className="btn btn-primary" style={{
                            borderColor: 'white',
                            color: 'white',
                            padding: '15px 40px'
                        }}>
                            Discover
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div style={{ padding: '80px 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{
                        marginBottom: '60px',
                        color: 'var(--rolex-green)',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2.5rem'
                    }}>
                        Rolex Collections
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2px', // Minimal gap for premium feel
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #f0f0f0'
                    }}>
                        <Link to="/shop?collection_type=CLASSIC" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <CollectionCard
                                image={WATCH_1}
                                title="Classic Watches"
                                desc="Timeless elegance and precision"
                            />
                        </Link>
                        <Link to="/shop?collection_type=PROFESSIONAL" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <CollectionCard
                                image={WATCH_2}
                                title="Professional Watches"
                                desc="Designed for performance"
                            />
                        </Link>
                        <Link to="/shop?search=Gold" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <CollectionCard
                                image={WATCH_3}
                                title="Gold Watches"
                                desc="The finest materials"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quote / Break Section */}
            <div style={{
                padding: '100px 20px',
                backgroundColor: 'var(--rolex-background)',
                textAlign: 'center'
            }}>
                <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    color: 'var(--rolex-green-dark)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontStyle: 'italic',
                    lineHeight: 1.6
                }}>
                    "A Rolex watch is not just a timepiece. It is a testament to an enduring struggle against the elements, a symbol of excellence."
                </p>
            </div>
        </div>
    );
};

const CollectionCard = ({ image, title, desc }) => {
    return (
        <div style={{
            position: 'relative',
            height: '500px',
            backgroundColor: 'white',
            overflow: 'hidden',
            group: 'card'
        }} className="collection-card">
            <div style={{
                width: '100%',
                height: '70%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease'
            }} className="card-image"></div>

            <div style={{
                padding: '30px',
                textAlign: 'center',
                height: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>{desc}</p>
                <span className="text-uppercase" style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--rolex-green)'
                }}>
                    Discover <ChevronRight size={16} />
                </span>
            </div>

            <style>{`
                .collection-card:hover .card-image {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}

export default Home;
