<template>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Trang chu</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

    </head>
    <header class="page__header">
        <nav class="header__nav">
            <router-link class="nav__link-img" :to="{
                name: 'home',
            }"><img src="../assets/img/RPC-JP_Logo.png" class="nav__image--logo nav__link" alt="logo">
            </router-link>
            <ul class="nav__container">
                <li>
                    <router-link class="nav__link" :to="{
                        name: 'home',
                    }">TRANG CHỦ
                    </router-link>
                </li>
                <li class="nav__link--theloai">
                    <a class="nav__link" href="#">THỂ LOẠI</a>
                    <ul class="sub__nav--theloai">
                        <li v-for="ctgr in category" class="sub__link">
                            <router-link :to="{
                                name: 'theloai',
                                params: { id: ctgr },
                            }">{{ ctgr }}</router-link>
                        </li>
                    </ul>
                </li>

                <li class="nav__link--quocgia">
                    <a class="nav__link" href="#">QUỐC GIA</a>
                    <ul class="sub__nav--quocgia">
                        <li v-for="cty in country" class="sub__link">
                            <router-link :to="{
                                name: 'quocgia',
                                params: { id: cty },
                            }">{{ cty }}</router-link>
                        </li>
                    </ul>
                </li>


                <li class="nav__link--phimle">
                    <router-link :to="{
                        name: 'loai',
                        params: { id: phimle },
                    }">
                        <a class="nav__link" href="#">PHIM LẺ</a>
                    </router-link>
                </li>

                <li class="nav__link--phimbo">

                    <router-link :to="{
                        name: 'loai',
                        params: { id: phimbo },
                    }">
                        <a class="nav__link" href="#">PHIM BỘ</a>
                    </router-link>
                </li>
                <!-- menu thu gọn-left -->
                <div class="nav__menu--icon" id="nav__menu--icon" @click="displayLeftMenu()">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <nav class="nav__menu--left" id="nav__menu--left">
                    <router-link class="nav-left__image--logo nav__link-img" :to="{
                        name: 'home',
                    }"><img src="../assets/img/RPC-JP_Logo.png" class="nav__image--logo nav__link" alt="logo">
                    </router-link>
                    <!-- <a href="trangchu.html"><img class="nav-left__image--logo" src="./data/RPC-JP_Logo.png" alt=""></a> -->
                    <span class="nav--close--button" @click="closeLeftMenu()">X</span>
                    <br>
                    <div class="nav__search-ipad">
                        <form action="" class="nav-left__search-form" @submit="searchFilm() ; closeLeftMenu()">
                            <div class="form__input-ipad" id="form__input2">
                                <input v-model="searchValue" class="form__input--text" autocomplete="off" type="text"
                                    id="form__input--text2" name="f-in" placeholder="Nhập nội dung cần tìm..." />
                                <div class="search__dropdown search__dropdown-left" id="search__dropdown2"></div>
                            </div>
                            <i class="fa fa-search form-left__icon--search"></i>
                        </form>
                    </div>
                    <nav class="nav__ipad">



                        <li class="nav--ipad__link--theloai">
                            <a href="#"><i class="fas fa-book-open"></i>thể loại</a>
                            <ul class="sub__nav--ipad--theloai">
                                <li v-for="ctgr in category" class="sub--ipad__link">
                                    <router-link @click="closeLeftMenu()" :to="{
                                        name: 'theloai',
                                        params: { id: ctgr },
                                    }">{{ ctgr }}</router-link>
                                </li>

                                <!-- thể loại khác tiếp tục nối thêm vào dưới đây  -->
                            </ul>
                        </li>
                        <li class="nav--ipad__link--quocgia">
                            <a href="#"><i class="fas fa-globe-americas"></i>Quốc gia</a>
                            <ul class="sub__nav--ipad--quocgia">
                                <li v-for="ctgr in country" class="sub--ipad__link">
                                    <router-link @click="closeLeftMenu()" :to="{
                                        name: 'quocgia',
                                        params: { id: ctgr },
                                    }">{{ ctgr }}</router-link>
                                </li>
                                <!-- quốc gia khác tiếp tục nối thêm vào dưới đây  -->
                            </ul>
                        </li>
                        <li class="nav--ipad__link--phimle">
                            <router-link @click="closeLeftMenu()" class="sub--ipad__link" :to="{
                                name: 'loai',
                                params: { id: phimle },
                            }">
                                <a href="#"><i class="fas fa-film"></i>Phim Lẻ</a>
                            </router-link>
                        </li>
                        <li class="nav--ipad__link--phimbo">

                            <router-link @click="closeLeftMenu()" class="sub--ipad__link" :to="{
                                name: 'loai',
                                params: { id: phimbo },
                            }">
                                <a href="#"><i class="fas fa-video"></i>Phim bộ</a>
                            </router-link>
                            <!--các năm khác tiếp tục nối thêm vào dưới đây  -->
                        </li>
                        <!-- <a href=""><i class="fas fa-medal"></i> Chiếu rạp </a>
                    <a href=""><i class="fas fa-camera-retro"></i> Sấp chiếu</a> -->
                    </nav>
                </nav>


                <div class="nav__search">
                    <form action="" class="search__form" @submit="searchFilm()">
                        <div class="form__input" id="form__input">
                            <input class="form__input--text" v-model="searchValue" autocomplete="off" type="text"
                                id="form__input--text" name="f-in" placeholder="Nhập nội dung cần tìm..." />
                        </div>
                        <i class="fa fa-search form__icon--search" @click="searchFilm()"></i>
                        <img v-on:click="displayForm()" class="search__user" id="search__user"
                            src="https://el.tvu.edu.vn/images/avatar/no-avatar.png" alt="">
                    </form>
                </div>

                <!-- ----------------------------------login form---------------------------- -->
                <div class="nav__notify-success">{{ messageFromAPI.message }}</div>
                <div class="nav__notify-error">{{ messageFromAPI.message }}</div>
                <div class="nav__login--form">
                    <span v-on:click="closeForm()" class="form--close--button">X</span>
                    <form class="login-form" @submit="logIn()">
                        <h1 class="form--title">ĐĂNG NHẬP</h1>
                        <div class="form-input-material">
                            <label for="username">
                                <p class="label--username">Tên đăng nhập </p>
                            </label>
                            <input v-model="UserInfor.name" type="text" maxlength="20" name="username" id="username"
                                placeholder=" " autocomplete="off" class="form-control-material" required />
                        </div>
                        <div class="form-input-material">
                            <label for="password">
                                <p class="label--password">Mật khẩu </p>
                            </label>
                            <input v-model="UserInfor.password" type="password" name="password" id="password"
                                placeholder=" " autocomplete="off" class="form-control-material" required />
                        </div>
                        <button type="submit" class="form-btn-submit" id="submit-dangnhap">Đăng nhập</button>
                        <div class="form--more">
                            <span class="form--more-note"> Bạn chưa có tài khoản? </span>
                            <span class="form--more-button" v-on:click="goSignUpForm()">Đăng kí ngay</span>
                        </div>

                    </form>
                </div>
                <div class="nav__signup--form">
                    <span v-on:click="closeForm()" class="form--close--button">X</span>
                    <form class="login-form" @submit="signUp()" id="signup-form" action="javascript:void(0);">
                        <h1 class="form--title">ĐĂNG KÍ</h1>
                        <div class="form-input-material">
                            <label for="username">
                                <p class="label--username">Tên đăng kí</p>
                            </label>
                            <input type="text" v-model="UserInfor.name" name="username" id="username1" placeholder=" "
                                autocomplete="off" class="form-control-material" required />
                        </div>
                        <div class="form-input-material">
                            <label for="password">
                                <p class="label--password">Mật khẩu</p>
                            </label>
                            <input type="password" v-model="UserInfor.password" name="password" id="password1"
                                placeholder=" " autocomplete="off" class="form-control-material" required />
                        </div>
                        <div class="form-input-material">
                            <label for="password">
                                <p class="label--password">Nhập lại mật khẩu</p>
                            </label>
                            <input type="password" v-model="UserInfor.password2" name="password" id="password2"
                                placeholder=" " autocomplete="off" class="form-control-material" required />
                            <span class="err-password" v-if="!isMatch">Mật khẩu không trùng khớp</span>
                        </div>
                        <button type="submit" class="form-btn-submit" id="submit-dangki">Đăng kí</button>
                        <div class="form--more">
                            <span class="form--more-note">Bạn đã có tài khoản? </span>
                            <span class="form--more-button-signup" v-on:click="goSignInForm()">Đăng nhập ngay</span>
                        </div>

                    </form>
                </div>
            </ul>
        </nav>

        <div class="header__information" id="header__information">
            <div class="navbar-user">
                <span class="form--close--button" @click="closeForm()">X</span>
                <div class="user-avatar"><img src="https://el.tvu.edu.vn/images/avatar/no-avatar.png" alt=""></div>
                <span class="wellcome-user"><span id="wellcome-user-name"></span></span>

                <div class="clear-box"></div>
            </div>
            <div class="navbar-user-body">
                <a href="#"><i class="fas fa-edit"></i>Sửa thông tin</a>
                <a href="#"><i class="fas fa-unlock-alt"></i>Đổi mật khẩu</a>
                <hr>
                <a href="#"><i class="fas fa-film"></i>Phim đã xem</a>
                <a href="#"><i class="fas fa-heart"></i>Phim đã thích</a>
                <a href="#"><i class="fas fa-bell"></i>Phim đang theo dõi</a>
                <hr>
                <a href=""><i class="fas fa-sign-out-alt"></i>Đăng xuất</a>
            </div>
        </div>
    </header>
