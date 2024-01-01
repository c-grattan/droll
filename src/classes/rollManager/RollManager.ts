import { DiceSet } from "../rollClass/DiceSet";
import { Die } from "../rollClass/Die";
import { Roll } from "../rollClass/Roll";

export type RollStorageObject = {
	roll: Roll,
	name?: string,
	category?: string
};

export class RollManager {
	public rolls: RollStorageObject[];
	private selected: number = -1;

	constructor(rso?: RollStorageObject[]) {
		this.rolls = rso ? rso : [];
	}

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

	public parseNewRolls(rso: RollStorageObject[]): void {
		const newRolls: RollStorageObject[] = [];
		rso.forEach((so: RollStorageObject) => {
			let newRoll: Roll = new Roll();

			so.roll.sets.forEach((set: DiceSet) => {
				let newSet: DiceSet = new DiceSet(set.count, new Die(set.dieType.sides, set.dieType.modifier));
				newRoll.addSet(newSet);
			});

			newRolls.push({
				roll: newRoll,
				name: so.name,
				category: so.category
			});
		});
		this.rolls = newRolls;
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

	public getSelected(): number {
		return this.selected;
	}

	public setSelected(selected: number) {
		this.selected = selected;
	}
};