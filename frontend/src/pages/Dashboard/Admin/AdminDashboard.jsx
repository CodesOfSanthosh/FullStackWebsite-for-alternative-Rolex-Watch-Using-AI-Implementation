import { useState, useEffect } from 'react';
import api from '../../../api';
import WatchForm from '../../../components/Admin/WatchForm';
import UserForm from '../../../components/Admin/UserForm';
import {
    LayoutDashboard,
    Package,
    Users,
    User,
    Settings,
    LogOut,
    Plus,
    Pencil,
    Trash2,
    Search,
    Shield
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('products');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#111', color: '#eee', marginTop: '-80px', paddingTop: '80px' }}>
            {/* Sidebar */}
            <div style={{
                width: '260px',
                backgroundColor: '#0a0a0a',
                borderRight: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: 'calc(100vh - 80px)', // Adjust for navbar
                top: '80px'
            }}>
                <div style={{ padding: '30px 20px', borderBottom: '1px solid #222' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--rolex-gold)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>Administrator</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--rolex-gold)' }}>Super User</span>
                        </div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '20px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <SidebarItem
                            icon={<Package size={20} />}
                            label="Watch Inventory"
                            active={activeTab === 'products'}
                            onClick={() => setActiveTab('products')}
                        />
                        <SidebarItem
                            icon={<Users size={20} />}
                            label="User Management"
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                        />
                        <SidebarItem
                            icon={<Package size={20} />}
                            label="Order Management"
                            active={activeTab === 'orders'}
                            onClick={() => setActiveTab('orders')}
                        />
                        {/* Future Expansion */}
                        {/* <SidebarItem icon={<Settings size={20} />} label="Site Settings" /> */}
                    </ul>
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #222' }}>
                    <button onClick={logout} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        width: '100%',
                        padding: '10px',
                        transition: 'color 0.3s'
                    }}
                        onMouseOver={(e) => e.target.style.color = '#ff4d4d'}
                        onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ marginLeft: '260px', flex: 1, padding: '40px' }}>
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'users' && <UserManager />}
                {activeTab === 'orders' && <OrderManager />}
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
    <li style={{ marginBottom: '5px' }}>
        <button
            onClick={onClick}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px',
                background: active ? 'rgba(163, 126, 44, 0.1)' : 'none',
                border: 'none',
                borderLeft: active ? '3px solid var(--rolex-gold)' : '3px solid transparent',
                color: active ? 'var(--rolex-gold)' : '#888',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '0 4px 4px 0',
                transition: 'all 0.3s',
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem'
            }}
        >
            {icon} {label}
        </button>
    </li>
);

// --- Sub-Components ---

