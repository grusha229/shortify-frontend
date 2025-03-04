import { IDetailsResponse } from '../../models/links';
import { useGetLinkDetailsQuery } from '../../services/links';

export interface IProps {
    /** id ссылки для получения информации */
    link_id: string
}

export default function LinkDetails({ link_id }: IProps) {

  const { data: details, isLoading, isError, error } = useGetLinkDetailsQuery({ link_id: link_id });
  console.log(details, isLoading, isError, error)
  const linkVisitsCount = details?.length || 0;
  const qrCodeLinksVisitsCount = details?.filter((link) => link?.utm_source === 'qr')?.length || 0
  const isQrCode = (link: IDetailsResponse) => {
    return link?.utm_source === 'qr'
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {JSON.stringify(error)}</p>}
      {details && (
        <div>
          <p>Visits count: {linkVisitsCount}</p>
          <p>QR code visits count: {qrCodeLinksVisitsCount}</p>
          <div>
            Locations:
            <ul>
            {details.map((link) => (
              <li key={link.id} >{link.location} {isQrCode(link) ? "[QR]" : ""}</li>
            ))}
            </ul>
          </div>
        </div>
      )}
      </div>
  )}
