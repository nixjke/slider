export class Cat {
  public name: string
  public color: string

  constructor(name: string, color: string) {
    this.name = name
    this.color = color
  }

  public move(distanceMeter: number): string {
    return `${this.name} moved ${distanceMeter}m.`
  }

  public say(): string {
    return `Cat ${this.name} says meow`
  }
}
