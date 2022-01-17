import values from '../../../../types'

interface IBarProps {
  values: values
  range: { min: number; max: number }
  isVertical: boolean
}

export default IBarProps
