import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import supabase, { createEvent } from '../supabaseClient';

function CreateEventPage() {
  const navigate = useNavigate();
  const [eventData, setEventData] = createSignal({
    restaurant: '',
    date: '',
    time: '',
    guests: [],
  });
  const [friendsList, setFriendsList] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchFriends = async () => {
    setLoading(true);
    // Fetch friends from backend
    try {
      const response = await fetch('/api/getFriends', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFriendsList(data);
      } else {
        console.error('Error fetching friends');
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create event in backend
    try {
      const response = await fetch('/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include token if needed
        },
        body: JSON.stringify(eventData()),
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error creating event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full">
      <button
        class="mb-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Create New Event</h2>
      <form onSubmit={handleCreateEvent} class="space-y-4">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={eventData().restaurant}
          onInput={(e) => setEventData({ ...eventData(), restaurant: e.target.value })}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <input
          type="date"
          value={eventData().date}
          onInput={(e) => setEventData({ ...eventData(), date: e.target.value })}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <input
          type="time"
          value={eventData().time}
          onInput={(e) => setEventData({ ...eventData(), time: e.target.value })}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <div>
          <h3 class="text-lg font-semibold mb-2">Invite Friends</h3>
          <button
            type="button"
            class="mb-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={fetchFriends}
          >
            Fetch Friends
          </button>
          <Show when={!loading()}>
            <div class="max-h-60 overflow-y-auto">
              <For each={friendsList()}>
                {(friend) => (
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      value={friend.id}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const guests = eventData().guests;
                        if (checked) {
                          setEventData({ ...eventData(), guests: [...guests, friend.id] });
                        } else {
                          setEventData({ ...eventData(), guests: guests.filter((id) => id !== friend.id) });
                        }
                      }}
                    />
                    <span class="ml-2">{friend.name}</span>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
        <button
          type="submit"
          class="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          disabled={loading()}
        >
          {loading() ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;