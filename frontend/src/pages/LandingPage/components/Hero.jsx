// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Building2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Hero = () => {
  // const isAuthenticated = true
  // const user = { fullName: "Alex", role: "employer" }
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Active Users', value: '2.4M+' },
    { icon: Building2, label: 'Companies', value: '50K+' },
    { icon: TrendingUp, label: 'Jobs Posted', value: '150K+' },
    { icon: Search, label: 'Jobs Searched', value: '2.4M+' },
  ];
  return (
    <section className="flex min-h-screen items-center bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 pt-10 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl"
          >
            Find Your Dream Job or
            <span className="mt-2 block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Hire
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-w-2xl mx-auto mb-12 text-xl leading-relaxed text-gray-600 md:text-xl"
          >
            Connect talented professionals with innovative companies. Your next career move or
            perfect candidate is just one click away.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              onClick={() => navigate('/find-jobs')}
            >
              <Search className="h-5 w-5" />
              <span>Find Jobs</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === 'employer' ? '/employer-dashboard' : '/login'
                );
              }}
            >
              Post a Job
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="flex flex-col items-center space-y-2 rounded-xl p-4 transition-colors hover:bg-gray-50"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-100 to-purple-100">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-blue-100 opacity-30 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-purple-100 opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
