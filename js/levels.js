import { Player, Lava, Coin, Vec } from "./actors.js";

let simpleLevelPlan = `
..............................................
...................#..........................
...................#o.........................
............o.o............o..................
....@......#####..............................
..#####............###...#...##...............
......#+++++v.v++++++#..v+++++++v.............
......######v.v#######..v#######v.............
..............................................
`;

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};


class Level {
  constructor(plan) {
    let rows = this.parseRowFromPlan(plan);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let tileType = levelChars[ch];
        if (typeof tileType == "string") return tileType;
        this.startActors.push(
          tileType.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }

  parseRowFromPlan(plan) {
    return plan.trim().split("\n").map(l => [...l]);
  }

}

Level.prototype.touches = function (pos, size, type) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width ||
				y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};


export { Level, simpleLevelPlan };