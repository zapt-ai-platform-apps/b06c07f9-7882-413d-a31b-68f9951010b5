import { createSignal, Show } from 'solid-js';
import supabase from '../supabaseClient';

function ProfileSettingsModal(props) {
  const [profileData, setProfileData] = createSignal({
    dietaryPreference: '',
    alcoholPreference: false,
  });
  const [loading, setLoading] = createSignal(false);

  const fetchProfile = async () => {
    setLoading(true);
    // Fetch profile data from backend
    try {
      const response = await fetch('/api/getProfile', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error('Error fetching profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Save profile data to backend
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include token if needed
        },
        body: JSON.stringify(profileData()),
      });
      if (response.ok) {
        props.onClose();
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 class="text-xl font-bold mb-4 text-purple-600">Profile Settings</h3>
        <form onSubmit={handleSave} class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-2">Dietary Preference</label>
            <select
              value={profileData().dietaryPreference}
              onChange={(e) => setProfileData({ ...profileData(), dietaryPreference: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            >
              <option value="">Select Preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label class="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={profileData().alcoholPreference}
                onChange={(e) => setProfileData({ ...profileData(), alcoholPreference: e.target.checked })}
                class="mr-2"
              />
              Consume Alcohol
            </label>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              disabled={loading()}
            >
              {loading() ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettingsModal;