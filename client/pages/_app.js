import '@/styles/globals.css'
import { Providers } from '@/store/provider'

export default function App({ Component, pageProps }) {
	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}
