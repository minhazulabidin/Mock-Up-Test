import NavbarDemo from '@/components/resizable-navbar-demo'
import React from 'react'
import SyncUser from "../utils/SyncUser"

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <NavbarDemo />
            <SyncUser/>
            {children}
        </div>
    )
}

export default DashboardLayout