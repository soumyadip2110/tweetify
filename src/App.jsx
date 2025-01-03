import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header } from './components/index'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login)
				} else {
					dispatch(logout)
				}
			})
			.catch((e) => { dispatch(logout) })
			.finally(() => { setLoading(false) });
	}, []);

	return !loading ? (
		<div className='text-white'>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
	: (
		<div>
			Loading...
		</div>
	)
}

export default App
