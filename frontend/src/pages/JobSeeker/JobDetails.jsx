import { useState, useEffect } from 'react';
import {
  MapPin,
  Briefcase,
  Calendar,
  Building2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useAuth } from '../../context/AuthContext';
import JobSeekerLayout from '../../components/layout/JobSeekerLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import moment from 'moment';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);

  const fetchJob = async () => {
    try {
      const params = user?._id ? { userId: user._id } : {};
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_ID(jobId), { params });
      setJob(response.data);
    } catch {
      toast.error('Job not found');
      navigate('/find-jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save jobs');
      navigate('/login');
      return;
    }
    setSaving(true);
    try {
      if (job.isSaved) {
        await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(job._id));
        setJob((prev) => ({ ...prev, isSaved: false }));
        toast.success('Job removed from saved');
      } else {
        await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(job._id));
        setJob((prev) => ({ ...prev, isSaved: true }));
        toast.success('Job saved');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for this job');
      navigate('/login');
      return;
    }

    if (user?.role !== 'jobseeker') {
      toast.error('Only job seekers can apply to jobs');
      return;
    }

    if (!user?.resume) {
      toast.error('Please upload your resume in your profile first');
      navigate('/profile');
      return;
    }

    setApplying(true);
    try {
      await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
      toast.success('Application submitted successfully!');
      fetchJob();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply for this job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <JobSeekerLayout>
        <LoadingSpinner />
      </JobSeekerLayout>
    );
  }

  if (!job) return null;

  const company = job.company || {};
  const logo = company?.companyLogo || company?.avatar || '';
  const companyName = company?.companyName || company?.name || 'Company';
  const salaryRange =
    job.salaryMin || job.salaryMax
      ? `$${Number(job.salaryMin || 0).toLocaleString()} - $${Number(
          job.salaryMax || 0
        ).toLocaleString()}`
      : null;

  return (
    <JobSeekerLayout>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Job header card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex items-start gap-4">
                {logo ? (
                  <img
                    src={logo}
                    alt={companyName}
                    className="h-16 w-16 rounded-2xl border border-gray-100 object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <p className="mt-1 text-gray-600">{companyName}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {job.location || 'Remote'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      Posted {moment(job.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </div>

              {job.applicationStatus ? (
                <span className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {job.applicationStatus}
                </span>
              ) : (
                <button
                  onClick={handleSaveToggle}
                  disabled={saving}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    job.isSaved
                      ? 'border-blue-200 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {job.isSaved ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                  {job.isSaved ? 'Saved' : 'Save'}
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">About This Role</h2>
            <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">What We're Looking For</h2>
            <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{job.requirements}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply card */}
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {salaryRange && (
              <div className="mb-6">
                <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">Salary Range</p>
                <p className="text-lg font-bold text-gray-900">{salaryRange}</p>
                <p className="text-xs text-gray-400">per year</p>
              </div>
            )}

            {job.applicationStatus ? (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
                <p className="font-medium text-emerald-700">{job.applicationStatus}</p>
                <p className="text-sm text-emerald-600">You've already applied for this position</p>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {applying ? 'Applying...' : 'Apply Now'}
              </button>
            )}

            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Building2 className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{companyName}</p>
                  <p className="text-sm text-gray-500">Hiring Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default JobDetails;
