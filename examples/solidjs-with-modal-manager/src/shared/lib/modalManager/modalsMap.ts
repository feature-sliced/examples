import type { ModalId } from './types'

export const modalsMap: Record<keyof ModalsProps, ModalId> = {
  Login: 'login-modal' as ModalId,
  // ...
} as const

export type ModalsProps = {
  Login: Record<string, never>
  // ...
}
