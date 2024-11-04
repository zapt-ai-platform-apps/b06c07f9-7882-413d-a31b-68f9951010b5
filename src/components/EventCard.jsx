import { useNavigate } from '@solidjs/router';

function EventCard(props) {
  const navigate = useNavigate();
  const event = props.event;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <h3 class="text-xl font-bold mb-2 text-purple-600">{event.restaurant}</h3>
      <p class="text-gray-700">
        {event.date} at {event.time}
      </p>
      <p class="text-gray-700">Guests: {event.guests.length}</p>
      <button
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={() => navigate(`/event/${event.id}`)}
      >
        View Event
      </button>
    </div>
  );
}

export default EventCard;