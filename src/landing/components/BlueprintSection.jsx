import React from 'react';
import { motion } from 'framer-motion';
import { GridLockBlueprintLogo } from '../../components/branding';

const BlueprintMotionDiv = motion.div;

const BlueprintSection = () => {
  return (
    <section className="py-28 px-6 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 items-center ">
        {/* <BlueprintMotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-f1 font-bold tracking-tight text-foreground">
            Engineered for Precision
          </h2>
          <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
            Every prediction is calculated, locked, and scored with deterministic accuracy. No randomness. No guesswork.
          </p>
        </BlueprintMotionDiv> */}
        <BlueprintMotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="justify-self-center blueprint-grid"
        >
          <GridLockBlueprintLogo size={400} />
        </BlueprintMotionDiv>
      </div>
    </section>
  );
};

export default BlueprintSection;

