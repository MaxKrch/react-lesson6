export const STATUS_REQUEST = {
  IDLE: `idle`,
  LOADING: `loading`,
  FAILED: `failed`,
  SUCCESS: `success`,
} as const

export type STATUS_REQUEST_TYPE =
  (typeof STATUS_REQUEST)[keyof typeof STATUS_REQUEST]

export const STATUS_SAVING = {
  SAVING: `saving`,
  SUCCESS: `success`,
  FAILED: `failed`,
  IDLE: `idle`,
} as const

export type STATUS_SAVING_TYPE =
  (typeof STATUS_SAVING)[keyof typeof STATUS_SAVING]
