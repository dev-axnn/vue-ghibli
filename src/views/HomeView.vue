<template>
  <div class="ghibli-logo"></div>
  <div class="movie-serch">
    <input type="text" placeholder="찾으시는 영화를 검색하세요">
    <button>Search</button>
  </div>
  <div class="movie" v-for="(item, index) in movieList" :key="index">
    <MovieList :propsdata = "item"/>
  </div>
  <button class="gotop" ref="gotop" @click="moveTop">Go Top</button>
</template>

<script>
  import { computed, onUpdated, ref } from 'vue';
  import { useStore } from 'vuex';
  import MovieList from '../components/MovieList.vue';

  export default {
    components: { 
      MovieList 
    },
    setup(props, context) {
      const store = useStore();
      // 처음에는 computed 가 결과가 없는 상태
      const movieList = computed(() => store.getters.getMovieList);
      // html 태그의 속성으로 ref를 사용
      const gotop = ref(null);

      // axios 실행 > vuex : mutation 실행
      onUpdated(() => {
        // 내용물이 최종 업데이트가 되었다면 App 으로
        // intro 가 사라지라고 신호를 보낸다.
        let delay = setTimeout(() => {
          clearTimeout(delay);
          context.emit('hide');
        }, 1500);
      });

      const moveTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }

      return {
        movieList,
        gotop,
        moveTop
      }
    }
  }
</script>

<style scoped>
  .ghibli-logo {
    width: 100%;
    height: 20vw;
    background: url('@/assets/images/ghibli-logo.png') no-repeat center;
    background-size: contain;
    margin-top: 50px;
  }

  .movie-serch {
    position: relative;
    width: 93.5%;
    margin: 0 auto;
    transition: width 0.3s;
  }

  .movie-serch input {
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 10px 10px 10px 10px;
    margin-top: 40px;
    padding: 0 12% 0 2.5%;
    font-size: 16px;
    font-weight: 800;
    line-height: 50px;
    color: #444;
  }

  .movie-serch input::placeholder {
    font-size: 14px;
    color: #aaa;
  }

  .movie-serch button {
    position: absolute;
    right: 0;
    top: 40px;
    width: 10%;
    height: 50px;
    border: 0;
    border-radius: 0px 10px 10px 0px;
    background: #ffa606;
    background-size: 60%;
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    transition: width 0.3s;
    cursor: pointer;
  }

  .movie {
    position: relative;
    display: block;
    width: 29%;
    background: #fff;
    margin-top: 3vw;
    border-radius: 5px;
    color: #adaeb9;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .gotop {
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    font-size: 0;
    background: #000 url(@/assets/images/right-arrow.png) no-repeat center;
    background-size: 50%;
    transform: rotate(-90deg);
    /* border: 2px solid #fff; */
    border-radius: 25px;
    cursor: pointer;
  }

  @media screen and (max-width: 1350px){
    .movie {
      width: 45%;
    }
    
    .movie-serch input {
      padding: 0 12% 0 3.5%;
    }

    .movie-serch button {
      width: 12%;
    }
  }

  @media screen and (max-width: 1000px){
    .movie-serch button {
      width: 15%;
    }
  }

  @media screen and (max-width: 750px){
    .ghibli-logo {
      height: 30vw;
    }
    
    .movie-serch {
      width: 80%;
    }

    .movie-serch input {
      padding: 0 18% 0 5%;
      font-size: 15px;
    }

    .movie-serch button {
      width: 20%;
    }
    
    .movie {
      width: 70%;
      margin: 0 auto;
      margin-top: 8vw;
    }
  }

  @media screen and (max-width: 650px){
    .movie-serch input {
      padding: 0 18% 0 5%;
      font-size: 14px;
    }
    
    .movie-serch button {
      font-size: 14px;
    }

    .movie {
      width: 80%;
    }
  }

  @media screen and (max-width: 500px){
    .ghibli-logo {
      height: 45vw;
    }

    .movie-serch {
      width: 90%;
    }

    .movie-serch input {
      height: 40px;
      font-size: 14px;
      line-height: 40px;
    }

    .movie-serch input::placeholder {
      font-size: 12px;
    }

    .movie-serch button {
      height: 40px;
    }
    
    .movie {
      width: 90%;
    }
  }

  @media screen and (max-width: 400px){
    .movie-serch button {
      font-size: 11px;
    }
    
    .movie {
      margin-top: 5vw;
    }
  }
</style>