function formatAccuracy(accuracy) {
  if (accuracy == null || !Number.isFinite(Number(accuracy))) {
    return "-";
  }

  return `${Number(accuracy).toFixed(1)}%`;
}

function PerformanceSnapshot({ summary = {} }) {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Performance Snapshot
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-zinc-400 text-sm">Accuracy</p>
            <p className="text-xl font-bold">{formatAccuracy(summary.accuracy)}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-sm">Correct Picks</p>
            <p className="text-xl font-bold">{summary.correctPredictions ?? 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerformanceSnapshot;
