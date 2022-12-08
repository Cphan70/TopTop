import classNames from 'classnames/bind';
import style from './videoItem.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import useElementOnScreen from '~/hooks/useElementOnScreen';
import VideoButton from './VideoButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(style);

const VideoItem = React.forwardRef(({ data }, ref) => {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };

    const isVisibile = useElementOnScreen(options, videoRef);

    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };
    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    return (
        <div className={cx('videoItem-container')} ref={ref}>
            <a href="./" className={cx('avatar')}>
                <div className={cx('avatar-container')}>
                    <Image className={cx('avatar-image')} src={data.user.avatar} />
                </div>
            </a>
            <div className={cx('content-container')}>
                <div className={cx('textInfo-container')}>
                    <Button className={cx('button')} outline={true}>
                        Follow
                    </Button>
                    <div className={cx('author-container')}>
                        <a className={cx('author-heading')} href="./">
                            <h3 className={cx('author-unique')}>{data.user.nickname}</h3>
                            <h4 className={cx('author-nickname')}>{data.user.nickname}</h4>
                        </a>

                        <div className={cx('author-description')}>{data.description}</div>
                        <h4 className={cx('music')}>
                            <FontAwesomeIcon icon={faMusic} />
                            <a className={cx('music-title')} href="./">
                                {data.music}
                            </a>
                        </h4>
                    </div>
                </div>
                <div className={cx('video-wrapper')}>
                    <div className={cx('video-card')}>
                        <video
                            className={cx('video-player')}
                            onClick={onVideoClick}
                            src={data.file_url}
                            ref={videoRef}
                            loop
                        ></video>
                        {!playing && <VideoButton onVideoClick={onVideoClick} />}
                    </div>
                    <div className={cx('action-wrapper')}>
                        <button className={cx('action-item')}>
                            <span className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            <strong className={cx('action-count')}>{data.likes_count}</strong>
                        </button>
                        <button className={cx('action-item')}>
                            <span className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faCommentDots} />
                            </span>
                            <strong className={cx('action-count')}>{data.comments_count}</strong>
                        </button>
                        <button className={cx('action-item')}>
                            <span className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faShare} />
                            </span>
                            <strong className={cx('action-count')}>{data.shares_count}</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default VideoItem;
