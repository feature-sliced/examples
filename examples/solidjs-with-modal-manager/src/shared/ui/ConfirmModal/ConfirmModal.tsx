import { Modal } from '../Modal/Modal'
import { createModal, useModal } from '@/shared/lib/modalManager'

type Props = {
  title: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

function ConfirmModalPresenter(props: Props) {
  return (
    <Modal>
      <h3>{props.title}</h3>
      <button onClick={() => props.onConfirm()}>
        {props.confirmText ?? 'Yes'}
      </button>
      <button onClick={() => props.onCancel()}>
        {props.cancelText ?? 'No'}
      </button>
    </Modal>
  )
}

const ConfirmModal = createModal(ConfirmModalPresenter)

export function useConfirmModal() {
  return useModal(ConfirmModal)
}
