import { IntervalTip, SingleTip, ITip } from '../Factories/SubView/Tip/Tip'
import { SingleBar, IntervalBar, BarInterface } from '../Factories/SubView/Bar/Bar'
import { SingleHandle, IntervalHandle, HandleInterface } from '../Factories/SubView/Handle/Handle'
import { Scale } from '../Factories/SubView/Scale/Scale'
import { Directions } from '../../utils/interface'

interface Factory {
  createBar(anchor: HTMLElement): BarInterface
  createTip(): ITip
  createHandle(anchor: HTMLElement): HandleInterface
  createScale(anchor: HTMLElement): Scale
}

class Factory {
  constructor(protected direction: Directions) {}
}

class SingleFactory extends Factory implements Factory {
  public createBar(anchor: HTMLElement) {
    return new SingleBar(this.direction, anchor)
  }

  public createHandle(anchor: HTMLElement) {
    return new SingleHandle(this.direction, anchor)
  }

  public createTip() {
    return new SingleTip()
  }

  public createScale(anchor: HTMLElement) {
    return new Scale(this.direction, anchor)
  }
}

class IntervalFactory extends Factory implements Factory {
  public createBar(anchor: HTMLElement) {
    return new IntervalBar(this.direction, anchor)
  }

  public createHandle(anchor: HTMLElement) {
    return new IntervalHandle(this.direction, anchor)
  }

  public createTip() {
    return new IntervalTip()
  }

  public createScale(anchor: HTMLElement) {
    return new Scale(this.direction, anchor)
  }
}

export { Factory, SingleFactory, IntervalFactory }
