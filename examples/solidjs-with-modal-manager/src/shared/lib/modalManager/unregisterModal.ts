import { MODAL_REGISTRY } from './context'
import type { ModalId } from './types'

export function unregisterModal(id: ModalId) {
  delete MODAL_REGISTRY[id]
}
