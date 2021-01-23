const User = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    let message = '';

    if (req.userId != userId) {
      return res.status(403).json({ message: 'This action is forbidden' });
    }

    const user = await User.findById(userId);
    const updates = req.body;

    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }

    if (updates.favourites) {
      const index = user.favourites.indexOf(updates.favourites);
      if (index != -1) {
        message = 'Removed from favourites';
        user.favourites.splice(index, 1);
      } else {
        message = 'Added to favourites';
        user.favourites.push(updates.favourites);
      }
    }

    const updatedUser = await user.save();
    return res.status(200).json({ message, user: updatedUser });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
