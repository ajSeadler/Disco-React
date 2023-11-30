const express = require('express');
const showsRouter = express.Router();
const { getAllShows, getShowById, createShow } = require('../db/shows');

showsRouter.get('/', async (req, res) => {
  try {
    const shows = await getAllShows();
    res.json(shows);
  } catch (error) {
    console.error('Error getting shows:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

showsRouter.post('/', async (req, res, next) => {
  try {
    const { venue, date, time, price, imageUrl } = req.body;
    const newShow = await createShow({ venue, date, time, price, imageUrl });
    res.status(201).json(newShow);
  } catch (error) {
    console.error('Error creating show:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


showsRouter.get('/:showId', async (req, res, next) => {
  try {
    const showId = req.params.showId;
    console.log('Received Show ID:', showId);
    const show = await getShowById(showId);
    res.send({ show });
  } catch (error) {
    next(error);
  }
});

module.exports = showsRouter;