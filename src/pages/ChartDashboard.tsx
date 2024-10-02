import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/fbase"; // Import the Firestore instance
import { axisClasses } from "@mui/x-charts/ChartsAxis";

type UserData = {
  email: string;
  firstname: string;
  jobType: "defence" | "dataAnalytics" | "other";
  lastname: string;
  platforms: ("facebook" | "instagram" | "whatsapp")[];
  remark: string;
  signinTime: string;
};
type JobsTypes = { id: 'defence' | 'dataAnalytics' | 'other', value: number, label: string };

type PlatformTypes = { platform: ("facebook" | "instagram" | "whatsapp"), value: number };

const ChartDashboard = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [jobData, setJobData] = useState<JobsTypes[]>([]);
  const [platformUsageData, setPlatformUsageData] = useState<PlatformTypes[]>([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from the "users" collection
        const querySnapshot = await getDocs(collection(db, "users"));
        const users: UserData[] = [];

        const jobsType: JobsTypes[] = [
          { id: "defence", value: 0, label: "Defence" },
          { id: "dataAnalytics", value: 0, label: "Data Analytics" },
          { id: "other", value: 0, label: "Others" },
        ];
        const platformTypes: PlatformTypes[] = [
          { platform: "facebook", value: 0 },
          { platform: "instagram", value: 0 },
          { platform: "whatsapp", value: 0 },
        ];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as UserData;
          users.push(data);
          jobsType.map((jo) => {
            if (data.jobType === jo.id) {
              jo.value += 1;
            }
          });
          platformTypes.map((pt) => {
            if (data.platforms.includes(pt.platform)) {
              pt.value += 1;
            }
          });
        });
        console.log(platformTypes);

        setUsersData(users);
        setJobData(jobsType);
        setPlatformUsageData(platformTypes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        {/* Your header code */}
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* First Section: User Statistics */}
        <div className="max-w-5xl mx-auto mb-10 p-6 border-2 border-gray-200 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">
            No. of Users
          </h1>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12, 13, 14, 15, 16, 17] }]}
            series={[
              {
                data: usersData.map((_, index) => index + 1), // Using the user data length as an example
              },
            ]}
            height={300}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
            width={1000}
          />
        </div>

        {/* Combined Section: Types of Jobs and Platform Usage */}
        <div className="max-w-5xl mx-auto mb-10 p-6 border-2 border-gray-200 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">
            Insights
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Types of Jobs */}
            <div className="p-6 border-2 border-gray-200 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Types of Jobs
              </h2>
              <PieChart
                series={[
                  {
                    data: jobData,
                  },
                ]}
                width={400}
                height={200}
              />
            </div>

            {/* Platform Usage */}
            <div className="p-6 border-2 border-gray-200 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Platform Usage
              </h2>
              <BarChart
                dataset={platformUsageData}
                xAxis={[{ scaleType: "band", dataKey: "platform" }]}
                series={[{ dataKey: "value", label: "Usage" }]}
                {...chartSetting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
