import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCircleUser,
    faBitcoinSign,
    faGear,
    faArrowRightFromBracket,
    faXmark,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, NotificationIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import * as authServices from '~/services/authServices';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: 'feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const customStyles = {
        content: {
            display: 'relative',
            width: '483px',
            height: '500px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '48px 0px 0px',
        },
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const currentUser = false;
    // const [currentUser, setCurrentUser] = useState(null);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    console.log(currentUser);

    const [modalIsShow, setModalIsShow] = useState(false);

    const [registerIsShow, setRegisterIsShow] = useState(false);
    const handleShowRegister = () => {
        setRegisterIsShow((prev) => !prev);
    };

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handleChangeLanguage
                console.log(menuItem);
                break;
            default:
        }
    };

    const handleShowModal = () => {
        setModalIsShow((prev) => !prev);
    };

    // handle form login

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
        };

        authServices.loginUser(newUser, dispatch, navigate);
        handleShowModal();
    };

    //handle form register
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleRegisterEmailChange = (e) => {
        setRegisterEmail(e.target.value);
    };

    const handleRegisterPasswordChange = (e) => {
        setRegisterPassword(e.target.value);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const createUser = {
            type: 'email',
            email: registerEmail,
            password: registerPassword,
        };

        authServices.registerUser(createUser, dispatch, navigate);
        handleShowRegister();
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faCircleUser} />,
            title: 'Xem hồ sơ',
            to: '/@hoa',
        },
        {
            icon: <FontAwesomeIcon icon={faBitcoinSign} />,
            title: 'Nhận xu',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Cài đặt',
            to: 'feedback',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Logo" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Link to={config.routes.upload}>
                                <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                                    <button className={cx('actions-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                            </Link>
                            <Tippy delay={[0, 200]} content="Message" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <NotificationIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Link to={config.routes.upload}>
                                <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                    Upload
                                </Button>
                            </Link>
                            <div>
                                <Button primary onClick={handleShowModal}>
                                    Login
                                </Button>
                            </div>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src={currentUser.data.avatar}
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                fallback="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f75993e97bd5424690cb3c702fc88b0d~c5_100x100.jpeg?x-expires=1657771200&x-signature=5%2BFkP8wfpiDmJD8LRD7sJb8q2XI%3D"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>

            {/* modal */}
            <Modal
                isOpen={modalIsShow}
                onAfterOpen={() => {}}
                onRequestClose={() => {}}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Login Modal"
            >
                {registerIsShow ? (
                    <div className={cx('login')}>
                        <h1 className={cx('login-title')}>Đăng ký</h1>
                        <div className={cx('login-description')}>
                            <span>Email</span>
                            <a href="./" className={cx('login-link')}>
                                Đăng ký bằng số điện thoại
                            </a>
                        </div>
                        <form className={cx('form')} onSubmit={handleRegisterSubmit}>
                            <div className={cx('form-group')}>
                                <input
                                    className={cx('form-input')}
                                    name="RegisterEmail"
                                    placeholder="Email"
                                    type="text"
                                    value={registerEmail}
                                    onChange={handleRegisterEmailChange}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <input
                                    className={cx('form-input')}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={registerPassword}
                                    onChange={handleRegisterPasswordChange}
                                />
                                <p className={cx('form-icon')} onClick={handleShowPassword}>
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </p>
                            </div>
                            <a href="./" className={cx('login-rules')}>
                                <input className={cx('login-rules-input')} type="checkbox" />
                                <span>
                                    Nhận nội dung thịnh hành, bản tin, khuyến mại, đề xuất và thông tin cập nhật tài
                                    khoản được gửi đến email của bạn
                                </span>
                            </a>
                            <button type="submit" className={cx('form-btn')}>
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className={cx('login')}>
                        <h1 className={cx('login-title')}>Đăng Nhập</h1>
                        <div className={cx('login-description')}>
                            <span>Email</span>
                            <a href="./" className={cx('login-link')}>
                                Đăng nhập bằng số điện thoại
                            </a>
                        </div>
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <div className={cx('form-group')}>
                                <input
                                    className={cx('form-input')}
                                    name="email"
                                    placeholder="Email"
                                    type="text"
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <input
                                    className={cx('form-input')}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                                <p className={cx('form-icon')} onClick={handleShowPassword}>
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </p>
                            </div>
                            <a href="./" className={cx('login-link')}>
                                Quên mật khẩu?
                            </a>
                            <button type="submit" className={cx('form-btn')}>
                                Đăng Nhập
                            </button>
                        </form>
                    </div>
                )}

                <div className={cx('bottom')}>
                    <span className={cx('bottom-text')}>
                        {registerIsShow ? 'Bạn đã có tài khoản ?' : 'Bạn không có tài khoản?'}
                    </span>
                    <p className={cx('bottom-link')} onClick={handleShowRegister}>
                        {registerIsShow ? 'Đăng Nhập' : 'Đăng kí'}
                    </p>
                </div>
                <button className={cx('close-btn')} onClick={handleShowModal}>
                    <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
                </button>
            </Modal>
        </header>
    );
}

export default Header;
