import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Upload,
  FileText,
  Trash2,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import JobSeekerLayout from "../../components/layout/JobSeekerLayout";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });
  const [displayName, setDisplayName] = useState(user?.name || "User");
  const [displayAvatar, setDisplayAvatar] = useState(user?.avatar || "");
  const [displayResume, setDisplayResume] = useState(user?.resume || "");

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        resume: user.resume || "",
      });
      setDisplayName(user.name || "User");
      setDisplayAvatar(user.avatar || "");
      setDisplayResume(user.resume || "");
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("image", file);
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGES,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data.imageUrl;
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadFile(file);
      handleInputChange("avatar", url);
      setDisplayAvatar(url);
    } catch {
      toast.error("Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF resume");
      return;
    }
    setUploadingResume(true);
    try {
      const url = await uploadFile(file);
      handleInputChange("resume", url);
      setDisplayResume(url);
      toast.success("Resume uploaded successfully");
    } catch {
      toast.error("Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: formData.resume,
      });
      handleInputChange("resume", "");
      setDisplayResume("");
      toast.success("Resume removed");
    } catch {
      toast.error("Failed to remove resume");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        { name: formData.name, avatar: formData.avatar, resume: formData.resume }
      );
      updateUser(response.data);
      setDisplayName(response.data.name);
      setDisplayAvatar(response.data.avatar || "");
      setDisplayResume(response.data.resume || "");
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "",
    });
    setEditMode(false);
  };

  return (
    <JobSeekerLayout active="profile">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">
          Manage your personal information and resume
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="h-16 w-16 rounded-full object-cover border-4 border-white/30"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
            )}
            <div className="text-white">
              <h2 className="text-lg font-semibold">{displayName}</h2>
              <p className="text-blue-100 text-sm">{formData.email}</p>
            </div>
          </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
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
                      className="h-20 w-20 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  {uploadingAvatar && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              {/* Resume */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume
                </label>
                {formData.resume ? (
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Resume uploaded
                        </p>
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
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete resume"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploadingResume
                        ? "Uploading..."
                        : "Click to upload your resume (PDF)"}
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
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume status */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
                  Resume
                </h3>
                {displayResume ? (
                  <a
                    href={displayResume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-emerald-700">
                          Resume uploaded
                        </p>
                        <p className="text-xs text-emerald-600">
                          Click to view
                        </p>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </a>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-sm font-medium text-amber-700">
                      No resume uploaded
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Upload a resume to apply for jobs
                    </p>
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
