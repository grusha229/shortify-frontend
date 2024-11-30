import { useGetLinkDetailsQuery } from '../../services/links';

export interface IProps {
    /** id ссылки для получения информации */
    link_id: string
}

export default function LinkDetails({ link_id }: IProps) {

    const { data: details, isLoading } = useGetLinkDetailsQuery({ link_id: link_id });


    console.log(details, isLoading)

  return (
    <div>
      {link_id}
    </div>
  )
}
