import * as httpRequest from '~/utils/httpRequest';

export const getVideo = async ({ type, page, signal }) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type: type,
                page: page,
            },
            signal,
        });
        return res.data;
    } catch (err) {
        console.log({ err });
    }
};
