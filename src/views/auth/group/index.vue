<template>
    <el-button @click="dialogFormVisable = true">open</el-button>
    <el-dialog
        v-model="dialogFormVisable"
        :before-close="beforeClose"
        title="添加权限"
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
            <el-input v-model="form.id"/>
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请填写权限名称" />
        </el-form-item>
        <el-form-item>
            <el-tree
                ref="treeRef"
                style="max-width: 600px;"
                :data="permissionData"
                node-key="id"
                show-checkbox
               :default-checked-keys="defaultKeys"
               default-expanded-keys="[2]"
            />
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="confirm(formRef)">确认</el-button>
        </div>
    </template>
    </el-dialog>
</template>

<script setup>
    import { ref,reactive,onMounted } from 'vue';
    import { menuList, userGetMenu,userSetmenu } from '@/api';

onMounted(() => {
    // 菜单数据
    userGetMenu().then(({ data}) => {
            console.log(data);
            permissionData.value = data.data
    })
    getListDate()
})

const paginationData = reactive({
    pageNum: 1,
    pageSize:10
})

// 请求列表数据
const getListDate = () => {
    menuList(paginationData).then(({data}) => {
        
    })
}

const formRef = ref()

// form的数据
const form = reactive({
        id:'',
        name: '',
        permissions:''
    })

// 树形菜单权限数据
    const permissionData = ref([])

    // 弹窗的显示和隐藏
    const dialogFormVisable = ref(false)

    // 关闭弹窗的回调
const beforeClose = () => {
        dialogFormVisable.value = false
}

// 选中权限
const defaultKeys = [4, 5]
const treeRef = ref()

const rules = reactive({
    name:[{required:true, trigger:'blur',message:'请输入正确的权限'}]
})

// 表单提交
    const confirm = async (formEl) => {
        if (!formEl) return 
        await formEl.validate((valid, fields) => {
            if (valid) {
                const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
                userSetmenu({ name: form.name, permissions, id: form.id }).then(({ data }) => {
                    console.log(data)
                })
            } else {
                console.log('error submit',fields)
            }
        })
    }
</script>

<style lang="less" scoped>

</style>