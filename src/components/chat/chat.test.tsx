import { screen, render } from '@testing-library/react'
import Chat from './chat'

describe('Component: Chat', () => {
  it('should render correctly', () => {
    const expectedText = /Anonymus Chat/i

    render(<Chat />)

    expect(screen.getByText(expectedText)).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
