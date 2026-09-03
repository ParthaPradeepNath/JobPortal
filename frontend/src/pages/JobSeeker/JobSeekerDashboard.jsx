import { useState, useEffect } from "react";
import { Search, MapPin, SlidersHorizontal, Briefcase } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import JobSeekerLayout from "../../components/layout/JobSeekerLayout";
import JobCard from "../../components/Cards/JobCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    type: "",
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
      console.error("Failed to fetch jobs", err);
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
    setFilters({ keyword: "", location: "", category: "", type: "" });
    setTimeout(fetchJobs, 0);
  };

  return (
    <JobSeekerLayout active="find-jobs">
      {/* Hero search section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-blue-100 mb-6">
            Browse opportunities from top companies and apply in one click
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2 shadow-lg"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keyword..."
                value={filters.keyword}
                onChange={(e) => handleFilterChange("keyword", e.target.value)}
                className="w-full py-2 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 md:border-l md:border-gray-200">
              <MapPin className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location..."
                value={filters.location}
                onChange={(e) =>
                  handleFilterChange("location", e.target.value)
                }
                className="w-full py-2 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <p className="text-sm text-gray-600">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                handleFilterChange("category", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Job Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {JOB_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
        <div className="text-center py-20">
          <div className="h-20 w-20 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <Briefcase className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No jobs found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onAction={fetchJobs} />
          ))}
        </div>
      )}
    </JobSeekerLayout>
  );
};

export default JobSeekerDashboard;