</template>


<script>
import userService from '../services/user.service';
export default {
    data() {
        return {
            category: ["Hành Động", "Tình Cảm", "Hài Hước", "Cổ Trang", "Tâm Lý", "Hình Sự", "Chiến Tranh", "Thể Thao", "Võ Thuật", "Viễn Tưởng", "Phiêu Lưu", "Khoa Học", "Kinh Dị", "Âm Nhạc", "Gia Đình", "Học Đường",],
            country: ["Trung Quốc", "Hàn Quốc", "Nhật Bản", "Thái Lan", "Âu Mỹ", "Đài Loan", "Hồng Kông", "Ấn Độ", "Anh", "Pháp", "Canada", "Nga"],
            phimle: "single",
            phimbo: "series",
            UserInfor: {},
            UserAPI: null,
            messageFromAPI: {},
            isMatch: true,
            // isCreate:false,
            isLogin: false,
            busData: "",
            searchValue: ""

        };
    },
    computed: {

    },
    methods: {
        async getUser(user) {
            try {
                this.messageFromAPI = await userService.get(user);
            } catch (error) {
                console.log(error);
            }
        },
        async addUser(user) {
            try {
                this.messageFromAPI = await userService.create(user);
                // console.log(this.messageFromAPI)
                //neu tk ton tai se ko tao va tra ve message 
            } catch (error) {
                console.log(error);
            }
        },
        logIn() {
            event.preventDefault()
            this.checkLogin()

        },
        //luu name ng dung de biet ai da dang nhap
        userLogged() {
            localStorage.setItem('userLogged', this.UserInfor.name);

        },
        //xoa name ng dung khi load lai web
        resetLogged() {
            if (localStorage.getItem('userLogged'))
                localStorage.removeItem('userLogged');
        },
        signUp() {
            event.preventDefault()
            this.checkSignUp()
        },
        async checkLogin() {
            let loginform = document.querySelector(".nav__login--form");
            let inforForm = document.getElementById("header__information");
            let successNotify = document.querySelector(".nav__notify-success");
            let errorNotify = document.querySelector(".nav__notify-error");
            await this.getUser(this.UserInfor)
            if (this.messageFromAPI.isLogin) {

                document.getElementById("wellcome-user-name").textContent = this.UserInfor.name;
                this.userLogged()
                loginform.style.display = "none";
                inforForm.style.display = "block"
                successNotify.style.display = "block"
                setTimeout(() => {
                    if (successNotify.style.display == "block") {
                        successNotify.style.display = "none"
                    }
                }, 2000);
            }
            else {
                errorNotify.style.display = "block";
                setTimeout(() => {
                    if (errorNotify.style.display == "block") {
                        errorNotify.style.display = "none"
                    }
                }, 2000);
            }
        },
        async checkSignUp() {
            let successNotify = document.querySelector(".nav__notify-success");
            let errorNotify = document.querySelector(".nav__notify-error");
            // let username1 = document.getElementById("username1")
            let password1 = document.getElementById("password1")
            let password2 = document.getElementById("password2")
            if (password1.value != password2.value) {
                this.isMatch = false
            } else {
                await this.addUser(this.UserInfor)
                //cheack tk ton tai hay chua 
                //await cho doi message
                if (this.messageFromAPI.isCreate) {
                    this.isMatch = true
                    successNotify.style.display = "block"
                    setTimeout(() => {
                        if (successNotify.style.display == "block") {
                            successNotify.style.display = "none"
                        }
                    }, 2000);

                }
                else {
                    this.isMatch = true
                    errorNotify.style.display = "block";
                    setTimeout(() => {
                        if (errorNotify.style.display == "block") {
                            errorNotify.style.display = "none"
                        }
                    }, 2000);
                }
            }


        },
        displayForm() {
            let loginform = document.querySelector(".nav__login--form");
            let signupform = document.querySelector(".nav__signup--form");
            let inforForm = document.getElementById("header__information");
            loginform.classList.remove("nav--login--form-Off");
            loginform.classList.add("nav--login--form-On");
            signupform.classList.remove("nav--login--form-Off");
            signupform.classList.add("nav--login--form-On");
            inforForm.classList.remove("nav--login--form-Off");
            inforForm.classList.add("nav--login--form-On");
        },
        closeForm() {
            let loginform = document.querySelector(".nav__login--form");
            let signupform = document.querySelector(".nav__signup--form");
            let inforForm = document.getElementById("header__information");
            loginform.classList.remove("nav--login--form-On");
            loginform.classList.add("nav--login--form-Off");
            signupform.classList.remove("nav--login--form-On");
            signupform.classList.add("nav--login--form-Off");
            inforForm.classList.remove("nav--login--form-On");
            inforForm.classList.add("nav--login--form-Off");
        },
        goSignUpForm() {
            let loginform = document.querySelector(".nav__login--form");
            let signupform = document.querySelector(".nav__signup--form");

            loginform.style.display = "none";
            signupform.style.display = "block";
        },
        goSignInForm() {
            let loginform = document.querySelector(".nav__login--form");
            let signupform = document.querySelector(".nav__signup--form");
            loginform.style.display = "block";
            signupform.style.display = "none";
        },
        // xóa dấu tiếng việt để search dễ hơn
        removeAccents(str) {
            return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        },
        searchFilm() {
            event.preventDefault()
            let valueSearch = this.removeAccents(this.searchValue).toLowerCase()
            //thay doi khoang trong thanh '-' de search params
            valueSearch = valueSearch.replaceAll(' ', '-')
            this.$router.push({ name: 'timkiem', params: { id: valueSearch } })
            // alert(valueSearch)
        },
        //thanh menu left
        displayLeftMenu() {
            let navLeft = document.getElementById("nav__menu--left");
            navLeft.classList.remove("nav--left-Off")
            navLeft.classList.add("nav--left-On")
        },
        closeLeftMenu() {
            let navLeft = document.getElementById("nav__menu--left");
            navLeft.classList.add("nav--left-Off")
            navLeft.classList.remove("nav--left-On")
        },

    },
    created() {

    },
    mounted() {
        this.resetLogged()
    }
};
</script>


