<template  >
    <main class="page__main ">
        <article class="main__article">
            <section class="article__section">
                <div class="section__film--new section__film-grid" v-if="filmInfor">
                    <div class="film--new__children film-grid__children-itemcore">
                        <div class="itemcore__main">
                            <iframe id="myFrame" allowFullScreen class="children__img--core" v-bind:src=link_embed></iframe>


                        </div>

                    </div>
                    <div class="film-grid__children-itemright">
                        <section v-for="film in filmHot" class="film-grid__children">
                            <router-link :to="{
                        name: 'watch',
                        params: { id: film.slug },
                    }">
                                <img v-bind:src="'//img.ophim1.cc/uploads/movies/' + film.thumb_url" alt="">
                                <div class="film__sub">
                                    <div class="name-film">{{ film.name }}</div>
                                </div>
                        </router-link>
                        </section>

                    </div>
                    <div class="film-grid__children-itembottom">
                        <div class="chidren__film--name--core">
                            <h1 class="section__title section__title--primary"><span class="itemcore--name"
                                    id="itemcore--name">{{ filmInfor.movie.name }} Tập {{ epiName }}</span></h1>
                        </div><span class="itemcore--nameOrigin"> ( {{ filmInfor.movie.origin_name }} )</span>
                        <div class="itemcore--view">
                            <div class="itemcore--view__infor itemcore--view__selected" v-on:click="viewInforBtn()">
                                Thông tin</div>
                            <div class="itemcore--view__episodes" v-on:click="viewEpisodesBtn()">Tập phim</div>
                            <div class="itemcore--view__cmt" v-on:click="viewCmtBtn(),getComments()">Bình luận</div>
                            <hr>
                        </div>
                        <div class="children__film--infor">
                            <span class="itemcore--quocgia" id="itemcore--quocgia">Quốc gia:
                                {{ filmInfor.movie.country[0].name }}</span>
                            <span class="itemcore--namsanxuat" id="itemcore--namsanxuat">Năm sản xuất:
                                {{ filmInfor.movie.year }}</span>
                            <!-- <span class="itemcore--thoiluong" id="itemcore--thoiluong">Thời lượng: 141 phút</span> -->
                            <span class="itemcore--theloai" id="itemcore--theloai">Thể loại: {{ category }}</span>
                            <span class="itemcore--tomtat" id="itemcore--tomtat"
                                v-html='"Tóm tắt: " + filmInfor.movie.content'></span>
                        </div>
                        <div class="children__film--episodes children__film-Off">
                            <div class="itembottom--episodes" v-for="epi in episodes" v-on:click="selectEpi(epi)">Tập
                                {{ epi.name }}</div>
                        </div>
                        <div class="children__film--cmt children__film-Off">
                            <div class="viewer__cmt">
                                <span class='itemcore--avt-viewer'><img
                                        src='https://el.tvu.edu.vn/images/avatar/no-avatar.png'></span>
                                <span class="itemcore--cmt">

                                    <input v-model="commentToPost.content"  placeholder="Viết bình luận..." required type="text" name="cmt" class='input__cmt'>
                                    <button class="input__cmt input__cmt-btn" @click="postComment()">Gửi</button>
                                </span>
                                <span class="errCmt">{{statusPost.message}}</span>
                            </div>
                            <div  class="viewer__cmt" v-for="comment in comments">
                                <span class='itemcore--avt-viewer'><img
                                        src='https://el.tvu.edu.vn/images/avatar/no-avatar.png'></span>
                                <span class="itemcore--cmt">{{comment.name}}</span>
                                <span class="">{{comment.content}}</span>
                                <!-- <span><a href=''>trả lời</a> 2 tuần trước</span> -->
                            </div>

                        </div>

                        <!-- //cmt -->
                    </div>
                </div>
            </section>

        </article>
    </main>
</template>

<script>
import FilmService from "@/services/film.service";
import CommentService from "@/services/comment.service"

