interface IState {
  [key: string]: number | number[] | HTMLElement
}

interface IOnlyNumbers {
  [key: string]: number
}

export { IState, IOnlyNumbers }
