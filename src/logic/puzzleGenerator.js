// puzzleGenerator.js

/**
 * Generator puzzle berdasarkan level.
 * Setiap level akan memiliki konfigurasi papan dan langkah maksimal berbeda.
 */
export function generatePuzzle(level = 1) {
  switch (level) {
    case 1:
      return {
        board: [null, 'X', 'O', null, 'O', null, 'X', null, null],
        maxSteps: 3,
        description: 'Level 1 - Dasar: Menang dalam 3 langkah',
      };
    case 2:
      return {
        board: ['X', null, 'O', null, 'X', null, null, null, 'O'],
        maxSteps: 2,
        description: 'Level 2 - Intermediate: Menang dalam 2 langkah',
      };
    case 3:
      return {
        board: ['O', 'X', null, 'X', 'O', null, null, null, null],
        maxSteps: 2,
        description: 'Level 3 - Sulit: Menang dalam 2 langkah',
      };
    case 4:
      return {
        board: [null, 'O', null, 'X', null, 'X', null, 'O', null],
        maxSteps: 3,
        description: 'Level 4 - Strategi: Menang dalam 3 langkah',
      };
    case 5:
      return {
        board: ['X', 'X', 'O', 'O', null, null, null, null, null],
        maxSteps: 1,
        description: 'Level 5 - Final: Hanya 1 Langkah!',
      };
    default:
      return {
        board: Array(9).fill(null),
        maxSteps: 3,
        description: `Level ${level} - Kosong: Tidak tersedia`,
      };
  }
}
