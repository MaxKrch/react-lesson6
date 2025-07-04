import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Watches from './watches'
import type { Watch } from '../../types'

describe('Component: Watches', () => {
  const testWatch: Watch = {
    id: `1`,
    title: `Test Watch`,
    timeZone: 4,
  }

  it('should adds and removes watch correctly', async () => {
    render(<Watches />)

    await userEvent.type(screen.getByLabelText('Название'), testWatch.title)
    await userEvent.type(
      screen.getByLabelText('Временная зона'),
      `${testWatch.timeZone}`
    )

    await userEvent.click(screen.getByText('Добавить'))

    await waitFor(() => {
      expect(screen.getByText(testWatch.title)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('✗'))

    await waitFor(() => {
      expect(screen.queryByText(testWatch.title)).not.toBeInTheDocument()
    })
  })
})
