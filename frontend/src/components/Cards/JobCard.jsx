import { MapPin, Briefcase, Bookmark, BookmarkCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";

const JobCard = ({ job, onAction }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const company = job?.company || {};
  const logo = company?.companyLogo || company?.avatar || "";
  const companyName =
    company?.companyName || company?.name || "Company";

  const salary =
    job.salaryMin || job.salaryMax
      ? `$${Number(job.salaryMin || 0).toLocaleString()} - $${Number(
          job.salaryMax || 0
        ).toLocaleString()}`
      : null;

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to save jobs");
      navigate("/login");
      return;
    }
    if (job.isSaved) {
      await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(job._id));
      toast.success("Job removed from saved");
    } else {
      await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(job._id));
      toast.success("Job saved");
    }
    onAction && onAction();
  };

  return (
    <div
      onClick={() => navigate(`/job/${job._id}`)}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-blue-100 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {logo ? (
            <img
              src={logo}
              alt={companyName}
              className="h-14 w-14 rounded-xl object-cover border border-gray-100"
            />
          ) : (
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{companyName}</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`p-2 rounded-lg transition-colors ${
            job.isSaved
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
          }`}
          title={job.isSaved ? "Remove from saved" : "Save job"}
        >
          {job.isSaved ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{job.location || "Remote"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span>{job.type}</span>
        </div>
        {salary && <span className="font-medium text-gray-800">{salary}</span>}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Posted {moment(job.createdAt).fromNow()}
        </span>

        <div className="flex items-center gap-2">
          {job.applicationStatus ? (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              {job.applicationStatus}
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Apply Now
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
