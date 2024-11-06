import { useForm } from 'react-hook-form';
import { useGetShortLinkMutation } from '../../services/links';
import { ILinksApiModel, ILinksPayload } from '../../models/links';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function LinkForm() {
    // Инициализация useForm
    const { register, handleSubmit } = useForm<ILinksPayload>();
    const links = useSelector((state: RootState) => state.links);

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

    return (
      <form onSubmit={handleSubmit(handleSubmitLinkForm)}>
        <div>
          <label>Link</label>
          <input {...register('url')} />
        </div>
        <button type="submit">Update</button>
        {
          links && links.links.map((link: ILinksApiModel) => (
            <a href={link.short_url}>{link.short_url}</a>
          ))
        }
      </form>
    )
}
