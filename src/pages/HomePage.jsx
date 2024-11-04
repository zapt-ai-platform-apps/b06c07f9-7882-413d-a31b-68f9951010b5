import { createSignal, onMount, For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import supabase, { createEvent } from '../supabaseClient';
import EventCard from '../components/EventCard';
import ProfileSettingsModal from '../components/ProfileSettingsModal';

function HomePage(props) {
  const navigate = useNavigate();
  const [events, setEvents] = createSignal([]);
  const [showProfileSettings, setShowProfileSettings] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const fetchEvents = async () => {
    setLoading(true);
    // Fetch events from backend
    try {
      const response = await fetch('/api/getEvents', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Error fetching events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  onMount(fetchEvents);

  return (
    <div class="h-full">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-purple-600">Welcome, {props.user.email}</h1>
        <div class="flex space-x-4">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => setShowProfileSettings(true)}
          >
            Profile Settings
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-purple-600">Your Events</h2>
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/create-event')}
          >
            Create Event
          </button>
        </div>

        <Show when={!loading()} fallback={<p>Loading events...</p>}>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={events()}>
              {(event) => <EventCard event={event} />}
            </For>
          </div>
        </Show>

        <Show when={showProfileSettings()}>
          <ProfileSettingsModal onClose={() => setShowProfileSettings(false)} />
        </Show>
      </main>
    </div>
  );
}

export default HomePage;