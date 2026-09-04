import { useState, useEffect, useMemo } from 'react';
import { Users, Calendar, MapPin, Briefcase, Download, Eye, ArrowLeft } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getIntials } from '../../utils/helper';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import ApplicantProfilePreview from '../../components/Cards/ApplicantProfilePreview';

const ApplicationViewer = () => {
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId));
      setApplications(response.data);
    } catch {
      console.log('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
    else navigate('/manage-jobs');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  // Group applications by job
  const groupedApplications = useMemo(() => {
    return applications.reduce((acc, app) => {
      if (!app.job) return acc;
      const jId = app.job._id;
      if (!acc[jId]) {
        acc[jId] = {
          job: app.job,
          applications: [],
        };
      }
      acc[jId].applications.push(app);
      return acc;
    }, {});
  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading && (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading applicants....</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 flex items-center gap-4 sm:mb-0">
              <button
                onClick={() => navigate('/manage-jobs')}
                className="group spaxce-x-2 flex items-center rounded-xl border border-gray-200 bg-white/50 px-3 py-2 text-sm font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back</span>
              </button>

              <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
                Applications Overview
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-0">
          {Object.keys(groupedApplications).length === 0 ? (
            // Empty state
            <div className="py-16 text-center">
              <Users className="mx-auto h-24 w-24 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No applications avaialble</h3>
              <p className="mt-2 text-gray-500">No applications found at the moment</p>
            </div>
          ) : (
            // Applications by job
            <div className="space-y-8">
              {Object.values(groupedApplications).map(({ job, applications }) => (
                <div key={job._id} className="overflow-hidden rounded-xl bg-white shadow-md">
                  {/* Job Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-white">{job.title}</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-blue-100">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span className="text-sm">{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">{job.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm">
                        <span className="text-sm font-medium text-white">
                          {applications.length} Application
                          {applications.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Application List */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div
                          key={application._id}
                          className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 md:flex-row md:items-center"
                        >
                          <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              {application.applicant.avatar ? (
                                <img
                                  src={application.applicant.avatar}
                                  alt={application.applicant.name}
                                  className="h-12 w-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                  <span className="font-semibold text-blue-600">
                                    {getIntials(application.applicant.name)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Applicant Info */}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {application.applicant.name}
                              </h3>
                              <p className="text-sm text-gray-600">{application.applicant.email}</p>
                              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  Applied {moment(application.createdAt)?.format('DD-MM-YYYY')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-4 flex items-center gap-3 md:m-0">
                            <StatusBadge status={application.status} />
                            <button
                              onClick={() => handleDownloadResume(application.applicant.resume)}
                              className="px-3py-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                              <Download className="h-4 w-4" />
                              Resume
                            </button>

                            <button onClick={() => setSelectedApplicant(application)} className="">
                              <Eye className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200" />
                              View Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {selectedApplicant && (
          <ApplicantProfilePreview
            selectedApplicant={selectedApplicant}
            setSelectedApplicant={setSelectedApplicant}
            handleDownloadResume={handleDownloadResume}
            handleClose={() => {
              setSelectedApplicant(null);
              fetchApplications();
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationViewer;
