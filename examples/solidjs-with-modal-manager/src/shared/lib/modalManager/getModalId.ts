import type { JSX } from 'solid-js'
import type { ModalId } from './types'

export const symModalId = Symbol('MODAL_ID')

export type ModalComponent = {
  (props: any): JSX.Element
  [symModalId]: string
}

let uidSeed = 0
const getUuid = () => `_modal_manager_${uidSeed++}`

export function getModalId(modalOrId: ModalId | ModalComponent) {
  if (typeof modalOrId === 'string') {
    return modalOrId as ModalId
  }

  if (!modalOrId[symModalId]) {
    modalOrId[symModalId] = getUuid()
  }

  return modalOrId[symModalId]
}
