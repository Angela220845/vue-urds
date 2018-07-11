<template>
  <div>
    <el-tabs type="border-card" v-for="(item,index) in overview_list" :key="index">
      <el-tab-pane label="概览">
        <ul>
          <li>
            <div>服务ID</div>
            <span>{{item.service_id}}</span></li>
          <li>
            <div>服务名</div>
            <span>{{item.db_service_name}}</span></li>
          <li>
            <div>实例组ID</div>
            <span>{{item.mysql_group_id}}</span></li>
          <li>
            <div>可用区</div>
            <span>{{item.zone_id+'('+item.zone_name+')'}}</span></li>
          <li>
            <div>费用</div>
            <span>{{item.price}}</span></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="访问方式">
        <ul>
          <li>
            <div>MySQL命令行</div>
            <span>{{item.connection_string[0]}}</span></li>
          <li>
            <div>JDBC</div>
            <span>{{item.connection_string[1]}}</span></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="运行状态">
        <ul>
          <li>
            <div>状态</div>
            <span>{{item.run_status}}</span></li>
          <li>
            <div>创建时间</div>
            <span>{{item.create_time}}</span></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="规格：小型">
        <ul>
          <li>
            <div>CPU</div>
            <span>{{item.service_class.cpu}}</span></li>
          <li>
            <div>内存</div>
            <span>{{item.service_class.memory}}</span></li>
          <li>
            <div>磁盘</div>
            <span>{{item.service_class.disk}}</span></li>
          <li>
            <div>数据库版本</div>
            {{'V'+item.mysql_version}}<span></span></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="架构：高可用">
        <div>
          <p><span>CPU:{{item.mysql_instances[0].cpu}}</span>|<span>内存:{{item.mysql_instances[0].memory}}</span>|<span>磁盘:{{item.mysql_instances[0].disk}}</span>
          </p>
          <div class="zone_name">{{item.zone_id+'('+item.zone_name+')'}}</div>
        </div>
        <div class="icon iconfont icon-shujuku">
          <span class="tag">{{item.mysql_instances[0].role | initialCapitalization}}</span>
          <p>{{item.mysql_instances[0].mysql_id}}</p>
          <p>{{item.mysql_instances[0].ip+':'+item.mysql_instances[0].port}}</p>
        </div>
        <div class="icon iconfont icon-shujuku">
          <span class="tag">{{item.mysql_instances[1].role | initialCapitalization}}</span>
          <p>{{item.mysql_instances[1].mysql_id}}</p>
          <p>{{item.mysql_instances[1].ip+':'+item.mysql_instances[0].port}}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="备份集">
        <el-table
          :data="backupList"
          height="855"
          header-align="center"
          border
          style="width: 100%">
          <el-table-column
            prop="instId"
            label="MySQL实例"
            width="180">
          </el-table-column>
          <el-table-column
            prop="setId"
            label="备份集ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="gtid"
            label="gtid">
          </el-table-column>
          <el-table-column
            prop="backupTime"
            label="备份集时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import {overview_list, backupList} from './model/mysql_overview_model'

  export default {
    created() {
      this.overview_list = overview_list
      this.backupList = backupList
      this.getOverviewData()
      this.params.service_id = this.$route.query.service_id
      console.log(this.params);// 获取概览信息，需要传入service_id。
    },
    data() {
      return {
        overview_list: [],
        backupList: [],
        params:{}
      }
    },
    methods: {
      getOverviewData() {
      //  传入params获取数据
      }
    },
    filters: {
      initialCapitalization(value) {
        if (!value) {
          return ''
        }
        var arr = value.split('_')
        return arr[2].charAt(0).toLocaleUpperCase() + (arr[2].slice(1)).toLocaleLowerCase()
      }

    }
  }
</script>
<style :lang="css" scoped>
  div[role='tabpanel'] {
    padding-left: 40%;
  }

  div[role='tabpanel']:last-child {
    padding-left: 0;
  }

  ul > li {
    margin-top: 20px;
    color: #909399;
  }

  li > div:first-child {
    float: left;
    width: 150px;
  }

  #pane-4 {
    height: 200px;
    padding-left: 0;
    position: relative;
  }

  #pane-4 > div {
    text-align: center;
  }

  #pane-4 > div:nth-child(1) {
    width: 100%;
    color: green;
    margin-bottom: 40px;
  }

  #pane-4 > div:nth-child(2) {
    width: 49%;
    height: 160px;
    background-color: #eee;
    clear: both;
    float: left;
    color: #00a8e6;
    padding-top: 20px;
    box-sizing: border-box;
    position: relative;
  }

  #pane-4 > div:nth-child(2) span {
    border: 1px solid #00a8e6;

  }

  #pane-4 > div:nth-child(3) {
    width: 49%;
    height: 160px;
    float: right;
    color: #666;
    background-color: #eee;
    padding-top: 20px;
    box-sizing: border-box;
    position: relative;
  }

  #pane-4 > div:nth-child(3) span {
    border: 1px solid #666;
  }

  #pane-4 > div:before {
    font-size: 50px;
  }
  .zone_name{
    float: left;
  }
  .tag {
    padding: 2px;
    border-radius: 4px;
    font-size: 14px;
    position: absolute;
    left: 10px;
    top: -10px;

  }
</style>
