import { Title } from '@solidjs/meta'
import { useConfirmModal } from '@/shared/ui'
import { useLoginForm } from '@/features/session/login/ui/LoginForm/LoginForm'

export function HomePage() {
  const { show: showConfirm, remove: removeConfirm } = useConfirmModal()
  const { show: showLoginFormModal } = useLoginForm()

  const handleLogout = () => {
    showConfirm({
      title: 'Logout',
      onConfirm: () => {
        // eslint-disable-next-line no-alert
        alert('Logout success')
        removeConfirm()
      },
      onCancel: removeConfirm,
      confirmText: 'Logout',
      cancelText: 'Stay in system',
    })
  }

  return (
    <main>
      <Title>Home</Title>
      <h1>examples/solidjs-with-modal-manager</h1>
      <p>
        Dumb layout can be placed in the shared layer, smart - in the app layer.
      </p>
      <h3>Logout button</h3>
      <p>
        Open alert modal
        <button onClick={() => handleLogout()}>
          Open logout modal
        </button>
      </p>
      <p>
        <button onClick={() => showLoginFormModal()}>
          Open login modal
        </button>
        {' '}
        (feature modal)
      </p>
    </main>
  )
}
