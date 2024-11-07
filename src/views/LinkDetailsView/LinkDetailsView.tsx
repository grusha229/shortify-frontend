import { useParams } from 'react-router-dom';
import styles from './LinkDetailsView.module.scss'
import { getShortLinkById } from '../../utils/getLinkId';
import removeProtocolFromUrl from '../../utils/removePrefix';

export default function LinkDetailsView() {
    const params = useParams();
    const fullShortLink = getShortLinkById(params?.id as string);
    const readableShortUrl = removeProtocolFromUrl(fullShortLink)

    return (
        <div className={styles['content']}>
            <h1 className={styles['title']}>Link stat</h1>
            <a href={fullShortLink}>{readableShortUrl}</a>

            <br/>

            <h2> Coming soon..</h2>
        </div>
    )
}
