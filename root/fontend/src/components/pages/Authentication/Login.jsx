import React, { useState, useCallback, useContext } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthContext';
import { authService } from '../../../services/auth.service';
import Loader from '../../Loader/Loader';

const Login = () => {
	let history = useHistory();
	const { setIsAuth } = useContext(AuthContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [successful, setSuccessful] = useState(false);

	const onChangeUsername = useCallback((e) => {
		setUsername(e.target.value);
	}, []);

	const onChangePassword = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	const onInputFocus = (filterKey) => {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.add('focus-active');
	};

	const onFocusOut = (filterKey) => {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.remove('focus-active');
	};

	const handleLogin = useCallback(
		(e) => {
			setLoading(true);
			e.preventDefault();
			authService
				.login(username, password)
				.then((res) => {
					if (res) {
						setIsAuth(true);
						setSuccessful(true);
						setMessage('');
						history.push('/');
					}
				})
				.catch((err) => {
					setLoading(false);
					if (err) {
						setMessage(
							(err.error && err.error['message']) ||
								'Có lỗi đã xảy ra'
						);
					}
				});
		},
		[username, password, history, setIsAuth]
	);

	return successful ? (
		<Loader loading={true} />
	) : (
		<>
			{loading ? <Loader loading={true} /> : ''}

			<div className='auth d-flex align-items-center justify-content-center'>
				<div className='bg'></div>
				<div className='wrapper'>
					<h2 className='auth-title text-center'>Đăng nhập</h2>
					<Form
						onSubmit={handleLogin}
						id='form-login'
						className='auth-form d-flex align-items-center justify-content-center flex-column'
					>
						{message ? <Alert variant='dark'>{message}</Alert> : ''}
						<Form.Group
							as={Row}
							noGutters={true}
							controlId='formUsername'
							className='form-group-cs'
							form-filter='username'
						>
							<span className='line' />
							<Form.Label className='text-right form-label form-label__auth'>
								<UserOutlined className='auth-icon' />
							</Form.Label>
							<Col xs='10'>
								<Form.Control
									type='text'
									placeholder='Tài khoản'
									autoComplete='username'
									required
									value={username}
									onChange={onChangeUsername}
									className='auth-input no-outline px-3'
									onFocus={() => onInputFocus('username')}
									onBlur={() => onFocusOut('username')}
								/>
							</Col>
						</Form.Group>

						<Form.Group
							as={Row}
							noGutters={true}
							controlId='formPassword'
							className='form-group-cs'
							form-filter='password'
						>
							<span className='line' />
							<Form.Label className='text-right form-label form-label__auth'>
								<LockOutlined className='auth-icon' />
							</Form.Label>
							<Col xs='10'>
								<Form.Control
									type='password'
									value={password}
									required
									autoComplete='current-password'
									onChange={onChangePassword}
									placeholder='Mật khẩu'
									className='auth-input no-outline px-3'
									onFocus={() => onInputFocus('password')}
									onBlur={() => onFocusOut('password')}
								/>
							</Col>
						</Form.Group>
						<div className='d-flex align-items-center justify-content-around mt-4 full-width row no-gutters'>
							<Col md={6} xs={12} className='text-center'>
								<a
									href='/register'
									className='text text-decoration-none my-3'
								>
									Đăng ký
								</a>
							</Col>

							<Col md={6} xs={12} className='text-center'>
								<Button
									type='submit'
									form='form-login'
									className='text-center btn btn-auth my-3'
								>
									Đăng nhập
								</Button>
							</Col>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};
export default Login;
