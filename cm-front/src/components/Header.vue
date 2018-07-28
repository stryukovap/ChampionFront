<template>
	<nav class="main-nav">
		<ul class="nav-list">
			<li class="nav-item nav-item--logo">
				<router-link class="nav-link" to="/">
					<img v-if="checkLogin"
					     :src="getImage(headerLogo.logoFederation)"
					     alt="logo" class="nav-logo-img">
					<img v-else
					     :src="getImage(headerLogo.logoChampion)"
					     alt="logo"
					     class="nav-logo-img">
				</router-link>
			</li>
			<!-- show boolean variables -->
			<!--<li class="nav-item">-->
				<!--<ul>-->
					<!--<li class="text-white">{{ 'sportsman - ' + this.$store.state.roles.userIsSportsman }}</li>-->
					<!--<li class="text-white">{{ 'coach - ' + this.$store.state.roles.userIsCoach }}</li>-->
					<!--<li class="text-white">{{ 'federation - ' + this.$store.state.roles.userIsFederation }}</li>-->
				<!--</ul>-->
			<!--</li>-->
			<!-- show boolean variables END -->
			<!-- Checkboxes with roles -->
			<li class="nav-item">
				<div class="form-check form-check-inline">
					<label class="form-check-label text-white">
						<input class="form-check-input"
						       type="radio" name="role"
						       @input="setRole($event)"
						       value="userIsSportsman"
						       :checked="this.$store.state.roles.userIsSportsman"> Sportsman
					</label>
				</div>
				<div class="form-check form-check-inline">
					<label class="form-check-label text-white">
						<input class="form-check-input"
						       type="radio" name="role"
						       @input="setRole($event)"
						       value="userIsCoach"
						       :checked="this.$store.state.roles.userIsCoach"> Coach
					</label>
				</div>
				<div class="form-check form-check-inline">
					<label class="form-check-label text-white">
						<input class="form-check-input"
						       type="radio" name="role"
						       @input="setRole($event)"
						       value="userIsFederation"
						       :checked="this.$store.state.roles.userIsFederation"> Federation
					</label>
				</div>
			</li>
			<!-- Checkboxes with roles END -->
			<li class="nav-item">
				<ul class="nav-list nav-list--sub">
					<li class="nav-item">
						<a :href="'tel:' + contacts.phone">Phone: {{ contacts.phone }}</a>
					</li>
					<li class="nav-item">
						<a :href="'mailto:' + contacts.email">E-mail: {{ contacts.email }}</a>
					</li>
				</ul>
			</li>
			<li class="nav-item d-flex align-items-center" v-if="checkLogin">
				<div class="user">
					<div class="user__date">Valid until
						<time class="user__time">{{ userData.validUntil }}</time>
					</div>
					<div class="user__wrap">
						<div class="user__wrap-inner">
							<img :src="getImage(userData.userLogo)" alt="User" class="user__photo">
							<div class="user__menu">
								<div class="user__name">{{ userData.userName }}</div>
								<ul class="user__menu-items">
									<router-link tag="li" :to="'/federation'" class="user__item"
									             v-if="this.$store.state.roles.userIsFederation === true"><a
												 class="user__link">{{ menu[0].titleFederation }}</a>
									</router-link>
									<router-link tag="li" :to="'/userprofile/' + userData.id" class="user__item"
									             v-if="this.$store.state.roles.userIsFederation === false"><a
												 class="user__link">{{ menu[0].title }}</a>
									</router-link>
									<router-link tag="li" :to="'/coachcabinet/' + userData.id" class="user__item"
									             v-if="this.$store.state.roles.userIsCoach"><a
												 class="user__link">{{ menu[1].titleCoach }}</a>
									</router-link>
									<router-link tag="li" :to="'/settingscabinet'" class="user__item"
									             v-else-if="this.$store.state.roles.userIsSportsman"><a
												 class="user__link">{{ menu[1].titleSportsman }}</a>
									</router-link>
									<li @click="logout()" class="user__item user__link c-pointer">{{ menu[2].title }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class="nav-item" v-if="checkLogin">
				<button class="btn btn-primary btn-user" v-on:click="logout">Logout</button>
			</li>
			<li class="nav-item" v-else>
				<router-link tag="button" class="btn btn-primary btn-user" to="/auth">Log in</router-link>
				<router-link tag="button" class="btn btn-primary btn-user" to="/registration">Registration</router-link>
			</li>
			<li class="nav-item">
				<ul class="list-group list-group-show">
					<li :class="{'list-group-border-bottom': languages.selectedLang, 'list-group-item': true}"
						@click="languages.activeClass = !languages.activeClass">{{ languages.selectedLang }}</li>
					<li :class="{'list-group-item-display-show': languages.activeClass, 'list-group-item-display': true}">
						<ul class="list-group list-group-border-none">
							<li class="list-group-item"
							    v-for="lang in languages.langList"
							    :key="lang"
							    v-if="lang !== languages.selectedLang"
								@click="[setActiveLang($event), languages.activeClass = !languages.activeClass]">{{ lang }}</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
            languages: {
                selectedLang: 'en',
                langList: ['en', 'ru', 'ua'],
	            activeClass: false
            },
			contacts: {
				phone: '+38067000001',
				email: 'example@example.com'
			},
			userData: {
				id: '',
				validUntil: '10.10.2020',
				userName: 'Denis Yermolin',
				userLogo: 'user.png'
			},
			menu: [
				{
					title: "My Profile",
					titleFederation: "Federation"
				},
				{
					titleCoach: "My Cabinet",
					titleSportsman: "Settings"
				},
				{
					title: "Exit"
				}
			],
			headerLogo: {
				logoChampion: 'logo_champion.png',
				logoFederation: 'logo_federation.png'
			}
		}
	},
	methods: {
		logout: function () {
			localStorage.removeItem("lbUser");
			this.$store.state.isLoggedIn = false;
			this.$router.push('/');
			window.console.log(
				"store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
			);
		},
		getImage: function (image) {
			const images = require.context('../assets/', false, /\.png$/);
			return images('./' + image);
		},
		getUserId() {
			if (localStorage.getItem("lbUser")) {
				const userObj = this.$store.state.authUser;
				this.userData.id = userObj.id;
			}
		},
		setActiveLang(e) {
			this.languages.selectedLang = e.target.textContent;
		},
		// set user's role with radio button
		setRole(e) {
		    let role = e.target.value;
			let roles = this.$store.state.roles;
		    for (let key in roles) {
                roles[key] = false;
            }
            roles[role] = true;
        }
	},
	computed: {
		checkLogin() {
			if (this.$store.state.isLoggedIn) {
				this.getUserId();
			}
			return this.$store.state.isLoggedIn;
		}
	}
}
</script>

