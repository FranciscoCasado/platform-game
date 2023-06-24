import { Level, simpleLevelPlan } from "./levels.js";
import { DOMDisplay } from "./display.js";
import { State } from "./state.js";
import { trackKeys } from "./keys.js";


function runAnimation(frameFunc) {
	let lastTime = null;
	function frame(time) {
		if (lastTime != null) {
			let timeStep = Math.min(time - lastTime, 100) / 1000;
			if (frameFunc(timeStep) === false) return;
		}
		lastTime = time;
		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runLevel(level, Display) {
	let display = new Display(document.body, level);
	let state = State.start(level);
	let ending = 3;

	return new Promise(resolve => {
		runAnimation(time => {
			state = state.update(time, arrowKeys);
			display.syncState(state);

			if (state.status == "playing") {
				return true;
			} else if (ending > 0) {
				ending -= time;
				return true;
			} else {
				resolve(state.status);
				return false;
			}
		});
	});
}

const runGame = async function () {
	let simpleLevel = new Level(simpleLevelPlan);
	let status = await runLevel(simpleLevel, DOMDisplay);
	if (status == "won") console.log("You have won!");
};

window.runGame = runGame;