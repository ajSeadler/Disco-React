const express = require('express');
const showsRouter = express.Router();
const { getAllShows } = require('../db/shows');

showsRouter.get('/', async (req, res) => {
  try {
    const shows = await getAllShows();
    res.json(shows);
  } catch (error) {
    console.error('Error getting shows:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = showsRouter;