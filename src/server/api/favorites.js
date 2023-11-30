// api/favorites.js

const express = require('express');
const favoritesRouter = express.Router();
const { requireUser } = require('./utilis');

// Assuming you have a function to get favorites from the database
const { getFavoritesByUserId, addFavorite } = require('../db/favorites');

favoritesRouter.use(requireUser);

// Get favorites for the current user
favoritesRouter.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const favorites = await getFavoritesByUserId(userId);
    res.send({ favorites });
  } catch (error) {
    next(error);
  }
});

// Add a show to favorites for the current user
favoritesRouter.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { showId } = req.body;
    const favorite = await addFavorite(userId, showId);
    res.send({ favorite });
  } catch (error) {
    next(error);
  }
});

module.exports = favoritesRouter;
