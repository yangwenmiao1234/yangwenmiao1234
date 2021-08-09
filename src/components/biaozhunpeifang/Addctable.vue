<template>
    <div>
        <el-table 
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="tabledatas" border>
            <!-- <el-table-column label="tab1">
                <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="tab2">
                <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab2"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab2}}</span>
                </template>
            </el-table-column> -->
        <el-table-column prop="onesand" label="1#沙" width="100px">
                 <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="onestone" label="1#石" width="100px">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="towcoalash" label="2#煤灰" width="100px">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="twosand" label="2#沙" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="twostone" label="2#石" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="threesand" label="3#砂" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="threestone" label="3#石" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="foursand" label="4#砂" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="fourstone" label="4#石" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="fly" label="粉煤灰" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="kuangfen" label="矿粉" width="">
        <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>>
        </el-table-column>
        <el-table-column prop="Expansive" label="膨胀剂" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="water" label="水" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="watertwo" label="水2" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Cementone" label="水泥1" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Cementtwo" label="水泥2" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Cementthree" label="水泥3" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Additiveone" label="添加剂1" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Additivetwo" label="添加剂2" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Additivethree" label="添加剂3" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="Additivefour" label="添加剂4" width="">
            <template slot-scope="scope">
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.Additivefour"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
                </template>
        </el-table-column>
            <el-table-column fixed="right"  width="130px" label="操作">
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true">编辑</el-button>
                    <el-button @click="scope.row.show =false">保存</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabledatas: [
        { towcoalash:'1',
           onesand:"1",
            onestone:"1",
            twosand:"1",
            twostone:"1",
            threesand:"11",
            threestone:"1",
            foursand:"1",
            fourstone:"1",
           fly:"2",
           kuangfen:"2",
           Expansive:"1",
            water:"21",
            watertwo:"12", 
            Cementone:"1234", 
            Cementtwo:"14",
            Cementthree :"1234",
            Additiveone:"13",
            Additivetwo:"34",
            Additivethree:"24",
            Additivefour:"23",
            show:false},
            { towcoalash:'1',
           onesand:"1",
            onestone:"1",
            twosand:"1",
            twostone:"1",
            threesand:"11",
            threestone:"1",
            foursand:"1",
            fourstone:"1",
           fly:"2",
           kuangfen:"2",
           Expansive:"1",
            water:"21",
            watertwo:"12", 
            Cementone:"1234", 
            Cementtwo:"14",
            Cementthree :"1234",
            Additiveone:"13",
            Additivetwo:"34",
            Additivethree:"24",
            Additivefour:"23",
            show:false},
                ],
            }
        },
    }
</script>