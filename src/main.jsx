import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddTweet, Home, Login, Signup, Tweet, UserHome } from './pages/index.js'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/login',
				element: (
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				) 
			},
			{
				path: '/signup',
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				)
			},
			{
				path: '/add-tweet',
				element: (
					<AuthLayout authentication>
						<AddTweet />
					</AuthLayout>
				)
			},
			{
				path: '/tweet/:slug',
				element: (
					<AuthLayout authentication>
						<Tweet />
					</AuthLayout>
				)
			},
			{
				path: '/user-posts',
				element: (
					<AuthLayout authentication>
						<UserHome />
					</AuthLayout>
				)
			},
		]
	}
])

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
