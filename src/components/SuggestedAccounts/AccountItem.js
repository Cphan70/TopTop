import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview primary data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <HeadlessTippy interactive="true" offset={[-20, 10]} delay={[500, 200]} render={renderPreview}>
                <div className={cx('account-item')}>
                    <img className={cx('avatar')} src={data.avatar} alt={data.first_name} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />}
                        </p>

                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object,
};

export default AccountItem;
