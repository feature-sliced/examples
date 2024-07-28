import type { ParentComponent } from 'solid-js'
import { MODAL_REGISTRY } from './context'
import type { ModalId } from './types'

export function registerModal<P extends object>(id: ModalId, comp: ParentComponent<P>, props?: Partial<P>) {
  if (!MODAL_REGISTRY[id]) {
    MODAL_REGISTRY[id] = { comp, props }
  }
  else {
    MODAL_REGISTRY[id].props = props
  }
}
