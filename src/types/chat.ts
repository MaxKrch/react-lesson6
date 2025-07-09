import type { STATUS_SAVING_TYPE } from '../const/api-status'

export type Message = {
  id: number
  userId: string
  content: string
  serverId: number | null
  saving: STATUS_SAVING_TYPE
}
