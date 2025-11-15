<template>
    <panel-head :route="route"/>
    <div class="form">
        <el-form :inline="true" :model="searchInfo">
            <el-form-item prop="out_trade_no">
                <el-input v-model="searchInfo.out_trade_no" placeholder="订单号" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="tableData.list">
        <el-table-column label="订单号" prop="out_trade_no" width="130" fixed="left"></el-table-column>
        <el-table-column label="就诊医院" prop="hospital_name"></el-table-column>
        <el-table-column label="陪诊服务" prop="service_name"></el-table-column>
        <el-table-column label="陪护师头像">
            <template #default="scope">
                <el-image :src="scope.row.companion.avatar" style="width:40px;height: 40px;"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="陪护师手机号" width="110px">
            <template #default="scope">
                {{ scope.row.companion.mobile }}
            </template>
        </el-table-column>
        <el-table-column label="总价" prop="price"></el-table-column>
        <el-table-column label="已付" prop="paidPrice"></el-table-column>
        <el-table-column label="下单时间" width="100px">
            <template #default="scope">
                {{ dayjs(scope.row.order_start_time).format('YYYY-MM-DD') }}
            </template>
        </el-table-column>
        <el-table-column label="订单状态">
            <template #default="scope">
                <el-tag :type="statusMap(scope.row.trade_state)">{{ scope.row.trade_state }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="接单状态" prop="service_state"></el-table-column>
        <el-table-column label="联系人手机号" prop="tel" width="120px"></el-table-column>
        <el-table-column label="操作" fixed="right">
            <template #default="scope">
                <el-popconfirm
                    v-if="scope.row.trade_state === '待服务'"
                    confirm-button-text="是"
                    cancel-button-text="否"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="是否确认完成?"
                    @confirm="confirmEvent(scope.row.out_trade_no)"
                >
                    <template #reference>
                        <el-button type="primary" link>服务完成</el-button>
                    </template>
                </el-popconfirm>
                <el-button v-else type="primary" link disabled>暂无服务</el-button>
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
    
</template>

<script setup>
import { adminOrder,updateOrder } from '@/api'
import { Plus,Delete,InfoFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'

const route = useRoute()

onMounted(() => {
    getListData()
})

const searchInfo = reactive({
    out_trade_no: ''
})

const onSearch = () => {
    getListData(searchInfo)
}

const paginationData = reactive({
    pageNum:1,
    pageSize:10
})

const tableData = reactive({
    list: [],
    total:0
})

const getListData = (params = {}) => {
    adminOrder({...paginationData,...params}).then(({ data }) => {
        const { list, total } = data.data
        tableData.list = list
        tableData.total = total
    })
}

const statusMap = (key) => {
    const statusObj = {
        '已取消' : 'info',
        "待支付" : 'warning',
        "已支付" : 'success'
    }
    return statusObj[key]
}

const confirmEvent = (id) => {
    updateOrder({ id }).then(({data}) => {
        if (data.code === 10000) {
            getListData()
        }
    })
}

// 分页
const handleSizeChange = (val) => {
    paginationData.pageSize = val
}

const handleCurrentChange = () => {
    paginationData.pageNum = val
}

</script>
<style lang="less" scoped>
.form {
    display: flex;
    justify-content: flex-end;
    padding:10px 0 10px 10px;
    background-color: #fff;
}
</style>