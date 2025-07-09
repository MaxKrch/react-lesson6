const BASE_URL = `http://localhost:7070/messages`

const MESSAGES_API = {
  getNew: (id: number) => ({
    method: `GET`,
    url: `?from=${id}`,
  }),
  create: {
    method: `POST`,
    url: ``,
  },
}

export { BASE_URL, MESSAGES_API }
