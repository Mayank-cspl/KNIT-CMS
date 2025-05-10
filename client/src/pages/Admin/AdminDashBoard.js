import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashBoard = () => {
    const [auth] = useAuth()
    return (

        <Layout title={'Dashboard - KNIT CMS '}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                 {/* Main Dashboard Content */}
            <div className="login-right" style={{ flex: 0.75 }}>
                <div
                    style={{
                        background: '#f9f9f9',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                >
                    <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>
                        👋 Welcome, {auth?.user?.name || "User"}!
                    </h2>

                    <div style={{ lineHeight: '2' }}>
                        <p>
                            <strong>Admin Name:</strong> {auth?.user?.name}
                        </p>
                        <p>
                            <strong>Admin Email:</strong> {auth?.user?.email}
                        </p>
                        <p>
                            <strong>Admin Address:</strong> {auth?.user?.address}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </Layout>
    )
}

export default AdminDashBoard