<style scoped>
/* begin: header------------------------------------------------------------------------------------------------------*/


/* css cho thanh tim kiem */
.form__input {
    display: inline-block;
}

.search__dropdown {
    display: none;
    padding: 0 5px;
    top: 57px;
    width: 200px;
    max-height: 90%;
    overflow: auto;
    overflow-x: hidden;
    font-size: 15px;
    position: fixed;
    background: rgba(0, 4, 8, 0.8);
    z-index: -1;

}

.search__dropdown-left {
    top: 124px;
    width: 300px;
    z-index: 100000;
    left: 0;
    grid-template-columns: auto auto;
    color: white;
    max-height: 80%;

}

.search__dropdown--name {
    display: inline-block;
    text-transform: capitalize;

}

.form__input--text {
    height: 30px;
    width: 100%;
    font-size: 1.3rem;
    background: none;
    padding-left: 10px;
    padding-right: 30px;
    border-radius: 15px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid rgb(190, 181, 181);
}

.form__input--text:hover {
    background: rgba(0, 4, 8, 0.8);
}

.form__input--text:focus {
    color: rgb(255, 255, 255);
    background: rgba(0, 4, 8, 0.8);
}

.search__form {
    top: -5px;
    bottom: 9px;
    float: right;
    position: relative;
}

