import { MapPin, DollarSign, ArrowLeft, Building2, Clock, Users } from 'lucide-react';
import { CATEGORIES, JOB_TYPES } from '../../utils/data';
import { useAuth } from '../../context/AuthContext';

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();
  const currencies = [{ value: 'usd', label: '$' }];
  return (
    <div className="min-h-screenbg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-8 rounded-2xl border border-white/20 bg-white/80 px-6 py-4 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent md:text-xl">
                Job Preview
              </h2>
            </div>
            <button
              onClick={() => setIsPreview(false)}
              className="group flex transform items-center space-x-2 rounded-xl border border-gray-200 bg-white/50 px-6 py-3 text-xs font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl md:text-sm"
            >
              <ArrowLeft className="group-hover:-tranlate-x-1 h-4 w-4 transition-transform" />
              <span>Back to edit</span>
            </button>
          </div>

          {/* Main context card */}
          <div className="">
            {/* Hero section with clean background */}
            <div className="relative mt-8 border-b border-gray-100 bg-white px-0 pb-8">
              <div className="relative z-10">
                <div className="mb-0 flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="mb-2 text-lg leading-tight font-semibold text-gray-900 lg:text-xl">
                      {formData.jobTitle}
                    </h1>

                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {formData.isRemote ? 'Remote' : formData.location}
                        </span>
                        {formData.isRemote && formData.location && (
                          <span className="text-sm text-gray-500"> . {formData.location}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {user?.companyLogo ? (
                    <img
                      src={user.companyLogo}
                      alt="company logo"
                      className="h-16 w-16 rounded-2xl border-4 border-white/20 object-cover shadow-lg md:h-20 md:w-20"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-gray-200 bg-gray-50">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                    {CATEGORIES.find((c) => c.value === formData.category)?.label}
                  </span>
                  <span className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                    {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
                  </span>
                  <div className="flex items-center space-x-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                    <Clock className="h-4 w-4" />
                    <span>Posted today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content sections */}
            <div className="space-y-8 px-0 pb-8">
              {/* Salary section */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3">
                        <DollarSign className="h-4 w-4 text-white md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900">Compensation</h3>
                        <div className="text-sm font-bold text-gray-900 md:text-lg">
                          {currencies.find((c) => c.value === formData.currency)?.label}
                          {formData.salaryMin.toLocaleString()} -{' '}
                          {currencies.find((c) => c.value === formData.currency)?.label}
                          {formData.salaryMax.toLocaleString()}
                          <span className="ml-1 text-sm font-normal text-gray-600 md:text-lg">
                            per year
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-emrald-100 hidden items-center space-x-2 rounded-full px-3 py-1 text-sm text-emerald-700 md:flex">
                      <Users className="h-4 w-4" />
                      <span>Competitive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-4">
                <h3 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  <span className="text-base md:text-lg">About This Role</span>
                </h3>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                    {formData.description}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div>
                  <span className="text-base md:text-lg">What We're Looking For</span>
                </h3>
                <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                    {formData.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
