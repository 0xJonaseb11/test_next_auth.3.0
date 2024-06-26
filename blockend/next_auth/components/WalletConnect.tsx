import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';

const userAtom = atom(null);

const Home = () => {
  const router = useRouter();
  const wallet = useWallet();
  const [user, setUser] = useAtom(userAtom);

  const handleLogin = async () => {
    if (wallet.connected) {
      // Authenticate the user and set the user state
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wallet: wallet.publicKey.toString() })
      });

      const data = await res.json();
      setUser(data.user);
      router.push('/member');
    }
  };

  return (
    <div>
      <h1>Login with Wallet</h1>
      <button onClick={handleLogin}>Login with Wallet</button>
    </div>
  );
};

const App = () => {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Home />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