const ProductManager = () => {
    const [watches, setWatches] = useState([]);
    const [view, setView] = useState('list');
    const [loading, setLoading] = useState(true);
    const [selectedWatch, setSelectedWatch] = useState(null);

    const fetchWatches = async () => {
        setLoading(true);
        try {
            const res = await api.get('products/watches/');
            setWatches(res.data.results || res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchWatches(); }, []);

    const handleDelete = async (id) => {
        if (confirm('Delete this timepiece permanently?')) {
            try {
                await api.delete(`products/watches/${id}/`);
                fetchWatches();
            } catch (err) {
                alert('Failed to delete.');
            }
        }
    };

    if (view === 'form') {
        return (
            <div className="fade-in">
                <button onClick={() => setView('list')} style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>← Back to Inventory</button>
                <WatchForm
                    initialData={selectedWatch}
                    onSuccess={() => { setView('list'); fetchWatches(); }}
                    onCancel={() => setView('list')}
                />
            </div>
        )
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--rolex-gold)' }}>Timepiece Inventory</h2>
                <button
                    onClick={() => { setSelectedWatch(null); setView('form'); }}
                    className="btn btn-primary"
                    style={{ backgroundColor: 'var(--rolex-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Plus size={18} /> Add New Timepiece
                </button>
            </div>

            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #333', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Asset</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Model</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Reference</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Price</th>
                            <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watches.map(watch => (
                            <tr key={watch.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '20px' }}>
                                    <img src={watch.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#fff' }} />
                                </td>
                                <td style={{ padding: '20px', fontWeight: 'bold' }}>{watch.name}</td>
                                <td style={{ padding: '20px', color: '#888' }}>{watch.collection_type || 'N/A'}</td>
                                <td style={{ padding: '20px' }}>₹{watch.price}</td>
                                <td style={{ padding: '20px', textAlign: 'right' }}>
                                    <button onClick={() => { setSelectedWatch(watch); setView('form'); }} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginRight: '15px' }}><Pencil size={18} /></button>
                                    <button onClick={() => handleDelete(watch.id)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('list');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('users/');
            setUsers(res.data.results || res.data);
        } catch (err) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDeleteUser = async (id) => {
        if (confirm('Permanently revoke this user\'s access? This cannot be undone.')) {
            try {
                await api.delete(`users/${id}/`);
                fetchUsers();
            } catch (err) {
                console.error(err);
                alert("Failed to delete user. Ensure you have permission.");
            }
        }
    };

    if (view === 'form') {
        return (
            <div className="fade-in">
                <button onClick={() => setView('list')} style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>← Back to Clients</button>
                <UserForm
                    initialData={selectedUser}
                    onSuccess={() => { setView('list'); fetchUsers(); }}
                    onCancel={() => setView('list')}
                />
            </div>
        )
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--rolex-gold)' }}>Clientele Management</h2>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {users.map(user => (
                    <div key={user.id} style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '4px', border: '1px solid #333' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    <User size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{user.username}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{user.email}</div>
                                </div>
                            </div>
                            {user.role === 'ADMIN' ?
                                <Shield size={18} color="var(--rolex-gold)" title="Admin" /> :
                                <span style={{ fontSize: '0.7rem', border: '1px solid #333', padding: '2px 6px', borderRadius: '4px', color: '#666' }}>{user.role || 'CUSTOMER'}</span>
                            }
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid #222', paddingTop: '15px' }}>
                            <button onClick={() => { setSelectedUser(user); setView('form'); }} style={{ flex: 1, padding: '8px', background: 'none', border: '1px solid #333', color: '#888', cursor: 'pointer', fontSize: '0.8rem' }}>
                                Manage Profile
                            </button>
                            {user.role !== 'ADMIN' && (
                                <button onClick={() => handleDeleteUser(user.id)} style={{ padding: '8px', background: 'rgba(211, 47, 47, 0.1)', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => { setSelectedUser(null); setView('form'); }}
                    className="btn btn-primary"
                    style={{
                        backgroundColor: 'var(--rolex-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '250px',
                        justifyContent: 'center'
                    }}
                >
                    <Plus size={18} /> Register New Client
                </button>
            </div>
        </div>
    );
};



const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('orders/orders/');
            setOrders(res.data.results ? res.data.results : res.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleAcceptOrder = async (orderId) => {
        try {
            await api.patch(`orders/orders/${orderId}/`, { status: 'CONFIRMED' });
            fetchOrders();
        } catch (err) {
            alert('Failed to update order status.');
        }
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--rolex-gold)' }}>Order Management</h2>
            </div>

            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #333', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Order ID</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Customer</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Amount</th>
                            <th style={{ padding: '20px', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '20px' }}>#{order.id}</td>
                                <td style={{ padding: '20px', color: '#888' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '20px' }}>{order.shipping_address ? 'User' : 'Unknown'}</td> {/* Adjust if we want username, but order serializer might not have username directly expanded unless we updated it. We can rely on viewset filtering. Order model has user fk. Serializer has items. Let's assume basic list for now. */}
                                <td style={{ padding: '20px' }}>₹{order.total_amount}</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        backgroundColor: order.status === 'CONFIRMED' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                        color: order.status === 'CONFIRMED' ? '#4caf50' : '#ffc107',
                                        border: order.status === 'CONFIRMED' ? '1px solid #4caf50' : '1px solid #ffc107'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '20px', textAlign: 'right' }}>
                                    {order.status === 'PENDING' && (
                                        <button onClick={() => handleAcceptOrder(order.id)} className="btn btn-primary" style={{ padding: '8px 15px', fontSize: '0.8rem', backgroundColor: 'var(--rolex-green)', border: 'none', color: 'white' }}>
                                            Accept Order
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard;
