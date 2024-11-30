import { useParams } from 'react-router-dom';
import styles from './LinkDetailsView.module.scss'
import LinkDetails from '../../components/LinkDetails/LinkDetails';

export default function LinkDetailsView() {
    const params = useParams();
    const linkId = params?.id || '';
    // const fullShortLink = getShortLinkById(params?.id as string);
    // const readableShortUrl = removeProtocolFromUrl(fullShortLink)

    return (
        <div className={styles['content']}>
            <h1 className={styles['title']}>Link stat</h1>
            <LinkDetails link_id={linkId} />
            {/* <a href={fullShortLink}>{readableShortUrl}</a> */}

            <br/>

            <h2> Coming soon..</h2>
        </div>
    )
}
