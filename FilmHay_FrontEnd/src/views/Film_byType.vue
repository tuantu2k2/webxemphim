<template>
    <main class="page__main">
        <article class="section__film-grid" v-if="slugs">
            <h1 class="section__title section__title--primary" > <span class="fas fa-film title__icon--film"></span> PHIM {{keyType}}

            </h1>
            <div class="film-grid__container" >
                <section v-for="film in slugs"    class="film-grid__children">
                    <router-link :to="{
                        name: 'watch',
                        params: { id: film.movie.slug },
                    }">
                        <a href="#" class="js-item-select-film">
                            <img v-bind:src="film.movie.thumb_url"
                            alt="">
                            <div class="film__sub">
                                <div class="name-film">{{ film.movie.name }}</div>
                            </div>
                        </a>
                    </router-link>
                </section>
            </div>
        </article>
    </main >
</template>

<script>
import FilmService from "@/services/film.service";
import axios from 'axios';

export default {
    props:{
        id:{type:String, require:true}
    },
    data() {
        return {
            Films: [],
            listFilm: [],
            slugs: [], //All film by type
            keyType:""


        };
    },
    methods: {
        async retrieveFilms() {
            try {
                if(this.id == "single") this.keyType = "lẻ"
            else this.keyType = "bộ"
                this.Films = await FilmService.getAll();
                //lay film duoc dua vao db sau cung
                const numPage = this.Films.length - 1
                for(let i = 0; i < this.Films.length; i++)
                    for(let j = 0; j < this.Films[i].items.length;j++){
                        this.listFilm.push(this.Films[i].items[j])
                    }
                for (let i = 0; i < this.listFilm.length; i++)
                        this.getInforFilm(this.listFilm[i].slug);
                    
            } catch (error) {
                console.log(error);
            }
        },
        checkType(type){


                    if(type == this.id) return true
            return false
        },
        getInforFilm(slug) {
            axios.get(`https://ophim1.com/phim/${slug}`)
                .then(res => {
                    if(this.checkType(res.data.movie.type))
                        this.slugs.push(res.data);
                })
                .catch(error => console.log(error));
        }

    },
    watch:{
        id(){
            if(this.id == "single") this.keyType = "lẻ"
            else this.keyType = "bộ"
            //khi id thay doi doi thi render lai slugs
            this.slugs = []
            for (let i = 0; i < this.listFilm.length; i++)
                        this.getInforFilm(this.listFilm[i].slug);
        }
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

