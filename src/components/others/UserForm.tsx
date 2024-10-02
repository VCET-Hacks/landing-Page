import { db } from "@/utils/fbase";
import Toast from "@/utils/toast";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import Confetti from "react-confetti";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  remark: string;
  jobType: string;
  platforms: string[];
}

export default function UserForm() {
  const { width, height } = window.screen;
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    remark: "",
    jobType: "",
    platforms: [],
  });

  const [toast, setToast] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const showToast = (title: string, description: string) => {
    setToast({
      title,
      description,
    });

    setTimeout(() => {
      setToast(null);
    }, 5000); // Auto-close after 3 seconds
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => {
      const platforms = prev.platforms.includes(value)
        ? prev.platforms.filter((platform) => platform !== value)
        : [...prev.platforms, value];
      return {
        ...prev,
        platforms,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    await addDoc(collection(db, "users"), {
      email: formData.email,
      firstName: formData.firstName,
      jobType: formData.jobType,
      lastName: formData.lastName,
      platforms: formData.platforms,
      remark: formData.remark,
      signinTime: new Date().toISOString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Success!!", "Name Added to Waitlist Successfully");
  };

  return (
    <form className="text-left" onSubmit={handleSubmit}>
      {toast && <Confetti width={width-25} height={height-25} className="m-auto"/>}
      <div className="space-y-6 h-auto w-auto pl-[300px] pr-[300px] py-[100px] bg-gray-100">
        <div className="border-b border-gray-900/10 pb-4 max-w-[450px] m-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold leading-7 text-gray-900 pb-5">
            Waitlist 🎉
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Filling this form will add you to the waitlist for this system. This
            waitlist is currently for the CodeVerse Hackathon.
          </p>

          <div className="">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Type of Job
                </label>
                <div className="mt-2 space-y-2 flex flex-col">
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="defence"
                      checked={formData.jobType === "defence"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Defence
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="dataAnalytics"
                      checked={formData.jobType === "dataAnalytics"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Data Analytics
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="engineer"
                      checked={formData.jobType === "engineer"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Engineer
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="other"
                      checked={formData.jobType === "other"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="platforms"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Platforms Active On
                </label>
                <div className="mt-2 flex flex-row gap-5">
                  {["Facebook", "Instagram", "WhatsApp"].map((platform) => (
                    <label key={platform} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={platform.toLowerCase()}
                        checked={formData.platforms.includes(
                          platform.toLowerCase()
                        )}
                        onChange={handlePlatformsChange}
                        className="form-checkbox text-indigo-600 h-5 w-5"
                      />
                      <span className="ml-2 text-gray-900">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Review
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="remark"
                    rows={3}
                    value={formData.remark}
                    onChange={handleChange}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your experience.
                </p>
              </div>

              <div className="flex justify-center col-span-6">
                <button
                  type="submit"
                  className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {toast && (
            <Toast
              title={toast.title}
              description={toast.description}
              onClose={() => setToast(null)}
            />
          )}

          {/* Job Type Radio Buttons */}

          {/* Platforms Active On Multi-Select */}

          {/* Review Section */}
        </div>
      </div>
    </form>
  );
}
