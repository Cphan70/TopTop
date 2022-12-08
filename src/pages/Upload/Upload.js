import className from 'classnames/bind';
import { useState, useRef } from 'react';

import styles from './Upload.module.scss';
import Footer from '~/components/Footer';

const cx = className.bind(styles);

function Upload() {
    const [fileUpload, setFileUpload] = useState(null);

    console.log({ fileUpload });
    const hiddenInputFile = useRef(null);

    const handleClickUpload = (e) => {
        hiddenInputFile.current.click();
    };

    const handleChangeFile = (e) => {
        const fileUpload = e.target.files[0];
        setFileUpload(fileUpload.value);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <h2 className={cx('title-heading')}>Upload video</h2>
                <span className={cx('title-sub')}>Post a video to your account</span>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-uploader')}>
                    <input
                        className={cx('content-input')}
                        type="file"
                        ref={hiddenInputFile}
                        onClick={handleChangeFile}
                    />
                    <div className={cx('card')} onClick={handleClickUpload}>
                        <img
                            className={cx('card-image')}
                            src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                            alt=""
                        />
                        <div className={cx('card-text-main')}>
                            <span>Select video to upload</span>
                        </div>
                        <div className={cx('card-text-sub')}>
                            <span>or drag and drop a file</span>
                        </div>
                        <div className={cx('card-text-video-info')}>
                            <span>MP4 or WebM</span>
                            <span>720x1080 resolution or higher</span>
                            <span>Up to 30 minutes</span>
                            <span>Less than 2 GB</span>
                        </div>
                        <div className={cx('card-file-select')}>
                            <button className={cx('card-file-select-button')}>Select file</button>
                        </div>
                    </div>
                </div>
                <div className={cx('content-form')}>
                    <div className={cx('editor-entrance')}>
                        <div className={cx('editor-introduction-wrap')}>
                            <div className={cx('editor-introduction-icon')}>
                                <img
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('editor-introduction')}>
                                <span className={cx('editor-introduction-title')}>Divide videos and edit</span>
                                <span className={cx('editor-introduction-subTitle')}>
                                    You can quickly divide videos into multiple parts , remove redundant parts and turn
                                    landscape videos into portrait videos
                                </span>
                            </div>
                        </div>
                        <div className={cx('editor-button')}>
                            <button>Edit</button>
                        </div>
                    </div>
                    <div className={cx('caption-wrap')}>
                        <div className={cx('caption-text-container')}>
                            <span className={cx('caption-text')}>Caption</span>
                            <span className={cx('caption-require-font')}>
                                <span>0 </span>/ 150
                            </span>
                        </div>
                        <div className={cx('caption-input')}>
                            <input type="text" />
                            <div className={cx('caption-input-icon')}>
                                <img
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/at.062a03e9.svg"
                                    alt=""
                                />
                                <img
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/hashtag.234f1b9c.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('cover-wrap')}>
                        <span className={cx('cover-text')}>Cover</span>
                        <div className={cx('cover-container')}>
                            <div className={cx('cover-candidate')}></div>
                        </div>
                    </div>
                    <div className={cx('selector-wrap')}>
                        <span className={cx('selector-title')}>Who can watch this video</span>
                        <select name="watch" className={cx('selector-watch')}>
                            <option value="Pu">Public</option>
                            <option value="">Friends</option>
                            <option value="">Private</option>
                        </select>

                        <div className={cx('checkbox-wrap')}>
                            <div className={cx('checkbox-title')}>Allow users to :</div>
                            <div className={cx('checkbox-container')}>
                                <div className={cx('checkbox-item')}>
                                    <input type="checkbox" value="comment" />
                                    <label className={cx('checkbox-label')}>Comment</label>
                                </div>
                                <div className={cx('checkbox-item')}>
                                    <input type="checkbox" value="duet" />
                                    <label className={cx('checkbox-label')}>Duet</label>
                                </div>
                                <div className={cx('checkbox-item')}>
                                    <input type="checkbox" value="stitch" />
                                    <label className={cx('checkbox-label')}>Stitch</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('switch-wrap')}>
                        <span className={cx('switch-title')}>Run a copyright check</span>
                        <input type="checkbox" id="switch" />
                        <label htmlFor="switch">Toggle</label>
                    </div>
                    <div className={cx('button-row')}>
                        <div className={cx('button-cancel')}>
                            <button>Discard</button>
                        </div>
                        <div className={cx('button-post')}>
                            <button>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
