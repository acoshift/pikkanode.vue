import Vue from 'vue'
import Router from 'vue-router'
import api from './api'
import Home from './views/Home'

Vue.use(Router)

const signedInGuard = (to, from, next) => {
	if (!to.meta.isAuth) {
		next({ name: 'auth.signIn' })
		return
	}
	next()
}

const anonymouseGuard = (to, from, next) => {
	if (to.meta.isAuth) {
		next({ name: 'home' })
		return
	}
	next()
}

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/auth/sign-in',
			name: 'auth.signIn',
			component: () => import('./views/auth/SignIn'),
			beforeEnter: anonymouseGuard
		},
		{
			path: '/auth/sign-up',
			name: 'auth.signUp',
			component: () => import('./views/auth/SignUp'),
			beforeEnter: anonymouseGuard
		},
		{
			path: '/auth/sign-out',
			name: 'auth.signOut',
			component: () => import('./views/auth/SignOut')
		},
		{
			path: '/me/profile',
			name: 'me.profile',
			component: () => import('./views/me/Profile'),
			beforeEnter: signedInGuard
		},
		{
			path: '/work/:id',
			name: 'work.get',
			component: () => import('./views/work/Detail')
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})

router.beforeEach((to, from, next) => {
	api.auth.check()
		.then((resp) => {
			to.meta.isAuth = resp.result.ok
			next()
		})
		.catch(() => {
			next()
		})
})

export default router
