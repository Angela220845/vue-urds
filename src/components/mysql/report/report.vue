<template>
    <div>
        <div class="title">
            <span>MYSQL服务：</span>
            <el-select v-model="mysqlServiceId" filterable placeholder="请选择Mysql服务" :filter-method="filterMethod()">
                <el-option v-for="item in mysqlIdList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-table :data="reportList" border style="width: 100%">
                <el-table-column prop="Timestamp" label="巡检报告触发时间">
                </el-table-column>
                <el-table-column prop="ServerId" label="主机名">
                </el-table-column>
                <el-table-column prop="MysqlId" label="MySQL实例ID">
                </el-table-column>
                <el-table-column label="巡检报告状态">
                    <template slot-scope="scope">
                            <router-link :to="'/mysql_list/mysql_report/diagnosis_report?key='+scope.row.Timestamp+'&service_id='+scope.row.ServerId"><span>点击查看</span></router-link>
                    </template>
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>
  

<script>
    import {
        reportList,
        mysqlIdList
    } from '../model/report_model.js'
    export default {
        created() {
            this.reportList = reportList
            this.mysqlIdList = mysqlIdList
        },
        data() {
            return {
                reportList: [],
                mysqlIdList: [],
                mysqlServiceId: ''
            }
        },
        methods: {
            filterMethod() {
                console.log(this.mysqlServiceId)
            }
        }
    }
</script>

<style lang="css" scoped>
    a {
        color: #409EFF
    }
</style>
