import { Outlet } from 'react-router-dom'
import AppHeader from './compopent/admin/Header'

const AdminLayout = () => {
    return (
        <div>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
