// service/gameLogic.ts

// Verifica vencedor: retorna "X" ou "O", "Empate" ou null
export function checkWinner(board: (string | null)[]) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // "X" ou "O"
    }
  }

  if (!board.includes(null)) return "Empate";

  return null;
}

// IA simples: tenta vencer, tenta bloquear, senão aleatório
export function getBestMove(board: (string | null)[], ai: string, human: string) {
  const emptyIdx = board
    .map((v,i) => (v === null ? i : null))
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

  // 3) centro > canto > borda (melhoria simples) — se quiser pode usar apenas random
  if (emptyIdx.includes(4)) return 4; // centro
  const corners = [0,2,6,8].filter(i => emptyIdx.includes(i));
  if (corners.length) return corners[Math.floor(Math.random()*corners.length)];

  // 4) random
  return emptyIdx[Math.floor(Math.random() * emptyIdx.length)];
}
