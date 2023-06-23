import { Level, simpleLevelPlan } from "./levels.js";
import { DOMDisplay } from "./display.js";


console.log("Loading");

let simpleLevel = new Level(simpleLevelPlan);
console.log(`rows: ${simpleLevel.height}, columns: ${simpleLevel.width}`);

const display = new DOMDisplay(document.body, simpleLevel);
console.log(display.dom);