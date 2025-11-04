import { useState } from 'react';
import ProjectIntroPage from './ProjectIntroPage';
import LandingPage from './LandingPage';
import IncidentWizard from './IncidentWizard';
import IncidentDashboard from './IncidentDashboard';
import RewardsTracker from './RewardsTracker';

type AppMode = 'intro' | 'landing' | 'report' | 'dashboard' | 'rewards';

export default function IncidentManager() {
  const [currentMode, setCurrentMode] = useState<AppMode>('intro');

  const handleModeChange = (mode: AppMode) => {
    setCurrentMode(mode);
  };

  const renderCurrentView = () => {
    switch (currentMode) {
      case 'intro':
        return (
          <ProjectIntroPage
            onContinue={() => handleModeChange('landing')}
          />
        );
      case 'landing':
        return (
          <LandingPage
            onReportIncident={() => handleModeChange('report')}
            onViewDashboard={() => handleModeChange('dashboard')}
            onViewRewards={() => handleModeChange('rewards')}
          />
        );
      case 'dashboard':
        return (
          <IncidentDashboard
            onBack={() => handleModeChange('landing')}
          />
        );
      case 'rewards':
        return (
          <RewardsTracker
            onBack={() => handleModeChange('landing')}
          />
        );
      case 'report':
        return <IncidentWizard onBackToHome={() => handleModeChange('landing')} />;
      default:
        return null;
    }
  };

  return renderCurrentView();
}