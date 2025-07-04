import { useForm } from 'react-hook-form'
import type { WatchFormProps } from './watch-form.type'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Watch } from '../../types'

const WatchForm = ({ onAddWatch }: WatchFormProps) => {
  const schema = z.object({
    title: z.string().min(1, `Пустое поле`),
    timeZone: z
      .number({ invalid_type_error: `Пустое поле` })
      .min(-12, `Некорректная зона`)
      .max(14, `Некорректная зона`),
  })

  type Schema = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const handleSubmitForm = () => {
    const newWatch: Watch = {
      id: crypto.randomUUID(),
      title: getValues(`title`),
      timeZone: getValues(`timeZone`),
    }
    onAddWatch(newWatch)
    reset({
      title: ``,
      timeZone: 0,
    })
  }

  return (
    <form
      className="bg-[#FEFEFE] flex gap-4 p-3 flex-wrap"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <label htmlFor="title" className="flex flex-col gap-3">
        <p className="h-[25px] font-semibold">{`Название`}</p>
        <input
          className="border h-[35px] outline-none bg-[#FEFEFE] p-3 flex justify-center items-center w-[250px]"
          id="title"
          {...register(`title`)}
        />
        <p className="h-[25px] font-semibold text-red-500 text-sm">
          {errors.title && errors.title.message}
        </p>
      </label>
      <label htmlFor="timeZone" className="flex flex-col gap-3">
        <p className="h-[25px] font-semibold">{`Временная зона`}</p>
        <input
          className="border h-[35px] outline-none bg-[#FEFEFE] p-3 flex justify-center items-center w-[250px]"
          id="timeZone"
          {...register(`timeZone`, { valueAsNumber: true })}
          type="number"
          defaultValue={0}
        />
        <p className="h-[25px] font-semibold text-red-500 text-sm">
          {errors.timeZone && errors.timeZone.message}
        </p>
      </label>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="border h-[35px] outline-none bg-[#FEFEFE] p-3 flex justify-center items-center w-[250px] cursor-pointer hover:bg-[#EAEAEA] font-semibold"
        >
          {`Добавить`}
        </button>
      </div>
    </form>
  )
}

export default WatchForm
