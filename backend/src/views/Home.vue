<template>
    <div class="home">
        <div class="container">
          <DownloadSerch></DownloadSerch>
        </div>
    </div>
</template>

<script>
import DownloadSerch from "../components/DownloadSerch";
export default {
  components:{DownloadSerch},
  data () {
    return {

    }
  },
  methods:{

  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/timg.jpg) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>