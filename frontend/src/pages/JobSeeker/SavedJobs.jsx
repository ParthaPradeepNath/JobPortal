import { useState, useEffect } from "react";
import { Bookmark, Building2, Briefcase } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import JobSeekerLayout from "../../components/layout/JobSeekerLayout";
import JobCard from "../../components/Cards/JobCard";
import LoadingSpinner from "../../components/LoadingSpinner";

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
      console.error("Failed to fetch saved jobs", err);
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
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-blue-600" />
            Saved Jobs
          </span>
        </h1>
        <p className="text-gray-600 mt-1">
          Your bookmarked opportunities, ready when you are
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : savedJobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="h-20 w-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="h-10 w-10 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No saved jobs yet
          </h3>
          <p className="text-gray-500">
            Save jobs you're interested in and find them here later
          </p>
          <a
            href="/find-jobs"
            className="inline-block mt-4 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onAction={() => setRefresh((r) => r + 1)}
            />
          ))}
        </div>
      )}
    </JobSeekerLayout>
  );
};

export default SavedJobs;
