export abstract class DiceSetReducer {
	abstract reduce(results: number[]): number;
	abstract setVariable(newVariable: number): void;
	abstract getVariable(): number;
};