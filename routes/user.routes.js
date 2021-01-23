const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');
const User = require('../models/user.model');
const Article = require('../models/article.model');
const express = require('express');
const router = express.Router();

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.userId != userId) {
      return res.status(403).json({ message: 'This action is forbidden' });
    }

    const user = await User.findById(userId);
    const updates = req.body;

    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }

    if (user.favourites.indexOf(updates.favourites) != -1) {
      return res.status(409).json({ message: `It's already liked` });
    } else {
      user.favourites.push(updates.favourites);
    }

    const updatedUser = await user.save();
    return res.status(200).json({ message: 'Success', user: updatedUser });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
