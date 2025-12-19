// =====================
// Tipos
// =====================
export type Difficulty = "EASY" | "MEDIUM" | "HARD";

// =====================
// Verifica vencedor
// Retorna: "X", "O", "Empate" ou null
// =====================
export function checkWinner(board: (string | null)[]) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // "X" ou "O"
    }
  }

  if (!board.includes(null)) return "Empate";

  return null;
}

// =====================
// IA - Fácil (aleatório)
// =====================
function getEasyMove(board: (string | null)[]) {
  const emptyIdx = board
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null) as number[];

  return emptyIdx[Math.floor(Math.random() * emptyIdx.length)];
}

// =====================
// IA - Média
// (é exatamente a sua lógica atual)
// =====================
function getMediumMove(
  board: (string | null)[],
  ai: string,
  human: string
) {
  const emptyIdx = board
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null) as number[];

  // 1) tenta vencer
  for (const i of emptyIdx) {
    const copy = [...board];
    copy[i] = ai;
    if (checkWinner(copy) === ai) return i;
  }

  // 2) tenta bloquear o humano
  for (const i of emptyIdx) {
    const copy = [...board];
    copy[i] = human;
    if (checkWinner(copy) === human) return i;
  }

  // 3) centro
  if (emptyIdx.includes(4)) return 4;

  // 4) cantos
  const corners = [0, 2, 6, 8].filter((i) => emptyIdx.includes(i));
  if (corners.length) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5) aleatório
  return emptyIdx[Math.floor(Math.random() * emptyIdx.length)];
}

// =====================
// IA - Difícil (Minimax)
// =====================
function getHardMove(
  board: (string | null)[],
  ai: string,
  human: string
) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = ai;
      const score = minimax(board, 0, false, ai, human);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(
  board: (string | null)[],
  depth: number,
  isMax: boolean,
  ai: string,
  human: string
): number {
  const result = checkWinner(board);

  if (result === ai) return 10 - depth;
  if (result === human) return depth - 10;
  if (result === "Empate") return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = ai;
        best = Math.max(
          best,
          minimax(board, depth + 1, false, ai, human)
        );
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = human;
        best = Math.min(
          best,
          minimax(board, depth + 1, true, ai, human)
        );
        board[i] = null;
      }
    }
    return best;
  }
}

// =====================
// Função pública usada no jogo
// =====================
export function getComputerMove(
  board: (string | null)[],
  ai: string,
  human: string,
  difficulty: Difficulty
) {
  if (difficulty === "EASY") return getEasyMove(board);
  if (difficulty === "MEDIUM") return getMediumMove(board, ai, human);
  return getHardMove(board, ai, human);
}
