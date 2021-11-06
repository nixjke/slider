import '../../node_modules/normalize.css/normalize.css'
import '../plugin'


let div = document.getElementById('slider') as HTMLElement

($(div).rangeSlider as any)(
  {
    settings: true,
    skin: 'red',
  },
  {
    min: 20,
    step: 5,
  }
)
