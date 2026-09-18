import { useState, useEffect } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import {
  Sparkles,
  MessageSquareText,
  RotateCcw,
  LogOut
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function Analyzer() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [review, setReview] = useState("");

  const [sentiment, setSentiment] = useState("");

  const [emoji, setEmoji] = useState("");

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({

    total: 0,

    positive: 0,

    negative: 0,

    neutral: 0

  });

  // FETCH STATS FROM DATABASE

 useEffect(() => {

  fetchStats();

  const interval = setInterval(() => {

    fetchStats();

  }, 1000);

  return () => clearInterval(interval);

  }, []);

  const fetchStats = async () => {

    try {

      const response = await axios.get(

        `http://127.0.0.1:8000/reviews/${user.id}`
       );

      const reviews = response.data;

      const positive = reviews.filter(

        (r) => r.sentiment === "Positive"
      ).length;

      const negative = reviews.filter(

        (r) => r.sentiment === "Negative"
      ).length;

      const neutral = reviews.filter(

        (r) => r.sentiment === "Neutral"
      ).length;

      setStats({

        total: reviews.length,

        positive,

        negative,

        neutral
      });

    } catch (error) {

      console.log(error);
    }
  };

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  // ANALYZE REVIEW

  const analyzeReview = async () => {

    if (!review.trim()) {

      Swal.fire({

        icon: "warning",

        title: "Empty Review",

        text: "Please enter a review",

        confirmButtonColor: "#c68b59"
      });

      return;
    }

    try {

      setLoading(true);

      // PREDICT SENTIMENT

      const response = await axios.post(

        "http://127.0.0.1:8000/predict",

        {
          review: review
        }
      );

      const result = response.data.sentiment;

      setSentiment(result);

      // EMOJI

      const selectedEmoji =

        result === "Positive"
          ? "😄"

          : result === "Negative"
          ? "😡"

          : "😐";

      setEmoji(selectedEmoji);

      // SAVE REVIEW

      await axios.post(

        "http://127.0.0.1:8000/save-review",

        {

          review_text: review,

          sentiment: result,

          user_id: user.id,

          username: user.username
        }
      );

      // REFRESH DATABASE STATS

      // REFRESH DATABASE STATS

        await fetchStats();

        setLoading(false);

      // SUCCESS ALERT

      Swal.fire({

        icon: "success",

        title: "Review Analyzed!",

        text: `Detected sentiment: ${result}`,

        confirmButtonColor: "#c68b59",

        timer: 1800,

        showConfirmButton: false
      });

      // AUTO REDIRECT

      setTimeout(() => {

        navigate("/dashboard");

      }, 1800);

    }

    catch (error) {

      console.log(error);

      Swal.fire({

        icon: "error",

        title: "Something went wrong",

        text: "Please try again",

        confirmButtonColor: "#c68b59"
      });

      setLoading(false);
    }
  };

  // RESET

  const resetReview = () => {

    setReview("");

    setSentiment("");

    setEmoji("");
  };

  // SENTIMENT STYLES

  const sentimentStyles = {

    Positive:
      "bg-green-100 text-green-700 border border-green-200",

    Negative:
      "bg-red-100 text-red-700 border border-red-200",

    Neutral:
      "bg-yellow-100 text-yellow-700 border border-yellow-200"
  };

  return (

    <div className="min-h-screen bg-[#f9f6f2] overflow-hidden relative">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-[#e9c8aa] opacity-40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#d9a77f] opacity-30 blur-3xl rounded-full"></div>

      {/* NAVBAR */}

      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-[#eadfd3] bg-[#f9f6f2]/70 backdrop-blur-md">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <motion.div

            whileHover={{
              rotate: 10,
              scale: 1.1
            }}

            className="bg-[#e8c7ad] p-3 rounded-2xl shadow-sm"
          >

            <Sparkles
              size={22}
              className="text-[#7a4d2f]"
            />

          </motion.div>

          <h1 className="text-3xl font-bold">

            ReviewSense-AI

          </h1>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <p className="font-medium text-[#7a4d2f]">

            Hi, {user?.username}

          </p>

          <button

            onClick={() => navigate("/")}

            className="px-6 py-3 rounded-2xl border border-[#e2d4c8] hover:bg-white transition"
          >

            Home

          </button>

          <button

            onClick={() => navigate("/dashboard")}

            className="px-6 py-3 rounded-2xl bg-[#c68b59] text-white hover:bg-[#b97a45] transition"
          >

            Dashboard

          </button>

          <button

            onClick={handleLogout}

            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </nav>

      {/* MAIN */}

      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-20">

        {/* TITLE */}

        <motion.h1

          initial={{
            opacity: 0,
            y: 60
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

          className="text-7xl font-extrabold text-center leading-tight max-w-5xl"
        >

          Analyze Customer Reviews

          <span className="text-[#c68b59]">

            {" "}Instantly

          </span>

        </motion.h1>

        <motion.p

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 0.5
          }}

          className="text-[#777] text-xl mt-8 max-w-3xl text-center"
        >

          AI-powered sentiment analysis
          for e-commerce clothing reviews.

        </motion.p>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">

            <h3>Total Reviews</h3>

            <p className="text-4xl font-bold mt-3">

              {stats.total}

            </p>

          </div>

          <div className="bg-green-50 rounded-3xl p-6 shadow-lg text-center">

            <h3 className="text-green-700">

              Positive

            </h3>

            <p className="text-4xl font-bold mt-3 text-green-600">

              {stats.positive}

            </p>

          </div>

          <div className="bg-red-50 rounded-3xl p-6 shadow-lg text-center">

            <h3 className="text-red-700">

              Negative

            </h3>

            <p className="text-4xl font-bold mt-3 text-red-600">

              {stats.negative}

            </p>

          </div>

          <div className="bg-yellow-50 rounded-3xl p-6 shadow-lg text-center">

            <h3 className="text-yellow-700">

              Neutral

            </h3>

            <p className="text-4xl font-bold mt-3 text-yellow-600">

              {stats.neutral}

            </p>

          </div>

        </div>

        {/* INPUT */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.4
          }}

          className="mt-16 bg-white shadow-2xl rounded-[36px] p-10 w-full max-w-4xl"
        >

          <div className="flex items-center gap-3 mb-6">

            <MessageSquareText
              className="text-[#b57d56]"
              size={30}
            />

            <h2 className="text-3xl font-bold">

              Enter Review

            </h2>

          </div>

          <textarea

            rows="6"

            placeholder="Type customer review here..."

            value={review}

            onChange={(e) =>
              setReview(e.target.value)
            }

            className="w-full bg-[#faf7f3] border border-[#eadfd3] rounded-3xl p-6 text-lg outline-none focus:ring-2 focus:ring-[#d9a77f]"
          />

          <div className="flex gap-4 mt-8">

            <motion.button

              whileHover={{
                scale: 1.03
              }}

              whileTap={{
                scale: 0.97
              }}

              onClick={analyzeReview}

              disabled={loading}

              className="bg-[#d9a77f] text-white px-8 py-4 rounded-2xl text-lg shadow-lg"
            >

              {
                loading
                  ? "Analyzing..."
                  : "Analyze Sentiment"
              }

            </motion.button>

            <button

              onClick={resetReview}

              className="bg-white border border-[#eadfd3] px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-[#faf7f3]"
            >

              <RotateCcw size={18} />

              Reset

            </button>

          </div>

        </motion.div>

        {/* RESULT */}

        {sentiment && (

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.8
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            transition={{
              duration: 0.5
            }}

            className="mt-12 bg-white border border-[#eadfd3] shadow-2xl rounded-[32px] px-12 py-10"
          >

            <h2 className="text-2xl font-bold mb-8 text-center">

              Prediction Result

            </h2>

            <div

              className={`px-10 py-8 rounded-3xl text-3xl font-bold text-center ${sentimentStyles[sentiment]}`}
            >

              <div className="flex flex-col items-center gap-4">

                <motion.div

                  animate={{
                    rotate: [0, 10, -10, 0]
                  }}

                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}

                  className="text-7xl"
                >

                  {emoji}

                </motion.div>

                <div>

                  {sentiment}

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </section>

    </div>
  );
}

export default Analyzer;