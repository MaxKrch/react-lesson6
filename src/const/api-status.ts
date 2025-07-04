export const STATUS_REQUEST = {
    IDLE: `idle`,
    LOADING: `loading`,
    FAILED: `failed`,
    SUCCESS: `success`
} as const

export type STATUS_REQUEST_TYPE = typeof STATUS_REQUEST[keyof typeof STATUS_REQUEST]