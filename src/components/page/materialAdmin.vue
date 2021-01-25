<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:20px;">
                    <i class="el-icon-lx-cascades"></i> 素材管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="none">
                <div>
                <el-date-picker
                v-model="query.value_time"
                class="mr10"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
                <el-input v-model="query.name" placeholder="素材名称" class="handle-input mr10"></el-input>
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
                >添加素材</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-download"
                    class="handle-del"
                >下载素材</el-button>
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
                <el-table-column prop="name" label="素材ID"></el-table-column>
                <el-table-column prop="name" label="素材名称"></el-table-column>
                <el-table-column label="标签属性">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="文件名" align="center">
                    <template>
                        {{12345678}}
                    </template>
                </el-table-column>
                    <el-table-column label="类型" align="center">
                    <template>
                        图片
                    </template>
                </el-table-column>
                <el-table-column label="时长" prop="date"></el-table-column>
                <el-table-column label="分辨率" prop="date"></el-table-column>
                <el-table-column label="素材大小" prop="date"></el-table-column>
                <el-table-column prop="date" label="上传日期"></el-table-column>
                <el-table-column label="上传用户" prop="date"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-view"
                            plain
                        >预览</el-button>
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
            <el-form ref="addForm" :model="addForm"  :rules="rules" label-width="80px">
                <el-form-item label="素材名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="素材名称"></el-input>
                </el-form-item>
                <el-form-item label="素材类型" prop="type">
                  <el-select v-model="addForm.type" placeholder="类型">
                    <el-option key="1" label="图片" value="img"></el-option>
                    <el-option key="2" label="文字" value="text"></el-option>
                    <el-option key="3" label="视频" value="video"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="上传素材">
                    <el-upload
                        class="upload-box"
                        ref="upload"
                        :action="url"
                        :multiple="true"
                        :limit="1"
                        :auto-upload="false"
                        :on-success="upSuccess"
                        :headers="myHeaders"
                        :before-upload="beforeUpload"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm"  :rules="rules" label-width="80px">
                <el-form-item label="素材名称" prop="name">
                    <el-input v-model="editForm.name" placeholder="素材名称"></el-input>
                </el-form-item>
                <el-form-item label="素材类型" prop="type">
                  <el-select v-model="editForm.type" placeholder="类型">
                    <el-option key="1" label="图片" value="img"></el-option>
                    <el-option key="2" label="文字" value="text"></el-option>
                    <el-option key="3" label="视频" value="video"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="上传素材">
                    <el-upload
                        class="upload-box"
                        ref="upload"
                        :action="url"
                        :multiple="true"
                        :limit="1"
                        :auto-upload="false"
                        :on-success="upSuccess"
                        :headers="myHeaders"
                        :before-upload="beforeUpload"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
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
            url: `http:///system/license/import/`,
            myHeaders: { token: sessionStorage.getItem('token') },
            rules:{
                name: [{ required: true, message: '请输入素材名称', trigger: 'blur' }],
              },
            query: {
                address: '',
                name: '',
                value_time:[new Date(), new Date()],
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
        },
         beforeUpload(file) {
            let msg = file.name.substring(file.name.indexOf('.') + 1);
            const option = 'lic';
            if (msg != option) {
                this.$message.warning('只能是lic文件!');
                return new Promise((resolver, reject) => {
                    reject();
                });
            } else {
                return new Promise((resolver, reject) => {
                    resolver();
                });
            }
        },
        upSuccess(res) {
            if (res.code == '200') {
                this.$message.success('上传成功');
                this.initData();
            } else {
                this.$message.warning('请检查证书是否合法');
            }
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
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
<style>
.el-upload--text {
    width: 82px !important;
    height: 34px;
    border: none;
    overflow: visible !important;
}
    .upload-box .upload-box .el-table .warning-row {
    background: oldlace;
}
.upload-box  {
    border: none !important;
    padding: 0 !important;
}
.upload-box .el-table .success-row {
    background: #f0f9eb;
}
.upload-box {
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
.up-tabel {
    height: 30px;
    display: flex;
    margin: 0 20px 0 20px;
}
.up-span1 {
    display: block;
    line-height: 30px;
    width: 30%;
    height: 30px;
    padding-left: 1rem;
    border: 1px solid #ccc;
}
.up-span2 {
    display: block;
    width: 70%;
    line-height: 30px;
    height: 30px;
    border: 1px solid #ccc;
    padding-left: 1rem;
}
</style>