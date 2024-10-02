import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";



const features = [
  {
    name: "Performance",
    description:
      "Designed for fast data retrieval and processing, our tool helps investigators work quickly without sacrificing accuracy.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Mobile Friendly:",
    description:
      "Access your investigation tool on both mobile and desktop with ease, ensuring you never miss important data.",
    icon: LockClosedIcon,
  },
  {
    name: "Data to Enrich Your Online Business",
    description:
      "Unlock powerful insights with our social media parsing tool, designed to help investigators extract and review digital content from social platforms effortlessly. This tool ensures thorough data analysis and reporting, eliminating human error during the investigative process.",
    icon: ArrowPathIcon,
  },
  {
    name: "Security",
    description:
      "Data security is our top priority. We provide advanced encryption and secure backups to protect your investigative findings.",
    icon: FingerPrintIcon,
  },
];

export default function FeatureSection2() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Marketplace
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Company
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Your Company, we are dedicated to empowering investigators with
            the tools they need to efficiently and accurately gather digital
            evidence from social media. Our mission is to create tools that
            streamline the investigation process while maintaining the highest
            level of security and accuracy.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
