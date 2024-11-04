import { pgTable, serial, text, timestamp, uuid, boolean, date, time } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(),
  dietaryPreference: text('dietary_preference'),
  alcoholPreference: boolean('alcohol_preference').default(false),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  restaurant: text('restaurant').notNull(),
  date: date('date').notNull(),
  time: time('time').notNull(),
  hostId: uuid('host_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const eventGuests = pgTable('event_guests', {
  eventId: serial('event_id').references(() => events.id),
  userId: uuid('user_id').references(() => users.id),
  confirmed: boolean('confirmed').default(false),
  dietaryPreference: text('dietary_preference'),
  alcoholPreference: boolean('alcohol_preference').default(false),
});