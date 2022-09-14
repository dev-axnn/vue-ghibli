<template>
  <div class="movie-box">
    <a v-on:click.stop="detailMove">
      <div class="a-img">
        <img :src="propsdata.image"/>
      </div>
      <h2 class="a-title">{{propsdata.title}} <small>{{propsdata.original_title}}</small></h2>
      <p class="a-desc">{{propsdata.description}}</p>
    </a>
  </div>
</template>

<script>
  // router 를 이용한 페이지 이동w
  import { useRouter } from 'vue-router';

  export default {
    props: ['propsdata'],
    setup(props){
      const router = useRouter();
      const detailMove = () => {
        // props 를 참조하고자 할 때는 setup(props)를 활용
        router.push('/build-ghibli/detail/' + props.propsdata.id);
      }

      return{
        detailMove
      }
    }
  }
</script>

<style scoped>
  .movie-box {
    position: relative;
    display: block;
  }

  .movie-box a {
    position: relative;
    display: block;
  }

  .a-img {
    position: relative;
    display: block;
    width: 100%;
    height: 35vw;
    overflow: hidden;
    border-radius: 10px;
  }

  .a-img img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .a-title {
    position: relative;
    display: block;
    margin: 20px 0;
    font-size: 20px;
    overflow: hidden;
  }

  .a-title small {
    display: block;
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: #999;
    margin-top: 5px;
  }

  .a-desc {
    position: relative;
    display: block;
    margin-bottom: 20px;
    font-size: 12px;
    line-height: 1.25;
    color: #333;
  }

  @media screen and (max-width: 1350px){
    .a-img {
      height: 55vw;
    }
  }

  @media screen and (max-width: 750px){
    .a-img {
      height: 85vw;
    }

    .a-title {
      font-size: 18px;
    }
    
    .a-title small {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 650px){
    .a-img {
      height: 100vw;
    }
  }

  @media screen and (max-width: 500px){
    .a-img {
      height: 105vw;
    }
  }

  @media screen and (max-width: 400px){
    .a-img {
      height: 112vw;
    }
  }
</style>