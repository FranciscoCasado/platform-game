import { Player, Lava, Coin, Vec } from "./actors.js"

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................
`;

const levelChars = {
	".": "empty",
	"#": "wall",
	"+": "lava",
	"@": Player,
	"o": Coin,
	"=": Lava, "|": Lava, "v": Lava
}


class Level {
	constructor(plan) {
		let rows = this.parseRowFromPlan(plan)
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
			})
		})
	}

	parseRowFromPlan(plan) {
		return plan.trim().split("\n").map(l => [...l])
	}

}

export { Level, simpleLevelPlan };