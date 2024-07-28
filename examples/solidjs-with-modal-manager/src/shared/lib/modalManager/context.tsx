import type { ParentComponent } from 'solid-js'
import { For, createContext } from 'solid-js'
import { type SetStoreFunction, createStore } from 'solid-js/store'
import type { ModalId, ModalState } from './types'

export const MODAL_REGISTRY: { [modalId: ModalId]: any } = {}

type Store = {
  modals: Array<ModalState>
}

export const ModalManagerServiceContext = createContext<{ store: Store, setStore: SetStoreFunction<Store> }>()

export const ModalIdContext = createContext<ModalId>()

export const ModalManagerService: ParentComponent = (props) => {
  const [store, setStoreOrigin] = createStore({ modals: [] as Array<ModalState> })
  const modals = () => store.modals.flatMap(modal => MODAL_REGISTRY[modal.id] ? { ...modal, ...MODAL_REGISTRY[modal.id] } : [])

  // TODO
  // visible={() => modal.visible}

  return (
    <ModalManagerServiceContext.Provider value={{ store, setStore: setStoreOrigin }}>
      <For each={modals()}>
        {(modal) => {
          return (<modal.comp id={() => modal.id} {...modal.args} />)
        }}
      </For>
      {props.children}
    </ModalManagerServiceContext.Provider>
  )
}
