<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:20px;">
                    <i class="el-icon-lx-cascades"></i> 自定义组
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="none">
                    <div>
                        <el-input v-model="query.name" placeholder="组名称" class="handle-input mr10"></el-input>
                        <el-input v-model="query.address" placeholder="组ID" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="container" style="margin-top:20px;">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    class="handle-del"
                    @click="handleAdd"
                >添加分组</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号"  align="center"></el-table-column>
                <el-table-column prop="name" label="组ID"></el-table-column>
                <el-table-column prop="name" label="组名称"></el-table-column>
                <el-table-column prop="date" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-monitor" type="success" plain>
                            设备列表
                        </el-button>
                        <el-button
                            type="warning"
                            icon="el-icon-edit"
                            plain
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            plain
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
         <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
                <el-form-item label="分组名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="分组名称"></el-input>
                </el-form-item>
                <el-form-item label="上级分组" prop="role">
                   <el-select v-model="editForm.role" placeholder="上级分组">
                        <el-option label="分组一" value="shanghai"></el-option>
                        <el-option label="分组二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
                <el-form-item label="分组名称" prop="name">
                    <el-input v-model="editForm.name" placeholder="分组名称"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                   <el-select v-model="editForm.role" placeholder="角色">
                        <el-option label="角色一" value="shanghai"></el-option>
                        <el-option label="角色二" value="beijing"></el-option>
                    </el-select>
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
            rules:{
                 name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
            },
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
                console.log(res,);
                this.tableData = res.data.list;
                this.pageTotal = res.data.pageTotal || 50;
            });
        },

        // 触发搜索按钮
        handleSearch() {
            console.log()
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
        //保存新增
        saveAdd(){
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.addVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.addForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
             });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.editForm = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
           this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.addForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
             });
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
    width: 120px;
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
