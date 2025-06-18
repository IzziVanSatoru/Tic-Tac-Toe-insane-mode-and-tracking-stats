import { useEffect, useState, useRef } from 'preact/hooks';
import { supabase } from '../lib/supabaseClient';

export default function LeaderBoardChart() {
  const [leaders, setLeaders] = useState([]);
  const [totalWinsAll, setTotalWinsAll] = useState(0);
  const printRef = useRef();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('nickname, total_wins, win_streak, avg_steps')
        .order('total_wins', { ascending: false })
        .limit(10);

      if (error) {
        console.error('❌ Supabase error:', error);
        return;
      }

      const totalWins = data.reduce((sum, player) => sum + player.total_wins, 0);
      setTotalWinsAll(totalWins);

      const leaderboard = data.map((entry, index) => {
        const estimated_total_steps = entry.avg_steps * entry.total_wins;
        const win_rate = entry.total_wins > 0 && estimated_total_steps > 0
          ? Math.min((entry.total_wins / estimated_total_steps) * 100, 100).toFixed(1)
          : '0.0';

        const contribution = totalWins > 0
          ? ((entry.total_wins / totalWins) * 100).toFixed(1)
          : '0.0';

        return {
          ...entry,
          rank: index + 1,
          win_rate,
          contribution
        };
      });

      setLeaders(leaderboard);
    };

    fetchLeaderboard();
  }, []);

  const handleDownloadCSV = () => {
    const header = 'Rank,Nickname,Total Wins,Win Streak,Win Rate (%),Contribution (%)\n';
    const rows = leaders.map(p =>
      `${p.rank},${p.nickname},${p.total_wins},${p.win_streak},${p.win_rate},${p.contribution}`
    ).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leaderboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open('', '', 'height=800,width=1000');
    win.document.write('<html><head><title>Leaderboard PDF</title>');
    win.document.write('<style>table,th,td{border:1px solid #333;border-collapse:collapse;padding:8px;}body{font-family:sans-serif}</style>');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div class="container mt-4">
      <div class="card bg-dark text-light border-warning shadow-lg" style={{ borderRadius: '1rem' }}>
        <div class="card-header text-warning fw-bold fs-5">🏆 Leaderboard</div>
        <div class="card-body" ref={printRef}>
          <p class="mb-2">📊 <strong>Total Wins All Players:</strong> {totalWinsAll}</p>
          <table class="table table-dark table-hover table-bordered">
            <thead class="table-warning text-dark">
              <tr>
                <th>🏅 Rank</th>
                <th>🧑 Nickname</th>
                <th>🏆 Total Wins</th>
                <th>🔥 Win Streak</th>
                <th>🎯 Win Rate (%)</th>
                <th>📈 Contribution (%)</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map(player => (
                <tr key={player.nickname}>
                  <td><strong>#{player.rank}</strong></td>
                  <td>{player.nickname}</td>
                  <td>{player.total_wins}</td>
                  <td>{player.win_streak}</td>
                  <td>{player.win_rate}%</td>
                  <td>{player.contribution}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="d-flex gap-2 p-3">
          <button class="btn btn-outline-warning btn-sm" onClick={handleDownloadCSV}>
            📥 Unduh CSV
          </button>
          <button class="btn btn-outline-light btn-sm" onClick={handleDownloadPDF}>
            🖨️ Cetak/Unduh PDF
          </button>
        </div>

        {leaders.length === 0 && (
          <div class="alert alert-secondary mt-3">No leaderboard data available.</div>
        )}
      </div>
    </div>
  );
}
