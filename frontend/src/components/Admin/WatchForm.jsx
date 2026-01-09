import { useState, useEffect } from 'react';
import api from '../../api';

const WatchForm = ({ initialData = null, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '', // ID
        description: '',
        price: '',
        discount_price: '',
        stock: 0,
        strap_type: '',
        dial_color: '',
        water_resistance: '',
        warranty: '',
    });
    const [image, setImage] = useState(null);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch brands
        api.get('products/brands/').then(res => setBrands(res.data.results || res.data));

        if (initialData) {
            setFormData({
                name: initialData.name,
                brand: initialData.brand, // Might be ID or object depending on serializer. Wrapper usually fixes this but let's check.
                description: initialData.description,
                price: initialData.price,
                discount_price: initialData.discount_price || '',
                stock: initialData.stock,
                strap_type: initialData.strap_type || '',
                dial_color: initialData.dial_color || '',
                water_resistance: initialData.water_resistance || '',
                warranty: initialData.warranty || '',
            });
            // Note: We can't set file input value
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key]);
            }
        });
        if (image) {
            data.append('image', image);
        }

        try {
            if (initialData) {
                await api.patch(`products/watches/${initialData.id}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('products/watches/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setError('Failed to save watch. Please check all fields.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ color: 'var(--accent-gold)', marginTop: 0 }}>{initialData ? 'Edit Watch' : 'Add New Watch'}</h2>
            {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                    </div>
                    <div>
                        <label>Brand</label>
                        <select name="brand" value={formData.brand} onChange={handleChange} required className="form-control" style={{ background: '#333', color: '#fff', padding: '0.8rem', width: '100%', border: '1px solid #444' }}>
                            <option value="">Select Brand</option>
                            {brands.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required className="form-control" rows={3} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Price</label>
                        <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="form-control" />
                    </div>
                    <div>
                        <label>Discount Price</label>
                        <input name="discount_price" type="number" step="0.01" value={formData.discount_price} onChange={handleChange} className="form-control" />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input name="stock" type="number" value={formData.stock} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Strap Type</label>
                        <input name="strap_type" value={formData.strap_type} onChange={handleChange} className="form-control" />
                    </div>
                    <div>
                        <label>Dial Color</label>
                        <input name="dial_color" value={formData.dial_color} onChange={handleChange} className="form-control" />
                    </div>
                    <div>
                        <label>Water Resistance</label>
                        <input name="water_resistance" value={formData.water_resistance} onChange={handleChange} className="form-control" />
                    </div>
                    <div>
                        <label>Warranty</label>
                        <input name="warranty" value={formData.warranty} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div>
                    <label>Image</label>
                    <input type="file" onChange={handleImageChange} className="form-control" accept="image/*" />
                    {initialData && initialData.image && <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.2rem' }}>Current: {initialData.image}</div>}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Watch'}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WatchForm;
