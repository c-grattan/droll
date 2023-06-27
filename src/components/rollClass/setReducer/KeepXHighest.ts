import { DiceSetReducer } from "./DiceSetReducer";

export class KeepXHighest implements DiceSetReducer {
	private x: number;

	constructor(x: number) {
		this.x = x;
	}

	reduce(results: number[]): number {
		const sorted = results.sort();
		let total = 0;
		for(let i = 0; i < this.x; i++) {
			total += sorted.pop() || 0;
		}
		return total;
	}
}