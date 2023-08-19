import { DiceSet } from "./DiceSet";

export class Roll {
	private sets: DiceSet[] = []; 

	public addSet(set: DiceSet) {
		this.sets.push(set);
	}

	public removeSet(index: number) {
		this.sets.splice(index, 1);
	}

	public getSets(): DiceSet[] {
		return this.sets;
	}

	public roll(): number {
		return this.sets.map((value) => {
			return value.roll();
		}).reduce((previousValue, currentValue) => {
			return previousValue + currentValue;
		}, 0);
	}

	public getMinimum(): number {
		return this.sets.map((value) => {
			return value.getMinimum();
		}).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}

	public getAverage(): number {
		return this.sets.map((value) => {
			return value.getAverage();
		}).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}

	public getMaximum(): number {
		return this.sets.map((value) => {
			return value.getMaximum();
		}).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}
}