import axios from "axios";
export default {
    props: {
        //slug
        id: { type: String, required: true },
        // messageFromApi:{type:Object, required: true},
        // UserInfor:{type:Object, required: true}
    },
    data() {
        return {
            filmInfor: null,
            message: "",
            link_embed: "",
            episodes: [],
            epiName: "",
            category: [],
            filmHot: [],
            comments:[],
            commentToPost: {},
            statusPost:{}
        };
    },
    methods: {
        getInforFilm(id) {
            axios.get(`https://ophim1.com/phim/${id}`)
                .then(res => {
                    this.filmInfor = res.data;
                    this.link_embed = this.filmInfor.episodes[0].server_data[0].link_embed
                    this.epiName = this.filmInfor.episodes[0].server_data[0].name
                    //tao mang chua cac link tap film
                    for (let i = 0; i < this.filmInfor.episodes[0].server_data.length; i++)
                        this.episodes.push(this.filmInfor.episodes[0].server_data[i])
                    this.changeFormData()
                })
                .catch(error => console.log(error));
        },
        async retrieveFilms() {
            try {
                this.Films = await FilmService.getAll();
                //lay trang film ngau nhien
                let randomNum = Math.floor(Math.random() * (this.Films.length))
                this.filmHot = this.Films[randomNum].items
                this.filmHot.length = 4;
            } catch (error) {
                console.log(error);
            }
        },
        //lay cmt
        async getComments(){
            const data = {}
            data.slug = this.id
            this.comments = await CommentService.getCommentBySlug(data)
        },
        async postComment(){
            this.commentToPost.name = localStorage.getItem("userLogged")
            //this.commentToPost.content->v-model
            this.commentToPost.slug =this.id
            this.statusPost = await CommentService.postCmt(this.commentToPost)
            this.getComments()
            this.commentToPost.content = ""

        },
        //thay doi dinh dang data get tu api de render ra the loai phim
        changeFormData() {
            //category
            for (let i = 0; i < this.filmInfor.movie.category.length; i++) {
                this.category.push(" " + this.filmInfor.movie.category[i].name)
            }
            this.category = this.category.toString()
        },
        //SU KIEN nút thông tin film
        viewInforBtn() {
            let btnInfor = document.querySelector(".itemcore--view__infor");
            let btnCmt = document.querySelector(".itemcore--view__cmt");
            let btnEpi = document.querySelector(".itemcore--view__episodes");
            let infor = document.querySelector(".children__film--infor");
            let cmt = document.querySelector(".children__film--cmt");
            let epi = document.querySelector(".children__film--episodes");
            btnInfor.classList.add("itemcore--view__selected")
            btnCmt.classList.remove("itemcore--view__selected")
            btnEpi.classList.remove("itemcore--view__selected")
            infor.classList.remove("children__film-Off");
            cmt.classList.add("children__film-Off");
            epi.classList.add("children__film-Off");

        },
        //nút xem bình luận

        viewCmtBtn() {
            let btnInfor = document.querySelector(".itemcore--view__infor");
            let btnCmt = document.querySelector(".itemcore--view__cmt");
            let btnEpi = document.querySelector(".itemcore--view__episodes");
            let infor = document.querySelector(".children__film--infor");
            let cmt = document.querySelector(".children__film--cmt");
            let epi = document.querySelector(".children__film--episodes");
            btnInfor.classList.remove("itemcore--view__selected")
            btnCmt.classList.add("itemcore--view__selected")
            btnEpi.classList.remove("itemcore--view__selected")
            infor.classList.add("children__film-Off");
            cmt.classList.remove("children__film-Off");
            epi.classList.add("children__film-Off");
        },
        //nut tap phim
        viewEpisodesBtn() {
            let btnInfor = document.querySelector(".itemcore--view__infor");
            let btnCmt = document.querySelector(".itemcore--view__cmt");
            let btnEpi = document.querySelector(".itemcore--view__episodes");
            let infor = document.querySelector(".children__film--infor");
            let cmt = document.querySelector(".children__film--cmt");
            let epi = document.querySelector(".children__film--episodes");
            btnInfor.classList.remove("itemcore--view__selected")
            btnCmt.classList.remove("itemcore--view__selected")
            btnEpi.classList.add("itemcore--view__selected")
            infor.classList.add("children__film-Off");
            cmt.classList.add("children__film-Off");
            epi.classList.remove("children__film-Off");
        },
        //chon tap phim de xem
        selectEpi(epi) {
            this.link_embed = epi.link_embed
            this.epiName = epi.name
        },

    },
    watch:{
        id(){
            this.getInforFilm(this.id)
            this.getComments()
        }
    },
    created() {


    }
    , mounted() {
        this.getInforFilm(this.id)
        this.retrieveFilms()
        this.getComments()

    }
}
</script>

<style scoped>
main {
    min-height: 77vh;
}
.article__section {
    margin: 2% 0 7% 0;
}

.section__title {
    color: aquamarine;
    font-size: 2rem;
    margin: 2% 0 0 0;
    text-transform: capitalize;
}

.itemcore--nameOrigin {
    font-size: 1.5rem;
    color: white;
    display: block;
    margin-bottom: 1.5%;
}

/* gird-layout //////////////////////////////////////////////*/
.film-grid__children-itemcore {
    grid-area: itemcore;
    overflow: hidden;
    height: 100%;
    min-height: 45vh;
}

.film-grid__children-itemright {
    margin-left: 2rem;
    grid-area: itemright;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-gap: 2rem;
    /* height: 100%; */
}
/* hover item right */
.film-grid__children img,
.film-grid__children .film__sub {
    transition-duration: 0.4s;
}

.film-grid__children:hover img,
.film-grid__children:hover .film__sub {
    transform: scale(1.15);
}