.form__icon--search {
    top: 3px;
    height: 100%;
    right: 30px;
    font-size: 2rem;
    color: #999;
    cursor: pointer;
    position: relative;
    text-align: center;
}

.search__user {
    top: 9px;
    right: 13px;
    width: 30px;
    height: 30px;
    color: #999;
    cursor: pointer;
    line-height: 30px;
    position: relative;
    text-align: center;
}


/* css thanh nav */

.header__nav {
    border-bottom: 1px solid;
}

nav {
    width: 100%;
    overflow: auto;
    padding: 0.1% 14%;
    list-style: none;
    display: inline-block;
}

.nav__container {
    list-style-type: none;
}

.nav__link {
    float: left;
    height: 47px;
    display: block;
    font-size: 18px;
    color: #f5f5f5;
    padding: 2px 15px;
    line-height: 46px;
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
    /* margin: 3px 5px; */
}

.nav__link-img {
    padding: 0;
}

.nav__link:hover {
    color: aqua;
}


/* logo */

.nav__image--logo {
    padding: 0px;
    height: 40px;
    margin: 12px 0px 5px;
}


/*===================================================================================================*/

.sub__nav--theloai,
.sub__nav--quocgia,
.sub__nav--phimle,
.sub__nav--phimbo {
    padding: 0 5px;
    top: 57px;
    left: 18%;
    z-index: 2;
    width: 530px;
    /* 4 cột. thêm cột công thêm 130px*/
    display: none;
    font-size: 1.7rem;
    position: absolute;
    background: rgba(0, 4, 8, 0.8);
}

