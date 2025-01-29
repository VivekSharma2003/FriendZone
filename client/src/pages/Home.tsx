import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  UserPlus,
  UserMinus,
  Users,
  Bell,
  LogOut,
  Loader,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useSpring, animated } from '@react-spring/web';

interface User {
  _id: string;
  username: string;
}

interface FriendRequest {
  _id: string;
  from: User;
  status: string;
}

interface FriendRecommendation {
  user: User;
  mutualFriends: number;
}

function Home() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [recommendations, setRecommendations] = useState<FriendRecommendation[]>([]);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState({
    search: false,
    friends: false,
    requests: false,
    recommendations: false,
  });

  // Floating animation for icons
  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { tension: 300, friction: 10 },
  });

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    fetchFriends();
    fetchRecommendations();
    fetchFriendRequests();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const API_BASE_URL = 'http://localhost:3000/api';

  const fetchFriendRequests = async () => {
    try {
      setLoading((prev) => ({ ...prev, requests: true }));
      const response = await axios.get(`${API_BASE_URL}/friends/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriendRequests(response.data);
    } catch (error) {
      toast.error('Failed to load friend requests');
    } finally {
      setLoading((prev) => ({ ...prev, requests: false }));
    }
  };

  const fetchFriends = async () => {
    try {
      setLoading((prev) => ({ ...prev, friends: true }));
      const response = await axios.get(`${API_BASE_URL}/users/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(response.data);
    } catch (error) {
      toast.error('Failed to load friends');
    } finally {
      setLoading((prev) => ({ ...prev, friends: false }));
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoading((prev) => ({ ...prev, recommendations: true }));
      const response = await axios.get(`${API_BASE_URL}/friends/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendations(response.data);
    } catch (error) {
      toast.error('Failed to load recommendations');
    } finally {
      setLoading((prev) => ({ ...prev, recommendations: false }));
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading((prev) => ({ ...prev, search: true }));
      const response = await axios.get(
        `${API_BASE_URL}/users/search?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to search users');
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  const sendFriendRequest = async (userId: string) => {
    try {
      await axios.post(
        `${API_BASE_URL}/friends/request/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
      fetchRecommendations();
      toast.success('Friend request sent successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send friend request');
    }
  };

  const handleFriendRequest = async (
    userId: string,
    status: 'accepted' | 'rejected'
  ) => {
    try {
      await axios.put(
        `${API_BASE_URL}/friends/request/${userId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFriendRequests();
      if (status === 'accepted') {
        fetchFriends();
        fetchRecommendations();
        toast.success('Friend request accepted');
      } else {
        toast.success('Friend request rejected');
      }
    } catch (error) {
      toast.error('Failed to handle friend request');
    }
  };

  const removeFriend = async (userId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/friends/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFriends();
      fetchRecommendations();
      toast.success('Friend removed successfully');
    } catch (error) {
      toast.error('Failed to remove friend');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition-colors duration-500">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-md shadow-lg"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-extrabold text-gray-800 flex items-center gap-2"
          >
            <Users className="text-teal-500" size={24} />
            {username}
          </motion.h1>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-sm transition"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </motion.button>
              {friendRequests.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {friendRequests.length}
                </span>
              )}
            </div>
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition"
              aria-label="Logout"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search users..."
              className="flex-1 bg-white text-gray-800 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              aria-label="Search users"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={loading.search}
              className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Search"
            >
              {loading.search ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Search size={20} />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {users.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4"
              >
                <div className="bg-white rounded-md shadow-md p-4">
                  <h3 className="text-lg font-semibold text-teal-500 mb-4">
                    Search Results
                  </h3>
                  {users.map((user) => (
                    <motion.div
                      key={user._id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm mb-2 hover:bg-teal-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Removed Profile Picture */}
                        <span className="font-medium text-gray-800">{user.username}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => sendFriendRequest(user._id)}
                        className="text-teal-500 hover:text-teal-600"
                        aria-label={`Send friend request to ${user.username}`}
                      >
                        <UserPlus size={20} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Friend Requests */}
        <AnimatePresence>
          {friendRequests.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-teal-500">
                  <animated.div style={floatAnimation}>
                    <Bell className="text-teal-500" size={24} />
                  </animated.div>
                  Friend Requests
                </h2>
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <motion.div
                      key={request._id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {/* Removed Profile Picture */}
                        <span className="font-medium text-gray-800">
                          {request.from.username}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleFriendRequest(request.from._id, 'accepted')
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm transition"
                          aria-label={`Accept friend request from ${request.from.username}`}
                        >
                          Accept
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleFriendRequest(request.from._id, 'rejected')
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition"
                          aria-label={`Reject friend request from ${request.from.username}`}
                        >
                          Reject
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Friends and Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Friends List */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-teal-500">
                <Users className="text-teal-500" size={24} />
                Friends
              </h2>
              <div className="space-y-4">
                {loading.friends ? (
                  <div className="flex justify-center">
                    <Loader size={30} className="animate-spin text-teal-500" />
                  </div>
                ) : friends.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No friends yet</p>
                ) : (
                  friends.map((friend) => (
                    <motion.div
                      key={friend._id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm hover:bg-teal-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Removed Profile Picture */}
                        <span className="font-medium text-gray-800">
                          {friend.username}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFriend(friend._id)}
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Remove ${friend.username} from friends`}
                      >
                        <UserMinus size={20} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Friend Recommendations */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-teal-500">
                Recommended Friends
              </h2>
              <div className="space-y-4">
                {loading.recommendations ? (
                  <div className="flex justify-center">
                    <Loader size={30} className="animate-spin text-teal-500" />
                  </div>
                ) : recommendations.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No recommendations available
                  </p>
                ) : (
                  recommendations.map(({ user, mutualFriends }) => (
                    <motion.div
                      key={user._id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm hover:bg-teal-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Removed Profile Picture */}
                        <div>
                          <span className="font-medium text-gray-800">
                            {user.username}
                          </span>
                          <p className="text-sm text-gray-600">
                            {mutualFriends} mutual friends
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => sendFriendRequest(user._id)}
                        className="text-teal-500 hover:text-teal-600"
                        aria-label={`Send friend request to ${user.username}`}
                      >
                        <UserPlus size={20} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
