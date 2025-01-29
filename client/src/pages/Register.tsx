import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Define the API base URL
  const API_BASE_URL = 'https://friendzone-mv7f.onrender.com/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        password,
      });
      login(response.data.token, response.data.userId);
      toast.success('Registration successful!');
      setLoading(false);
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex items-center justify-center mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-full shadow-lg"
            >
              <UserPlus size={40} className="text-white" />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 ml-4">
              Register
            </h1>
          </motion.div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Username
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                placeholder="Enter your username"
                required
                aria-label="Username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                placeholder="Enter your password"
                required
                aria-label="Password"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-teal-500 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading} // Disable button while loading
              aria-disabled={loading}
            >
              {loading ? <Loader size={20} className="animate-spin" /> : 'Register'}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-gray-600 dark:text-gray-300"
          >
            Already have an account?{' '}
            <motion.span
              whileHover={{ scale: 1.05, color: '#10B981' }}
              onClick={() => navigate('/login')}
              className="text-teal-500 font-medium cursor-pointer transition-colors"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') navigate('/login');
              }}
            >
              Login
            </motion.span>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
