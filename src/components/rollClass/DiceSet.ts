import { Die } from "./Die"
import { DiceSetReducer } from "./setReducer/DiceSetReducer";

export class DiceSet {
	private count: number = 0;
	private dieType: Die = new Die(0, 0);
	private reducer: DiceSetReducer | undefined = undefined;

	constructor(count: number, dieType: Die) {
		this.count = count;
		this.dieType = dieType;
	}

	private getRolls(): number[] {
		const rolls: number[] = [];
		for(let i = 0; i < this.count; i++) {
			rolls.push(this.dieType.roll());
		}
		return rolls;
	}

	private total(nums: number[]): number {
		return nums.reduce((prev: number, current: number) => {return prev + current});
	}

	public roll(): number {
		const rolls: number[] = this.getRolls();

		return this.reducer
			? this.reducer.reduce(rolls)
			: this.total(rolls);
	}

	private getArrayOf(len: number, val: number): number[] {
		return Array.from({length: len}).map(() => val);
	}

	private getStatsFor(dieStat: number): number {
		if(this.reducer) {
			const rolls = this.getArrayOf(this.count, dieStat);
			return this.reducer.reduce(rolls);
		} else {
			return dieStat * this.count;
		}
	}

	public getMinimum(): number {
		return this.getStatsFor(this.dieType.getMinimum());
	}

	public getAverage(): number {
		return this.getStatsFor(this.dieType.getAverage());
	}

	public getMaximum(): number {
		return this.getStatsFor(this.dieType.getMaximum());
	}

	public getReducer(): DiceSetReducer | undefined {
		return this.reducer;
	}

	public connectReducer(reducer: DiceSetReducer): void {
		this.reducer = reducer;
	}

	public disconnectReducer(): void {
		this.reducer = undefined;
	}
}