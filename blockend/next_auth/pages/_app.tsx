import { AppProps } from 'next/app';
import { Provider } from 'jotai';
import '../styles/globals.css'; // Import global styles if any
import login from './api/login';
import logout from './api/logout';
import Home from '@/components/Home';
import Login from '@/components/Login';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />

      <Home/>
      <Login />

    </Provider>
  );
}

export default App;
