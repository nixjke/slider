import { IState, ViewValues, VisualState } from '../utils/interface'
import Model from '../Model/Model'
import View from '../View/View'
import ViewConfigurator from '../View/ViewConfigurator/ViewConfigurator'
import VisualModel from '../Model/VisualModel'

class Presenter {
  private model: Model
  private visualModel: VisualModel
  private view: View

  constructor(private anchor: HTMLElement, settingsVisualModel: VisualState, private settingsModel: IState) {
    this.model = new Model(settingsModel)
    this.visualModel = new VisualModel(settingsVisualModel)

    this.view = new ViewConfigurator().main(this.visualModel.state, this.anchor)
    this.view.createUI(this.visualModel.state)
    this.bindEvents()
    this.view.init(this.visualModel.state)
  }

  private bindEvents() {
    this.view.subscribe('finishInit', obj => this.arrangeHandles(obj))
    this.model.subscribe('pxValueDone', obj => this.view.paint(obj))
    this.view.subscribe('onUserMove', obj => this.model.counting(obj))

    // Синхронизация настроек и состояния
    this.view.UIs.settings &&
      this.view.UIs.settings.subscribe('newSettings', obj => {
        this.model.setState(obj)
        this.arrangeHandles(obj)

        if (obj.step) {
          this.reCreateApplication()
        }
      })

    // Отрисовка настроек
    this.model.subscribe(
      'pxValueDone',
      () => this.view.UIs.settings && this.view.UIs.settings.setState(this.model.state, this.visualModel.state)
    )

    // Пересоздать слайдер
    this.view.UIs.settings &&
      this.view.UIs.settings.subscribe('reCreateApp', newVisualModel => {
        this.visualModel.setState(newVisualModel)
        this.reCreateApplication()
      })

    // События для плагина
    this.model.subscribe('pxValueDone', () =>
      this.anchor.dispatchEvent(new CustomEvent('onChange', { detail: this.model.state }))
    )

    // Нажатия по значениям на шкале
    this.view.UIs.scale &&
      this.view.UIs.scale.subscribe('newValueFromScale', obj => {
        this.model.setState(obj)
        this.arrangeHandles(obj)
      })
  }

  // Расстановка бегунков
  private arrangeHandles({ edge, handles }: ViewValues) {
    if (!handles) return

    for (let i = 0; i < handles.length; i += 1) {
      this.model.counting({
        edge: edge,
        target: handles[i] as HTMLElement,
        value: this.model.state.values[i],
      })
    }
  }

  private reCreateApplication(newVisualModel: VisualState = this.visualModel.state) {
    this.view.removeHTML()

    const settingsModel = { ...this.settingsModel, ...this.model.state }
    this.model = new Model(settingsModel)
    this.visualModel.setState(newVisualModel)

    this.view = new ViewConfigurator().main(this.visualModel.state, this.anchor)
    this.view.createUI(this.visualModel.state)
    this.bindEvents()
    this.view.init(this.visualModel.state)
  }
}

export default Presenter
