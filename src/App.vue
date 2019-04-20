<template>
	<div id="app">
		<nav v-if="isAuth" id="nav">
			<router-link :to="{ name: 'home' }">
                <img src="https://github.com/panotza/pikkanode/blob/master/pikkanode.png?raw=true" alt="pickanode">
            </router-link>
			<div>
                <router-link :to="{ name: 'me.profile' }">Profile</router-link>
                <button @click="signOut">Sign Out</button>
            </div>
		</nav>
		<nav v-else>
			<router-link :to="{ name: 'home' }">
                <img src="https://github.com/panotza/pikkanode/blob/master/pikkanode.png?raw=true" alt="pickanode">
            </router-link>
            <div>
                <router-link :to="{ name: 'auth.signIn' }">Sign In</router-link>
                <router-link :to="{ name: 'auth.signUp' }">Sign Up</router-link>
            </div>
		</nav>

        <div class="content-container">
		    <router-view />
        </div>
	</div>
</template>

<script>
export default {
	name: 'App',
	computed: {
		isAuth () {
			return !!this.$route.meta.isAuth
		}
	},
	methods: {
		signOut () {
			this.$router.push({ name: 'auth.signOut' })
		}
	}
}
</script>

<style>
    :root {
        --navbar-height: 60px;
    }

    html {
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--navbar-height);
        padding: 0 1.5rem;
        background: hsl(227, 62%, 42%);
        color: white;
    }

    nav img {
        height: calc(var(--navbar-height) - 24px);
        width: auto;
        margin-left: 0px;
    }

    nav div a {
        color: white;
        text-decoration: none;
        margin-left: 1.5rem;
        font-weight: 500;
    }

    nav div a:hover {
        color: rgb(236, 236, 236);
    }

    .content-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 2rem;
        background-color: hsl(227, 62%, 52%);
        min-height: calc(100vh - var(--navbar-height));
    }

    .content-container > * {
        width: 100%;
    }

    .panel {
        background: white;
        border-radius: 3px;
        padding: 1.5rem;
    }

    .panel.fluid {
        width: 100%;
    }

    .card-work {
        margin-right: 1rem;
        margin-bottom: 1rem;
        max-width: 15rem;
        text-align: center;
    }

    .card-work > img {
        object-fit: contain;
    }
</style>

