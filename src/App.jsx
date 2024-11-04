import { createSignal, onMount } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import supabase from './supabaseClient';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const [user, setUser] = createSignal(null);

  const checkUserSignedIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };

  onMount(checkUserSignedIn);

  supabase.auth.onAuthStateChange((_, session) => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <Routes>
        <Route
          path="/"
          element={user() ? <HomePage user={user()} /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
}

export default App;