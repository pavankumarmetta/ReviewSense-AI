import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {

  LayoutDashboard,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  Star,
  Activity,
  BrainCircuit,
  MessageSquareText,
  BarChart3,
  LineChart,
  ArrowLeft

} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Dashboard() {

  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  // FETCH REVIEWS FROM DATABASE

  useEffect(() => {

   const user = JSON.parse(localStorage.getItem("user"));

      fetch(`http://127.0.0.1:8000/reviews/${user.id}`)

      .then((res) => res.json())

      .then((data) => {

        setReviews(data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  // COUNTS

  const totalReviews = reviews.length;

  const positiveCount = reviews.filter(
    (r) => r.sentiment === "Positive"
  ).length;

  const negativeCount = reviews.filter(
    (r) => r.sentiment === "Negative"
  ).length;

  const neutralCount = reviews.filter(
    (r) => r.sentiment === "Neutral"
  ).length;

  // PERCENTAGES

  const positivePercentage =
    totalReviews > 0
      ? ((positiveCount / totalReviews) * 100).toFixed(0)
      : 0;

  const negativePercentage =
    totalReviews > 0
      ? ((negativeCount / totalReviews) * 100).toFixed(0)
      : 0;

  const neutralPercentage =
    totalReviews > 0
      ? ((neutralCount / totalReviews) * 100).toFixed(0)
      : 0;

  // MOST USED SENTIMENT

  let mostUsed = "Neutral";

  if (
    positiveCount > negativeCount &&
    positiveCount > neutralCount
  ) {

    mostUsed = "Positive";

  }

  else if (
    negativeCount > positiveCount &&
    negativeCount > neutralCount
  ) {

    mostUsed = "Negative";
  }

  // AVERAGE REVIEW LENGTH

  const averageLength =
    totalReviews > 0
      ? (
          reviews.reduce(
            (acc, item) =>
              acc + item.review_text.split(" ").length,
            0
          ) / totalReviews
        ).toFixed(0)
      : 0;
      // MOOD SCORE

const moodScore = totalReviews > 0

  ? Math.round(

      (
        (positiveCount * 100) -

        (negativeCount * 100)

      ) / totalReviews

    )

  : 0;

// CUSTOMER SATISFACTION SCORE

const satisfactionScore = totalReviews > 0

  ? Math.round(

      (
        positiveCount / totalReviews
      ) * 100

    )

  : 0;

// AI HEALTH STATUS

let aiStatus = "Neutral";

if (moodScore > 30) {

  aiStatus = "Excellent";

}

else if (moodScore > 0) {

  aiStatus = "Good";

}

else if (moodScore < 0) {

  aiStatus = "Poor";

}

  const sentimentColors = {

    Positive:
      "bg-green-100 text-green-700",

    Negative:
      "bg-red-100 text-red-700",

    Neutral:
      "bg-yellow-100 text-yellow-700"
  };

  // BAR CHART DATA

  const barData = [

    {
      name: "Positive",
      value: positivePercentage
    },

    {
      name: "Neutral",
      value: neutralPercentage
    },

    {
      name: "Negative",
      value: negativePercentage
    }

  ];

  const pieData = [

  {
    name: "Positive",
    value: Number(positivePercentage)
  },

  {
    name: "Neutral",
    value: Number(neutralPercentage)
  },

  {
    name: "Negative",
    value: Number(negativePercentage)
  }

];

const COLORS = [

  "#22c55e",
  "#facc15",
  "#ef4444"

];

  // TREND DATA

  const trendData = reviews.map((item, index) => ({

  day: `R${index + 1}`,

  sentiment:

    item.sentiment === "Positive"
      ? 1
      : item.sentiment === "Negative"
      ? -1
      : 0

       }));

  return (

    <div className="min-h-screen bg-[#f9f6f2] flex">

      {/* Sidebar */}

      <aside className="w-[260px] bg-white border-r border-[#eadfd3] p-8 hidden lg:flex flex-col">

        <div>

          {/* Logo */}

          <div className="mb-14">

            <div className="flex items-center gap-3">

              <div className="bg-[#e8c7ad] p-3 rounded-2xl">

                <LayoutDashboard className="text-[#7a4d2f]" />

              </div>

              <h1 className="text-2xl font-bold">

                ReviewSense-AI

              </h1>

            </div>

            {/* Back Button */}

            <button

              type="button"

              onClick={() => navigate("/analyzer")}

              className="mt-6 w-full flex items-center justify-center gap-2 border border-[#eadfd3] rounded-2xl py-3 hover:bg-[#f7efe7] transition"
            >

              <ArrowLeft size={18} />

              Back

            </button>

          </div>

          {/* Buttons */}

          <div className="space-y-5">

            {/* Dashboard */}

            <button

              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                })
              }

              className="w-full bg-[#f3e5d8] text-[#7a4d2f] px-5 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-[1.02] transition"
            >

              <LayoutDashboard size={20} />

              Dashboard

            </button>

            {/* Analytics */}

            <button

              onClick={() =>
                document
                  .getElementById("analytics")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }

              className="w-full text-[#777] px-5 py-4 rounded-2xl hover:bg-[#f7efe7] transition flex items-center gap-3"
            >

              <TrendingUp size={20} />

              Analytics

            </button>

            {/* AI Insights */}

            <button

              onClick={() =>
                document
                  .getElementById("insights")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }

              className="w-full text-[#777] px-5 py-4 rounded-2xl hover:bg-[#f7efe7] transition flex items-center gap-3"
            >

              <BrainCircuit size={20} />

              AI Insights

            </button>

          </div>

        </div>

      </aside>

      {/* Main */}

      <main className="flex-1 p-8 lg:p-14">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <h1 className="text-6xl font-extrabold leading-tight">

            Analytics

            <span className="text-[#c68b59]">
              {" "}Dashboard
            </span>

          </h1>

          <p className="text-[#777] text-xl mt-5 max-w-3xl">

            Monitor customer sentiment trends,
            review activity, and AI-generated insights.

          </p>

        </motion.div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

          <div className="bg-white border border-[#eadfd3] rounded-[32px] p-8 shadow-lg">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#e8c7ad] to-[#d9a77f] flex items-center justify-center text-white mb-6">

              <MessageSquareText size={28} />

            </div>

            <h2 className="text-[#777] text-lg">

              Total Reviews

            </h2>

            <h1 className="text-4xl font-extrabold mt-3">

              {totalReviews}

            </h1>

          </div>

          <div className="bg-white border border-[#eadfd3] rounded-[32px] p-8 shadow-lg">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-200 to-green-400 flex items-center justify-center text-white mb-6">

              <Smile size={28} />

            </div>

            <h2 className="text-[#777] text-lg">

              Positive

            </h2>

            <h1 className="text-4xl font-extrabold mt-3">

              {positivePercentage}%

            </h1>

          </div>

          <div className="bg-white border border-[#eadfd3] rounded-[32px] p-8 shadow-lg">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-200 to-yellow-400 flex items-center justify-center text-white mb-6">

              <Meh size={28} />

            </div>

            <h2 className="text-[#777] text-lg">

              Neutral

            </h2>

            <h1 className="text-4xl font-extrabold mt-3">

              {neutralPercentage}%

            </h1>

          </div>

          <div className="bg-white border border-[#eadfd3] rounded-[32px] p-8 shadow-lg">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-200 to-red-400 flex items-center justify-center text-white mb-6">

              <Frown size={28} />

            </div>

            <h2 className="text-[#777] text-lg">

              Negative

            </h2>

            <h1 className="text-4xl font-extrabold mt-3">

              {negativePercentage}%

            </h1>

          </div>

        </div>

        {/* Analytics */}

        <div id="analytics">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-14">

            {/* Bar Chart */}

            <div className="bg-white rounded-[36px] p-8 shadow-lg border border-[#eadfd3]">

              <div className="flex items-center gap-3 mb-6">

                <BarChart3 className="text-[#c68b59]" />

                <h2 className="text-3xl font-bold">

                  Sentiment Bar Chart

                </h2>

              </div>

              <ResponsiveContainer width="100%" height={300}>

                <BarChart data={barData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#d9a77f"
                    radius={[10,10,0,0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

            {/* Pie Chart */}

<div className="bg-white rounded-[36px] p-8 shadow-lg border border-[#eadfd3]">

  <div className="flex items-center gap-3 mb-6">

    <BarChart3 className="text-[#c68b59]" />

    <h2 className="text-3xl font-bold">

      Sentiment Pie Chart

    </h2>

  </div>

  <ResponsiveContainer width="100%" height={300}>

    <PieChart>

      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >

        {

          pieData.map((entry, index) => (

            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />

          ))
        }

              </Pie>

           <Tooltip />

            <Legend />

           </PieChart>

            </ResponsiveContainer>

            </div>

            {/* Trend Line */}

            <div className="bg-white rounded-[36px] p-8 shadow-lg border border-[#eadfd3]">

              <div className="flex items-center gap-3 mb-6">

                <LineChart className="text-[#c68b59]" />

                <h2 className="text-3xl font-bold">

                  Sentiment Trend Analysis

                </h2>

              </div>

              <ResponsiveContainer width="100%" height={300}>

                <ReLineChart data={trendData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Line
                  type="monotone"
                  dataKey="sentiment"
                   stroke="#c68b59"
                     strokeWidth={4}
                       />

                </ReLineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Insights */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-14">

          {/* Progress */}

          <div className="xl:col-span-2 bg-white rounded-[36px] p-10 shadow-lg border border-[#eadfd3]">

            <div className="flex items-center justify-between mb-10">

              <h2 className="text-3xl font-bold">

                Sentiment Distribution

              </h2>

              <Activity className="text-[#c68b59]" size={30} />

            </div>

            <div className="space-y-8">

              {[
                {
                  label: "Positive",
                  value: positivePercentage,
                  color: "bg-green-400"
                },

                {
                  label: "Neutral",
                  value: neutralPercentage,
                  color: "bg-yellow-400"
                },

                {
                  label: "Negative",
                  value: negativePercentage,
                  color: "bg-red-400"
                }

              ].map((item, index) => (

                <div key={index}>

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      {item.label}
                    </span>

                    <span className="font-semibold">
                      {item.value}%
                    </span>

                  </div>

                  <div className="w-full h-5 bg-[#f1ebe5] rounded-full overflow-hidden">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${item.value}%`
                      }}
                      className={`h-full rounded-full ${item.color}`}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* AI Insights */}

          <div id="insights">

            <div className="bg-white rounded-[36px] p-8 shadow-lg border border-[#eadfd3]">

              <div className="flex items-center gap-3 mb-8">

                <Star className="text-[#c68b59]" />

                <h2 className="text-2xl font-bold">

                  AI Insights

                </h2>

              </div>

              <div className="space-y-5">

                <div className="bg-[#f7efe7] rounded-2xl p-5">

                  <h3 className="font-bold mb-2">

                    Most Used Sentiment

                  </h3>

                  <p className="text-[#777]">

                    {mostUsed}

                  </p>

                </div>

                <div className="bg-[#f7efe7] rounded-2xl p-5">

                  <h3 className="font-bold mb-2">

                    Average Review Length

                  </h3>

                  <p className="text-[#777]">

                    {averageLength} words

                  </p>

                </div>

                <div className="bg-[#f7efe7] rounded-2xl p-5">

                  <h3 className="font-bold mb-2">

                    Live Analytics Counter

                  </h3>

                  <p className="text-[#777]">

                    {totalReviews} reviews analyzed

                  </p>

                </div>

              </div>

            </div>

          </div>
          <div className="bg-[#f7efe7] rounded-2xl p-5">

  <h3 className="font-bold mb-2">

    Mood Score

  </h3>

  <p className="text-[#777]">

    {moodScore}/100

  </p>

</div>

<div className="bg-[#f7efe7] rounded-2xl p-5">

  <h3 className="font-bold mb-2">

    Customer Satisfaction

  </h3>

          <p className="text-[#777]">

          {satisfactionScore}%

          </p>

                    </div>

              <div className="bg-[#f7efe7] rounded-2xl p-5">

                  <h3 className="font-bold mb-2">

               AI Health Indicator

                   </h3>

                 <p className="text-[#777]">

                    {aiStatus}

                   </p>

               </div>

                  </div>

        {/* Recent Reviews */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-[#eadfd3] rounded-[36px] p-10 shadow-lg mt-14"
        >

          <h2 className="text-4xl font-bold mb-10">

            Recent Reviews

          </h2>

          <div className="space-y-6">

            {reviews.length === 0 ? (

              <p className="text-[#777]">

                No reviews analyzed yet.

              </p>

            ) : (

              reviews.map((review, index) => (

                <motion.div

                  key={index}

                  whileHover={{ scale: 1.01 }}

                  className="flex flex-col md:flex-row md:items-center justify-between gap-5 border border-[#eadfd3] rounded-3xl px-6 py-6 bg-[#fcfaf8]"
                >

                  <div>

                    <p className="text-lg text-[#444]">

                      {review.review_text}

                    </p>

                    <p className="text-sm text-[#999] mt-2">

                      By {review.username}

                    </p>

                  </div>

                  <div className={`px-6 py-3 rounded-2xl font-bold ${sentimentColors[review.sentiment]}`}>

                    {review.sentiment}

                  </div>

                </motion.div>

              ))

            )}

          </div>

        </motion.div>

      </main>

    </div>
  );
}

export default Dashboard;