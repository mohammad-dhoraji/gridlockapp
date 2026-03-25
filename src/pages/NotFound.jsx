import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-background text-foreground w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md text-center space-y-6"
        >
          {/* Top Accent Line */}
          <div className="h-px w-full bg-primary/40" />

          {/* Label */}
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Error
          </p>

          {/* 404 Heading */}
          <h1 className="text-7xl font-f1 font-black tracking-tight leading-none text-foreground">
            404
          </h1>

          {/* Message */}
          <p className="text-sm md:text-base text-muted-foreground">
            Page not found. You’ve gone off track.
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-3 pt-2">
            <Button onClick={() => navigate("/home")}>
              Go Home
            </Button>

           
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;