.nav__link--theloai:hover .sub__nav--theloai,
.nav__link--quocgia:hover .sub__nav--quocgia,
.nav__link--phimle:hover .sub__nav--phimle,
.nav__link--phimbo:hover .sub__nav--phimbo {
    display: block;
}

.sub__nav--theloai>li,
.sub__nav--quocgia>li,
.sub__nav--phimle>li,
.sub__nav--phimbo>li {
    list-style-type: none;
}

.sub__nav--theloai a:hover,
.sub__nav--quocgia a:hover,
.sub__nav--phimle a:hover,
.sub__nav--phimbo a:hover {
    color: aqua;
}

.sub__link>a {
    float: left;
    padding: 0 10px;
    width: 13rem;
    color: #f5f5f5;
    line-height: 3rem;
    text-decoration: none;
    text-transform: capitalize;
}


/* ===================login form =================*/

.nav__login--form {
    position: fixed;
    height: 100%;
    max-width: 300px;
    background: rgba(0, 4, 8, 0.8);
    top: 0;
    z-index: 1000;
    right: -100%;
}

.nav__signup--form {
    position: fixed;
    height: 100%;
    max-width: 300px;
    background: rgba(0, 4, 8, 0.8);
    top: 0;
    display: none;
    right: -300px;
    z-index: 999;
}

.form--close--button {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
}

.form--title {
    text-align: center;
    margin: 10% 5% 0 0;
    font-size: 2rem;
}

.form-input-material {
    margin: 0px 10px;
}

.label--username,
.label--password {
    font-size: 15px;
    margin: 1.5rem 0 0.5rem 0;
    display: block;

}

