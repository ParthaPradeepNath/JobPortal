import { Download, X } from 'lucide-react';
import { useState } from 'react';
import { getIntials } from '../../utils/helper';
import moment from 'moment';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

import StatusBadge from '../StatusBadge';
const statusOptions = ['Applied', 'In Review', 'Rejected', 'Accepted'];

const ApplicantProfilePreview = ({
  selectedApplicant,
  setSelectedApplicant,
  handleDownloadResume,
  handleClose,
}) => {
  const [currentStatus, setCurrentStatus] = useState(selectedApplicant.status);
  const [loading, setLoading] = useState(false);

  const onchangeStatus = async (e) => {
    const newstatus = e.target.value;
    setCurrentStatus(newstatus);
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_STATUS(selectedApplicant._id),
        { status: newstatus }
      );

      if (response.status === 200) {
        // Update local state after successfully update
        setSelectedApplicant({ ...selectedApplicant, status: newstatus });
        toast.success('Application status updated successfully');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      // Optionally revert status if failed
      setCurrentStatus(selectedApplicant.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)] p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900">Applicant Profile</h3>
          <button
            onClick={() => handleClose()}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6 text-center">
            {selectedApplicant.applicant.avatar ? (
              <img
                src={selectedApplicant.applicant.avatar}
                alt={selectedApplicant.applicant.name}
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="ph-20 justify-centermx-auto flex w-20 items-center rounded-full bg-blue-100">
                <span className="text-xl font-semibold text-blue-600">
                  {getIntials(selectedApplicant.applicant.name)}
                </span>
              </div>
            )}
            <h4 className="mt-4 text-xl font-semibold text-gray-900">
              {selectedApplicant.applicant.name}
            </h4>
            <p className="text-gray-600">{selectedApplicant.applicant.email}</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="mb-2 font-medium text-gray-900">Applied Position</h5>
              <p className="text-gray-700">{selectedApplicant.job.title}</p>
              <p className="mt-1 text-sm text-gray-600">
                {selectedApplicant.job.location} . {selectedApplicant.job.type}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="mb-2 font-medium text-gray-900">Application Details</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={currentStatus} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applied Date:</span>
                  <span className="text-gray-900">
                    {moment(selectedApplicant.createdAt)?.format('DD MM YYYY')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownloadResume(selectedApplicant.applicant.resume)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </button>

            {/* Status Dropdown */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Change Application status
              </label>
              <select
                value={currentStatus}
                onChange={onchangeStatus}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {loading && <p className="mt-1 text-xs text-gray-500">Updating status...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfilePreview;
