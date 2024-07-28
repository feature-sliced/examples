import type { Accessor } from 'solid-js'

export type ModalId = string & { __brand: 'ModalId' }

export type ModalState = {
  id: ModalId
  args?: Record<string, unknown>
  visible?: boolean
}

export type ModalHandler<Props = Record<string, any>> = {
  id: Accessor<ModalId>
  visible: boolean
  show: (args?: Props) => Promise<unknown>
  hide: () => Promise<unknown>
  remove: () => void
}

type InternalModalComponentProps = { id: Accessor<ModalId> }

export type ModalComponentProps<P extends object> = P & InternalModalComponentProps
