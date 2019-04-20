<template>
	<div id="app">
		<nav v-if="isAuth" id="nav">
			<router-link :to="{ name: 'home' }">
                <img src="https://github.com/panotza/pikkanode/blob/master/pikkanode.png?raw=true" alt="pickanode">
            </router-link>
			<div>
                <router-link :to="{ name: 'me.profile' }">Profile</router-link>
                <span @click="signOut">Sign Out</span>
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

<style lang="scss">
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

    nav {
        img {
            height: calc(var(--navbar-height) - 24px);
            width: auto;
            margin-left: 0px;
        }

        div > * {
            color: white;
            text-decoration: none;
            margin-left: 1.5rem;
            font-weight: 500;
            cursor: pointer;
        }

        div > *:hover {
            color: rgb(236, 236, 236);
        }
    }

    .content-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 2rem;
        background-color: hsl(227, 62%, 52%);
        min-height: calc(100vh - var(--navbar-height));

        > * {
            width: 100%;
        }
    }

    .panel {
        background: white;
        border-radius: 3px;
        padding: 1.5rem;
        text-align: left;

        &.fluid {
            width: 100%;
        }
    }

    .card-work {
        margin-right: 1rem;
        margin-bottom: 1rem;
        max-width: 15rem;
        text-align: center;
        cursor: pointer;
        border: 1px solid transparent;

        &:hover {
            border: 1px solid #eeeeee;
        }

        > img {
            object-fit: contain;
        }
    }

    /**
    * Layout
    ***************************************/
    .form-layout {
        display: flex;
        justify-content: center;
        text-align: center;

        .panel {
            width: 100%;
            max-width: 24rem;
        }

        input,
        button {
            margin-top: 0.75rem;
        }

        button {
            margin-left: auto;
        }
    }

    /**
    * Element
    ***************************************/
    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        width: 100%;
        height: 2.5rem;
        padding-left: 12px;
        padding-right: 12px;

        background-color: white;

        font-size: 0.9375rem;
        vertical-align: top;

        border-radius: inherit;
        border-radius: 3px;
        border: 1px solid rgb(228, 230, 240);

        outline: none;

        &:hover {
            border-color: rgb(185, 186, 199);
        }

        &:focus, :active {
            border-color: hsl(227, 62%, 42%);
            box-shadow: 0 0 0 .175rem hsl(227, 62%, 89%);
        }
    }

    // button
    button {
        $height-button-small: 2.25rem;
        $font-size-button-small: 0.875rem;

        $height-button-big: 3.25rem;
        $font-size-button-big: 1.25rem;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        min-height: 2.875rem;
        padding: 0.5rem 1.5rem;

        font-weight: 600;
        font-size: 1rem;
        line-height: 100%;

        border: none;
        border-radius: 0.125rem;

        transition: all 0.16s ease-in-out;
        user-select: none;
        cursor: pointer;
        outline: none;

        color: white;
        background-color: hsl(350, 99%, 67%);

        &:focus {
            box-shadow: 0 0 0 .175rem hsl(350, 99%, 87%);
        }

        &:hover {
            background-color: hsl(350, 99%, 62%);
        }
    }

    // Link
    .link {
        text-decoration: none;

        color: hsl(216, 15%, 26%);

        cursor: pointer;
        outline: none;
        transition: all 160ms ease-in-out;

        svg, path {
            transition: fill 160ms ease-in-out;
            fill: hsl(216, 15%, 26%);
        }

        &:before, &:after {
            pointer-events: none;
            backface-visibility: hidden;
        }

        &:hover, &:focus, &.-active {
            color: hsl(227, 70%, 49%);

            svg, path {
                fill: hsl(227, 70%, 49%);
            }
        }

        &.active {
            color: hsl(227, 70%, 49%);
        }
    }

    hr {
        opacity: .3;
        margin: 1rem 0;
    }
</style>
