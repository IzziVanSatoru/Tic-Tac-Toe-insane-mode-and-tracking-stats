import { useState, useEffect } from 'preact/hooks';
import { supabase } from '../lib/supabaseClient';
import { loadStatsFromLocal, saveStatsToLocal } from '../logic/statsTracker';

const emptyBoard = Array(9).fill(null);

export default function PuzzleChallenge({ difficulty }) {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState('X'); // Player: X
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (turn === 'O' && !winner) {
      setTimeout(() => {
        makeAIMove();
      }, 500);
    }
  }, [turn]);

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b1,c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return b.includes(null) ? null : 'Draw';
  };

  const handleClick = (i) => {
    if (board[i] || winner || turn !== 'X') return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    const w = checkWinner(newBoard);
    if (w) {
      finishGame(w);
    } else {
      setTurn('O');
    }
  };

  const makeAIMove = () => {
    const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
    let move;
    if (difficulty === 'easy') {
      move = available[Math.floor(Math.random() * available.length)];
    } else if (difficulty === 'medium') {
      move = available.length > 5 ? available[0] : available[available.length - 1];
    } else {
      // hard: ambil tengah atau terakhir
      move = available.includes(4) ? 4 : available[available.length - 1];
    }
    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);
    const w = checkWinner(newBoard);
    if (w) {
      finishGame(w);
    } else {
      setTurn('X');
    }
  };

  const finishGame = async (who) => {
    setWinner(who);
    if (who === 'X') {
      const stats = loadStatsFromLocal();
      stats.totalWins += 1;
      stats.totalSteps += board.filter(v => v !== null).length;
      stats.winStreak += 1;
      stats.maxLevel = Math.max(stats.maxLevel, difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1);
      saveStatsToLocal(stats);
      await supabase.from('stats').insert([{
        nickname: 'anon_' + crypto.randomUUID().slice(0, 5),
        total_wins: stats.totalWins,
        avg_steps: stats.totalSteps / stats.totalWins,
        win_streak: stats.winStreak,
        max_level: stats.maxLevel,
        synced_at: new Date().toISOString()
      }]);
    }
  };

  const reset = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setTurn('X');
  };

  return (
    <div class="mb-5">
      <h4 class="text-light mb-3 fw-semibold">🧠 Puzzle Challenge ({difficulty.toUpperCase()})</h4>
      <div class="d-grid gap-2 mb-3" style="grid-template-columns: repeat(3, 80px); justify-content:center;">
        {board.map((cell, i) => (
          <button
            key={i}
            class="btn btn-outline-info fs-4 fw-bold"
            style="height:80px; width:80px;"
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div class="alert alert-warning text-center fw-bold">
          {winner === 'Draw' ? '🤝 Draw!' : winner === 'X' ? '🎉 You Win!' : '💀 AI Wins!'}
        </div>
      )}
      <button class="btn btn-secondary mt-2 w-100" onClick={reset}>🔁 Retry</button>
    </div>
  );
}
