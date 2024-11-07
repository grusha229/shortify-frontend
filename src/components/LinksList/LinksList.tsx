import LinksListItem from '../LinksListItem/LinksListItem';
import styles from './LinksList.module.scss'
import { ILinksApiModel } from '../../models/links';

export interface IProps {
    links: ILinksApiModel[]
}
export default function LinksList({ links } : IProps) {

    return (
        <div className={styles['block']}>
            <div  className={styles['block--container']}>
                {links.map((link) => (
                    <LinksListItem
                        short_url={link.short_url}
                        original_url={link.original_url}
                        key={link.short_url}
                    />
                ))}
            </div>
        </div>
    )
}
