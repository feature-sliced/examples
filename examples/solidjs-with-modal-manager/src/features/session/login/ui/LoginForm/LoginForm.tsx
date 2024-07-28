import { createModal, modalsMap, registerModal, useModal } from '@/shared/lib/modalManager'
import { Modal, useAlertModal } from '@/shared/ui'

const TEST_USER = {
  login: 'john',
  password: '12345',
}

function LoginFormPresenter() {
  let loginInputRef: HTMLInputElement | undefined
  let passwordInputRef: HTMLInputElement | undefined
  const { show: showAlert, remove: removeAlert } = useAlertModal()

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    if (!loginInputRef || !passwordInputRef) {
      return
    }

    if (loginInputRef.value === TEST_USER.login && passwordInputRef.value === TEST_USER.password) {
      showAlert({
        title: 'Connection error. Try later',
        onButtonClick: removeAlert,
      })

      return
    }

    showAlert({
      title: 'Not valid login or password',
      onButtonClick: removeAlert,
    })
  }

  return (
    <Modal>
      <div data-fsd="feature/session/login" style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ 'display': 'flex', 'flex-direction': 'column', 'gap': '12px' }}>
          <p>
            Use test account:
            {' '}
            {TEST_USER.login}
            &nbsp;/&nbsp;
            {TEST_USER.password}
          </p>
          <div>
            <label>
              <input ref={loginInputRef} placeholder="login" type="text" name="login" />
            </label>
          </div>
          <div>
            <label>
              <input ref={passwordInputRef} placeholder="password" type="password" name="password" />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </Modal>
  )
}

const LoginForm = createModal(LoginFormPresenter)

/**
 * First approach, export hook to manage modal
 *
 * @example
 * const { show: showLoginForm } = useLoginForm()
 * const openLoginForm = () => showLoginForm({})
 */
export function useLoginForm() {
  return useModal(LoginForm)
}

/**
 * Second approach, register modal by global id
 *
 * @example
 * const { show: showLoginForm } = useModal(modalsMap.Login)
 * const openLoginForm = () => showLoginForm({})
 */
registerModal(modalsMap.Login, LoginForm)
