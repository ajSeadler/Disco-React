const db = require('./client');

const getAllShows = async () => {
  try {
    const result = await db.query('SELECT * FROM shows');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllShows,
};