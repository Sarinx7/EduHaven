import { useState } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import Login from "./Login";
import SignUp from "./SignUp";
import bgImg from "../assets/LoginBackground.jpg";
import { Button } from "@/components/ui/button";

const formVariants = {
  initial: {
    opacity: 0,
    x: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const containerVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const backgroundVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1 },
  },
};

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <motion.div
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <motion.div
        layout
        variants={containerVariants}
        initial="initial"
        animate="animate"
        transition={{
          layout: {
            type: "spring",
            stiffness: 400,
            damping: 40,
            duration: 0.4,
          },
        }}
        className="relative w-full max-w-md p-8 bg-white/80 dark:bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10"
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex w-full items-center gap-2 mb-10 dark:invert">
            <img src="/Logo.svg" alt="Logo" className="size-8" />
            <h3 className="text-black font-semibold text-xl">Eduhaven</h3>
          </div>

          <AnimatePresence mode="wait">
            {isSignup ? (
              <motion.div
                key="signup"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SignUp />
              </motion.div>
            ) : (
              <motion.div
                key="login"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Login />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 text-center"
          >
            <Button
              className="text-blue-600 dark:text-blue-400 font-medium px-4 py-2 rounded-lg hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              color="transparent"
              size="lg"
              motionProps={{
                initial: { opacity: 0, y: 10, scale: 0.97 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.05, ease: [0.4, 0, 0.2, 1] },
                whileHover: { scale: 1.04, backgroundColor: "rgba(37, 99, 235, 0.1)" },
                whileTap: { scale: 0.98 },
              }}
              onClick={() => setIsSignup((prev) => !prev)}
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
