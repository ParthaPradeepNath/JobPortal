import { useState, useEffect, useRef } from 'react';
import { Briefcase, Menu, X, Search, Bookmark, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const JobSeekerLayout = ({ active, children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItem = (id, label, icon, path) => {
    const Icon = icon;
    const isActive = active === id;
    return (
      <button
        onClick={() => navigate(path)}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </button>
    );
  };

  const navActions = (
    <>
      {navItem('find-jobs', 'Find Jobs', Search, '/find-jobs')}
      {isAuthenticated && navItem('saved-jobs', 'Saved Jobs', Bookmark, '/saved-jobs')}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobPortal</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-2 md:flex">{navActions}</nav>

            {/* Auth / Profile */}
            <div className="hidden items-center gap-3 md:flex">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-gray-100"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden text-sm font-medium text-gray-700 lg:block">
                      {user?.name}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                      <div className="mb-1 border-b border-gray-100 px-4 py-2">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate('/profile');
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="h-4 w-4" /> My Profile
                      </button>
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="space-y-2 border-t border-gray-100 bg-white px-4 py-4 md:hidden">
            {navActions}
            {!isAuthenticated && (
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="block w-full rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
};

export default JobSeekerLayout;
