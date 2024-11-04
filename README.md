# New App

## Overview

Welcome to New App, a social dining and lifestyle platform designed to enhance group dining experiences. This app simplifies event coordination, reservations, automated bill splitting, and payments, creating a seamless experience for friends who dine out together. Users can relive memories through shared photos and videos while enjoying a hassle-free payment process.

## User Journeys

### 1. Onboarding

1. **Sign Up**
   - Users can register using their phone number or link social media accounts (e.g., Facebook, Instagram).
2. **Set Profile Preferences**
   - Users fill out their profile with dietary preferences (e.g., vegetarian, non-vegetarian) and alcohol preferences.
   - Link a debit or credit card to maintain a minimum wallet balance in the app.
3. **Add Friends**
   - Import contacts from social media or phone contacts to find and add friends on the app.
4. **Privacy Settings**
   - Adjust privacy controls for profile visibility and location sharing.

### 2. Planning & Reserving an Event

1. **Create an Event**
   - Users select a restaurant from the list of partner restaurants.
   - Reserve a table by specifying date, time, and number of guests.
2. **Invite Friends**
   - Send invitations to friends to join the event.
3. **Confirmations**
   - Invited friends confirm or decline the invitation.
   - Attendees' dietary and alcohol preferences are recorded for bill splitting.

### 3. During the Event

1. **Real-Time Location Sharing**
   - Attendees can share their location to streamline arrivals.
   - Receive notifications when friends arrive at the venue.
2. **Media Sharing**
   - Users can upload photos and videos during the event.
   - Tag friends in posts to create shared memories.

### 4. Automated Bill Splitting & Payment

1. **Bill Generation**
   - At the end of the event, the restaurant issues a digital bill viewable in-app.
2. **Automated Splitting**
   - The app splits the bill based on dietary and alcohol preferences:
     - Vegetarian and non-vegetarian items are split accordingly.
     - Alcohol costs are shared among attendees who consume alcohol.
3. **Automatic Payment**
   - Each attendee's share is deducted from their in-app wallet.
   - Wallets auto-replenish from linked payment cards if needed.
4. **Receipts**
   - Attendees receive a digital receipt showing their contributions.
   - The restaurant receives an immediate payment summary.

### 5. Post-Event Sharing & Memories

1. **Event Timeline**
   - Users can revisit the event timeline, view shared media, and relive memories.
2. **Social Sharing**
   - Option to share event memories on external social media platforms.

## External APIs and Services

- **Supabase Auth**: Used for user authentication and social login.
- **Neon Database**: Used for storing user data, events, and transactions.
- **Drizzle ORM**: Simplifies database interactions.
- **ZAPT AI Events**: Handles backend event processing like media uploads.
- **Sentry**: For error logging and monitoring.

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Application ID for ZAPT integration.
- `VITE_PUBLIC_SENTRY_DSN`: Sentry Data Source Name for frontend error logging.
- `VITE_PUBLIC_APP_ENV`: Environment (development, production) for frontend.
- `VITE_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `VITE_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous API key.
- `NEON_DB_URL`: Connection string for Neon database.
- `PROJECT_ID`: Project ID for Sentry backend logging.
