import { useEffect, useState } from 'preact/hooks';
import { loadStatsFromLocal, saveStatsToLocal } from '../logic/statsTracker';

export default function UnlockSystem() {
  const [stats, setStats] = useState({ totalWins: 0, maxLevel: 1 });
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    const loaded = loadStatsFromLocal();
    setStats(loaded);
    setCurrentLevel(loaded.maxLevel);
  }, []);

  const handleLevelSelect = (level) => {
    const nextLevelThreshold = stats.maxLevel * 8;
    const canAdvance = stats.totalWins >= nextLevelThreshold && level === stats.maxLevel + 1;

    if (level <= stats.maxLevel || canAdvance) {
      const updatedStats = {
        ...stats,
        maxLevel: canAdvance ? stats.maxLevel + 1 : stats.maxLevel,
        totalWins: canAdvance ? 0 : stats.totalWins, // Reset only if leveling up
      };
      setStats(updatedStats);
      setCurrentLevel(level);
      saveStatsToLocal(updatedStats);
    }
  };

  const handleReset = () => {
    const resetStats = {
      totalWins: 0,
      maxLevel: 1,
      winStreak: 0,
      totalSteps: 0,
    };
    setStats(resetStats);
    setCurrentLevel(1);
    saveStatsToLocal(resetStats);
  };

  const renderLevelButtons = () => {
    const buttons = [];
    const maxVisible = Math.min(stats.maxLevel + 1, 98000);
    for (let i = 1; i <= 98000; i++) {
      const threshold = (i - 1) * 8;
      const isUnlocked = i <= stats.maxLevel || (i === stats.maxLevel + 1 && stats.totalWins >= threshold);

      buttons.push(
        <button
          key={i}
          class={`btn btn-sm m-1 ${isUnlocked ? 'btn-outline-info' : 'btn-secondary disabled'}`}
          onClick={() => handleLevelSelect(i)}
        >
          Lv {i}
        </button>
      );

      if (i === 50 && 98000 - maxVisible > 10) {
        buttons.push(<span class="text-muted mx-2">...</span>);
        i = 97990;
      }
    }
    return buttons;
  };

  const nextThreshold = stats.maxLevel * 8;

  return (
    <div class="container mt-4">
      <div class="card bg-dark text-light border-info shadow-lg" style={{ borderRadius: '1rem' }}>
        <div class="card-header text-info fw-bold fs-5 d-flex justify-content-between align-items-center">
          <span>🔓 Unlock System</span>
          <button class="btn btn-sm btn-danger" onClick={handleReset}>🔁 Reset Level</button>
        </div>
        <div class="card-body">
          <p class="mb-1">🎯 Total Wins: <strong>{stats.totalWins}</strong> / <strong>{nextThreshold}</strong></p>
          <p class="mb-3">📶 Current Unlocked Level: <strong>{stats.maxLevel}</strong></p>
          <div class="alert alert-dark text-light">
            🕹️ Selected Level: <strong>Level {currentLevel}</strong>
          </div>
          <div class="d-flex flex-wrap">{renderLevelButtons()}</div>
        </div>
      </div>
    </div>
  );
}
