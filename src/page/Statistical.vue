<template>
  <div class="statistical">
    <el-row>
      <el-col :xs="12" :sm="14" :md="16" :lg="18" :xl="18">
        <Application></Application>
      </el-col>
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="6">
        <RealTime></RealTime>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <Virus></Virus>
      </el-col>
      <el-col :span="14">
        <Dynamic></Dynamic>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <Sensitives></Sensitives>
      </el-col>
      <el-col :span="12">
        <Securityflaws></Securityflaws>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Application from '../components/Statistics/Application'
import RealTime from '../components/Statistics/RealTime'
import Virus from '../components/Statistics/Virus'
import Dynamic from '../components/Statistics/Dynamic'
import Sensitives from '../components/Statistics/Sensitives'
import Securityflaws from '../components/Statistics/Securityflaws'

export default {
  name: 'Statistical',
  data () {
    return {

    }
  },
  components: {
    Application,
    Virus,
    Dynamic,
    RealTime,
    Sensitives,
    Securityflaws
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.statistical{
  margin: 0 20px;
}
</style>