<style lang="scss" scoped>
	$bg-color: #343a40;

	.main-nav {
		background-color: $bg-color;
	}

	.c-pointer {
		cursor: pointer;
	}

	.nav {
		&-list {
			display: flex;
			list-style-type: none;
			padding: 0;
			margin: 0;
			justify-content: center;
			align-items: center;
			&--sub {
				flex-direction: column;
				align-items: flex-start;
			}
		}

		&-item {
			margin-right: 10px;
			margin-left: 10px;
			position: relative;
			&--logo {
				margin-right: auto;
			}
		}

		&-logo-img {
			max-height: 32px;
		}

		&-link {
			background: none;
		}
	}

	.user {
		display: inline-flex;
		flex-direction: column;
		color: #fff;

		&__name {
			padding: 8px 0;
		}

		&__wrap {
			display: flex;
			justify-content: space-between;
		}

		&__photo,
		&__menu,
		&__menu-items {
			display: inline-block;
			vertical-align: middle;
		}

		&__menu-items {
			padding: 0;
			margin: 0;
			width: 100%;
			display: none;
			position: absolute;
			background-color: $bg-color;
			opacity: 0;
			z-index: 100;
		}

		&__photo {
			max-width: 100px;
		}

		&__menu {
			padding: 0;
			margin: 0 0 0 10px;
			list-style: none;
			position: relative;

			&:hover .user__menu-items {
				display: block;
				animation: showMenu .5s forwards;
			}
		}

		&__item {
			display: block;
			transition: background-color .1s;

			&:hover {
				background-color: #c8c8c8;
			}

			&:hover .user__link {
				color: #000;
			}
		}

		&__link {
			display: block;
			color: #fff;
			padding: 8px 0;

			&:hover {
				text-decoration: none;
				color: #fff;
			}
		}
	}

	.list-group {
		list-style: none;

		&-border-none &-item:first-child {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}

		& > &-border-bottom {
			border-bottom-left-radius: 0.25rem;
			border-bottom-right-radius: 0.25rem;
		}

		&-item {
			cursor: pointer;
			padding: 0.35rem 0.95rem;
		}

		&-item-display {
			display: none;
			position: absolute;
			top: 103%;
			opacity: 0;

			&-show {
				display: block;
				animation: showMenu .5s forwards;
			}
		}
	}

	.list-group-border-bottom {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	@keyframes showMenu {
		100% {
			opacity: 1;
		}
		0% {
			opacity: 0;
		}
	}
</style>