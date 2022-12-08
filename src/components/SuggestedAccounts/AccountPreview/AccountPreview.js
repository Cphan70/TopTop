import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt="data.first_name" />
                <div>
                    <Button primary>Follow</Button>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${data.last_name} ${data.last_name}`}</p>
            </div>
            <div className={cx('analytics')}>
                <p className={cx('follower')}>
                    <strong>{data.followers_count}</strong>
                    <span className={cx('title')}>Follower</span>
                </p>
                <p className={cx('likes')}>
                    <strong>{data.likes_count}</strong>
                    <span className={cx('title')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object,
};

export default AccountPreview;
