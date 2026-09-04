import React from 'react';
import { employerFeatures, jobSeekerFeatures } from '../../../utils/data';

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Everthing You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Whether you're looking for your next opportunity or the perfect candidate, we have the
            tools and features to make it happen.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
          {/* Job Seekers Selection */}
          <div>
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold text-gray-900">For Job Seekers</h3>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
            </div>

            <div className="space-y-8">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex cursor-pointer items-start space-x-4 rounded-2xl p-6 transition-all duration-300 hover:bg-blue-50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-200">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h4>
                    <p className="leading-relaxed text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employers Section */}
          <div>
            <div className="mb-12 text-center">
              <h3 className="mb-4₹ text-3xl font-bold text-gray-900">For Employers</h3>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
            </div>

            <div className="space-y-8">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex cursor-pointer items-start space-x-4 rounded-2xl p-6 transition-all duration-300 hover:bg-purple-50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 transition-colors group-hover:bg-purple-200">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h4>
                    <p className="leading-relaxed text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
