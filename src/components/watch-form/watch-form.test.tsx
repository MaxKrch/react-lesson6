import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import WatchForm from './watch-form'
import { vi } from 'vitest'

describe('Component: WatchForm', () => {
  const inputTitleLabel = /Название/i
  const inputTimeZoneLabel = /Временная зона/i
  const submitButtonTitle = /Добавить/i
  const errors = {
    emmptyTitle: /Пустое поле/i,
  }

  it('should shows inputs for title and timezone', () => {
    render(<WatchForm onAddWatch={vi.fn()} />)

    expect(screen.getByLabelText(inputTitleLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(inputTimeZoneLabel)).toBeInTheDocument()
  })

  it('should shows error when title is empty', async () => {
    render(<WatchForm onAddWatch={vi.fn()} />)

    await userEvent.clear(screen.getByLabelText(inputTitleLabel))
    await userEvent.type(screen.getByLabelText(inputTimeZoneLabel), `0`)

    await userEvent.click(screen.getByText(submitButtonTitle))

    await waitFor(() => {
      expect(screen.getByText(errors.emmptyTitle)).toBeInTheDocument()
    })
  })

  it('should calls onAddWatch and resets form after submit', async () => {
    const onAddWatch = vi.fn()
    render(<WatchForm onAddWatch={onAddWatch} />)

    await userEvent.type(screen.getByLabelText(inputTitleLabel), 'My Watch')
    await userEvent.type(screen.getByLabelText(inputTimeZoneLabel), '3')

    await userEvent.click(screen.getByText(submitButtonTitle))

    await waitFor(() => {
      expect(onAddWatch).toHaveBeenCalled()
    })

    expect(screen.getByLabelText(inputTitleLabel)).toHaveValue('')
    expect(screen.getByLabelText(inputTimeZoneLabel)).toHaveValue(0)
  })
})
