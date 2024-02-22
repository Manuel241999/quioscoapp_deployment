import {QuiscoProvider} from '../context/QuiscoProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <QuiscoProvider>
      <Component {...pageProps}/>
    </QuiscoProvider>
  )
}

export default MyApp
