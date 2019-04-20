import Vue from 'vue'
import axios from 'axios'

const http = axios.create({
	baseURL: 'https://pikkanode.acoshift.com',
	withCredentials: true
})

const invoke = (path, req = {}) =>
	http.post(path, req)
		.then((resp) => resp.data)

const auth = {}
auth.signIn = ({ username, password }) =>
	invoke('/auth/signIn', { username, password })
auth.signUp = ({ username, password }) =>
	invoke('/auth/signUp', { username, password })
auth.signOut = () =>
	invoke('/auth/signOut')
auth.check = () =>
	invoke('/auth/check')

const me = {}
me.profile = () =>
	invoke('/me/profile')
me.uploadProfilePhoto = (photo) => {
	const form = new FormData()
	form.append('photo', photo)
	return invoke('/me/uploadProfilePhoto', form)
}

const api = {
	auth,
	me
}

Vue.prototype.$api = api

export default api
