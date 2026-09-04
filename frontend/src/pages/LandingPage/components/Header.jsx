import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  // const isAuthenticated = true;
  // const user = { fullName: "Alex", role: "employer" };
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobPortal</span>
          </div>

          {/* Navigation Links - Hideen on mobile */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a
              onClick={() => navigate('/find-jobs')}
              className="font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Find Jobs
            </a>
            <a
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === 'employer' ? '/employer-dashboard' : '/login'
                );
              }}
              className="font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              For Employers
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Welcome, {user?.fullName}</span>
                <a
                  href={user?.role === 'employer' ? '/employer-dashboard' : '/find-jobs'}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-md"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-500 hover:text-gray-900"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-md"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
