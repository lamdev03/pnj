import { Navigate } from 'react-router-dom'

type PrivateRouterProps = {
    User: any
    children?: React.ReactNode
    redirectPath?: string
}
const PrivateRouter = ({ User, children, redirectPath = '/signin' }: PrivateRouterProps) => {
    if (!User || Object.keys(User).length === 0 || User.role === 'member') {
        return <Navigate to={redirectPath!} replace />
    }
    return children
}
export default PrivateRouter
