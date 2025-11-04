<template>
    <div class="btns">
        <el-button :icon="Plus" type="primary" @click="open(null)" size="small">新增</el-button>
    </div>
    <el-table :data="tableData.list" style="width: 100%;">
        <el-table-column type="selection" width="55px" @selection-change="handleSelectionChange"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column label="头像">
            <template #default="scope">
                <el-image
                    style="width:50px;height:50px"
                    :src="scope.row.avatar"
                ></el-image>
            </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
            <template #default="scope">
                {{ scope.row.sex === '1'?'男':'女'}}
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <div class="flex-box">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left: 10px;">{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" @click="open(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-info">
        <el-pagination
            v-model:current-page="paginationData.pageNum"
            :page-size="paginationData.pageSize"
            :background="false"
            layout="total, prev, pager, next"
            size="small"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
    <el-dialog
        v-model="dialogFormVisable"
        :before-close="beforeClose"
        title="陪护师添加"
        width="500"
    >
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="name">
                <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisable=true">点击上传</el-button>
                <el-image
                    v-else
                    :src="form.avatar"
                    style="width:100px;height: 100px;"
                />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"/>
                    <el-option label="女" value="2"/>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="form.age" :min="18" :max="48"/>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="是否生效" prop="active">
                <el-radio-group v-model="form.active">
                    <el-radio :value="0">失效</el-radio>
                    <el-radio :value="1">生效</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)">提交</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog
        v-model="dialogImgVisable"
        :before-close="beforeClose"
        title="图片选择"
        width="680"
    >
        <div class="image-list">
            <div  v-for="(item,index) in fileList" :key="item.name" class="img-box" @click="selectIndex = index">
                <div v-if="selectIndex === index" class="select">
                <el-icon color="#fff"><Check /></el-icon>
                </div>
                <el-image
                    style="width:148px; height:148px"
                    :src="item.url"
                ></el-image>
            </div>   
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogImgVisable=false">取消</el-button>
                <el-button type="primary" @click="confirmImg">选择</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref ,onMounted} from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { photoList,companion,companionList } from '@/api';
import { ElMessage } from 'element-plus';

onMounted(() => {
    photoList().then(({ data }) => {
        fileList.value = data.data
    })
    getListData()
})

const fileList = ref([])

const selectIndex = ref(0)
const dialogImgVisable = ref(false)

const confirmImg = () => {
    form.avatar = fileList.value[selectIndex.value].url
    dialogImgVisable.value = false
}

const dialogFormVisable = ref(false)

// 列表数据
const tableData = reactive({
    list: [],
    total:0
})

const paginationData = reactive({
    pageNum:1,
    pageSize:10
})

// 分页
const handleSizeChange = (val) => {
    paginationData.pageSize = val
}

const handleCurrentChange = () => {
    paginationData.pageNum = val
}

const getListData = () => {
    companionList(paginationData).then(({ data }) => {
        const { list, total } = data.data
        tableData.list = list
        tableData.total = total
    })
}

const beforeClose = () => {
    dialogFormVisable.value = false
    // 清空数据
    formRef.value.resetFields()
}
const formRef = ref()
const form = reactive({
    id: '',
    mobile: '',
    active: 1,
    age: 18,
    avatar: '',
    name: '',
    sex:''
})

const rules = reactive({
    name: [{ required: true, trigger: 'blur', message: '请输入昵称' }],
    avatar: [{ required: true, message: '请选择头像' }],
    sex: [{ required: true, trigger: 'change', message: '请选择性别' }],
    mobile:[{required: true, trigger: 'blur', message: '请输入手机号'}]
})

const confirm = async (formEl) => {
    if (!formEl) return 
    await formEl.validate((valid, fields)=> {
    if (valid) {
        companion(form).then(({ data }) => {
            if (data.code === 10000) {
                ElMessage.success('success!')
                beforeClose()
            } else {
                ElMessage.error(data.message)
            }
        })
    } else {
            console.log('error submit',fields)
        }
    })
}

const open = () => {
    dialogFormVisable.value = true
}

const handleSelectionChange = () => {
    
}

</script>

<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #a4db89;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>