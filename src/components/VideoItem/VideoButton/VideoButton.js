import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import classNames from 'classnames/bind';
import styles from './videoButton.module.scss';

const cx = classNames.bind(styles);

function VideoButton({ onVideoClick }) {
    return (
        <div className={cx('video_play_button')}>
            <PlayArrowIcon onClick={onVideoClick} className={cx('video_play_icon')} />
        </div>
    );
}

export default VideoButton;
