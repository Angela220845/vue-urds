<template>
  <div>
    <ModalForm
      :dialogFormVisible="visible"
      :close="close"
      :submit="submit"
      title="修改实例规格"
    >
      <template slot="main">
        <el-form :model="form" :rules="rules" ref="updateStandForm">
          <el-form-item
            label="服务ID"
            :label-width="formLabelWidth"
            prop="db_service_id"
          >
            <el-input v-model="form.db_service_id" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="服务名称"
            :label-width="formLabelWidth"
            prop="db_service_name"
          >
            <el-input v-model="form.db_service_name" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="服务规格"
            :label-width="formLabelWidth"
            prop="service_class_id"
          >
            <el-select
              v-model="form.service_class_id"
              placeholder="请选择服务规格"
            >
              <el-option
                :label="item.service_class_name"
                :value="item.service_class_id"
                v-for="(item, index) in stands"
                :key="item.service_class_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </ModalForm>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
import ModalForm from "@/common-components/modalForm.vue";
import apiEum from "@/api/mysqlList.js";

export default {
  props: {
    visible: { type: Boolean, required: true },
    rowData: {
      type: Object,
      required: true
    },
    stands: {
      type: Array,
      required: true
    }
  },
  components: {
    ModalForm
  },
  watch: {
    stands: {
      handler(curr) {
        if (curr) {
          console.log(this.stands);
        }
      }
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        db_service_id: "",
        db_service_name: "",
        service_class_id: ""
      },
      rules: {
        db_service_id: [
          {
            required: true,
            trigger: "change"
          }
        ],
        db_service_name: [
          {
            required: true,
            trigger: "change"
          }
        ],
        service_class_id: [
          {
            required: true,
            trigger: "change",
            message: "实例规格不能为空"
          }
        ]
      }
    };
  },
  watch: {
    rowData(curr) {
      const { db_service_id, db_service_name } = curr;
      this.form.db_service_id = db_service_id;
      this.form.db_service_name = db_service_name;
    }
  },

  methods: {
    submit() {
      const cloneForm = cloneDeep(this.form);
      const postData = {
        db_service_id: cloneForm.db_service_id,
        db_service_name: cloneForm.db_service_name,
        service_class_id: cloneForm.service_class_id
      };
      this.$refs.updateStandForm.validate(validate => {
        if (validate) {
          this.axiosApi.post(apiEum.update_stand, postData).then(res => {
            this.close();

            this.$message({ type: "success", message: "修改成功" });
          });
        } else {
          return false;
        }
      });
    },
    close() {
      console.log("关闭");
      this.$emit("close");
    }
  }
};
</script>
