# 🎮 Tic-Tac-Toe: insane mode and tracking stats

Versi lebih sulit dan menantang dari Tic-Tac-Toe klasik. Menampilkan leaderboard, statistik pemain, dan mode permainan dramatis. Dibuat dengan **Preact**, **Supabase**, dan **Bootstrap 5**.

---

## 📆 Ringkasan Proyek

- 🔋 **Frontend:** Preact (Vite)
- 🧠 **Backend/DB:** Supabase (PostgreSQL)
- 🎨 **UI:** Bootstrap 5 (Dark Mode)
- 📈 **Fitur:** Statistik, Export PDF/CSV, Leaderboard

---

## 🚀 Getting Started (English)

### 1. Clone the repository

```bash
git clone https://github.com/IzziVanSatoru/Tic-Tac-Toe-insane-mode-and-tracking-stats.git
cd Tic-Tac-Toe-insane-mode-and-tracking-stats
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

- Create a table called `stats` in your Supabase project:

```sql
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  total_wins int default 0,
  avg_steps float default 0,
  win_streak int default 0,
  max_level int default 0,
  synced_at timestamp default now()
);
```

- Add your Supabase credentials in your own `.env` file.

### 4. Run the app

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 🇯🇵 はじめの使い方 (Japanese N5)

### 1. クローンする

```bash
git clone https://github.com/IzziVanSatoru/Tic-Tac-Toe-insane-mode-and-tracking-stats.git
cd Tic-Tac-Toe-insane-mode-and-tracking-stats
```

### 2. インストール

```bash
npm install
```

### 3. Supabase 作ります

```sql
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  total_wins int default 0,
  avg_steps float default 0,
  win_streak int default 0,
  max_level int default 0,
  synced_at timestamp default now()
);
```

- Supabase の情報は自分の `.env` ファイルに入れてください

### 4. アプリを開く

```bash
npm run dev
```

`http://localhost:5173` を開いてください

---

## 🇮🇩 Panduan Bahasa Indonesia

### 1. Clone repositori

```bash
git clone https://github.com/IzziVanSatoru/Tic-Tac-Toe-insane-mode-and-tracking-stats.git
cd Tic-Tac-Toe-insane-mode-and-tracking-stats
```

### 2. Install dependency

```bash
npm install
```

### 3. Setup Supabase

- Jalankan SQL berikut di Supabase:

```sql
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  total_wins int default 0,
  avg_steps float default 0,
  win_streak int default 0,
  max_level int default 0,
  synced_at timestamp default now()
);
```

- Tambahkan kredensial ke `.env` kamu sendiri

### 4. Jalankan aplikasinya

```bash
npm run dev
```

Buka `http://localhost:5173`

---

## 📂 Struktur Proyek

```
src/
├── components/
│   ├── LeaderBoardChart.jsx
│   ├── StatsDisplay.jsx
├── lib/
│   └── supabaseClient.js
├── App.jsx
└── main.jsx
```

---

## ❤️ Credit

Created by izziVanSatoru — For fun, experiments, and learning!

---

## ⚠️ Disclaimer

This game is for **educational purposes** only. Do not rage quit. Do not underestimate the AI.