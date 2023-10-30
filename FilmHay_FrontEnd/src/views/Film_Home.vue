<template>
    <main class="page__main">
        <!-- slide đầu trang  -->
        <!-- <article class="main__article">
            <section class="article__section">
                <div class="section__film--hot">
                    <div class="film--hot__children film--hot__children-big ">
                        <div class="children-big__slick-next">&gt;</div>
                        <div class="children-big__slick-prev">&lt;</div>
                        <div class="children-big__intro">
                            <div class="thongtinfilm" hidden>
                                <span>./data/One vs Many - Prelude.mp4</span>
                                <span>Shang Chi</span>
                                <span>Quốc gia: Mỹ</span>
                                <span>Năm sản xuất: 2021</span>
                                <span>Thể loại: Hành động, Phiêu lưu, Võ thuật, Viễn tưởng, Khoa học</span>
                                <span>Tóm tắt: Shang-Chi và Huyền Thoại Thập Nhẫn là bộ phim thuộc giai đoạn 4 của Vũ
                                    trụ điện ảnh Marvel. Nhân vật này được biết đến như một bậc thầy Kung Fu, tinh thông
                                    võ thuật. Sức mạnh của Shang-Chi đến từ hàng ngàn giờ luyện tập miệt mài và sự kỷ
                                    luật cao độ với bản thân. Siêu anh hùng võ thuật này được chính bố dạy dỗ để trở
                                    thành một sát thủ chuyên nghiệp và kế thừa tập đoàn tội ác của ông.</span>
                            </div>
                            <a href="xemphim.html" class="js-item-select-film">
                                <div class="chidren-big__intro--name">Shang Chi Và Huyền Thoại Thập Luân</div>
                                <img class="children-big__intro--img"
                                    src="https://s198.imacdn.com/ff/2021/09/03/82a7d4bb966835a6_d087906b70c206f7_470111630676011916068.jpg"
                                    alt="">
                            </a>
                        </div>
                        <div class="children-big__intro children-big__intro-absolute">
                            <div class="thongtinfilm" hidden>
                                <span>./data/One vs Many - Prelude.mp4</span>
                                <span>Shang Chi và Huyền Thoại Thập luân</span>
                                <span>Quốc gia: Mỹ</span>
                                <span>Năm sản xuất: 2021</span>
                                <span>Thể loại: Hành động, Phiêu lưu, Võ thuật, Viễn tưởng, Khoa học</span>
                                <span>Tóm tắt: Shang-Chi và Huyền Thoại Thập Nhẫn là bộ phim thuộc giai đoạn 4 của Vũ
                                    trụ điện ảnh Marvel. Nhân vật này được biết đến như một bậc thầy Kung Fu, tinh thông
                                    võ thuật. Sức mạnh của Shang-Chi đến từ hàng ngàn giờ luyện tập miệt mài và sự kỷ
                                    luật cao độ với bản thân. Siêu anh hùng võ thuật này được chính bố dạy dỗ để trở
                                    thành một sát thủ chuyên nghiệp và kế thừa tập đoàn tội ác của ông.</span>
                            </div>
                            <a href="xemphim.html" class="js-item-select-film">
                                <div class="chidren-big__intro--name">Shang chi</div>
                                <img class="children-big__intro--img"
                                    src="https://s198.imacdn.com/ff/2021/09/03/82a7d4bb966835a6_d087906b70c206f7_470111630676011916068.jpg"
                                    alt="">
                            </a>
                        </div>
                        <div class="children-big__intro children-big__intro-absolute">
                            <div class="thongtinfilm" hidden>
                                <span>./data/One vs Many - Prelude.mp4</span>
                                <span>Lệnh truy nã đỏ</span>
                                <span>Quốc gia: Mỹ</span>
                                <span>Năm sản xuất: 2021</span>
                                <span>Thể loại: Hành động, Hài hước, Hình sự, Gay cấn</span>
                                <span>Tóm tắt: Khi một vụ trộm táo bạo quy tụ chuyên gia tội phạm hàng đầu của FBI
                                    (Dwayne Johnson) và hai tên tội phạm (Gal Gadot và Ryan Reynolds), chuyện gì cũng
                                    có thể xảy ra.</span>
                            </div>
                            <a href="xemphim.html" class="js-item-select-film">
                                <div class="chidren-big__intro--name">Lệnh Truy Nã Đỏ</div>
                                <img class="children-big__intro--img"
                                    src="https://s198.imacdn.com/ff/2021/11/12/9a1bf51c1882e51b_5f2a0cce5d43edbd_335941636704270216068.jpg"
                                    alt="">
                            </a>
                        </div>
                        <div class="children-big__intro children-big__intro-absolute">
                            <a href="xemphim.html">
                                <div class="chidren-big__intro--name">Trò Chơi Con Mực</div>
                                <img class="children-big__intro--img"
                                    src="https://s198.imacdn.com/ff/2021/09/27/d47d7eaf8b6f62f9_8c53202770aa5ee9_663821632736055516068.jpg"
                                    alt="">
                            </a>
                        </div>
                        <div class="children-big__intro children-big__intro-absolute">
                            <a href="xemphim.html">
                                <div class="chidren-big__intro--name">Liên Minh Huyền Thoại</div>
                                <img class="children-big__intro--img"
                                    src="https://s198.imacdn.com/ff/2021/11/07/6590694a10b53f56_36c202825bfc2fef_525541636280209216068.jpg"
                                    alt="">
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </article> -->
        <!-- end slide  -->
        <article class="section__film-grid" v-if="filmHot">
            <h1 class="section__title section__title--primary"> <span class="fas fa-film title__icon--film"></span> PHIM
                MỚI CẬP NHẬT

                <!-- <a class="xemtatca" href="">xem tất cả <i class="fas fa-film title__icon--film"></i></a> -->
            </h1>
            <div class="film-grid__container">
                <section v-for="film in filmHot" class="film-grid__children">
                    <!-- <div class="thongtinfilm" hidden>
                        <span>./data/One vs Many - Prelude.mp4</span>
                        <span class="name-film">PURAORE! PRIDE OF ORANGE</span>
                        <span>Quốc gia: Nhật Bản</span>
                        <span>Năm sản xuất: 2021</span>
                        <span>Thể loại: Hoạt Hình, Thể Thao</span>
                        <span>Tóm tắt: Đây là bộ anime đầu tiên với nội dung xoay quanh một đội tuyển khúc côn cầu nữ,
                            dự kiến phim sẽ được công chiếu vào ngày 6 tháng 10.</span>
                    </div> -->
                    <router-link :to="{
                        name: 'watch',
                        params: { id: film.slug },
                    }">
                        <a href="#" class="js-item-select-film">
                            <img v-bind:src="'//img.ophim1.cc/uploads/movies/' + film.thumb_url" alt="">
                            <div class="film__sub">
                                <!-- <span class="icon--FHD">FHD</span> -->
                                <!-- <span class="sub-star"><i class="fas fa-star"></i>5.4/10</span> -->
                                <div class="name-film">{{ film.name }}</div>
                                <!-- <span class="film-views">( {{ film.origin_name }} )</span> -->
                                <!-- <span class="film-episode">10/12 tập</span> -->
                            </div>
                        </a>
                    </router-link>
                </section>
            </div>
        </article>
        <div class="viewMore"><a href="#top">
                <div class="viewMore--item" v-if="numPage < this.Films.length - 1" v-on:click="previousPage()"> <i
                        class="fa fa-arrow-left" aria-hidden="true"></i> Quay lại </div>
                <div class="viewMore--item" v-if="numPage > 0" v-on:click="viewMoreFilm()">Xem Thêm <i
                        class="fa fa-arrow-right" aria-hidden="true"></i></div>
            </a></div>
    </main>
</template>

<script>
import FilmService from "@/services/film.service";
import axios from 'axios';

export default {

    data() {
        return {
            Films: [],
            filmHot: [],
            numPage: "",

        };
    },
    methods: {
        async retrieveFilms() {
            try {
                this.Films = await FilmService.getAll();
                //lay film duoc dua vao db sau cung
                this.numPage = this.Films.length - 1
                this.filmHot = this.Films[this.numPage].items

            } catch (error) {
                console.log(error);
            }
        },
        viewMoreFilm() {
            if (this.numPage > 0) this.numPage--
            this.filmHot = this.Films[this.numPage].items
        },
        previousPage() {
            if (this.numPage < this.Films.length - 1) this.numPage++
            this.filmHot = this.Films[this.numPage].items
        },

    },

    created() {
        this.retrieveFilms()
        console.log("created")
    },
    mounted() {

    }

}
</script>

<style scoped>
@import "../assets/css/pageFilm.css";
</style>

