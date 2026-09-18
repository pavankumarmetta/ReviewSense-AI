import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import {
  User,
  Mail,
  Lock,
  Sparkles
} from "lucide-react";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(

        "http://127.0.0.1:8000/register",

        {
          username,
          email,
          password
        }
      );

      // SUCCESS ALERT
      Swal.fire({

        icon: "success",

        title: "Registration Successful",

        text: response.data.message,

        confirmButtonColor: "#c98d5b",
      });

      setLoading(false);

      // REDIRECT TO LOGIN
      if (
        response.data.message ===
        "User registered successfully"
      ) {

        setTimeout(() => {

          navigate("/login");

        }, 1500);
      }

    } catch (error) {

      setLoading(false);

      // ERROR ALERT
      Swal.fire({

        icon: "error",

        title: "Registration Failed",

        text: "Something went wrong",

        confirmButtonColor: "#c98d5b",
      });
    }
  };

  return (

    <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#e9c8aa] opacity-40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#d9a77f] opacity-30 blur-3xl rounded-full"></div>

      <motion.div

        initial={{
          opacity: 0,
          y: 50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.7
        }}

        className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-[40px] p-10 w-[430px] relative z-10"
      >

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">

          <div className="bg-[#e8c7ad] p-4 rounded-3xl shadow-lg">

            <Sparkles
              size={30}
              className="text-[#8b5e3c]"
            />

          </div>

        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center mb-3">
          Create Account
        </h1>

        <p className="text-center text-[#777] mb-10">
          Join ReviewSense-AI today
        </p>

        <form onSubmit={handleRegister}>

          {/* Username */}
          <div className="relative mb-5">

            <User
              className="absolute left-4 top-4 text-[#b57d56]"
              size={22}
            />

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-14 pr-4 py-4 rounded-2xl border border-[#eadfd3] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d9a77f] text-lg"
            />

          </div>

          {/* Email */}
          <div className="relative mb-5">

            <Mail
              className="absolute left-4 top-4 text-[#b57d56]"
              size={22}
            />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-14 pr-4 py-4 rounded-2xl border border-[#eadfd3] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d9a77f] text-lg"
            />

          </div>

          {/* Password */}
          <div className="relative mb-8">

            <Lock
              className="absolute left-4 top-4 text-[#b57d56]"
              size={22}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-14 pr-4 py-4 rounded-2xl border border-[#eadfd3] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d9a77f] text-lg"
            />

          </div>

          {/* Button */}
          <motion.button

            whileHover={{
              scale: 1.03
            }}

            whileTap={{
              scale: 0.97
            }}

            type="submit"

            disabled={loading}

            className="w-full bg-[#d9a77f] hover:bg-[#c98d5b] transition-all text-white py-4 rounded-2xl text-lg font-semibold shadow-lg disabled:opacity-70"
          >

            {loading ? "Creating..." : "Register"}

          </motion.button>

        </form>

        {/* Login Link */}
        <p className="text-center mt-8 text-[#666]">

          Already have an account?

          <Link
            to="/login"
            className="text-[#c98d5b] font-semibold ml-2"
          >

            Login

          </Link>

        </p>

      </motion.div>

    </div>
  );
}

export default Register;