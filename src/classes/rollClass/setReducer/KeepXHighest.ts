import { DiceSetReducer } from "./DiceSetReducer";

export class KeepXHighest implements DiceSetReducer {
	private x: number;

	constructor(x: number) {
		this.x = x;
	}
	getVariable(): number {
		return this.x;
	}

	setVariable(newVariable: number): void {
		this.x = newVariable;
	}

	reduce(results: number[]): number {
		const sorted = results.sort((a, b) => a - b);
		let total = 0;
		for(let i = 0; i < this.x; i++) {
			total += sorted.pop() || 0;
		}
		return total;
	}
}