.form-control-material {
    width: 100%;
}

.form-btn-submit {
    font-size: 1.7rem;
    display: block;
    padding: 10px;
    margin: 5% auto;
    color: white;
    border: none;
    background: rgba(4, 110, 110, 0.8);
}

.form-btn-submit:hover {
    background: rgba(4, 110, 110, 0.4);
    cursor: pointer;
}

.form--more {
    width: fit-content;
    margin: 5% auto;
    font-size: 1.7rem;
}

.form--more-button,
.form--more-button-signup {
    background-color: none;
    color: aqua;
}

.form--more-button:hover,
.form--more-button-signup:hover {
    opacity: 0.6;
    cursor: pointer;
}

/* notify login form */
.center {
    text-align: center;
}

.nav__notify-success,
.nav__notify-error {
    width: auto;
    padding: 10px;
    top: 10px;
    right: 10px;
    font-size: 15px;
    position: fixed;
    z-index: 10000;
    border-radius: 5px;
    display: none;
}

.err-password {
    color: rgb(248, 122, 83);
    font-size: 1.3rem;
    display: block;
    margin-top: 0.1rem;
}

.nav__notify-success {
    background-color: rgb(43, 202, 29);
    animation: notify 5s forwards;
}

.nav__notify-error {
    background-color: rgb(202, 55, 29);
    animation: notify 5s forwards;
}

/* animation cho form */

.nav--login--form-On {
    animation: loginOn 1s forwards;
}

.nav--login--form-Off {
    right: 0%;
    animation: loginOff 2s forwards;
}

@keyframes loginOn {
    form {
        right: -100%;
    }

    to {
        right: 0%;
    }
}

@keyframes loginOff {
    form {
        right: 0%;
    }

    to {
        right: -100%;
    }
}

@keyframes notify {
    form {
        opacity: 1;
    }

    to {
        opacity: 0;
        display: none;
    }
}

/*begin  nav_left ========================================================*/
/* nav thu gọn */
.nav--close--button {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 26px;
    cursor: pointer;
    user-select: none;
    z-index: 1;
}

.nav__menu--icon {
    float: left;
    margin: 10px 0 0 20px;
    display: none;
}

.nav__menu--icon>div {
    width: 35px;
    height: 2px;
    background-color: rgb(233, 230, 230);
    margin: 6px 0;
}

.nav__menu--left {
    position: fixed;
    height: 100%;
    max-width: 300px;
    background: rgba(0, 4, 8, 0.8);
    top: 0;
    left: -300px;
    z-index: 1000;
    /* display: none; */
    padding: 0;

}


.nav-left__search-form {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
}

.form__input-ipad {
    display: inline-block;
    width: 89%;
    margin: 0 0 0 5%;
}

.form-left__icon--search {
    color: #999;
    top: 15%;
    position: absolute;
    right: 8%;
    font-size: 20px;
    cursor: pointer;
}

.nav-left__image--logo {
    width: 90px;
}

.nav__ipad {
    padding: 0px 10px;
    font-size: 15px;
}

.nav__ipad>li>a {
    font-size: 15px;
    text-decoration: none;
    display: block;
    text-transform: capitalize;
    margin: 10px 10px;
    color: white;
    width: 92px;

}

.sub__nav--ipad--theloai,
.sub__nav--ipad--quocgia,
.sub__nav--ipad--phimle,
.sub__nav--ipad--phimbo {
    padding: 0;
    margin-left: 38px;
    padding: 0;
    z-index: 2;
    display: none;
    /* 4 cột. thêm cột công thêm 130px*/
    /* display: none; */
    font-size: 14px;
    /* background: rgba(0, 4, 8, 0.8); */
}

.nav--ipad__link--theloai:hover .sub__nav--ipad--theloai,
.nav--ipad__link--quocgia:hover .sub__nav--ipad--quocgia,
.nav--ipad__link--phimle:hover .sub__nav--ipad--phimle,
.nav--ipad__link--phimbo:hover .sub__nav--ipad--phimbo {
    display: grid;
    grid-template-columns: auto auto;
}

