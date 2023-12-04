export class DiceSetReducer {
	private x: number;
	private keepHighest: boolean;

	constructor(x: number, keepHighest: boolean) {
		this.x = x;
		this.keepHighest = keepHighest;
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

		if(this.keepHighest) {
			for(let i = 0; i < this.x; i++) {
				total += sorted.pop() || 0;
			}
		} else {
			for(let i = 0; i < results.length - this.x; i++) {
				total += sorted[i];
			}
		}

		return total;
	}
};