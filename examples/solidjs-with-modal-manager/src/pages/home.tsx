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
        This example shows how to work with a modal manager in declarative way.
      </p>
      <h3>Open alert modal</h3>
      <p>
        <button onClick={() => handleLogout()}>
          Logout
        </button>
      </p>
      <h3>Open custom usecases modal</h3>
      <p>
        <button onClick={() => showLoginFormModal()}>
          Login
        </button>
      </p>
    </main>
  )
}
