import '../styles/globals.css'
import 'antd/dist/antd.css'
import { MyProvider } from '../ContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<MyProvider>
				<Component {...pageProps} />
			</MyProvider>
		</QueryClientProvider>
	)
}

export default MyApp
