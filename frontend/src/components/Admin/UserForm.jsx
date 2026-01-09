import { useState, useEffect } from 'react';
import api from '../../api';

const UserForm = ({ initialData = null, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        role: 'CUSTOMER',
        password: '', // Only for creation/reset
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.username,
                email: initialData.email,
                first_name: initialData.first_name || '',
                last_name: initialData.last_name || '',
                role: initialData.role || 'CUSTOMER',
                password: '', // Don't fill password on edit
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (initialData) {
                // Update
                const updateData = { ...formData };
                if (!updateData.password) delete updateData.password; // Don't send empty password

                // Assuming backend ViewSet uses ID for updates
                // BUT UserViewSet permissions/queryset might need adjustment to allow Admin to update ANY ID.
                // The current UserViewSet.get_queryset allows Admin to see all, so accessing /users/<id>/ should work.
                await api.patch(`users/${initialData.id}/`, updateData);
            } else {
                // Create
                await api.post('users/', formData);
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setError('Failed to save user. Username/Email might be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
            <h2 style={{ color: 'var(--rolex-gold)', marginTop: 0, fontFamily: 'var(--font-serif)' }}>
                {initialData ? 'Edit Client Profile' : 'Register New Client'}
            </h2>

            {error && <div style={{ color: '#d32f2f', marginBottom: '20px', padding: '10px', backgroundColor: 'rgba(211,47,47,0.1)', borderLeft: '3px solid #d32f2f' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Username</label>
                        <input name="username" value={formData.username} onChange={handleChange} required className="admin-input" />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required className="admin-input" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>First Name</label>
                        <input name="first_name" value={formData.first_name} onChange={handleChange} className="admin-input" />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Last Name</label>
                        <input name="last_name" value={formData.last_name} onChange={handleChange} className="admin-input" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="admin-input">
                            <option value="CUSTOMER">Customer</option>
                            <option value="ADMIN">Administrator</option>
                            <option value="OWNER">Watch Owner</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                            {initialData ? 'New Password (Leave blank to keep)' : 'Password'}
                        </label>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} required={!initialData} className="admin-input" />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button type="submit" disabled={loading} style={{
                        backgroundColor: 'var(--rolex-gold)',
                        color: 'black',
                        border: 'none',
                        padding: '12px 25px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        opacity: loading ? 0.7 : 1
                    }}>
                        {loading ? 'Processing...' : 'Save Profile'}
                    </button>
                    <button type="button" onClick={onCancel} style={{
                        backgroundColor: 'transparent',
                        color: '#888',
                        border: '1px solid #444',
                        padding: '12px 25px',
                        cursor: 'pointer'
                    }}>
                        Cancel
                    </button>
                </div>
            </form>

            <style>{`
                .admin-input {
                    width: 100%;
                    background-color: #0a0a0a;
                    border: 1px solid #333;
                    color: white;
                    padding: 12px;
                    font-family: inherit;
                    outline: none;
                }
                .admin-input:focus {
                    border-color: var(--rolex-gold);
                }
            `}</style>
        </div>
    );
};

export default UserForm;
