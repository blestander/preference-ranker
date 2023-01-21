export class IndexPair {
    constructor (
        public readonly a: number,
        public readonly b: number,
    ) {}

    public toString(): string {
        return `(${this.a}, ${this.b})`
    }
}
