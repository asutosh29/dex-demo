import { useState, useEffect } from "react";
import { authClient } from "~/lib/auth-client";
import { Button } from "@repo/ui/components/ui/button";
import { AnimatedGroup } from "@repo/ui/components/ui/animated-group";
import { FolderPlus, Zap, Search, Hash, Globe, Users } from "@repo/ui/icons";
import { useOnboardingStore } from "~/lib/stores/onboarding-store";
import { FeatureHighlight } from "./feature-highlight";
import { OnboardingStep } from "./onboarding-step";
import { CollectionCreatorInline } from "./collection-creator-inline";
import { ItemCreatorInline } from "./item-creator-inline";

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12 && hour >= 5) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
};

export function WelcomeState() {
  const greeting = getTimeBasedGreeting();
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name?.split(" ")[0];

  const {
    currentStep,
    firstCollectionId,
    setCurrentStep,
    setFirstCollectionId,
    completeOnboarding,
  } = useOnboardingStore();

  const [showStep1Success, setShowStep1Success] = useState(false);
  const [showStep2Success, setShowStep2Success] = useState(false);

  const handleCollectionCreated = (collectionId: string) => {
    setFirstCollectionId(collectionId);
    setShowStep1Success(true);

    // Show success animation for 800ms, then transition to step 2
    setTimeout(() => {
      setShowStep1Success(false);
      setCurrentStep("add-item");
    }, 800);
  };

  const handleItemAdded = () => {
    setShowStep2Success(true);

    // Show success animation for 800ms, then complete onboarding
    setTimeout(() => {
      completeOnboarding();
    }, 800);
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-6 space-y-8 md:space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 mt-8 md:mt-12">
        <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-display font-light">
          {greeting},{" "}
          <span className="italic text-muted-foreground">{firstName}.</span>
        </h1>
        <div className="space-y-2">
          <p className="text-lg md:text-xl text-muted-foreground">
            Welcome to your pokedex for the web.
          </p>
        </div>
      </div>

      {/* Feature Highlights */}
      <AnimatedGroup
        preset="blur-slide"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <FeatureHighlight
          icon={<FolderPlus />}
          title="Organize with Collections"
          description="Group related items by topic or project"
        />
        <FeatureHighlight
          icon={<Zap />}
          title="Capture Instantly"
          description="Press 'A' anywhere to save"
        />
        <FeatureHighlight
          icon={<Search />}
          title="Find Anything"
          description="Search across your brain"
        />
        <FeatureHighlight
          icon={<Hash />}
          title="Tag & Filter"
          description="Categorize with tags"
        />
        <FeatureHighlight
          icon={<Globe />}
          title="Save from Anywhere"
          description="Use the browser extension"
        />
        <FeatureHighlight
          icon={<Users />}
          title="Share & Collaborate"
          description="Invite team members"
        />
      </AnimatedGroup>

      {/* Two-Step Onboarding */}
      <div className="space-y-8 max-w-2xl mx-auto">
        {currentStep === "create-collection" && (
          <OnboardingStep
            step={1}
            title="Create your first collection"
            description="Collections help you organize items by topic or project."
            isComplete={false}
            showSuccess={showStep1Success}
          >
            <CollectionCreatorInline onSuccess={handleCollectionCreated} />
          </OnboardingStep>
        )}

        {currentStep === "add-item" && firstCollectionId && (
          <OnboardingStep
            step={2}
            title="Add your first item"
            description="Save a link to your new collection."
            isComplete={false}
            showSuccess={showStep2Success}
          >
            <ItemCreatorInline
              collectionId={firstCollectionId}
              onSuccess={handleItemAdded}
            />
          </OnboardingStep>
        )}

        {/* Skip Option */}
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Skip for now
          </Button>
        </div>
      </div>
    </main>
  );
}
