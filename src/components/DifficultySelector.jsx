export default function DifficultySelector({ selected, onChange }) {
  return (
    <div class="mb-4">
      <label class="form-label text-light fw-bold">🎯 Select Difficulty</label>
      <select
        class="form-select border-info bg-dark text-light"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="easy">🟢 Easy</option>
        <option value="medium">🟡 Medium</option>
        <option value="hard">🔴 Hard</option>
      </select>
    </div>
  );
}
