import VideoItem from '~/components/VideoItem';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import usePostsForYou from '~/hooks/usePost';

import { useState, useRef, useCallback } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [pageNum, setPageNum] = useState(1);
    const { isLoading, isError, error, results, hasNextPage } = usePostsForYou(pageNum);

    const intObserver = useRef();
    const lastPostRef = useCallback(
        (post) => {
            if (isLoading) return;

            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    console.log('We are near the last post!');
                    setPageNum((prev) => prev + 1);
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [isLoading, hasNextPage],
    );

    if (isError) return <p className="center">Error: {error.message}</p>;

    const content = results.map((post, i) => {
        if (results.length === i + 1) {
            return <VideoItem ref={lastPostRef} key={post.id} data={post} />;
        }
        return <VideoItem key={post.id} data={post} />;
    });

    return (
        <div className={cx('main')}>
            {content}
            {isLoading && <p className="center">Loading More Posts...</p>}
        </div>
    );
}

export default Home;
