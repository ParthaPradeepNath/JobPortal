import { useState } from 'react';
import { Building2, Mail, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import uploadImage from '../../utils/uploadImage';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EditProfileDetails from './EditProfileDetails';

const EmployerProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    companyName: user?.companyName || '',
    companyDescription: user?.companyDescription || '',
    companyLogo: user?.companyLogo || '',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const imgUploadRes = await uploadImage(file);
      const avatarUrl = imgUploadRes.imageUrl || '';

      // Update form data with new image URL
      const field = type === 'avatar' ? 'avatar' : 'companyLogo';
      handleInputChange(field, avatarUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      const field = type === 'avatar' ? 'avatar' : 'companyLogo';
      handleInputChange(field, previewUrl);

      // Upload image
      handleImageUpload(file, type);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, formData);

      if (response.status !== 200) {
        toast.error('Failed to update profile');
        return;
      }
      toast.success('Profile Details updated successfully!');
      // Update profile data and exit edit mode
      setProfileData({ ...formData });
      updateUser({ ...formData });
      setEditMode(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
        uploading={uploading}
      />
    );
  }

  return (
    <DashboardLayout activeMenu="company-profile">
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
              <h1 className="text-xl font-medium text-white">Employer Profile</h1>
              <button
                onClick={() => setEditMode(true)}
                className="hover:bg-opacity-30 flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-2 text-white transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                    Personal Information
                  </h2>

                  {/* Avatar and Name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={profileData.avatar}
                      alt="avatar"
                      className="h-20 w-20 rounded-full border-4 border-blue-50 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{profileData.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-4 w-4" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="borer-b border-gray-200 text-lg font-semibold text-gray-800">
                    Company Information
                  </h2>

                  {/* Company Logo and Name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={profileData.companyLogo}
                      alt="company logo"
                      className="h-20 w-20 rounded-lg border-4 border-blue-50 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName}
                      </h3>
                      <div className="mt-1 flex items-center text-sm text-gray-600">
                        <Building2 className="mr-2 h-4 w-4" />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="mt-8">
                <h2 className="borer-b mb-1 border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                  About Company
                </h2>
                <p className="rounded-lg bg-gray-50 p-6 text-sm leading-relaxed text-gray-700">
                  {profileData.companyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;
