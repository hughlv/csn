import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Use a setTimeout to decrement the countdown every second
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // When the countdown reaches 0, redirect to /galleries
    if (countdown === 0) {
      router.push('/galleries');
    }

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <p>Redirecting to /galleries in {countdown} seconds...</p>
    </main>
  );
}
