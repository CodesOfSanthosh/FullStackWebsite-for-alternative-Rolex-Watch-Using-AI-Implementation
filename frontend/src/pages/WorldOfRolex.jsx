import React from 'react';

const WorldOfRolex = () => {
    return (
        <div style={{ backgroundColor: 'var(--white)' }}>
            {/* Hero Section */}
            <div style={{
                height: '80vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-80px',
                backgroundImage: 'url(https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=2650&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                <div className="container fade-in" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', letterSpacing: '0.2em', marginBottom: '20px', textTransform: 'uppercase' }}>The History</h2>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', marginBottom: '30px' }}>Behind the Crown</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6 }}>
                        Since 1905, Rolex has maintained a relentless pursuit of excellence, pushing the boundaries of watchmaking technology.
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="container" style={{ padding: '100px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '100px' }}>
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '30px', color: 'var(--rolex-green-dark)' }}>A Legacy of Innovation</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                            Rolex registered over 500 patents in the course of its history. Few companies have been so consistently identified with the pursuit of excellence, the quest for the absolute, the discovery of original approaches and innovative solutions.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            From the first waterproof wristwatch, the Oyster, to the Perpetual rotor self-winding mechanism, Rolex watches have proved themselves from the depths of the deepest oceans to the summits of the highest mountains.
                        </p>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1622434641406-a158105c9168?q=80&w=2360&auto=format&fit=crop" alt="Watchmaking" style={{ width: '100%', borderRadius: '4px' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <div>
                        <img src="https://images.unsplash.com/photo-1596516109370-29001ec8ec36?q=80&w=2670&auto=format&fit=crop" alt="Craftsmanship" style={{ width: '100%', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '30px', color: 'var(--rolex-green-dark)' }}>Perpetual Excellence</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                            The term Perpetual is inscribed on every Rolex Oyster watch. But more than just a word on a dial, it is a philosophy that embodies the company's vision and values.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Hans Wilsdorf, the founder of Rolex, instilled a notion of perpetual excellence that would drive the company forward. This spirit is visible in every timepiece that leaves the Rolex workshops.
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--rolex-background)', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--rolex-gold)', fontSize: '2rem', marginBottom: '30px' }}>Experience the Collection</h2>
                    <a href="/shop" className="btn btn-primary" style={{ backgroundColor: 'var(--rolex-green)', color: 'white', border: 'none' }}>View All Timepieces</a>
                </div>
            </div>
        </div>
    );
};

export default WorldOfRolex;
