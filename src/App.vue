<template>
  <div id="app">
    <HelloEts></HelloEts>
    <div>{{userInfo}}</div>
    <el-menu mode="horizontal" :router="true">
      <el-menu-item index="/page1">page1</el-menu-item>
      <el-menu-item index="/page2">page2</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloEts from "./components/HelloEts.vue"
import { mapState } from 'vuex'
import { getUserInfo } from "./api/user"
export default {
  name: 'App',
  components: {
    HelloEts,
  },
  data() {
    return {}
  },
  mounted() {
    getUserInfo().then(res => {
      this.$store.commit('changeUserInfo', res.data)
    })
  },
  methods: {
    
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  }
}
</script>

<style lang="scss" scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16Px;
}
</style>
