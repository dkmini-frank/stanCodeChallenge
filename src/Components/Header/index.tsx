/**
 * @file Commone use of header component
 * @date 2023-11-08
 * @author  Frank su
 * @lastModify Frank su 2023-11-08
 */

import { FC } from 'react';
import style from './style.scss';
import { Link } from 'react-router-dom';
import { headerData } from '../../DefaultData/HeaderData/headerData';

// the props data type
interface HeaderProps {
    // each menu item as a string to pass in
    // each menu item link as a string to pass in
    menuList?: { name: string; id: number; link: string }[];
}

const Header: FC<HeaderProps> = ({ menuList = headerData }): JSX.Element => {
    /**
     * when user click the logo it will jump to the home page
     */
    const handleLogoclick = () => {
        window.location.href = '/';
    };

    return (
        <div className={style.header_wrapper}>
            <div className={style.header_logo} onClick={handleLogoclick} />
            <div className={style.header_menuList_wrapper}>
                {menuList.map((item) => {
                    return (
                        <Link key={item.id} to={item.link} className={style.header_menuItem}>
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
export default Header;
