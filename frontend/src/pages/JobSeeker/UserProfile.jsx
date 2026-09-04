import { useState, useEffect } from 'react';
import { User, Mail, Upload, FileText, Trash2, Save, X, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useAuth } from '../../context/AuthContext';
import JobSeekerLayout from '../../components/layout/JobSeekerLayout';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    resume: user?.resume || '',
  });
  const [displayName, setDisplayName] = useState(user?.name || 'User');
  const [displayAvatar, setDisplayAvatar] = useState(user?.avatar || '');
  const [displayResume, setDisplayResume] = useState(user?.resume || '');

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
        resume: user.resume || '',
      });
      setDisplayName(user.name || 'User');
      setDisplayAvatar(user.avatar || '');
      setDisplayResume(user.resume || '');
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file) => {
    const form = new FormData();
    form.append('image', file);
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGES, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imageUrl;
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadFile(file);
      handleInputChange('avatar', url);
      setDisplayAvatar(url);
    } catch {
      toast.error('Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF resume');
      return;
    }
    setUploadingResume(true);
    try {
      const url = await uploadFile(file);
      handleInputChange('resume', url);
      setDisplayResume(url);
      toast.success('Resume uploaded successfully');
    } catch {
      toast.error('Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: formData.resume,
      });
      handleInputChange('resume', '');
      setDisplayResume('');
      toast.success('Resume removed');
    } catch {
      toast.error('Failed to remove resume');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        name: formData.name,
        avatar: formData.avatar,
        resume: formData.resume,
      });
      updateUser(response.data);
      setDisplayName(response.data.name);
      setDisplayAvatar(response.data.avatar || '');
      setDisplayResume(response.data.resume || '');
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      resume: user?.resume || '',
    });
    setEditMode(false);
  };

  return (
    <JobSeekerLayout active="profile">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-gray-600">Manage your personal information and resume</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="h-16 w-16 rounded-full border-4 border-white/30 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <User className="h-8 w-8 text-white" />
              </div>
            )}
            <div className="text-white">
              <h2 className="text-lg font-semibold">{displayName}</h2>
              <p className="text-sm text-blue-100">{formData.email}</p>
            </div>
          </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {editMode ? (
            <div className="space-y-6">
              {/* Avatar upload */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="avatar"
                      className="h-20 w-20 rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  {uploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  Upload Photo
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-gray-500"
                  />
                </div>
              </div>

              {/* Resume */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Resume</label>
                {formData.resume ? (
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Resume uploaded</p>
                        <a
                          href={formData.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View resume
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleDeleteResume}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                      title="Delete resume"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-blue-400 hover:bg-blue-50/30">
                    <Upload className="mb-2 h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {uploadingResume ? 'Uploading...' : 'Click to upload your resume (PDF)'}
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Resume status */}
              <div>
                <h3 className="mb-4 text-sm font-medium tracking-wide text-gray-900 uppercase">
                  Resume
                </h3>
                {displayResume ? (
                  <a
                    href={displayResume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4 transition-colors hover:bg-emerald-100"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-emerald-700">Resume uploaded</p>
                        <p className="text-xs text-emerald-600">Click to view</p>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </a>
                ) : (
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-700">No resume uploaded</p>
                    <p className="mt-1 text-xs text-amber-600">Upload a resume to apply for jobs</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default UserProfile;
