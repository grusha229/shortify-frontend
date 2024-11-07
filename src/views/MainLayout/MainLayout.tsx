import { Outlet } from "react-router-dom";
import style from './MainLayout.module.scss'
import robotImg from '../../assets/robot.png'

export default function Layout() {
    return (
      <div>
        <div className={style['header']}>
            <div className={style['image']}>
                <img src={robotImg} className={style['image--content']} alt="React logo" />
            </div>
            <div className={style['title']}>Shortify</div>
        </div>
  
        <Outlet />
      </div>
    );
  }