import { useForm } from 'react-hook-form';
import { useGetShortLinkMutation } from '../../services/links';
import { ILinksPayload } from '../../models/links';
import style from './LinkForm.module.scss'

export interface IProps {
  /** Additional classes */
  className?: string
}

export default function LinkForm({
  className
}: IProps) {
    // Инициализация useForm
    const { register, handleSubmit } = useForm<ILinksPayload>();

      // Мутация для обновления пользователя
    const [ getShortLink ] = useGetShortLinkMutation();

    const handleSubmitLinkForm = async (formData: ILinksPayload) => {
      console.log(formData);
      try {
        const response = await getShortLink(formData).unwrap();
        console.log("Ответ от сервера:", response);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };

    const blockClassName = [style['block'], className].join(' ');

    return (
      <div className={blockClassName}>
        <form 
           onSubmit={handleSubmit(handleSubmitLinkForm)}
           className={style['form']}
        >
            <input
                className={style['form--input']}
                placeholder='Insert your link here'
                {...register('url')}
            />
            <button 
              className={style['form--button']} 
              type="submit"
            >
              Shortify!
            </button>
        </form>
      </div>
    )
}
