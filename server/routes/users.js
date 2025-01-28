import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Search users
router.get('/search', auth, async (req, res) => {
  try {
    const query = req.query.q || '';
    const currentUser = await User.findById(req.userId);
    
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: req.userId },
      // Exclude users who are already friends
      _id: { $nin: currentUser.friends }
    }).select('username');
    
    res.json(users);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's friends
router.get('/friends', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends', 'username');
    res.json(user.friends);
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;