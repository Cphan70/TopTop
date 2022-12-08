import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(style);

function SuggestedAccounts({ label, titleButton, data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label} </p>

            {data.map((user) => (
                <AccountItem key={user.id} data={user} />
            ))}
            <div className={cx('more-btn')}>
                <p>{titleButton}</p>
            </div>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    titleButton: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
