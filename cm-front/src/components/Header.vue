<template>
	<div>
		<nav class="main-nav">
			<ul class="nav-list">
				<li class="nav-item nav-item-hamburger">
					<div class="hamburger">
						<div :class="{'menu-btn': true, 'menu-btn_active': toggleClass.hamburger}"
						     @click="[showMobileNav(), toggleClass.hamburger = !toggleClass.hamburger]">
							<span></span>
						</div>
					</div>
				</li>
				<li class="nav-item nav-item--logo">
					<router-link class="nav-link" to="/">
						<img v-if="checkLogin"
						     :src="headerLogo.logoFederation"
						     alt="logo" class="nav-logo--img">
						<img v-else
						     :src="headerLogo.logoChampion"
						     alt="logo"
						     class="nav-logo--img">
					</router-link>
				</li>
				<li class="nav-item checkboxes">
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
				<li class="nav-item nav-item-contacts">
					<ul class="nav-list nav-list--sub">
						<li class="nav-item">
							<a :href="'tel:' + contacts.phone">Phone: {{ contacts.phone }}</a>
						</li>
						<li class="nav-item">
							<a :href="'mailto:' + contacts.email">E-mail: {{ contacts.email }}</a>
						</li>
					</ul>
				</li>
				<li class="nav-item d-flex align-items-center nav-item-user" v-if="checkLogin">
					<div class="user">
						<div class="user__date">Valid until
							<time class="user__time">{{ userData.validUntil }}</time>
						</div>
						<div class="user__wrap">
							<div class="user__wrap-inner">
								<img :src="userData.userLogo" alt="User" class="user__photo">
								<div class="user__menu">
									<div class="user__name">{{ userData.userName }}</div>
									<ul class="user__menu-items">
										<router-link tag="li" :to="'/federation'" class="user__item"
										             v-if="this.$store.state.roles.userIsFederation === true"><a
												class="user__link">{{ menu[0].titleFederation }}</a>
										</router-link>
										<router-link tag="li" :to="'/userprofile/' + userData.id"
										             class="user__item"
										             v-if="this.$store.state.roles.userIsFederation === false"><a
												class="user__link">{{ menu[0].title }}</a>
										</router-link>
										<router-link tag="li" :to="'/coachcabinet/' + userData.id"
										             class="user__item"
										             v-if="this.$store.state.roles.userIsCoach"><a
												class="user__link">{{ menu[1].titleCoach }}</a>
										</router-link>
										<router-link tag="li" :to="'/settingscabinet'" class="user__item"
										             v-else-if="this.$store.state.roles.userIsSportsman"><a
												class="user__link">{{ menu[1].titleSportsman }}</a>
										</router-link>
										<li @click="logout()" class="user__item user__link c-pointer">{{
											menu[2].title }}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li class="nav-item nav-item-logout" v-if="checkLogin">
					<button class="btn btn-primary btn-user" v-on:click="logout">Logout</button>
				</li>
				<li class="nav-item" v-else>
					<router-link tag="button" class="btn btn-primary btn-user" to="/auth">Log in</router-link>
					<router-link tag="button" class="btn btn-primary btn-user" to="/registration">Registration
					</router-link>
				</li>
				<li class="nav-item nav-item-lang">
					<ul class="list-group list-group-show">
						<li :class="{'list-group-border-bottom': languages.selectedLang, 'list-group-item': true}"
						    @click="languages.activeClass = !languages.activeClass">{{
							languages.selectedLang }}
						</li>
						<li :class="{'list-group-item-display-show': languages.activeClass, 'list-group-item-display': true}">
							<ul class="list-group list-group-border-none">
								<li class="list-group-item"
								    v-for="lang in languages.langList"
								    :key="lang"
								    v-if="lang !== languages.selectedLang"
								    @click="[setActiveLang($event), languages.activeClass = !languages.activeClass]">
									{{ lang }}
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div :class="{'mobile': true, 'mobile-slideIn': toggleClass.mobileMenu}">
			<div class="d-flex justify-content-end mr-5">
				<ul class="list-group list-group-show">
					<li :class="{'list-group-border-bottom': languages.selectedLang, 'list-group-item': true}"
					    @click="languages.activeClass = !languages.activeClass">{{
						languages.selectedLang }}
					</li>
					<li :class="{'list-group-item-display-show': languages.activeClass, 'list-group-item-display': true}">
						<ul class="list-group list-group-border-none">
							<li class="list-group-item"
							    v-for="lang in languages.langList"
							    :key="lang"
							    v-if="lang !== languages.selectedLang"
							    @click="[setActiveLang($event), languages.activeClass = !languages.activeClass]">
								{{ lang }}
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<nav class="mobile__nav">
				<ul class="mobile__list">
					<li class="mobile__item mobile__item-logo"><a href="#" class="mobile__link">
						<router-link class="nav-link" to="/">
							<img v-if="checkLogin"
							     :src="headerLogo.logoFederation"
							     alt="logo" class="nav-logo--img">
							<img v-else
							     :src="headerLogo.logoChampion"
							     alt="logo"
							     class="nav-logo--img">
						</router-link>
					</a></li>
					<li class="mobile__item"><a href="tel:+3809645813" class="mobile__link p-0">+3809645813</a></li>
					<li class="mobile__item mobile__item-contacts"><a href="mailto:exmple@gmail.com"
					                                                  class="mobile__link p-0">exmple@gmail.com</a></li>
					<li v-if="checkLogin"
					    class="mobile__item">{{ userData.userName }}</li>
					<li class="mobile__item mobile__item-user">
						<div v-if="checkLogin"
						     class="logo-container">
							<img :src="userData.userLogo" alt="User" class="logo-container-img">
						</div>
					</li>
					<li v-if="checkLogin"
					    class="mobile__item">Valid until
						<time class="mobile-user__time">{{ userData.validUntil }}</time>
					</li>
					<router-link tag="li" :to="'/federation'" class="mobile__item mobile__item-hover"
					             v-if="checkLogin && this.$store.state.roles.userIsFederation === true"><a
							class="mobile__link">{{ menu[0].titleFederation }}</a>
					</router-link>
					<router-link tag="li" :to="'/userprofile/' + userData.id"
					             class="mobile__item mobile__item-hover"
					             v-if="checkLogin && this.$store.state.roles.userIsFederation === false"><a
							class="mobile__link">{{ menu[0].title }}</a>
					</router-link>
					<router-link tag="li" :to="'/coachcabinet/' + userData.id"
					             class="mobile__item mobile__item-hover"
					             v-if="checkLogin && this.$store.state.roles.userIsCoach"><a
							class="mobile__link">{{ menu[1].titleCoach }}</a>
					</router-link>
					<router-link tag="li" :to="'/settingscabinet'" class="mobile__item mobile__item-hover"
					             v-else-if="checkLogin && this.$store.state.roles.userIsSportsman"><a
							class="mobile__link">{{ menu[1].titleSportsman }}</a>
					</router-link>
					<li @click="logout()"
					    v-if="checkLogin"
					    class="mobile__item mobile__item-hover mobile__link c-pointer">{{
						menu[2].title }}
					</li>
					<li class="nav-item" v-if="!checkLogin">
						<router-link tag="button" class="btn btn-primary btn-user" to="/auth">Log in</router-link>
						<router-link tag="button" class="btn btn-primary btn-user" to="/registration">Registration
						</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</div>
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
                userLogo: 'img/header/user.png'
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
                logoChampion: 'img/header/logo_champion.png',
                logoFederation: 'img/header/logo_federation.png'
            },
            toggleClass: {
                hamburger: false,
                mobileMenu: false
            },
            temp: ''
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
        // getImage: function (image) {
        // 	const images = require.context('../assets/', false, /\.png$/);
        // 	return images('./' + image);
        // },
        getUserId() {
            if (localStorage.getItem("lbUser")) {
                const userObj = this.$store.state.authUser;
                this.userData.id = userObj.id;
            }
        },
        setActiveLang(e) {
            this.languages.selectedLang = e.target.textContent.trim();
        },
        // set user's role with radio button
        setRole(e) {
            let role = e.target.value;
            let roles = this.$store.state.roles;
            for (let key in roles) {
                roles[key] = false;
            }
            roles[role] = true;
        },
        showMobileNav() {
            this.toggleClass.mobileMenu = !this.toggleClass.mobileMenu;
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

		&-logo--img {
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
			z-index: 100;

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
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	//HAMBURGER

	.nav-item-hamburger {
		z-index: 999;
	}

	.hamburger {
		display: none;
		cursor: pointer;
	}

	.menu-btn {
		display: inline-block;
		width: 35px;
		height: 35px;
		background-color: #ffffff;
		border-radius: 50%;
		position: relative;

		span {
			position: absolute;
			top: 50%;
			margin-top: -1px;
			left: 50%;
			width: 20px;
			height: 2px;
			background-color: #222;
			margin-left: -10px;

			&:before, &:after {
				content: '';
				position: absolute;
				top: 50%;
				margin-top: -1px;
				left: 50%;
				width: 20px;
				height: 2px;
				background-color: #222;
				margin-left: -10px;
				display: block;
				transition: 0.3s;
			}

			&:before {
				transform: translateY(-5px);
			}

			&:after {
				transform: translateY(5px);
			}
		}
	}

	.menu-btn_active {

		span {
			height: 0;
			&:before {
				transform: rotate(45deg);
			}

			&:after {
				transform: rotate(-45deg);
			}
		}
	}

	//MOBILE MENU

	.mobile {
		position: fixed;
		top: 0;
		box-shadow: initial;
		height: 100%;
		width: 400px;
		left: -600px;
		transition: left 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
		background-color: #fff;
		z-index: 9;

		&__nav {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__item {
			transition: background-color 0.1s linear;

			&-logo {
				margin-bottom: 10px;
			}

			&-contacts {
				margin-bottom: 30px;
			}

			&-user {
				padding: 10px 0;
			}

			.logo-container {
				width: 65px;
				height: 65px;
				margin: 0 auto;

				&-img {
					display: block;
					width: 100%;
					height: auto;
				}
			}

			&:last-child {
				padding: 10px 0;
			}

			&-hover {
				cursor: pointer;
			}

			&-hover:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}
		}

		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
			text-align: center;
			width: 100%;
		}

		&__link {
			color: #000;
			display: block;
			padding: 10px 0;

			&:hover {
				color: inherit;
				text-decoration: none;
			}
		}
	}

	.mobile-slideIn {
		left: 0;
		box-shadow: 5px 1px 10px 0 rgba(0, 0, 0, 0.3);
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
			z-index: 100;

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
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@media screen and (max-width: 360px) {
		.mobile {
			width: 100%;
			height: 100%;
		}
	}

	//MEDIA QUERIES

	@media screen and (max-width: 1140px) {
		.checkboxes {
			display: none !important;
		}
	}

	@media screen and (max-width: 820px) {
		.nav-item {

			&-user, &-logout, &-lang, &-contacts {
				display: none !important;
			}
		}

		.hamburger {
			display: inline-block;
		}
	}
</style>