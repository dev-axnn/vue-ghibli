<template>
  <div class="wrap">
    <div class="container">
      <Transition name="fade">
        <div class="intro" v-if="show">
          <div class="intro-main"><p>loading . . .</p></div>
          <div class="intro-cover"></div>
          <div class="intro-img"></div>
        </div>
      </Transition>
      <RouterView v-on:hide="hideIntro"/>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  export default {
    components: {
      
    },
    setup() {
      // vuex 에 dispatch 전송
      const store = useStore();
      // 각각의 페이지에서 자료 호출 할 지는 알아서 선택
      store.dispatch('fetchMovieList');
      // 인트로 화면 관련 : show 가 true면 보이고, false면 사라진다.
      const show = ref(true)
      const hideIntro = () => {
        show.value = false;
        document.querySelector('html').style.overflowY='auto';
      }

      return{
        show,
        hideIntro
      }
    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  html {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    background: #353535;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  /* scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    background-color: #f7f7f7;
    -moz-border-radius: 0px;
    -webkit-border-radius: 0px;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #aaa;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
  }

  .wrap {
    position: relative;
    display: block;
  }

  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-evenly;
    width: 100%;
  }

  .intro {
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
    background: url('@/assets/images/intro.jpg') no-repeat center;
    background-size: cover;
  }
</style>