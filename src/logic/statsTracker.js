import { supabase } from '../lib/supabaseClient';

const STORAGE_KEY = 'tictactoe_stats';

export function loadStatsFromLocal() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : getDefaultStats();
}

export function saveStatsToLocal(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function updateStats({ win = false, steps = 0, level = 1 }) {
  const stats = loadStatsFromLocal();

  if (win) {
    stats.totalWins += 1;
    stats.totalSteps += steps;
    stats.winStreak += 1;
    stats.maxLevel = Math.max(stats.maxLevel, level);
  } else {
    stats.winStreak = 0;
  }

  saveStatsToLocal(stats);
  return stats;
}

export async function syncStatsToSupabase(nickname = 'anon') {
  const stats = loadStatsFromLocal();

  const payload = {
    nickname,
    total_wins: stats.totalWins,
    avg_steps: stats.totalWins > 0 ? Math.round(stats.totalSteps / stats.totalWins) : 0,
    win_streak: stats.winStreak,
    max_level: stats.maxLevel,
    synced_at: new Date().toISOString()
  };

  const { error } = await supabase.from('stats').insert([payload]);
  return error;
}

function getDefaultStats() {
  return {
    totalWins: 0,
    totalSteps: 0,
    winStreak: 0,
    maxLevel: 1,
  };
}
