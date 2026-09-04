import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Edit, X, Trash2, ChevronUp, ChevronDown, Users } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ManageJobs = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 8;

  // Sample job data
  const [jobs, setJobs] = useState([]);

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'applicants') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Toggle the status of a job
  const handleStatusChange = async (jobId) => {
    try {
      await axiosInstance.put(API_PATHS.JOBS.TOGGLE_CLOSE(jobId));
      getPostedJobs(true);
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  // Delete a specific job
  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      setJobs(jobs.filter((job) => job.id !== jobId));
      toast.success('Job listing deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Decide which sort icon to display based on current sort field and direction
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp className="h-4 w-4 text-gray-400" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-600" />
    );
  };

  // Loading state with animations
  const LoadingRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-200"></div>
            <div className="h-3 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 rounded-full bg-gray-200"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-12 rounded bg-gray-200"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <div className="h-8 w-16 rounded bg-gray-200"></div>
          <div className="h-8 w-16 rounded bg-gray-200"></div>
          <div className="h-8 w-16 rounded bg-gray-200"></div>
        </div>
      </td>
    </tr>
  );

  const getPostedJobs = async (disableLoader) => {
    setIsLoading(!disableLoader);

    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);

      if (response.status === 200 && response.data?.length > 0) {
        const formattedJobs = response.data?.map((job) => ({
          id: job._id,
          title: job?.title,
          company: job?.company?.name,
          status: job?.isClosed ? 'Closed' : 'Active',
          applicants: job?.applicationCount || 0,
          datePosted: moment(job?.createdAt).format('DD-MM-YYYY'),
          logo: job?.company?.companyLogo,
        }));

        setJobs(formattedJobs);
      }
    } catch (error) {
      if (error.response) {
        // Handle API-specific errors
        console.error(error.response.data.message);
      } else {
        console.error('Error posting job. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostedJobs();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="manage-jobs">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">Job Management</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your job postings and track applications
                </p>
              </div>

              <button
                className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/30"
                onClick={() => navigate('/post-job')}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Job
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm">
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pb-3 pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2 pr-4 pl-10 text-sm placeholder-gray-400 outline-0 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              {/* Status filter */}
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 px-4 py-2 text-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Results Summary */}
              <div className="my-4">
                <p className="text-sm text-gray-600">
                  Showing {paginatedJobs.length} of {filteredAndSortedJobs.length} jobs
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm">
              {filteredAndSortedJobs.length === 0 && !isLoading ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">No jobs found</h3>
                  <p className="text-gary-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="w-[75vw] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-x-auto md:w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                      <tr>
                        <th
                          className="min-w-[200px] cursor-pointer px-6 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-gray-100/60 sm:min-w-0"
                          onClick={() => handleSort('title')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Job Title</span>
                            <SortIcon field="title" />
                          </div>
                        </th>
                        <th
                          className="min-w-[120px] cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase transition-all duration-200 hover:bg-gray-100/60 sm:min-w-0"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <SortIcon field="status" />
                          </div>
                        </th>
                        <th
                          className="min-w-[130px] cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase transition-all duration-200 hover:bg-gray-100/60 sm:min-w-0"
                          onClick={() => handleSort('applicants')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Applicants</span>
                            <SortIcon field="applicants" />
                          </div>
                        </th>
                        <th className="min-w-[180px] cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase transition-all duration-200 hover:bg-gray-100/60 sm:min-w-0">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => <LoadingRow key={index} />)
                        : paginatedJobs.map((job) => (
                            <tr
                              key={job.id}
                              className="border-b border-gray-100/60 transition-all duration-200 hover:bg-blue-50/30"
                            >
                              <td className="min-w-[200px] px-6 py-5 whitespace-nowrap sm:min-w-0">
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {job.title}
                                  </div>
                                  <div className="text-xs font-medium text-gray-500">
                                    {job.company}
                                  </div>
                                </div>
                              </td>
                              <td className="min-w-[120px] px-6 py-5 whitespace-nowrap sm:min-w-0">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                                    job.status === 'Active'
                                      ? 'border border-emerald-200 bg-emerald-100 text-emerald-800'
                                      : 'border border-gray-200 bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </td>
                              <td className="min-w-[130px] px-6 py-5 whitespace-nowrap sm:min-w-0">
                                <button
                                  className="flex items-center rounded-lg px-2 py-1 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-800"
                                  onClick={() =>
                                    navigate('/applicants', {
                                      state: { jobId: job.id },
                                    })
                                  }
                                >
                                  <Users className="mr-1.5 h-4 w-4" />
                                  {job.applicants}
                                </button>
                              </td>
                              <td className="min-w-[180px] px-6 py-4 text-sm font-medium whitespace-nowrap sm:min-w-0">
                                <div className="flex space-x-2">
                                  <button
                                    className="rounded-lg p-2 text-blue-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-800"
                                    onClick={() =>
                                      navigate('/post-job', {
                                        state: { jobId: job.id },
                                      })
                                    }
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>

                                  {job.status === 'Active' ? (
                                    <button
                                      onClick={() => handleStatusChange(job.id)}
                                      className="fle tet-xs items-center gap-2 rounded-lg p-2 text-orange-600 transition-colors duration-200 hover:bg-orange-50 hover:text-orange-800"
                                    >
                                      <X className="h-4 w-4" />
                                      <span className="hidden sm:inline">Close</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleStatusChange(job.id)}
                                      className="flex items-center gap-2 rounded-lg p-2 text-xs text-green-600 transition-colors duration-200 hover:bg-green-50 hover:text-green-800"
                                    >
                                      <Plus className="h-4 w-4" />
                                      <span className="hidden sm:inline">Activate</span>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteJob(job.id)}
                                    className="rounded-lg p-2 text-red-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-800"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="trxt-sm relative inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(startIndex + itemsPerPage, filteredAndSortedJobs.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredAndSortedJobs.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                            currentPage === page
                              ? 'z-10 border-blue-500 bg-blue-50 text-blue-600'
                              : 'border-gray-300 bg-white text-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;
