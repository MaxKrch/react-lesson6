import z from 'zod'
import type { MessageFormProps } from './message-form.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const MessageForm = ({ onSendMessage, isActiveForm }: MessageFormProps) => {
  const schema = z.object({
    content: z
      .string()
      .min(3, `Слишком короткое сообщение`)
      .max(250, `Слишком длиное сообщение`),
  })

  type Schema = z.infer<typeof schema>

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    register,
  } = useForm<Schema>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const handleSendMessage = () => {
    onSendMessage(getValues(`content`))
    reset({
      content: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendMessage)}
      className="h-[200px] shrink-0 flex flex-col"
      role="form"
    >
      <div className="relative grow">
        <label htmlFor="message-content" aria-label="message content" />

        <textarea
          {...register('content')}
          id="message-content"
          placeholder="Type your text..."
          className="bg-white h-full w-full px-3 py-2 outline-none border rounded resize-none"
        />

        <button
          type="submit"
          className="absolute right-3 bottom-3 h-8 w-8 cursor-pointer border border-green-500 text-green-500 rounded-full"
          aria-label="Send Message"
          disabled={!isActiveForm}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 6,l14 6,-14 6,4 -6z"></path>
          </svg>
        </button>
      </div>

      <div className="h-[15px] text-xs text-red-500 font-medium mt-1">
        {errors.content && errors.content.message}
      </div>
    </form>
  )
}

export default MessageForm
