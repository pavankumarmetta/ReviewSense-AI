import {
  Sparkles,
  BarChart3,
  ShieldCheck
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const cardVariant = {

    hidden: {
      opacity: 0,
      y: 80
    },

    visible: {

      opacity: 1,
      y: 0,

      transition: {
        duration: 0.7
      }
    }
  };

  return (

    <div className="min-h-screen bg-[#f9f6f2] text-[#2b2b2b] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[20%] w-[500px] h-[500px] bg-[#efd8c2] opacity-40 blur-3xl rounded-full animate-pulse"></div>

      {/* Navbar */}
      <motion.nav

        initial={{
          y: -80,
          opacity: 0
        }}

        animate={{
          y: 0,
          opacity: 1
        }}

        transition={{
          duration: 0.8
        }}

        className="flex items-center justify-between px-10 py-5 border-b border-[#eadfd3] bg-[#f9f6f2]/80 backdrop-blur-md sticky top-0 z-50"
      >

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

        <div className="flex items-center gap-6">

          {/* SIGN IN */}
          <button

            onClick={() => navigate("/login")}

            className="hover:text-[#b57d56] transition font-medium"
          >

            Sign In

          </button>

          {/* GET STARTED */}
          <motion.button

            onClick={() => navigate("/register")}

            whileHover={{
              scale: 1.05,
              y: -3
            }}

            whileTap={{
              scale: 0.95
            }}

            className="bg-[#d9a77f] text-white px-6 py-3 rounded-2xl shadow-lg"
          >

            Get Started

          </motion.button>

        </div>

      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28">

        {/* Badge */}
        <motion.div

          initial={{
            opacity: 0,
            scale: 0.7
          }}

          animate={{
            opacity: 1,
            scale: 1
          }}

          transition={{
            duration: 0.8
          }}

          className="border border-[#e6d2c2] text-[#b57d56] bg-white/60 backdrop-blur-md px-6 py-2 rounded-full mb-10 shadow-sm"
        >

          AI Powered Sentiment Analysis

        </motion.div>

        {/* Heading */}
        <motion.h1

          initial={{
            opacity: 0,
            y: 80
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

          className="text-7xl md:text-8xl font-extrabold leading-tight max-w-6xl"
        >

          Understand Customer

          <br />

          Reviews{" "}

          <motion.span

            animate={{
              color: [
                "#c68b59",
                "#d9a77f",
                "#b57d56"
              ]
            }}

            transition={{
              duration: 4,
              repeat: Infinity
            }}
          >

            Beautifully

          </motion.span>

        </motion.h1>

        {/* Paragraph */}
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

          className="text-[#6e6e6e] text-xl mt-8 max-w-3xl leading-relaxed"
        >

          Analyze e-commerce clothing reviews using intelligent
          AI-powered sentiment analysis with interactive analytics.

        </motion.p>

        {/* BUTTONS */}
        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 0.8
          }}

          className="flex gap-5 mt-12"
        >

          {/* ANALYZE BUTTON */}
          <motion.button

            onClick={() => navigate("/login")}

            whileHover={{
              scale: 1.05,
              y: -5
            }}

            whileTap={{
              scale: 0.95
            }}

            className="bg-[#d9a77f] text-white px-8 py-4 rounded-2xl text-lg shadow-xl"
          >

            Analyze Reviews →

          </motion.button>

          {/* DEMO BUTTON */}
          <motion.button

            onClick={() => navigate("/analyzer")}

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            className="bg-white border border-[#e4d6ca] px-8 py-4 rounded-2xl text-lg hover:bg-[#f3ece6]"
          >

            View Demo

          </motion.button>

        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="px-10 pb-28">

        <motion.div

          initial={{
            opacity: 0
          }}

          whileInView={{
            opacity: 1
          }}

          transition={{
            duration: 1
          }}

          viewport={{
            once: true
          }}

          className="text-center mb-16"
        >

          <h2 className="text-5xl font-bold">
            Everything you need
          </h2>

          <p className="text-[#777] mt-5 text-xl">
            Advanced AI features with elegant interactions.
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <motion.div

            variants={cardVariant}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once: true
            }}

            whileHover={{
              y: -10,
              scale: 1.02
            }}

            className="bg-white/70 backdrop-blur-lg p-10 rounded-[32px] border border-[#eee3d8] shadow-sm hover:shadow-2xl transition"
          >

            <div className="bg-[#f8e4d5] text-[#c68b59] w-fit p-4 rounded-2xl mb-6">

              <BarChart3 size={28} />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Real-Time Analytics
            </h3>

            <p className="text-[#777] text-lg leading-relaxed">
              Monitor customer sentiment instantly with AI-powered insights.
            </p>

          </motion.div>

          {/* Card 2 */}
          <motion.div

            variants={cardVariant}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once: true
            }}

            whileHover={{
              y: -10,
              scale: 1.02
            }}

            className="bg-white/70 backdrop-blur-lg p-10 rounded-[32px] border border-[#eee3d8] shadow-sm hover:shadow-2xl transition"
          >

            <div className="bg-[#f4e7da] text-[#b57d56] w-fit p-4 rounded-2xl mb-6">

              <ShieldCheck size={28} />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Smart AI Prediction
            </h3>

            <p className="text-[#777] text-lg leading-relaxed">
              Detect Positive, Negative, and Neutral emotions instantly.
            </p>

          </motion.div>

          {/* Card 3 */}
          <motion.div

            variants={cardVariant}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once: true
            }}

            whileHover={{
              y: -10,
              scale: 1.02
            }}

            className="bg-white/70 backdrop-blur-lg p-10 rounded-[32px] border border-[#eee3d8] shadow-sm hover:shadow-2xl transition"
          >

            <div className="bg-[#f3dfcf] text-[#c68b59] w-fit p-4 rounded-2xl mb-6">

              <Sparkles size={28} />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Premium Experience
            </h3>

            <p className="text-[#777] text-lg leading-relaxed">
              Elegant SaaS-inspired UI with smooth animations.
            </p>

          </motion.div>

        </div>

      </section>

    </div>
  );
}

export default Home;