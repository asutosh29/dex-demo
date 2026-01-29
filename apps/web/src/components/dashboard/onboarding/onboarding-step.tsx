import { AnimatedCheck } from "@repo/ui/components/ui/animated-check";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingStepProps {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
  isComplete: boolean;
  showSuccess: boolean;
}

export function OnboardingStep({
  step,
  title,
  description,
  children,
  isComplete,
  showSuccess,
}: OnboardingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-start gap-4">
        <div
          className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm shrink-0"
          aria-label={`Step ${step} of 2`}
        >
          {step}
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center py-8"
          >
            <AnimatedCheck />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-12"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
