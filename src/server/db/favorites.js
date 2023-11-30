// db/favorites.js

const db = require('./client');

// Function to get favorites by user ID
const getFavoritesByUserId = async (userId) => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM favorites
      WHERE user_id = $1;
    `, [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFavoritesByUserId,
  // Other functions related to favorites
};
