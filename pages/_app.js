import '../styles/globals.css'
import 'antd/dist/antd.css'
import { MyProvider } from '../ContextProvider'

function MyApp({ Component, pageProps }) {
	return (
		<MyProvider>
			<Component {...pageProps} />
		</MyProvider>
	)
}

export default MyApp
