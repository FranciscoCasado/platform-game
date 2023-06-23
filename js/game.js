import { Level, simpleLevelPlan } from './levels.js'
import { DOMDisplay } from './display.js'

class State {
    constructor(level, actors, status) {
        this.level = level
        this.actors = actors
        this.status = status
    }

    static start(level) {
			return new State(level, level.startActors, "playing")
    }
		
		get player() {
			return this.actors.find(a => a.type == "player")
		}
}

console.log("Loading")
let simpleLevel = new Level(simpleLevelPlan)
console.log(`rows: ${simpleLevel.height}, columns: ${simpleLevel.width}`)
const display = new DOMDisplay(document.body, simpleLevel)