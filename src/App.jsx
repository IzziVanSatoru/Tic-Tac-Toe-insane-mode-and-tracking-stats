import { useState } from 'preact/hooks';
import DifficultySelector from './components/DifficultySelector';
import PuzzleChallenge from './components/PuzzleChallenge';
import UnlockSystem from './components/UnlockSystem';
import StatsDisplay from './components/StatsDisplay';
import LeaderBoardChart from './components/LeaderBoardChart';

export default function App() {
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <main class="bg-dark text-light min-vh-100 p-4">
      <h1 class="text-center text-info mb-4 fw-bold">🎮 Tic-Tac-Toe: Try Hard Mode</h1>

      {/* Fitur 1: Pilih Kesulitan AI */}
      <DifficultySelector selected={difficulty} onChange={setDifficulty} />

      {/* Fitur 2: Puzzle Mode */}
      <PuzzleChallenge difficulty={difficulty} />

      {/* Fitur 3: Unlock System */}
      <UnlockSystem />

      {/* Fitur 4: Statistik dan Sync */}
      <StatsDisplay />

      {/* Fitur 5: Leaderboard */}
      <LeaderBoardChart />
    </main>
  );
}
