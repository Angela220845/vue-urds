<template>
    <el-date-picker v-model="startTime" type="datetime" placeholder="选择起始时间" align="right" :picker-options="startPicker">
    </el-date-picker>
</template>

<script>
    export default {
        data() {
            return {
                queryTime: "",
                startPicker: {
                    shortcuts: [{
                            text: "今天",
                            onClick(picker) {
                                picker.$emit("pick", new Date());
                            }
                        },
                        {
                            text: "昨天",
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit("pick", date);
                            }
                        },
                        {
                            text: "一周前",
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", date);
                            }
                        }
                    ]
                },
                startTime: "",
            }
        }
    }
</script>
