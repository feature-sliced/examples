import type { ParentComponent } from 'solid-js'
import { splitProps } from 'solid-js'
import type { ModalComponentProps } from './types'
import { ModalIdContext } from './context'

export function createModal<P extends object>(Component: ParentComponent<P>) {
  return (props: ModalComponentProps<P>) => {
    const [localProps, othersProps] = splitProps(props, ['id'])

    return (
      <ModalIdContext.Provider value={localProps.id()}>
        <Component {...(othersProps as P)} />
      </ModalIdContext.Provider>
    )
  }
}
