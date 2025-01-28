import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Send friend request
router.post('/request/:userId', auth, async (req, res) => {
  try {
    if (req.params.userId === req.userId) {
      return res.status(400).json({ message: 'Cannot send friend request to yourself' });
    }

    const [sender, receiver] = await Promise.all([
      User.findById(req.userId),
      User.findById(req.params.userId)
    ]);

    if (!receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if they're already friends
    if (sender.friends.includes(receiver._id)) {
      return res.status(400).json({ message: 'Already friends with this user' });
    }

    // Check if request already exists
    const existingRequest = receiver.friendRequests.find(
      request => request.from.toString() === req.userId
    );

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    receiver.friendRequests.push({ from: req.userId });
    await receiver.save();

    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Friend request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pending friend requests
router.get('/requests', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('friendRequests.from', 'username');
    
    const pendingRequests = user.friendRequests.filter(request => 
      request.status === 'pending'
    );

    res.json(pendingRequests);
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept/Reject friend request
router.put('/request/:userId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const [user, sender] = await Promise.all([
      User.findById(req.userId),
      User.findById(req.params.userId)
    ]);

    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    const requestIndex = user.friendRequests.findIndex(
      request => request.from.toString() === req.params.userId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (status === 'accepted') {
      // Add to both users' friends lists
      user.friends.push(req.params.userId);
      sender.friends.push(req.userId);
      await sender.save();
    }

    // Remove the request
    user.friendRequests.splice(requestIndex, 1);
    await user.save();

    res.json({ message: `Friend request ${status}` });
  } catch (error) {
    console.error('Accept/Reject error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove friend
router.delete('/:userId', auth, async (req, res) => {
  try {
    const [user, friend] = await Promise.all([
      User.findById(req.userId),
      User.findById(req.params.userId)
    ]);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    user.friends = user.friends.filter(id => id.toString() !== req.params.userId);
    friend.friends = friend.friends.filter(id => id.toString() !== req.userId);

    await Promise.all([user.save(), friend.save()]);

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Friend recommendation route
router.get('/recommendations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends', 'friends username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.map(friend => friend._id.toString());

    const recommendations = [];

    for (const friend of user.friends) {
      const friendDetails = await User.findById(friend._id).populate('friends', 'username');

      for (const mutualFriend of friendDetails.friends) {
        const mutualFriendId = mutualFriend._id.toString();

        if (
          mutualFriendId !== req.userId && // Exclude self
          !friendIds.includes(mutualFriendId) && // Exclude direct friends
          !recommendations.some(rec => rec.user._id.toString() === mutualFriendId) // Exclude duplicates
        ) {
          const mutualFriendCount = friendDetails.friends.length; // Count mutual friends
          recommendations.push({
            user: {
              _id: mutualFriend._id,
              username: mutualFriend.username,
            },
            mutualFriends: mutualFriendCount,
          });
        }
      }
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Friend recommendation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;