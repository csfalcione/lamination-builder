

export class Pair<T, V> {

    constructor(private left: T, private right: V) { }

    public mapLeft<U>(func: (left: T) => U): Pair<U, V> {
        return new Pair(func(this.left), this.right)
    }

    public mapRight<W>(func: (right: V) => W): Pair<T, W> {
        return new Pair(this.left, func(this.right))
    }

    public map<U, W>(func: (left: T, right: V) => [U, W]): Pair<U, W> {
        return new Pair(...func(this.left, this.right))
    }

    public flatMapLeft<U>(func: (left: T) => U[]): Pair<U, V>[] {
        return func(this.left).map((item: U) => new Pair(item, this.right))
    }

    public unwrapLeft() {
        return this.left
    }

    public unwrapRight() {
        return this.right
    }

    public unwrap(): [T, V] {
        return [this.unwrapLeft(), this.unwrapRight()]
    }

}

