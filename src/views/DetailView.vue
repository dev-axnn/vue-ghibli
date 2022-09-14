<template>
  <div>
    <div class="movie-box" :style="{backgroundImage: `url(${movieInfo.movie_banner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}">
      <a class="a-back" v-on:click.stop="back">All list</a>
      <div class="movie-detail">
        <img class="movie-img" :src="movieInfo.image" :alt="movieInfo.title">
        <div class="movie-info-wrap">
          <h2 class="movie-title">{{movieInfo.title}} <small>{{movieInfo.original_title}}</small></h2>
          <p class="movie-info">
            Release Date : {{movieInfo.release_date}} <br/>
            Director : {{movieInfo.director}} <br/>
            Producer : {{movieInfo.producer}} <br/>
            Running Time : {{movieInfo.running_time}}분
          </p>
          <p class="movie-desc">{{movieInfo.description}}</p>
        </div>
        <div class="movie-box-cover"></div>
      </div>

    </div>
    <Transition name="fade">
      <div class="detail-intro" v-if="show">
        <div class="intro-main"><p>loading . . .</p></div>
        <div class="intro-cover"></div>
        <div class="intro-img"></div>
      </div>
    </Transition>
  </div>
</template>

<script>
  // router 를 통해 전송받은 data 활용
  import { computed, onMounted, onUpdated, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  export default {
    setup(props, context){
      const route = useRoute();
      const id = route.params.id;
      const store = useStore();
      store.dispatch('fetchMovieInfo', id);
      const movieInfo = computed(() => store.getters.getMovieInfo);
      const router = useRouter();
      const back = () => {
        router.push('/build-ghibli/home');
      }

      const show = ref(true);
      onMounted(() => {
        // 스크롤바를 최상단으로 이동시킨다.
        window.scrollTo(0, 0);
        document.querySelector('html').style.overflowY='hidden';
      })

      onUpdated(() => {
        show.value = false;
        document.querySelector('html').style.overflowY='auto';
        context.emit('hide');
      })

      return{
        id,
        movieInfo,
        back,
        show
      }
    }
  }
</script>

<style scoped>
  .movie-box-cover {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }

  .movie-box {
    position: relative;
    display: block;
    float: right;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }

  .a-back {
    position: absolute;
    left: 40px;
    top: 40px;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    font-size: 0;
    background: #fff url('@/assets/images/right-arrow.png') no-repeat center;
    background-size: 50%;
    transform: rotate(180deg);
    cursor: pointer;
    z-index: 1;
    transition: all 0.3s;
    transition: background 0.1s;
  }

  .a-back:hover {
    background-size: 58%;
  }

  .movie-detail {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .movie-img {
    position: relative;
    display: block;
    width: auto;
    height: 70%;
    border-radius: 10px;
    border: 10px solid #fff;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25);
    margin-left: 8%;
    z-index: 1;
    transition: all 0.3s;
  }

  .movie-info-wrap {
    position: relative;
    display: block;
    width: 45%;
    margin-right: 8%;
    z-index: 1;
    transition: all 0.3s;
  }

  .movie-title {
    position: relative;
    display: block;
    width: 100%;
    font-size: 20px;
    background: #fff;
    border-radius: 5px;
    color: #000;
    padding: 10px 20px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .movie-title small {
    position: relative;
    display: block;
    float: right;
    color: #333;
    font-size: 12px;
    margin-top: 5px;
  }

  .movie-info {
    position: relative;
    display: block;
    width: 100%;
    font-size: 14px;
    background: #fff;
    border-radius: 5px;
    color: #000;
    padding: 10px 20px;
    margin-bottom: 10px;
  }

  .movie-desc {
    position: relative;
    display: block;
    width: 100%;
    font-size: 14px;
    background: #fff;
    border-radius: 5px;
    color: #000;
    padding: 10px 20px;
  }

  .detail-intro {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .intro-main {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 25vw;
    height: 25vw;
    background: url('@/assets/images/ghibli-logo.png') no-repeat center;
    background-size: contain;
    z-index: 2;
  }

  .intro-main p {
    position: absolute;
    left: 50%;
    bottom: -10%;
    transform: translateX(-50%);
    text-align: center;
    color: #fff;
    font-size: 2.5vw;
    white-space: nowrap;
    font-weight: 700;
  }

  .intro-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.90);
    z-index: 1;
  }

  .intro-img {
    width: 100%;
    height: 100%;
    background: url('@/assets/images/intro2.jpg') no-repeat center;
    background-size: cover;
  }

  @media screen and (max-width: 1600px){
    .movie-info-wrap {
      width: 40%;
    }

    .movie-img {
      height: 65%;
    }
  }

  @media screen and (max-width: 1300px){
    .movie-info-wrap {
      width: 40%;
      margin-right: 5%;
    }

    .movie-img {
      height: 60%;
      margin-left: 5%;
    }
  }

  @media screen and (max-width: 1000px){
    .movie-box {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }

    .movie-img{
      width: 40%;
      margin: 100px 30% 30px;
    }

    .movie-info-wrap {
      width: 40%;
      margin: 0 30% 100px;
    }

    .movie-box-cover {
      height: 100%;
    }
  }

  @media screen and (max-width: 890px){
    .movie-img{
      width: 56%;
      margin: 100px 22% 30px;
    }

    .movie-info-wrap {
      width: 56%;
      margin: 0 22% 100px;
    }
  }

  @media screen and (max-width: 700px){
    .movie-img{
      width: 56%;
      margin: 100px 22% 20px;
    }

    .movie-info-wrap {
      width: 56%;
      margin: 0 22% 100px;
    }

    .a-back {
      left: 5vw;
      top: 5vw;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }

    .movie-title {
      font-size: 18px;
      padding: 10px 20px;
      margin-bottom: 15px;
    }

    .movie-title small {
      font-size: 12px;
      margin-top: 5px;
    }

    .movie-info {
      font-size: 12px;
      padding: 10px 20px;
      margin-bottom: 8px;
    }

    .movie-desc {
      font-size: 12px;
      padding: 10px 20px;
    }
  }

  @media screen and (max-width: 600px){
    .movie-img{
      width: 65%;
      margin: 70px 17% 20px;
    }

    .movie-info-wrap {
      width: 65%;
      margin: 0 17% 70px;
    }

    .a-back {
      width: 36px;
      height: 36px;
      border-radius: 18px;
    }

    .movie-title small {
      float: none;
      color: #999;
      font-size: 10px;
      margin-bottom: 3px;
    }

    .movie-info {
      font-size: 11px;
    }

    .movie-desc {
      font-size: 11px;
    }
  }

  @media screen and (max-width: 500px){
    .movie-img{
      width: 86%;
      margin: 18vw 7% 20px;
    }

    .movie-info-wrap {
      width: 86%;
      margin: 0 7% 70px;
    }

    .a-back {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }

    .movie-title small {
      float: none;
      color: #999;
      font-size: 10px;
      margin-bottom: 3px;
    }

    .movie-info {
      font-size: 11px;
    }

    .movie-desc {
      font-size: 11px;
    }
  }
</style>