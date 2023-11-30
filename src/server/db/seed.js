const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Aj Seadler',
    email: 'aj@discostrangermusic.com',
    password: '2uLHuz',
    is_admin: true
  },
  
  // Add more user objects as needed
];

const shows = [
  {
    venue: 'Concert Hall',
    date: '2023-12-15',
    time: '18:00:00',
    price: 25.99,
  },
  {
    venue: 'Club XYZ',
    date: '2023-12-20',
    time: '20:30:00',
    price: 30.50,
  },
  // Add more show objects as needed
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users, shows;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE shows(
        id SERIAL PRIMARY KEY,
        venue VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `);
  } catch (err) {
    throw err;
  }
};


const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({ name: user.name, email: user.email, password: user.password });
    }
    console.log('User data inserted successfully.');
  } catch (error) {
    console.error('Error inserting user data:', error);
  }
};

const insertShows = async () => {
  try {
    for (const show of shows) {
      await db.query(`
        INSERT INTO shows (venue, date, time, price)
        VALUES ($1, $2, $3, $4)`,
        [show.venue, show.date, show.time, show.price]);
    }
    console.log('Show data inserted successfully.');
  } catch (error) {
    console.error('Error inserting show data:', error);
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertShows();
    console.log('Seed data inserted successfully.');
  } catch (err) {
    throw err;
  } finally {
    await db.end();
  }
};

seedDatabase();
