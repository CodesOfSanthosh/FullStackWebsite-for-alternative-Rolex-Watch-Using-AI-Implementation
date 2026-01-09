import { useEffect, useState } from 'react';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Package, Clock, User, Heart } from 'lucide-react';

const CustomerDashboard = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('orders/orders/');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    if (loading) return null;

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '40px' }}>

                    {/* Sidebar */}
                    <div style={{ backgroundColor: 'white', padding: '30px', height: 'fit-content', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: 'var(--rolex-green)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 15px auto',
                                fontFamily: 'var(--font-serif)'
                            }}>
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '5px' }}>{user?.username}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>VIP Client</p>
                        </div>

                        <nav>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '10px' }}>
                                    <button className="dashboard-nav-btn active">
                                        <Clock size={18} /> Order History
                                    </button>
                                </li>
                                <li style={{ marginBottom: '10px' }}>
                                    <button className="dashboard-nav-btn">
                                        <Heart size={18} /> Wishlist
                                    </button>
                                </li>
                                <li style={{ marginBottom: '10px' }}>
                                    <button className="dashboard-nav-btn">
                                        <User size={18} /> Profile Settings
                                    </button>
                                </li>
                                <li style={{ marginTop: '30px' }}>
                                    <button onClick={logout} style={{ color: '#D32F2F', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '30px', color: 'var(--rolex-dark-grey)' }}>Your Acquisitions</h2>

                        {orders.length === 0 ? (
                            <div style={{ backgroundColor: 'white', padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                <Package size={40} style={{ marginBottom: '20px', opacity: 0.5 }} />
                                <p>You have not acquired any timepieces yet.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {orders.map(order => (
                                    <div key={order.id} style={{ backgroundColor: 'white', padding: '30px', borderLeft: '4px solid var(--rolex-green)', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Reference #</span>
                                                <div style={{ fontWeight: 'bold' }}>{order.id}</div>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Date</span>
                                                <div>{formatDate(order.created_at)}</div>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Status</span>
                                                <div style={{ color: 'var(--rolex-gold)', fontWeight: 'bold' }}>{order.status}</div>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total</span>
                                                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>₹{order.total_amount}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {order.items && order.items.map((item, index) => (
                                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <img src={item.watch.image} alt="Watch" style={{ maxWidth: '80%', maxHeight: '80%' }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.watch.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity}</div>
                                                    </div>
                                                    <div style={{ fontWeight: 'bold' }}>₹{item.price_at_purchase}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .dashboard-nav-btn {
                    width: 100%;
                    text-align: left;
                    background: none;
                    border: none;
                    padding: 12px 15px;
                    display: flex;
                    alignItems: center;
                    gap: 12px;
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.3s;
                    border-radius: 4px;
                }
                .dashboard-nav-btn:hover, .dashboard-nav-btn.active {
                    background-color: #f5f5f5;
                    color: var(--rolex-black);
                    font-weight: bold;
                }
                .dashboard-nav-btn.active {
                    color: var(--rolex-green);
                }
            `}</style>
        </div>
    );
};

export default CustomerDashboard;