.sub__nav--ipad--theloai>li,
.sub__nav--ipad--quocgia>li,
.sub__nav--ipad--phimle>li,
.sub__nav--ipad--phimbo>li {
    list-style-type: none;
}

.sub__nav--ipad--theloai a:hover,
.sub__nav--ipad--quocgia a:hover,
.sub__nav--ipad--phimle a:hover,
.sub__nav--ipad--phimbo a:hover {
    color: aqua;
}

.sub--ipad__link>a {
    color: #f5f5f5;
    line-height: 3rem;
    text-decoration: none;
    text-transform: capitalize;
}

/* animation */
.nav--left-On {
    left: -100%;
    animation: navOn 1s forwards;
}

.nav--left-Off {
    left: 0%;
    /* tu vi tri 0% -> -100%. ko bi mất animation */
    animation: navOff 2s forwards;
}

@keyframes navOn {
    form {
        left: -100%;
    }

    to {
        left: 0%;
    }
}

@keyframes navOff {
    form {
        left: 0%;
    }

    to {
        left: -100%;
    }
}



/*end nav_left ========================================================*/
/*====================================================================================================*/
/*thông tin người dùng*/
.header__information {
    position: fixed;
    height: 100%;
    max-width: 300px;
    background: rgba(0, 4, 8, 0.8);
    top: 0;
    display: none;
    right: -100%;
    z-index: 999;
}

.navbar-user {
    padding: 1.3rem;
}

/* .fa-window-close{
    font-size: 3.5rem;
    color: rgb(253, 253, 253);
} */

.clear-box {
    clear: both;
}

.user-avatar {
    width: 100%;
    text-align: center;
    border-radius: 50%;
}

.user-avatar>img {
    width: 35%;
    border-radius: 50%;
}

.wellcome-user {
    display: block;
    left: 1rem;
    font-size: 2rem;
    text-align: center;
}

.navbar-user>a {
    font-size: 1.7rem;
    margin: 1rem 2.5rem 0 0;
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    color: white;
}

.fas {
    margin-right: 14px;
}

.navbar-user-body>a {
    font-size: 2rem;
    text-decoration: none;
    display: block;
    margin: 1rem;
    color: white;
    font-weight: 100;
}

/*end : header --------------------------------------------------------------------------------------------------------*/


/*footer__table*/


/* footer */
footer {
    font-size: 14px;
    text-align: center;
}

.footer__icon--top {
    right: 3%;
    width: 50px;
    bottom: 7%;
    position: fixed;
}

.footer__icon {
    font-size: 20px;
    color: white;
    margin: 10px;

}

/*begin main*/
/*hover film children*/
.film-grid__children img,
.film-grid__children .film__sub {
    transition-duration: 0.4s;
}

.film-grid__children:hover img,
.film-grid__children:hover .film__sub {
    transform: scale(1.05);
}

.film-grid__children:hover .film__sub {
    bottom: -10px;
}

/*end hover film children*/


/*end main*/

/* reponsvie */
@media only screen and (max-width: 1220px) {
    main {
        margin: 0 13%;
    }

    nav {
        padding: 0.1% 6%;
    }
}

@media only screen and (max-width: 1000px) {
    main {
        margin: 0 7%;
    }

    nav {
        padding: 0.1% 1%;
    }
}

@media only screen and (max-width: 900px) {
    .nav__container>li {
        display: none;
    }

    .nav__menu--left,
    .nav__menu--icon {
        display: block;
    }

    .nav__menu--icon {
        margin: 0 0 0 20px;
    }

    .search__user {
        top: 4px;
    }

    .nav__image--logo {
        margin: 0;
    }

    nav {
        padding: 0 6%;
    }

    .form__input,
    .fa {
        display: none !important;

    }
}

@media only screen and (max-width: 800px) {
    main {
        margin: 0 6%;
    }

    nav {
        padding: 0 6%;
    }

}

@media only screen and (max-width: 480px) {
    html {
        font-size: 7px;
    }
}

@media only screen and (max-width: 325px) {
    html {
        font-size: 5px;
    }
}
</style>


