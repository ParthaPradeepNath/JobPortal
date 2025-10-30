import {
    MapPin,
    DollarSign,
    ArrowLeft,
    Building2,
    Clock,
    Users,
} from "lucide-react"
import { CATEGORIES, JOB_TYPES } from "../../utils/data"
import { useAuth } from "../../context/AuthContext"

const JobPostingPreview = ({
    formData, setIsPreview
}) => {
    const {user} = useAuth()
    const currencies = [{ value:"usd", label: "$" }]
  return (
    <div className="min-h-screenbg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with glassmorphism effect */}
        <div className="mb-8 backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Job Preview
                    </h2>
                </div>
                <button
                onClick={() => setIsPreview(false)}
                className=""
                >
                    <ArrowLeft className="" />
                    <span>Back to edit</span>
                </button>
            </div>

            {/* Main context card */}
            <div className="">
                {/* Hero section with clean background */}
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <h1 className="">
                                    {formData.jobTitle}
                                </h1>

                                <div className="">
                                    <div className="">
                                        <MapPin className="" />
                                        <span className="">
                                            {formData.isRemote ? "Remote" : formData.location}
                                        </span>
                                        {formData.isRemote && formData.location && (
                                            <span className="">
                                                {" "}
                                                . {formData.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {user?.companyLogo ? (
                                <img src={user.companyLogo} alt="company logo" className="h-16 w-16 rounded-full" />
                            ): (
                                <div className="">
                                    <Building2 className="" />
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="">
                            <span className="">
                                {
                                    CATEGORIES.find((c) => c.value === formData.category)?.label
                                }
                            </span>
                            <span className="">
                                {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
                            </span>
                            <div className="">
                                <Clock className="" />
                                <span>Posted today</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default JobPostingPreview
