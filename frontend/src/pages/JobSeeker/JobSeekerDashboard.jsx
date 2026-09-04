import { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, Briefcase } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useAuth } from '../../context/AuthContext';
import JobSeekerLayout from '../../components/layout/JobSeekerLayout';
import JobCard from '../../components/Cards/JobCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CATEGORIES, JOB_TYPES } from '../../utils/data';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    type: '',
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.location) params.location = filters.location;
      if (filters.category) params.category = filters.category;
      if (filters.type) params.type = filters.type;
      if (user?._id) params.userId = user._id;

      const response = await axiosInstance.get(API_PATHS.JOBS.GET_ALL_JOBS, {
        params,
      });
      setJobs(response.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleReset = () => {
    setFilters({ keyword: '', location: '', category: '', type: '' });
    setTimeout(fetchJobs, 0);
  };

  return (
    <JobSeekerLayout active="find-jobs">
      {/* Hero search section */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-10">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Find Your Dream Job</h1>
          <p className="mb-6 text-blue-100">
            Browse opportunities from top companies and apply in one click
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 rounded-xl bg-white p-2 shadow-lg md:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keyword..."
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                className="w-full bg-transparent py-2 text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 px-3 md:border-l md:border-gray-200">
              <MapPin className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full bg-transparent py-2 text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <p className="text-sm text-gray-600">
          {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {showFilters && (
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Job Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Types</option>
              {JOB_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end sm:col-span-2">
            <button
              onClick={handleReset}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Jobs grid */}
      {loading ? (
        <LoadingSpinner />
      ) : jobs.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Briefcase className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onAction={fetchJobs} />
          ))}
        </div>
      )}
    </JobSeekerLayout>
  );
};

export default JobSeekerDashboard;
