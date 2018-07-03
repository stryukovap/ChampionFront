<template>
  <div id="app">
    <header>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item nav-item--logo">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <ul class="nav-list nav-list--sub">
              <li class="nav-item">
                <a href="tel:+#">Phone: +38067000000</a>
              </li>
              <li class="nav-item">
                <a href="mailto:#">E-mail: exemple@exemple.com</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <!-- <div class="user"> -->
            <router-link class="btn btn-primary btn-user" to="/auth">Log in</router-link>
            <router-link class="btn btn-primary btn-user" to="/registration">Registration</router-link>
            <!-- </div> -->
          </li>
        </ul>
      </nav>
    </header>
    <body>
      <router-view/>
    </body>
    <footer>
      <nav class="footer__nav">
        <ul class="footer__list">
          <li class="footer__item"><a href="#" class="footer__link">Footer item 1</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Footer item 2</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Footer item 3</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Footer item 4</a></li>
          <li class="footer__item footer__item--logo">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap-reboot.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap-grid.scss';
footer{
  background-color: #343a40;
}
.footer{
  &__list{
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    list-style:none;
  }
  &__item{
    margin-left: 10px;
    margin-right: 10px;
    &--logo{
      margin-left: auto;
    }
  }
}

.btn-user{
  margin-left: 10px;
  margin-right: 10px;
}

  body{
        text-align: center;    
  }
  .main-nav {
    background-color: #343a40
  }

  .nav-list {
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

  .nav-item {
    margin-right: 10px;
    margin-left: 10px;
    &--logo {
      margin-right: auto;
    }
  }
  .nav-link{
    background-image: url(assets/logo.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }


  // #app {
  //   font-family: "Avenir", Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  //   color: #2c3e50;
  // }
  // #nav {
  //   padding: 30px;
  //   a {
  //     font-weight: bold;
  //     color: #2c3e50;
  //     &.router-link-exact-active {
  //       color: #42b983;
  //     }
  //   }
  // }
  ////////////////////////
  // body {
  //   margin: 0;
  // }
  // .registration {
  //   width: 100%;
  //   height: 100%;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   display: flex;
  //   align-items: flex-start;
  //   justify-content: center;
  //   margin-top: 30vh;
  // }
  // .cm-form {
  //   &__wrapper {
  //     position: relative;
  //     width: 100%;
  //     &--date {
  //       display: flex;
  //       justify-content: flex-end;
  //     }
  //   }
  //   &__input {
  //     box-sizing: border-box;
  //     width: 100%;
  //     margin-top: 10px;
  //     &:focus {
  //       & + label {
  //         opacity: 0;
  //       }
  //     }
  //     &:not(:placeholder-shown) {
  //       & + label {
  //         opacity: 0;
  //       }
  //     }
  //     &--date {
  //       text-align: right;
  //       width: 50%;
  //     }
  //   }
  //   &__label {
  //     position: absolute;
  //     top: 12px;
  //     left: 10px;
  //     opacity: 0.5;
  //   }
  //   &__content {
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //     box-sizing: border-box;
  //     padding: 15px;
  //     min-width: 320px;
  //     min-height: 320px;
  //     z-index: 1;
  //   }
  //   &__button {
  //     box-sizing: border-box;
  //     width: 80%;
  //     margin-top: 20px;
  //   }
  //   &__link {
  //     box-sizing: border-box;
  //     width: 100%;
  //     margin-top: 10px;
  //     text-align: center;
  //     color: inherit;
  //     text-decoration: none;
  //     &:hover {
  //       cursor: pointer;
  //       text-decoration: underline;
  //     }
  //   }
  //   &__user-role {
  //     padding-top: 10px;
  //     padding-left: 10px;
  //   }
  //   &__gender {
  //     margin-top: 10px;
  //     padding-left: 10px;
  //     align-self: flex-start;
  //   }
  //   &__user-gender {
  //     opacity: 0.5;
  //   }
  //   &__message {
  //     display: none;
  //   }
  // }
  // /////////////////////////////////
  // .autocomplete {
  //   /*the container must be positioned relative:*/
  //   position: relative;
  //   display: inline-block;
  //   &-items {
  //     position: absolute;
  //     border: 1px solid #d4d4d4;
  //     border-bottom: none;
  //     border-top: none;
  //     z-index: 99;
  //     /*position the autocomplete items to be the same width as the container:*/
  //     top: 100%;
  //     left: 0;
  //     right: 0;
  //     & div {
  //       padding: 10px;
  //       cursor: pointer;
  //       background-color: #fff;
  //       border-bottom: 1px solid #d4d4d4;
  //       &:hover {
  //         /*when hovering an item:*/
  //         background-color: #e9e9e9;
  //       }
  //     }
  //   }
  //   &-active {
  //     /*when navigating through the items using the arrow keys:*/
  //     background-color: DodgerBlue !important;
  //     color: #ffffff;
  //   }
  // }
  //
</style>