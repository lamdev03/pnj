import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductContextProvider from './store/product'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <ProductContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ProductContextProvider>
    </QueryClientProvider>
  );
