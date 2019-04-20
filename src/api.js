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
me.getMyWorks = ({ paginate }) =>
	invoke('/me/getMyWorks', { paginate })
me.getMyFavoriteWorks = ({ paginate }) =>
	invoke('/me/getMyFavoriteWorks', { paginate })
me.removeWork = ({ id }) =>
	invoke('/me/removeWork', { id })

const work = {}
work.get = ({ id }) =>
	invoke('/work/get', { id })
work.postComment = ({ id, content }) =>
	invoke('/work/postComment', { id, content })
work.favorite = ({ id, favorite }) =>
	invoke('/work/favorite', { id, favorite })

const discovery = {}
discovery.getWorks = ({ paginate }) =>
	invoke('/discovery/getWorks', { paginate })

const api = {
	auth,
	me,
	work,
	discovery
}

Vue.prototype.$api = api

export default api
