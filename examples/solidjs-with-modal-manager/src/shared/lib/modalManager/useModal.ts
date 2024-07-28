import type { Accessor, Component, ComponentProps } from 'solid-js'
import { createEffect, createSignal, useContext } from 'solid-js'
import type { ModalHandler, ModalId, ModalState } from './types'
import { MODAL_REGISTRY, ModalIdContext, ModalManagerServiceContext } from './context'
import { getModalId } from './getModalId'
import { registerModal } from './registerModal'

export function useModal(): ModalHandler
export function useModal(modalId: ModalId): ModalHandler
export function useModal<C extends Component<any>>(modal: C,): Omit<ModalHandler, 'show'> & {
  show: (args?: Omit<ComponentProps<C>, 'id'>) => Promise<unknown>
}

export function useModal(modalOrId?: any): any {
  const modalProviderId = useContext(ModalIdContext)
  const context = useContext(ModalManagerServiceContext)

  if (!context) {
    throw new Error('Provide your app in ModalManagerService context provider')
  }

  const useAsComponent = modalOrId && typeof modalOrId !== 'string'

  const [modalId] = createSignal(modalOrId ? getModalId(modalOrId) : modalProviderId)

  if (!modalId) {
    throw new Error('modalId is not provided')
  }

  const modal = context.store.modals.find(modal => modal.id === modalId())!

  const hide = () => {
    context?.setStore('modals', modals => ([
      ...modals.map((modal) => {
        if (modal.id !== modalId()) {
          return modal
        }

        return {
          id: modalId(),
          visible: false,
          args: modal.args,
        }
      }),
    ] as ModalState[]))
  }

  const remove = () => {
    context?.setStore('modals', modals => ([
      ...modals.filter(modal => modal.id !== modalId()),
    ] as ModalState[]))
  }

  createEffect(() => {
    const id = modalId() as ModalId | undefined
    if (useAsComponent && id && !MODAL_REGISTRY[id]) {
      registerModal(id, modalOrId)
    }
  })

  return {
    id: modalId as Accessor<string>,
    visible: Boolean(modal?.visible),
    show: (args: any) => {
      context?.setStore('modals', (modals: ModalState[]) => ([
        ...modals.filter(modal => modal.id !== modalId()),
        {
          id: modalId(),
          visible: true,
          args,
        },
      ] as ModalState[]))
    },
    hide,
    remove,
  }
}
