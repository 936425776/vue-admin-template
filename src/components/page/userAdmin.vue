<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:20px;">
                    <i class="el-icon-lx-cascades"></i> 用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="none">
                    <div>
                        <el-input v-model="query.name" placeholder="用户名称" class="handle-input mr10"></el-input>
                        <el-select v-model="query.address" placeholder="状态" class="handle-input mr10">
                            <el-option key="1" label="true" value="true"></el-option>
                            <el-option key="2" label="false" value="false"></el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="container" style="marginTop:20px;">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    class="handle-del"
                    @click="handleAdd"
                >新增</el-button>
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
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名称"></el-table-column>
                <el-table-column prop="name" label="登录名称"></el-table-column>
                <el-table-column label="部门">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="手机号" align="center">
                    <template>
                        {{12345678}}
                    </template>
                </el-table-column>
                    <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.state"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="值班" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state ? 'success':'danger'"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
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
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="addForm.userName" maxlength="20" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" maxlength="20" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="branch">
                    <el-input v-model="addForm.branch" placeholder="部门"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" autocomplete="off">
                    <el-input v-model.number="addForm.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" maxlength="20" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="account">
                    <el-input v-model="addForm.account" placeholder="登录账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                     <el-input v-model="addForm.password" maxlength="20" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="verifyPassword" >
                     <el-input v-model="addForm.verifyPassword" maxlength="20" placeholder="确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                   <el-select v-model="addForm.role" placeholder="角色">
                        <el-option label="角色一" value="shanghai"></el-option>
                        <el-option label="角色二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用">
                      <el-switch
                        v-model="addForm.runStart"
                      >
                      </el-switch>
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
                  <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="editForm.userName" maxlength="20" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" maxlength="20" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="branch">
                    <el-input v-model="editForm.branch" placeholder="部门"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" autocomplete="off">
                    <el-input v-model.number="editForm.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" maxlength="20" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="account">
                    <el-input v-model="editForm.account" placeholder="登录账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                     <el-input v-model="addForm.password" maxlength="20" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="verifyPassword" >
                     <el-input v-model="editForm.verifyPassword" maxlength="20" placeholder="确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                   <el-select v-model="editForm.role" placeholder="角色">
                        <el-option label="角色一" value="shanghai"></el-option>
                        <el-option label="角色二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用">
                      <el-switch
                        v-model="editForm.runStart"
                      >
                      </el-switch>
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
                    userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    branch: [{ required: true, message: '请输入部门', trigger: 'blur' }],
                    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
                             { type: 'number', message: '请输入正确的手机号', }
                            ],
                    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
                             { type: 'email', message: '请输入正确的邮箱', }
                            ],
                    account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    verifyPassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
                    role: [{ required: true, message: '请选择角色', trigger: 'change' }],
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
