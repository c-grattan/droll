export class Die {
	public sides: number = 1;
	public modifier: number = 0;

	private minimum: number = 0;
	private average: number = 0;
	private maximum: number = 0;

	private calculateMinimum(): void {
		this.minimum = 1 + this.modifier;
	}

	private calculateAverage(): void {
		let avg: number = 0;
		let highestSide = this.sides;
		while(highestSide > 0) {
			avg += highestSide--;
		}
		this.average = avg / this.sides + this.modifier;;
	}

	private calculateMaximum(): void {
		this.maximum = this.sides + this.modifier;
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
		this.calculateAverage();
		this.calculateMaximum();
	}

	public getModifier(): number {
		return this.modifier;
	}

	public setModifier(modifier: number): void {
		this.modifier = modifier;
		this.calculateMinimum();
		this.calculateAverage();
		this.calculateMaximum();
	}

	constructor(sides: number, modifier: number = 0) {
		this.sides = Math.floor(sides);
		this.modifier = modifier;
		this.calculateMinimum();
		this.calculateAverage();
		this.calculateMaximum();
	}

	public roll(): number {
		const min = 1;
		return Math.floor(Math.random() * (this.sides - min) + min) + this.modifier;
	}
}