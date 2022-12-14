import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutSuccess } from '~/redux/authSlice';
function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logOutSuccess());
        navigate('/');
    });
    return <div>logout</div>;
}

export default Logout;
