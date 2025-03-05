import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddTweet, Home, Login, Signup, Tweet, UserHome } from './pages/index.js'
import { AddStory, AuthLayout, Story } from './components/index.js'

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
				path: '/add-story',
				element: (
					<AuthLayout authentication>
						<AddStory />
					</AuthLayout>
				)
			},
			{
				path: '/story/:slug',
				element: (
					<AuthLayout authentication>
						<Story />
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
				path: '/user-tweets',
				element: (
					<AuthLayout authentication>
						<UserHome />
					</AuthLayout>
				)
			},
			{
				path: '/user/:slug',
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
