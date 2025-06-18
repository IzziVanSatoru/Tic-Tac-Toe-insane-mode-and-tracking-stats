// src/components/StatsDisplay.jsx
import { useEffect, useState } from 'preact/hooks';
import { loadStatsFromLocal, syncStatsToSupabase } from '../logic/statsTracker';

export default function StatsDisplay() {
  const [stats, setStats] = useState(loadStatsFromLocal());
  const [syncStatus, setSyncStatus] = useState(null);

  const handleSync = async () => {
    setSyncStatus('🔄 Syncing...');
    const error = await syncStatsToSupabase('anon_' + crypto.randomUUID().slice(0, 5));
    if (error) {
      console.error(error);
      setSyncStatus('❌ Failed to sync');
    } else {
      setSyncStatus('✅ Synced!');
    }
    setTimeout(() => setSyncStatus(null), 3000);
  };

  useEffect(() => {
    setStats(loadStatsFromLocal());
  }, []);

  return (
    <div class="container mt-4">
      <div class="card bg-dark text-light border-info shadow-lg" style={{ borderRadius: '1rem' }}>
        <div class="card-header text-info fw-bold fs-5">📊 Game Stats</div>
        <div class="card-body">
          <ul class="list-group list-group-flush mb-3">
            <li class="list-group-item bg-dark text-light">
              🏆 Total Wins: <strong class="text-success">{stats.totalWins}</strong>
            </li>
            <li class="list-group-item bg-dark text-light">
              🎯 Avg Steps to Win: <strong>{stats.totalWins > 0 ? Math.round(stats.totalSteps / stats.totalWins) : 0}</strong>
            </li>
            <li class="list-group-item bg-dark text-light">
              🔥 Win Streak: <strong class="text-warning">{stats.winStreak}</strong>
            </li>
            <li class="list-group-item bg-dark text-light">
              🚀 Max Level Reached: <strong class="text-info">{stats.maxLevel}</strong>
            </li>
          </ul>
          <button class="btn btn-outline-info w-100 fw-bold" onClick={handleSync}>
            🔄 Sync to Supabase
          </button>
          {syncStatus && <div class="mt-2 text-center text-info">{syncStatus}</div>}
        </div>
      </div>
    </div>
  );
}
