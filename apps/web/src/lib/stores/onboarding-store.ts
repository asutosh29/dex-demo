import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingStep =
  | "welcome"
  | "create-collection"
  | "add-item"
  | "completed";

interface OnboardingStore {
  currentStep: OnboardingStep;
  hasCompletedOnboarding: boolean;
  firstCollectionId: string | null;
  setCurrentStep: (step: OnboardingStep) => void;
  setFirstCollectionId: (id: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      currentStep: "create-collection",
      hasCompletedOnboarding: false,
      firstCollectionId: null,
      setCurrentStep: (currentStep) => set({ currentStep }),
      setFirstCollectionId: (firstCollectionId) => set({ firstCollectionId }),
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
          currentStep: "completed",
        }),
      resetOnboarding: () =>
        set({
          currentStep: "create-collection",
          hasCompletedOnboarding: false,
          firstCollectionId: null,
        }),
    }),
    { name: "onboarding-state" },
  ),
);
