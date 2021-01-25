<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:20px;">
                    <i class="el-icon-lx-cascades"></i> 设备列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="none">
                    <div>
                        <el-input v-model="query.name" placeholder="设备名称" class="handle-input mr10"></el-input>
                        <el-input v-model="query.name" placeholder="设备ID" class="handle-input mr10"></el-input>
                                <el-input v-model="query.name" placeholder="设备MAC" class="handle-input mr10"></el-input>
                        <el-select v-model="query.address" placeholder="状态" class="handle-input  mr10">
                            <el-option key="1" label="true" value="true"></el-option>
                            <el-option key="2" label="false" value="false"></el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="5">
                 <div class="container" style="margin-top:20px;min-height:380px;">
                      <el-tree :data="data" :highlight-current='true' @node-click="nodeClick" node-key="id" ref="tree"  default-expand-all >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <i :class="data.icon"> </i> {{ node.label }}
                            </span>              
                        </span>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="19">
            <div class="container" style="margin-top:20px;min-height:380px;">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-data-line"
                    class="handle-del"
                    @click="orderBottomButton"
                >命令下发</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-button icon="el-icon-edit-outline" type="warning">编辑设备</el-button>
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
                <el-table-column prop="id" label="设备ID"  align="center"></el-table-column>
                <el-table-column prop="name" label="设备名称"></el-table-column>
                <el-table-column prop="name" label="设备组"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state == '成功' ? 'success':'danger'"
                        >{{scope.row.state == '成功' ? '在线':'离线'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="安装时间"></el-table-column>
                <el-table-column prop="id" label="存储空间"  ></el-table-column>
                <el-table-column prop="id" label="分辨率"  ></el-table-column>
                <el-table-column prop="id" label="设备型号"  ></el-table-column>
                <el-table-column prop="id" label="APP版本"  ></el-table-column>
                <el-table-column  fixed="right" label="操作" width="350" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-view"
                            plain
                        >详情</el-button>
                        <el-button
                            type="success"
                            icon="el-icon-data-line"
                            plain
                           
                        >命令</el-button>
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
            </el-col>
        </el-row>
        <!-- 命令下发弹出框 -->
        <el-dialog title="命令下发" :visible.sync="orderBottomVisible" width="30%">
            <el-form ref="orderBottomForm" :model="orderBottomForm" label-width="100px">
                <el-form-item label="命令类型">
                  <el-select v-model="orderBottomForm.orderType" placeholder="命令类型">
                        <el-option v-for="(item,index) in orderBottomForm.orderTypeList"
                         :label="item.label" 
                         :value="item.value" 
                         :key="index">
                         </el-option>
                    </el-select>
                </el-form-item>
                <div v-show="orderBottomForm.orderType === 'updatePlayContent' ? true : false">
                    <el-form-item label="命令选择">
                        <el-select v-model="orderBottomForm.orderSelect" placeholder="命令选择">
                            <el-option v-for="(item,index) in orderBottomForm.ordertSelectList"
                            :label="item.label" 
                            :value="item.value" 
                            :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="orderBottomForm.orderSelect === 'updateVideoList'" label="选择视频列表">
                        <el-select v-model="orderBottomForm.video" placeholder="选择视频列表">
                            <el-option v-for="(item,index) in orderBottomForm.videoList"
                            :label="item.label" 
                            :value="item.value" 
                            :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-else-if="orderBottomForm.orderSelect === 'updateImageList'" label="选择图片列表">
                        <el-select v-model="orderBottomForm.image" placeholder="选择图片列表">
                            <el-option v-for="(item,index) in orderBottomForm.imageList"
                            :label="item.label" 
                            :value="item.value" 
                            :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-else-if="orderBottomForm.orderSelect === 'innerText'" label="插入文字">
                    <el-input  v-model="orderBottomForm.text" :autosize="{ minRows: 5, maxRows: 7}" resize="none"  :rows="3" type="textarea" placeholder="输入要插入的文本内容"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="orderBottomVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrderBottom">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm" label-width="70px">
                <el-form-item label="角色名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限字符">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
                 <el-form-item label="显示顺序">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="权限管理">
                 
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
         data:[{
                id: 1,
                label: '山东',
                icon:'el-icon-folder',
                children: [{
                    id: 4,
                    label: '济南',
                    icon:'el-icon-tickets',
                }]
                }, 
                {
                    id: 2,
                    label: '北京',
                    icon:'el-icon-folder',
                    children: [{
                        id: 5,
                        label: '海淀',
                        icon:'el-icon-tickets',
                    }, {
                        id: 6,
                        label: '昌平',
                        icon:'el-icon-tickets',
                    }]
                }, {
                    id: 3,
                    label: '上海',
                    icon:'el-icon-folder',
                    children: [{
                        id: 7,
                        label: '静安',
                        icon:'el-icon-tickets',
                    }, {
                        id: 8,
                        label: '浦东',
                        icon:'el-icon-tickets',
                    }]
                }],
            data_key:[],
            defaultProps: {
                children: 'children',
                label: 'title',
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
            orderBottomVisible:false,
            pageTotal: 0,
            editForm: {},
            addForm: {},
            orderBottomForm:{
                orderType:'updatePlayContent',
                orderSelect:'updateVideoList',
                video:'video1',
                image:'image1',
                text:'',
                orderTypeList:[
                    {
                        label:'更新播放内容',
                        value:'updatePlayContent'
                    },
                    {
                        label:'播放控制',
                        value:'playControl'
                    },
                    {
                        label:'终端设置',
                        value:'terminalSetting'
                    },
                ],
                ordertSelectList:[
                    {
                        label:'更新视频列表',
                        value:'updateVideoList'
                    },
                    {
                        label:'更新图片列表',
                        value:'updateImageList'
                    },
                    {
                        label:'插播文字',
                        value:'innerText'
                    },
                ],
                videoList:[
                    {
                        label:'视频1',
                        value:'video1'
                    },
                    {
                        label:'视频2',
                        value:'video2'
                    },
                    {
                        label:'视频3',
                        value:'video3'
                    },
                ],
                imageList:[
                    {
                        label:'图片1',
                        value:'image1'
                    },
                    {
                        label:'图片2',
                        value:'image2'
                    },
                    {
                        label:'图片3',
                        value:'image3'
                    },
                ],
            },
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    mounted(){
        
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
        nodeClick(e){
            console.log(e)
            // this.$nextTick(()=>{
            //          this.$refs.tree.setCurrentKey(e.id);
            // })
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes())
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
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
        //显示命令下发
        orderBottomButton(){
            this.orderBottomVisible = true;
        },
        // 保存命令
        saveOrderBottom(){
            this.orderBottomVisible = false;
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
            this.$set(this.tableData, this.idx, this.editForm);
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
