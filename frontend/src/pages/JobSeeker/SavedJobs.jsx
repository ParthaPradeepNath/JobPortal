import { useState, useEffect } from 'react';
import { Bookmark, Building2, Briefcase } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import JobSeekerLayout from '../../components/layout/JobSeekerLayout';
import JobCard from '../../components/Cards/JobCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const fetchSavedJobs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_SAVED_JOBS);
      const saved = response.data.map((item) => ({
        ...item.job,
        isSaved: true,
      }));
      setSavedJobs(saved);
    } catch (err) {
      console.error('Failed to fetch saved jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [refresh]);

  return (
    <JobSeekerLayout active="saved-jobs">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
          <span className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-blue-600" />
            Saved Jobs
          </span>
        </h1>
        <p className="mt-1 text-gray-600">Your bookmarked opportunities, ready when you are</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
            <Building2 className="h-10 w-10 text-blue-400" />
          </div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">No saved jobs yet</h3>
          <p className="text-gray-500">Save jobs you're interested in and find them here later</p>
          <a
            href="/find-jobs"
            className="mt-4 inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {savedJobs.map((job) => (
            <JobCard key={job._id} job={job} onAction={() => setRefresh((r) => r + 1)} />
          ))}
        </div>
      )}
    </JobSeekerLayout>
  );
};

export default SavedJobs;
