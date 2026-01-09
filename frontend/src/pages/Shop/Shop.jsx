import { useEffect, useState } from 'react';
import api from '../../api';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';

const Shop = () => {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const collectionType = searchParams.get('collection_type');
                const search = searchParams.get('search');

                let endpoint = 'products/watches/';
                const params = new URLSearchParams();

                if (collectionType) params.append('collection_type', collectionType);
                if (search) params.append('search', search);

                const queryString = params.toString();
                if (queryString) endpoint += `?${queryString}`;

                const res = await api.get(endpoint);
                setWatches(res.data.results ? res.data.results : res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWatches();
    }, [searchParams]);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.1em' }}>LOADING TIMEPIECES...</span>
        </div>
    );

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'var(--rolex-beige)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 className="fade-in" style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3rem',
                        color: 'var(--rolex-green-dark)',
                        marginBottom: '20px'
                    }}>
                        Find Your Rolex
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Configure the watch that suits you best.
                    </p>
                </div>

                {/* Filters Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '40px',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '20px'
                }}>
                    <button className="btn btn-link" style={{
                        color: 'var(--rolex-dark-grey)',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <SlidersHorizontal size={18} /> Filters
                    </button>
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '40px'
                }}>
                    {watches.length > 0 ? watches.map(watch => (
                        <WatchCard key={watch.id} watch={watch} />
                    )) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px' }}>
                            No timepieces found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const WatchCard = ({ watch }) => {
    // Placeholder logic for image if missing
    const imgUrl = watch.image || "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1988&auto=format&fit=crop";

    return (
        <Link to={`/watch/${watch.id}`} className="watch-card" style={{
            display: 'block',
            backgroundColor: 'white',
            padding: '40px 20px',
            textAlign: 'center',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease'
        }}>
            <div style={{
                height: '300px',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <img src={imgUrl} alt={watch.name} style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.5s ease'
                }} className="card-img" />
            </div>

            <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                color: 'var(--rolex-black)',
                marginBottom: '10px'
            }}>
                {watch.name}
            </h3>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '20px'
            }}>
                {watch.brand_name || 'Rolex'}
            </p>

            <span style={{
                color: 'var(--rolex-green)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1rem',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.3s'
            }} className="configure-link">
                Configure
            </span>

            <style>{`
                .watch-card:hover {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    transform: translateY(-5px);
                }
                .watch-card:hover .card-img {
                    transform: scale(1.05);
                }
                .watch-card:hover .configure-link {
                    border-bottom-color: var(--rolex-green);
                }
            `}</style>
        </Link>
    )
}

export default Shop;
