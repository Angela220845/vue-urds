<template>
    <div>
        <div class="title">
            <el-table :data="reportList" border style="width: 100%">
                <el-table-column prop="Timestamp" label="源数据库服务 ">
                </el-table-column>
                <el-table-column prop="ServerId" label="目标数据库服务 ">
                </el-table-column>
                <el-table-column prop="MysqlId" label="源库表 ">
                </el-table-column>
                <el-table-column prop="" label="目标库表 ">
                </el-table-column>
                <el-table-column prop="" label="源字符集  ">
                </el-table-column>
                <el-table-column prop="" label="目标字符集  ">
                </el-table-column>
                <el-table-column prop="" label="归档条件  ">
                </el-table-column>
                <el-table-column prop="" label="归档时间  ">
                </el-table-column>
                <el-table-column prop="" label="归档状态  ">
                </el-table-column>
                <el-table-column prop="" label="用户 ">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                                <span class="operate">归档数据</span>
</template>
                </el-table-column>

                    
            </el-table>
        </div>
    </div>
</template>
  

<script>
    import {
        reportList,
    } from './model.js'
    export default {
        created() {
            this.reportList = reportList
        },
        data() {
            return {
                reportList: [],
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
    .operate{
        color: #409EFF;
        cursor: pointer;
    }
</style>
