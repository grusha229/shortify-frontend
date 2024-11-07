import { useSelector } from 'react-redux';
import LinkForm from '../../components/LinkForm/LinkForm'
import LinksList from '../../components/LinksList/LinksList'
import styles from './LinkBuilderView.module.scss'
import { RootState } from '../../store/store';

export default function LinkBuilderView() {
    const links = useSelector((state: RootState) => state.links.links);
  return (
    <div className={styles['content']}>
        <h1 className={styles['title']}>Shortify your unreadable links</h1>
        <LinkForm />
        {links && links.length > 0 && (
            <div className={styles['recent-links']}>
                <h2>Your recently shortified links</h2>
                <LinksList links={links}/>
            </div>
        )}
    </div>
  )
}
