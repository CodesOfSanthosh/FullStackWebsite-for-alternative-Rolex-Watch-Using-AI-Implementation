import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Share2, Heart, Check } from 'lucide-react';

const WatchDetail = () => {
    const { id } = useParams();
    const [watch, setWatch] = useState(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.get(`products/watches/${id}/`)
            .then(res => setWatch(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const addToCart = async () => {
        if (!user) {
            // In a real app, redirect to login
            alert('Please login to acquire this timepiece.');
            return;
        }
        try {
            await api.post('orders/cart/add/', { watch_id: id, quantity: 1 });
            alert('Selection added to your collection.');
        } catch (e) {
            console.error(e);
            alert('Unable to process request.');
        }
    };

    if (loading) return null;
    if (!watch) return <div className="container">Watch not found</div>;

    // Placeholder image logic
    const imgUrl = watch.image || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop";

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', paddingTop: '80px' }}>
            {/* Breadcrumb / Back */}
            <div className="container" style={{ padding: '20px 0' }}>
                <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <ChevronLeft size={16} /> Back to Collection
                </Link>
            </div>

            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', minHeight: '80vh' }}>
                {/* Left: Image (Sticky on Desktop) */}
                <div style={{ flex: '1 1 300px', position: 'relative' }}>
                    <div style={{
                        position: 'sticky',
                        top: '100px',
                        padding: '40px 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100vh - 100px)'
                    }}>
                        <img src={imgUrl} alt={watch.name} style={{
                            maxWidth: '90%',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
                        }} />
                    </div>
                </div>

                {/* Right: Details (Scrollable) */}
                <div style={{ flex: '1 1 300px', padding: '40px 0', backgroundColor: 'white' }}>
                    <div className="fade-in">
                        <h2 style={{
                            color: 'var(--rolex-green)',
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.2rem',
                            marginBottom: '10px'
                        }}>
                            {watch.brand_name || 'Rolex'}
                        </h2>

                        <h1 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            textTransform: 'uppercase',
                            lineHeight: 1.1,
                            marginBottom: '20px',
                            color: 'var(--rolex-black)'
                        }}>
                            {watch.name}
                        </h1>

                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginBottom: '40px',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 300
                        }}>
                            {watch.description}
                        </p>

                        <div style={{
                            borderTop: '1px solid #e0e0e0',
                            borderBottom: '1px solid #e0e0e0',
                            padding: '30px 0',
                            marginBottom: '40px'
                        }}>
                            <div className="spec-row">
                                <span className="spec-label">Model Case</span>
                                <span className="spec-value">{watch.case_material || 'Oystersteel'}</span>
                            </div>
                            <div className="spec-row">
                                <span className="spec-label">Diameter</span>
                                <span className="spec-value">41 mm</span>
                            </div>
                            <div className="spec-row">
                                <span className="spec-label">Dial</span>
                                <span className="spec-value">{watch.dial_color || 'Black'}</span>
                            </div>
                            <div className="spec-row">
                                <span className="spec-label">Movement</span>
                                <span className="spec-value">Perpetual, mechanical, self-winding</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '30px'
                        }}>
                            <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--rolex-gold)' }}>
                                ₹{watch.discount_price || watch.price}
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button onClick={addToCart} className="btn btn-primary" style={{
                                flex: 1,
                                backgroundColor: 'var(--rolex-green)',
                                color: 'white',
                                border: 'none',
                                padding: '20px'
                            }}>
                                Acquire This Watch
                            </button>
                            <button className="btn btn-outline" style={{
                                border: '1px solid #ccc',
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Heart size={20} />
                            </button>
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Check size={14} /> 5-Year Warranty</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Check size={14} /> Swiss Made</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .spec-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    font-size: 0.95rem;
                }
                .spec-label {
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 0.1em;
                    font-weight: 700;
                }
                .spec-value {
                    color: var(--rolex-black);
                    text-align: right;
                }
            `}</style>
        </div>
    );
};

export default WatchDetail;
