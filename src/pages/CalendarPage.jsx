import React from 'react';
import { LandingButton } from '../landing/components/LandingButton';
import RaceCard from '../components/RaceCard';
import RaceStatusBadge from '../components/RaceStatusBadge';
import { useRaces } from '../hooks/useRaces';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { detectNextRace } from '../lib/utils';


const CalendarPage = () => {
  const { data: races = [], isLoading, error, refetch } = useRaces();

  // Sort races by date like f1-season-grid
  const sortedRaces = React.useMemo(() => {
    return [...races].sort((a, b) => new Date(a.date || a.race_date).getTime() - new Date(b.date || b.race_date).getTime());
  }, [races]);

  const nextRaceId = detectNextRace(sortedRaces);

  const season = new Date().getFullYear();

  if (isLoading) {
    return <Loader fullScreen text="SYNCING RACE DATA..." />;
  }

  if (error) {
    return (
      
        <div className="min-h-screen bg-background py-28 px-6 flex items-center justify-center">
          <ErrorMessage message="Failed to load race calendar" onRetry={refetch} />
        </div>
     
    );
  }

  if (!sortedRaces.length) {
    return (
      
        <div className="min-h-screen bg-background py-28 px-6 flex flex-col items-center justify-center text-center ">
          <div className="max-w-md">
            <h1 className="text-4xl font-f1 font-bold mb-6 text-foreground">No Races</h1>
            <p className="text-lg text-muted-foreground mb-8">
              No races scheduled for this season.
            </p>
            <LandingButton asChild href="/login">
              <span>Make Predictions</span>
            </LandingButton>
          </div>
        </div>
      
    );
  }

  return (
    
      <div className="min-h-screen bg-background ">
        <div className="mx-auto max-w-6xl px-6 py-20">
          {/* Header - adapted from f1-season-grid */}
          <div className="mb-12 space-y-2 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Season {season}
            </p>
            <h1 className="font-f1 text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Race Calendar
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Track every Grand Prix. Make predictions before lock. See podium results.
            </p>
          </div>

          {/* Race Grid - responsive like f1-season-grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedRaces.map((race) => (
              <RaceCard
                key={race.id}
                race={race}
                isNext={race.id === nextRaceId}
              />
            ))}
          </div>

          <div className="mt-20 flex flex-col sm:flex-row gap-4 justify-center">
            <LandingButton size="lg" href="/login" className="w-full sm:w-auto">
              Make Predictions
            </LandingButton>
            <LandingButton variant="racingOutline" size="lg" className="w-full sm:w-auto">
              View Leaderboard
            </LandingButton>
          </div>
        </div>
      </div>
    
  );
};

export default CalendarPage;
