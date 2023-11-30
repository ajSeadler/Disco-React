const db = require('./client');

const createShow = async (show) => {
  const { venue, date, time, price, image_url } = show;

  try {
    const result = await db.query(`
      INSERT INTO shows (venue, date, time, price, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [venue, date, time, price, image_url]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};



const getAllShows = async () => {
  try {
    const result = await db.query('SELECT * FROM shows');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getShowById = async (showId) => {
  try {
    const result = await db.query('SELECT * FROM shows WHERE id = $1', [showId]);
    return result.rows[0]; // Assuming there is only one show with the given ID
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllShows,
  getShowById,
  createShow
};