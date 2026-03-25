function formatLastRaceScore(score) {
  if (score == null) return "-";
  return score > 0 ? `+${score}` : `${score}`;
}

function formatAccuracy(accuracy) {
  if (accuracy == null || !Number.isFinite(Number(accuracy))) {
    return "-";
  }

  return `${Number(accuracy).toFixed(1)}%`;
}

function ProfileHeader({ summary }) {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {summary?.username || "Guest"}
            </h1>
            <p className="text-zinc-400">Official scoring summary</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Stat label="Total Points" value={summary?.totalPoints ?? 0} />
            <Stat
              label="Last Race"
              value={formatLastRaceScore(summary?.lastRaceScore)}
            />
            <Stat label="Races Predicted" value={summary?.totalPredictions ?? 0} />
            <Stat label="Accuracy" value={formatAccuracy(summary?.accuracy)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-zinc-400 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default ProfileHeader;
