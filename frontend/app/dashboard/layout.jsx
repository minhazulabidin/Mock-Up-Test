import NavbarDemo from '@/components/resizable-navbar-demo'
import React from 'react'

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <NavbarDemo />
            {children}
        </div>
    )
}

export default DashboardLayout