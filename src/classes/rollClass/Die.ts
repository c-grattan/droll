export class Die {
	private sides: number = 1;
	private modifier: number = 0;

	private minimum: number = 0;
	private average: number = 0;
	private maximum: number = 0;

	private calculateAverage(sides: number): number {
		let avg: number = 0;
		let highestSide = sides;
		while(highestSide > 0) {
			avg += highestSide--;
		}
		return avg / sides;
	}

	public getMinimum(): number {
		return this.minimum;
	}

	public getAverage(): number {
		return this.average;
	}

	public getMaximum(): number {
		return this.maximum;
	}

	public getSides(): number {
		return this.sides;
	}

	public setSides(sides: number): void {
		this.sides = sides;
	}

	public getModifier(): number {
		return this.modifier;
	}

	public setModifier(modifier: number): void {
		this.modifier = modifier;
	}

	constructor(sides: number, modifier: number = 0) {
		this.sides = Math.floor(sides);
		this.modifier = modifier;
		this.minimum = 1 + modifier;
		this.average = this.calculateAverage(sides) + modifier;
		this.maximum = sides + modifier;
	}

	public roll(): number {
		const min = 1;
		return Math.floor(Math.random() * (this.sides - min) + min) + this.modifier;
	}
}