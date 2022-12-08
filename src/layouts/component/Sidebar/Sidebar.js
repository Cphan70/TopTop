import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    HomeActivateIcon,
    UserGroupIcon,
    UserGroupActivateIcon,
    LiveIcon,
    LiveActivateIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);
function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    // const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        userServices
            .getSuggested({ page: 1, perPage: 5 })
            .then((data) => {
                setSuggestedUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For You"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActivateIcon />}
                />
                <MenuItem
                    title="Flowing"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActivateIcon />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActivateIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested Accounts" titleButton="See all" data={suggestedUsers} />
            <SuggestedAccounts label="Following Accounts" titleButton="See more" />
        </aside>
    );
}

export default Sidebar;