.film-grid__children:hover .film__sub {
    bottom: -10px;
}
.film-grid__children-itembottom {
    grid-area: itembottom;
    overflow: hidden;
}
/* end hover */

.section__film-grid {
    display: grid;
    grid-template-areas: "itemcore itemright"
        "itembottom itembottom";
    grid-template-columns: 2fr 1fr;

    /* grid-gap: 10px; */

}



/* end grid////////////////////////////////////////////////////// */
.itemcore__main {
    width: 100%;
    height: 100%;

}

.children__img--core {
    width: 100%;
    height: 100%;
    background-color: black;

}

.film--new__children {
    position: relative;
    /*containing block*/
}

/* css film ben trai */
.film-grid__children {
    position: relative;
}

.xemtatca {
    float: right;
    font-size: 1.5rem;
    text-decoration: none;
    color: rgb(255, 0, 0);
    text-transform: uppercase;
    font-weight: 100;
}

.film__sub {
    padding: 0 0.5rem;
    color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), rgba(0, 0, 0, .39) 34%, #000 87%);
}

.film-grid__children img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
}

.icon--FHD {
    background-color: #ff4c00;
    border-radius: 2px;
    padding: 0 2px;
    font-size: 1.2rem
}

.fa-star {
    color: #e89105;
}

.film-views {
    font-size: 1.6rem;
}

.sub-star,
.film-episode {
    float: right;
    font-size: 1.6rem
}

.name-film {
    font-size: 1.5rem;
    text-transform: capitalize;
    background-image: linear-gradient(180deg,hsla(0,0%,100%,0),rgba(0,0,0,.39) 4%,#000 87%);;
}

/* end  */

.children__film--infor {
    font-size: 1.5rem;
}

.itemcore--quocgia,
.itemcore--theloai,
.itemcore--namsanxuat,
.itemcore--thoiluong,
.itemcore--tomtat {
    display: block;
    margin-top: 1%;
    color: #bbb;

}

.itemcore--cmt {
    width: 100%;
    height: 100%;
    display: block;
    margin-top: 1%;
    color: #bbb;
    font-size: 1.5rem;
}

.itemcore--view {
    font-size: 1.5rem;
    color: rgb(191, 253, 243);

}

.itemcore--view__infor,
.itemcore--view__cmt,
.itemcore--view__episodes {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    margin: 0 1.5rem 0 0;
    padding: 1rem;
    background-color: rgb(0, 10, 10);
    border-radius: 10px;
}

.itemcore--view__infor:hover,
.itemcore--view__episodes:hover,
.itemcore--view__cmt:hover {
    color: rgb(249, 249, 249);
    background-color: rgb(4, 79, 79);

}

.itemcore--view__selected {
    color: rgb(249, 249, 249);
    background-color: rgb(4, 79, 79);

}

.itembottom--episodes {
    display: inline-block;
    padding: 1rem;
    font-size: 1.5rem;
    margin: 0.5rem 1rem;
    min-width: 3rem;
    cursor: pointer;
    border: 1px solid white;
    background-color: rgba(0, 0, 0, 0.112);
}

.itembottom--episodes:hover {
    background-color: white;
    color: black;
}

/* .itemcore--view__cmt{
    
} */

.children__film--cmt {
    overflow: auto;
}

.children__film-Off {
    display: none;
}

/* //coment */
/* commment : edited 12/11 */

.viewer__cmt img {
    height: 3.5em;
    float: left;
    margin-right: 1.5em;
}

.viewer__cmt a {
    text-decoration: none;
    color: white;
}

.viewer__cmt span {
    display: block;
}

.viewer__cmt {
    margin-bottom: 2em;
    height: 100%;
    font-size: 1.4rem;
}

.input__cmt {
    height: 4rem;
    font-size: 1.4rem;
    padding: 5px 25px 5px 10px;
    background: none;
    color: #ccc;
    border: 1px solid rgb(155, 147, 147);
    border-radius: 2px;
    outline: none;

}
.input__cmt-btn{
    color: rgb(56, 16, 4);
    background-color: rgb(110, 183, 165);
    border: 1px solid white;
    cursor: pointer;
}
.input__cmt-btn:hover{
    background-color: black;
    color: aqua;
}
.errCmt{
    margin-top: 0.5rem;
    color: #ff4c00;
}
/* repoonsive */

@media only screen and (max-width: 750px) {
    .section__film-grid {
        grid-gap: 0;
        grid-template-columns: 1fr;
    }

    .film-grid__children-itemright {
        display: none;
    }

    main {
        margin: 0 6%;
    }

    nav {
        padding: 0 6%;
    }
}

@media only screen and (max-width: 650px) {
    html {
        font-size: 8px;
    }
    main {
        margin: 0 6%;
    }

    nav {
        padding: 0 6%;
    }

    .nav__container>li {
        display: none;
    }

    .film-grid__container {
        grid-template-columns: auto auto;
    }
}
</style>