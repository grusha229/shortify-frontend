import { ILinksApiModel } from '../../models/links'
import styles from './LinksListItem.module.scss'
import copyIcon from '../../assets/icon--copy.svg'
import { useCallback } from 'react'
import { message, QRCode } from 'antd'
import { Link } from 'react-router-dom'
import removeProtocolFromUrl from '../../utils/removePrefix'

export interface IProps extends ILinksApiModel {
  className?: string
}

export default function LinksListItem({
    id,
    short_url,
    original_url,
    className,
}: IProps) {

  const onCopyLink = useCallback(() => {
    navigator.clipboard.writeText(short_url)
    message.success('Link copied to clipboard')
  }, [short_url])

  function doDownload(url: string, fileName: string) {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const downloadCanvasQRCode = () => {
    const canvas = document
      .getElementById("qrcode-block")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      doDownload(url, `shortify-${original_url}.png`);
    }
  };
  
  const downloadSvgQRCode = () => {
    const svg = document
      .getElementById("qrcode-block")
      ?.querySelector<SVGElement>("svg");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    doDownload(url, `shortify-${original_url}.svg`);
  };

  const QrShortLink = short_url + "?utm_source=qr"
  const detailedInfoLink = '/details/' + id

  const readableShortUrl = removeProtocolFromUrl(short_url)
  const readableOriginalUrl = removeProtocolFromUrl(original_url)

  const blockClassName = [styles['block'], className].filter(Boolean).join(' ');

  return (
    <div className={blockClassName}>
      <div id="qrcode-block" className={styles['qrCode']}>
        <QRCode
          size={150}
          value={QrShortLink}
          bgColor="#fff"
          type="svg"
          icon=''
        />
        <QRCode
          value={QrShortLink}
          bgColor="#fff"
          type="canvas"
          className={styles['qrCode--hidden']}
        />
        <div className={styles['qrCode--download']}>
          <div className={styles['qrCode--download-link']} onClick={downloadSvgQRCode}>SVG</div>
          <div className={styles['qrCode--download-link']} onClick={downloadCanvasQRCode}>PNG</div>
        </div>
      </div>
      <div className={styles['link']}>
        <div className={styles['link--short']}>
            <a href={short_url}>{readableShortUrl}</a>
        </div>
        <div className={styles['link--original']}>
            <a href={original_url}>{readableOriginalUrl}</a>
        </div>
        <div className={styles['link--details']}>
          <Link to={detailedInfoLink}>Details</Link>
        </div>
      </div>
      <div className={styles['link--icon']} onClick={onCopyLink} >
        <img src={copyIcon} alt='' />
      </div>
    </div>
  )
}
