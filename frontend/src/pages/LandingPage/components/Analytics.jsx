import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react';

const Analytics = () => {
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  };

  const stats = [
    {
      icon: Users,
      title: 'Active Users',
      value: '2.4M+',
      growth: '+15%',
      color: 'blue',
    },
    {
      icon: Briefcase,
      title: 'Jobs Posted',
      value: '150K+',
      growth: '+15%',
      color: 'purple',
    },
    {
      icon: Target,
      title: 'Successful Hires',
      value: '89K+',
      growth: '+18%',
      color: 'green',
    },
    {
      icon: TrendingUp,
      title: 'Match Rate',
      value: '94%',
      growth: '+8%',
      color: 'orange',
    },
  ];
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Platform
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analytics
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Real-time insights and data-driven results that showcase the power of our platform in
            connecting talent with opportunities
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`h-12 w-12 ${colorMap[stat.color]?.bg ?? 'bg-blue-100'} flex items-center justify-center rounded-xl`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${colorMap[stat.color]?.text ?? 'text-blue-600'}`}
                  />
                </div>
                <span className="rounded-full bg-green-50 px-2 py-1 text-sm font-semibold text-green-500">
                  {stat.growth}
                </span>
              </div>
              <h3 className="mb-2 text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
