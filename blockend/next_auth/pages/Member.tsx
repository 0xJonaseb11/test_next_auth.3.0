import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';

const userAtom = atom(null);

const Member = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  const handleLogout = async () => {
    // Invalidate session and clear user state
    await fetch('/api/logout', {
      method: 'POST'
    });
    setUser(null);
    router.push('/');
  };

  return (
    <div>
      <h1>Member Area</h1>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Member;
