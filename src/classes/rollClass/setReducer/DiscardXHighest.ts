import { DiceSetReducer } from "./DiceSetReducer";

export class DiscardXHighest implements DiceSetReducer {
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
		const sorted = results.sort();
		let total = 0;
		for(let i = 0; i < results.length - this.x; i++) {
			total += sorted[i];
		}
		return total;
	}
}