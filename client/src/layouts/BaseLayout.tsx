import { Outlet } from 'react-router-dom'
import AppHeader from './compopent/client/Header'
import Footer from './compopent/client/Footer'
import Banner from './compopent/client/Banner'

const BaseLayout = () => {
    return (
        <div>
            <AppHeader />
            <Banner/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default BaseLayout
