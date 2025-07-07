import z from 'zod'
import type { NoteFormProps } from './note-form.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const NoteForm = ({ onAddNote }: NoteFormProps) => {
  const schema = z.object({
    text: z
      .string()
      .min(3, `Слишком короткий текст`)
      .max(250, `Слишком длиный текст`),
  })
  type Schema = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const handleCreateNote = () => {
    onAddNote(getValues('text'))
    reset({
      text: '',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateNote)}>
      <h3 className="font-bold font-lg my-2">{`New Note`}</h3>
      <div className="relative max-w-[900px]">
        <label htmlFor="note-content" hidden>
          {`Your Note Text`}
        </label>
        <textarea
          {...register(`text`)}
          id="note-content"
          className="bg-[#FFFFFF] w-[100%] min-h-[150px] py-1 px-3 outline-none inset-shadow"
          placeholder="Type your text..."
        ></textarea>
        <button
          className="w-8 h-8 rounded-full border border-[#5D5D5D] absolute right-3 bottom-3 shadow cursor-pointer hover:bg-[#FDFDFD]"
          aria-label="Create Note"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full"
            fill="#5D5D5D"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6 6,l14 6,-14 6,2 -6z" />
          </svg>
        </button>
      </div>
      {errors.text && (
        <div className="text-red-500 font-semibold text-sm">
          {errors.text.message}
        </div>
      )}
    </form>
  )
}

export default NoteForm
