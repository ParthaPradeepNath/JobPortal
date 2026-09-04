import { Save, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const EditProfileDetails = ({
  formData,
  handleImageChange,
  handleInputChange,
  handleSave,
  handleCancel,
  saving,
  uploading,
}) => {
  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
                <h1 className="text-lg font-medium text-white md:text-xl">Edit Profile</h1>
              </div>

              {/* Edit Form */}
              <div className="p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h2 className="border-b pb-2 text-lg font-medium text-gray-800">
                      Personal Information
                    </h2>

                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData?.avatar}
                          alt="avatar"
                          className="h-20 w-20 rounded-full border-4 border-gray-200 object-cover"
                        />
                        {uploading?.avatar && (
                          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Choose avatar</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'avatar')}
                            className="block w-full text-sm text-gray-500 transition-colors file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Name Input */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-6">
                    <h2 className="border-b pb-2 text-lg font-medium text-gray-800">
                      Company Information
                    </h2>

                    {/* Company Logo Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData.companyLogo}
                          alt="company logo"
                          className="h-20 w-20 rounded-lg border-4 border-gray-200 object-cover"
                        />
                        {uploading.logo && (
                          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Choose company logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'logo')}
                            className="file: file:text-green-700hover:file:bg-green-100 block w-full border-0 text-sm text-gray-500 transition-colors file:mr-4 file:rounded-full file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full rounded-lg border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter company name"
                      />
                    </div>

                    {/* Comapany Description */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Company Description
                      </label>
                      <textarea
                        value={formData.companyDescription}
                        onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your company..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-4 border-t pt-6">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    diabled={saving || uploading.avatar || uploading.logo}
                    className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditProfileDetails;
