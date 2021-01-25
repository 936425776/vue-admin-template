<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:20px;">
                    <i class="el-icon-lx-cascades"></i> 播放模板
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="none">
                    <div style="height:250px;text-align:center;">
                        <div style="height:200px;text-align:center;line-height:200px;border:2px solid gray;overflow:hidden;">
                       视频列表/图片列表 切换
                   </div>
                   <el-button type="primary" style=" margin-top:20px;" >以此建立播放组合</el-button>
                   </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="none">
                    <div style="height:250px;text-align:center;">
                        <div style="height:200px;border:2px solid gray;">
                            <div style="height:140px;border-bottom:2px solid gray; display:flex; line-height:140px;">
                                <div style="width:30%;height:140px;border-right:2px solid gray;overflow:hidden;">天气现行</div>
                                <div style="width:70%;height:140px;overflow:hidden;">视频播放列表</div>
                            </div>
                            <div style="line-height:60px;overflow:hidden;">图片播放列表</div>
                       </div>
                   <el-button type="primary" style=" margin-top:20px;" >以此建立播放组合</el-button>
                   </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="none">
                   <div style="height:250px;text-align:center;">
                        <div style="height:200px;border:2px solid gray;">
                            <div style="height:140px;border-bottom:2px solid gray; display:flex; line-height:140px;">
                                <div style="width:30%;height:140px;border-right:2px solid gray;overflow:hidden;">图片播放列表</div>
                                <div style="width:70%;height:140px;overflow:hidden;">视频播放列表</div>
                            </div>
                            <div style="line-height:60px;overflow:hidden;">图片播放列表</div>
                       </div>
                   <el-button type="primary" style=" margin-top:20px;" >以此建立播放组合</el-button>
                   </div>
                </el-card>
            </el-col>
        </el-row>
       
          <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="70px">
                <el-form-item label="用户名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="登录名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="addForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm" label-width="70px">
                <el-form-item label="用户名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="登录名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible:false,
            pageTotal: 0,
            editForm: {},
            addForm: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data.list;
                this.pageTotal = res.data.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        //新增操作
        handleAdd(){
             this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.editForm = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 200px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
