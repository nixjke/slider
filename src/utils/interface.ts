// default state
interface IState {
  min: number
  max: number
  step: number
  value: number[]
}

interface IOnlyNumbers {
  [ket: string]: number
}

export { IState, IOnlyNumbers }
