import { type JSXElement, createEffect, onCleanup } from 'solid-js'
import { useKeyDownEvent } from '@solid-primitives/keyboard'
import css from './Modal.module.css'
import { useModal } from '@/shared/lib/modalManager'

type Props = {
  children: JSXElement
}

const BODY_MODAL_IS_OPENED_CLASS = 'modalIsOpened'

// TODO: Add CSS styles for animation
const ANIMATION_DELAY_MS = 1000

export function Modal(props: Props) {
  const { id, hide, remove, visible } = useModal()
  const event = useKeyDownEvent()

  const handleClose = () => {
    hide()

    setTimeout(() => {
      remove()
    }, ANIMATION_DELAY_MS)
  }

  createEffect(() => {
    const e = event()
    if (e && e.key === 'Escape') {
      e.preventDefault()

      if (visible) {
        handleClose()
      }
    }
  })

  createEffect(() => {
    document.body.classList.add(BODY_MODAL_IS_OPENED_CLASS)
  })

  onCleanup(() => {
    document.body.classList.remove(BODY_MODAL_IS_OPENED_CLASS)
  })

  return (
    <div class={css.overlay}>
      <div classList={{ [css.modal]: true, [css.modalIsHidden]: !visible }} data-fsd={`shared/ui/modal-id=${id()}`}>
        visible=
        {visible ? '1' : '0'}
        <div class={css.closeButton} onClick={handleClose}>
          <svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style={{ overflow: 'visible', color: 'currentcolor' }}>
            <path d="M18 6 6 18" />
            <path d="M6 6 18 18" />
          </svg>
        </div>
        {props.children}
      </div>
    </div>
  )
}
