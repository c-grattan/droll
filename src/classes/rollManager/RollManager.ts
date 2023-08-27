import { Roll } from "../rollClass/Roll";

type RollStorageObject = {
	roll: Roll,
	name?: string,
	category?: string
};

export class RollManager {
	private rolls: RollStorageObject[] = [];

	public addRoll(roll: Roll, rollOptions?: {
		rollName?: string,
		category?: string
	}): void {
		const newRoll: RollStorageObject = {
			roll: roll,
			name: rollOptions?.rollName,
			category: rollOptions?.category
		}
		this.rolls.push(newRoll);
	};

	public getRolls(): Roll[] {
		return this.rolls.map((rso: RollStorageObject) => {
			return rso.roll;
		});
	}

	public getNames(): string[] {
		return this.rolls.map((rso: RollStorageObject) => {
			return rso.name || '';
		});
	}

	public getCategories(): string[] {
		return [...new Set(this.rolls.map((rso: RollStorageObject) => {
			return rso.category || '';
		}))];
	}
};