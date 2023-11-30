const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Aj Seadler',
    email: 'aj@discostrangermusic.com',
    password: '2uLHuz',
    is_admin: true,
    profile_image_url: 'public/profilepic.svg.png'
  },
];

const shows = [
  {
    venue: 'Concert Hall',
    date: '12/15/2023',
    time: '8:00pm',
    price: 25.99,
    image_url: 'public/dec2nd.jpeg',
  },
  {
    venue: 'Club XYZ',
    date: '12/20/2023',
    time: '8:00pm',
    price: 30.50,
    image_url: 'public/3-25-22.jpg',
  },
];

const favorites = [
  {
    user_id: 1, // ID of the user who favorited
    show_id: 1 // ID of the favorited show
  },
  {
    user_id: 1, // ID of the user who favorited
    show_id: 2 // ID of the favorited show
  },
];


const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users, shows, favorites;
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
        is_admin BOOLEAN DEFAULT FALSE,
        profile_image_url VARCHAR(255)
      );

      CREATE TABLE shows(
        id SERIAL PRIMARY KEY,
        venue VARCHAR(255) NOT NULL,
        date VARCHAR(20) NOT NULL,
        time VARCHAR(20) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(255)
      );

      CREATE TABLE favorites(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        show_id INTEGER REFERENCES shows(id),
        UNIQUE (user_id, show_id)
      );
    `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
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
        INSERT INTO shows (venue, date, time, price, image_url)
        VALUES ($1, $2, $3, $4, $5)`,
        [show.venue, show.date, show.time, show.price, show.image_url]);
    }
    console.log('Show data inserted successfully.');
  } catch (error) {
    console.error('Error inserting show data:', error);
  }
};

const insertFavorites = async () => {
  try {
    for (const favorite of favorites) {
      await db.query(`
        INSERT INTO favorites (user_id, show_id)
        VALUES ($1, $2)`,
        [favorite.user_id, favorite.show_id]);
    }
    console.log('Favorite data inserted successfully.');
  } catch (error) {
    console.error('Error inserting favorite data:', error);
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertShows();
    await insertFavorites();
    console.log('Seed data inserted successfully.');
  } catch (err) {
    throw err;
  } finally {
    await db.end();
  }
};

seedDatabase();
