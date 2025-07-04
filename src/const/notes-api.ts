export const NOTE_API= {
  getAll: {
    method: 'GET',
    url: '/notes',
  },
  create: {
    method: 'POST',
    url: '/notes',
  },
  delete: (id: string) => ({
    method: 'DELETE',
    url: `/notes/${id}`,
  }),
} as const;

export const BASE_URL = `http://localhost:7070`