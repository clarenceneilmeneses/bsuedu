type Dir = "up" | "right" | "down" | "left";
const DIRS: Dir[] = ["up", "right", "down", "left"];

// Lays out Fibonacci squares in a spiral and returns each square plus the arc drawn inside it.
export function fibonacciLayout(count: number) {
  const fib = [1, 1];
  while (fib.length < count) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);

  const squares: { x: number; y: number; s: number; arc: string }[] = [];
  let minX = 0, minY = 0, maxX = 1, maxY = 1;

  for (let i = 0; i < count; i++) {
    const s = fib[i];
    const dir = DIRS[i % 4];
    let x = 0, y = 0;
    if (i > 0) {
      if (dir === "right") [x, y] = [maxX, minY];
      if (dir === "down") [x, y] = [minX, maxY];
      if (dir === "left") [x, y] = [minX - s, minY];
      if (dir === "up") [x, y] = [minX, minY - s];
    }
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + s);
    maxY = Math.max(maxY, y + s);

    const [from, to] = {
      up: [[x, y + s], [x + s, y]],
      right: [[x, y], [x + s, y + s]],
      down: [[x + s, y], [x, y + s]],
      left: [[x + s, y + s], [x, y]],
    }[dir];
    squares.push({ x, y, s, arc: `M ${from[0]} ${from[1]} A ${s} ${s} 0 0 1 ${to[0]} ${to[1]}` });
  }
  return { squares, box: { minX, minY, w: maxX - minX, h: maxY - minY }, fib: fib.slice(0, count) };
}
