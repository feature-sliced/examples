import { Modal } from '../Modal/Modal'
import { createModal, useModal } from '@/shared/lib/modalManager'

type Props = {
  title: string
  onButtonClick: () => void
  buttonText?: string
}

function AlertModalPresenter(props: Props) {
  return (
    <Modal>
      <h3>{props.title}</h3>
      <button onClick={() => props.onButtonClick()}>
        {props.buttonText ?? 'Okay'}
      </button>
    </Modal>
  )
}

const AlertModal = createModal(AlertModalPresenter)

export function useAlertModal() {
  return useModal(AlertModal)
}
