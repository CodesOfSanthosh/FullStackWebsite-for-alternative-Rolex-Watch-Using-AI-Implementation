import { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronRight, Check } from 'lucide-react';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const res = await api.get('orders/cart/');
            setCart(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            await api.post('orders/cart/update_item/', { item_id: itemId, quantity: newQuantity });
            fetchCart();
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await api.post('orders/cart/remove/', { item_id: itemId });
            fetchCart();
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };

    const handleCheckout = async () => {
        setCheckoutLoading(true);
        const address = prompt("Please confirm your shipping address:");
        if (!address) {
            setCheckoutLoading(false);
            return;
        }

        try {
            const response = await api.post('orders/cart/checkout/', { shipping_address: address });
            console.log("CHECKOUT JSON RESPONSE:", response.data);
            alert('Your acquisition request has been successfully submitted. A concierge will contact you shortly.');
            setCart(null);
            navigate('/dashboard/customer');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Failed to process request.');
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) return null;

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '20px' }}>Your Collection is Empty</h2>
                <Link to="/shop" className="btn btn-primary" style={{ backgroundColor: 'var(--rolex-green)', color: 'white' }}>
                    Explore Timepieces
                </Link>
            </div>
        )
    }

    const subtotal = cart.items.reduce((sum, item) => {
        const price = item.watch.discount_price || item.watch.price;
        return sum + (parseFloat(price) * item.quantity);
    }, 0);

    return (
        <div style={{ backgroundColor: 'var(--rolex-beige)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
            <div className="container">
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--rolex-green-dark)',
                    marginBottom: '40px',
                    fontSize: '2.5rem'
                }}>
                    Your Selection
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                    {/* Cart Items */}
                    <div style={{ backgroundColor: 'white', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        {cart.items.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                gap: '30px',
                                paddingBottom: '30px',
                                marginBottom: '30px',
                                borderBottom: '1px solid #eee'
                            }}>
                                <div style={{ width: '120px', height: '120px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={item.watch.image || 'https://via.placeholder.com/150'} alt={item.watch.name} style={{ maxWidth: '80%', maxHeight: '80%' }} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.watch.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>{item.watch.brand_name || 'Rolex'}</p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc' }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                                            <span style={{ padding: '5px 10px', fontSize: '0.9rem' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                                            <Trash2 size={16} /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--rolex-black)' }}>
                                    ₹{item.watch.discount_price || item.watch.price}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div>
                        <div style={{ backgroundColor: 'white', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '30px' }}>Summary</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <span>Shipping</span>
                                <span>Complimentary</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--rolex-gold)' }}>
                                <span>Total</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>

                            <button onClick={handleCheckout} disabled={checkoutLoading} className="btn btn-primary" style={{
                                width: '100%',
                                backgroundColor: 'var(--rolex-green)',
                                color: 'white',
                                border: 'none',
                                padding: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                {checkoutLoading ? 'Processing...' : <>Proceed to Acquisition <ChevronRight size={18} /></>}
                            </button>

                            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.8rem', color: '#777' }}>
                                <span style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--rolex-green)" /> Authenticity Guaranteed</span>
                                <span style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--rolex-green)" /> 5-Year International Warranty</span>
                                <span style={{ display: 'flex', gap: '10px' }}><Check size={16} color="var(--rolex-green)" /> Secure & Insured Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
