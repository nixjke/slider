import '../../node_modules/normalize.css/normalize.css'
import '../slider'

let div = document.getElementById('slider') as HTMLElement

($(div).rangeSlider as any)(
  {
    settings: true,
    skin: 'red',
  },
  {
    min: 0,
    max: 100,
    step: 1,
  }
)
