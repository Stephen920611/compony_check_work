// ResourceList
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';
import T from './../../utils/T';
import router from 'umi/router';
import {
    EnumQuickRegisterParams,
} from './../../constants/dataSync/EnumSyncConfigModal';
import {EnumDataSyncPageInfo} from './../../constants/EnumPageInfo';
import {EnumDataSourceStatus} from './../../constants/dataSync/EnumSyncCommon';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Tooltip,
    InputNumber,
    DatePicker,
    Radio,
    Tree,
    Spin,
    Table,
    Modal,
    Popconfirm,
    TreeSelect,
    Collapse,
} from 'antd';

const {TreeNode, DirectoryTree} = Tree;
const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;
const {Panel} = Collapse;

import styles from './CheckRecordList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'; // @ 表示相对于源文件根目录


//数据分发页面
/* eslint react/no-multi-comp:0 */
@connect(({checkRecord, jobStatistics,loading}) => ({
    checkRecord,
    jobStatistics,
    fetchTreeStatus: loading.effects['jobStatistics/fetchTreeNodeAction'],
    fetchCheckRecordListStatus: loading.effects['checkRecord/fetchCheckRecordListAction'],
    fetchMemberInfoListStatus: loading.effects['checkRecord/fetchMemberInfoListAction'],
}))
// class CheckRecordList
@Form.create()
class CheckRecordList extends PureComponent {

    state = {
        currentPage: EnumDataSyncPageInfo.defaultPage,//分页
        selectRows: [], //选择的数据列
        selectedKey: 'GA',//树节点默认选中的值
        selectedArea: '烟台市',//树节点默认选中的地区名字，用来后台获取参数
        baseInfoSelect: [],     //被调查人基本情况
        bodyConditionSelect: [],     //身体状况
        treeData: [
            {
                children: [
                    {
                        id: "GA001",
                        key: "GA001",
                        name: "芝罘区",
                        pId: "GA",
                        title: "芝罘区",
                    },
                    {
                        id: "GA002",
                        key: "GA002",
                        name: "福山区",
                        pId: "GA",
                        title: "福山区",
                    },
                    {
                        id: "GA003",
                        key: "GA003",
                        name: "莱山区",
                        pId: "GA",
                        title: "莱山区",
                    },
                    {
                        id: "GA004",
                        key: "GA004",
                        name: "牟平区",
                        pId: "GA",
                        title: "牟平区",
                    },
                    {
                        id: "GA005",
                        key: "GA005",
                        name: "海阳市",
                        pId: "GA",
                        title: "海阳市",
                    },
                    {
                        id: "GA006",
                        key: "GA006",
                        name: "莱阳市",
                        pId: "GA",
                        title: "莱阳市",
                    },
                    {
                        id: "GA007",
                        key: "GA007",
                        name: "栖霞市",
                        pId: "GA",
                        title: "栖霞市",
                    },
                    {
                        id: "GA008",
                        key: "GA008",
                        name: "蓬莱市",
                        pId: "GA",
                        title: "蓬莱市",
                    },
                    {
                        id: "GA009",
                        key: "GA009",
                        name: "长岛县",
                        pId: "GA",
                        title: "长岛县",
                    },
                    {
                        id: "GA010",
                        key: "GA010",
                        name: "龙口市",
                        pId: "GA",
                        title: "龙口市",
                    },
                    {
                        id: "GA011",
                        key: "GA011",
                        name: "招远市",
                        pId: "GA",
                        title: "招远市",
                    },
                    {
                        id: "GA012",
                        key: "GA012",
                        name: "莱州市",
                        pId: "GA",
                        title: "莱州市",
                    },
                    {
                        id: "GA013",
                        key: "GA013",
                        name: "开发区",
                        pId: "GA",
                        title: "开发区",
                    },
                    {
                        id: "GA014",
                        key: "GA014",
                        name: "高新区",
                        pId: "GA",
                        title: "高新区",
                    },
                    {
                        id: "GA015",
                        key: "GA015",
                        name: "保税港区",
                        pId: "GA",
                        title: "保税港区",
                    },
                    {
                        id: "GA016",
                        key: "GA016",
                        name: "昆嵛山保护区",
                        pId: "GA",
                        title: "昆嵛山保护区",
                    },
                ],
                id: "GA",
                key: "GA",
                name: "烟台市",
                pId: "0",
                title: "烟台市",
            }
        ],
        total: 0,
        members: [],
        fakeData: {
            "total": 11,
            "pages": null,
            "members": [
                {
                    "id": 2456,
                    "area": "莱阳市",
                    "name": "柳爱玲",
                    "address": "古柳街道柳沟村",
                    "idCard": "370682198711291121",
                    "phoneNum": "13361324284",
                    "age": 34,
                    "gender": "女",
                    "nativePlace": "山东莱阳",
                    "baseInfo": "外地来烟",
                    "createTime": "2020-02-10 17:34",
                    "fillUserId": 1049,
                    "fillUserName": "梁帅帅"
                },
                {
                    "id": 2455,
                    "area": "莱阳市",
                    "name": "柳爱玲",
                    "address": "古柳街道柳沟村",
                    "idCard": "370682198711291121",
                    "phoneNum": "13361324284",
                    "age": 34,
                    "gender": "女",
                    "nativePlace": "山东莱阳",
                    "baseInfo": "外地来烟",
                    "createTime": "2020-02-10 17:34",
                    "fillUserId": 1049,
                    "fillUserName": "梁帅帅"
                },
                {
                    "id": 2454,
                    "area": "莱阳市",
                    "name": "陈国宏",
                    "address": "山东省莱阳市城厢街道办事处盛世广场",
                    "idCard": "532401197507052017",
                    "phoneNum": "15106588986",
                    "age": 45,
                    "gender": "男",
                    "nativePlace": "云南省玉溪市",
                    "baseInfo": "正常",
                    "createTime": "2020-02-10 17:34",
                    "fillUserId": 366,
                    "fillUserName": "王骏"
                },
                {
                    "id": 2453,
                    "area": "莱阳市",
                    "name": "董常云",
                    "address": "莱阳市龙旺庄街道田格庄村",
                    "idCard": "370682198808153526",
                    "phoneNum": "13553129100",
                    "age": 32,
                    "gender": "男",
                    "nativePlace": "",
                    "baseInfo": "外地来烟",
                    "createTime": "2020-02-10 17:34",
                    "fillUserId": 1094,
                    "fillUserName": "崔雪梅"
                },
                {
                    "id": 2452,
                    "area": "莱州市",
                    "name": "周艳磊",
                    "address": "莱州市前北流村",
                    "idCard": "370625197607210027",
                    "phoneNum": "13953588225",
                    "age": 44,
                    "gender": "女",
                    "nativePlace": "",
                    "baseInfo": "已被居家隔离",
                    "createTime": "2020-02-10 17:34",
                    "fillUserId": 1091,
                    "fillUserName": "宋琳"
                },
                {
                    "id": 2451,
                    "area": "海阳市",
                    "name": "辛德泽",
                    "address": "大辛家",
                    "idCard": "370629195308050672",
                    "phoneNum": "3682200",
                    "age": null,
                    "gender": "男",
                    "nativePlace": "",
                    "baseInfo": "正常",
                    "createTime": "2020-02-10 17:34",
                    "fillUserId": 848,
                    "fillUserName": "辛浩"
                },
                {
                    "id": 2450,
                    "area": "龙口市",
                    "name": "李腾",
                    "address": "龙口市针织厂小区",
                    "idCard": "370681199810062218",
                    "phoneNum": "17852357218",
                    "age": 23,
                    "gender": "男",
                    "nativePlace": "山东省烟台市龙口市",
                    "baseInfo": "正常",
                    "createTime": "2020-02-10 17:33",
                    "fillUserId": 1093,
                    "fillUserName": "李腾"
                },
                {
                    "id": 2449,
                    "area": "莱州市",
                    "name": "石潇丹",
                    "address": "莱州市永安街道花园北流082号",
                    "idCard": "370683198905242244",
                    "phoneNum": "15376590967",
                    "age": 31,
                    "gender": "女",
                    "nativePlace": "莱州市永安街道花园北流082号",
                    "baseInfo": "正常",
                    "createTime": "2020-02-10 17:33",
                    "fillUserId": 405,
                    "fillUserName": "张莲"
                },
                {
                    "id": 2448,
                    "area": "栖霞市",
                    "name": "路亚楠",
                    "address": "烟台市芝罘区信达小区",
                    "idCard": "370686199211138227",
                    "phoneNum": "15166862381",
                    "age": 28,
                    "gender": "女",
                    "nativePlace": "山东省栖霞市松山街道北路家沟村",
                    "baseInfo": "正常",
                    "createTime": "2020-02-10 17:33",
                    "fillUserId": 1096,
                    "fillUserName": "路亚楠"
                },
                {
                    "id": 2447,
                    "area": "莱州市",
                    "name": "孙修",
                    "address": "莱州市安邦名人家园1号楼3单元1301室",
                    "idCard": "371323198905078411",
                    "phoneNum": "18364458532",
                    "age": 31,
                    "gender": "男",
                    "nativePlace": "临沂沂水",
                    "baseInfo": "外出返烟",
                    "createTime": "2020-02-10 17:33",
                    "fillUserId": 406,
                    "fillUserName": "潘羽敏"
                }
            ],
            "activities": null,
            "touchs": null,
            "currnets": null
        },
        tableData: [
            {
                key: 1,
                address: '县市区',
                name: '姓名',
                age: 18,
                sex: '性别',
                createDate: '创建时间',
                pId: '123456787',
                status: '基本状况',
            },

        ],
        visible: false,
        startPageNum: '',
        endPageNum: '',
        maxPageSize: 9999,
        selectTreeKey: [],  //树选择的key值
        expandTreeKey: [],  //树展开的key值
        treeNewData: [],    //后台返回树节点
        treeBackData: [],   //用来备份的节点，如果有部门的话，就要拼接
        autoExpandParent: true,     //是否自动展开
        clickTree: [],  //
    };

    componentDidMount() {
        const {dispatch} = this.props;
        const {user} = this.state;
        let self = this;

        //获取树
        this.fetchTreeData();

        //获取被调查人基本情况
        /* new Promise((resolve, reject) => {
             dispatch({
                 type: 'checkRecord/fetchSelectInfoAction',
                 params: {
                     type: 'BASE_INFO'
                 },
                 resolve,
                 reject,
             });
         }).then(response => {
             if (response.code === 0) {
                 response.data.unshift({
                     name: "全部",
                     value: "全部"
                 });
                 self.setState({
                     baseInfoSelect: response.data
                 })
             } else {
                 T.prompt.error(response.msg);
             }
         });*/

        //获取身体情况列表
        new Promise((resolve, reject) => {
            dispatch({
                type: 'checkRecord/getAllDropsAction',
                resolve,
                reject,
            });
        }).then(response => {
            if (response.code === 0) {
                console.log(response.data.bodyConditions);
                response.data.bodyConditions.unshift({
                    name: "全部",
                    value: 0
                });
                self.setState({
                    bodyConditionSelect: response.data
                });
            } else {
                T.prompt.error(response.msg);
            }
        });
        // this.fetchDataList();
    }

    //获取树
    fetchTreeData = () => {
        let loginInfo = T.auth.getLoginInfo();
        let self = this;
        const {dispatch} = this.props;
        new Promise((resolve, reject) => {
            dispatch({
                type: 'jobStatistics/fetchTreeNodeAction',
                userId: loginInfo.data.user.id,
                resolve,
                reject,
            });
        }).then(response => {
            // console.log(response,'树节点');
            if (response.code === 0) {
                self.setState({
                    treeNewData: response.data,
                    treeBackData: response.data,
                })
            } else {
                T.prompt.error(response.msg);
            }
        });
    };

    //获取树下的部门
    fetchDepartId = (eventData) => {
        const {dispatch, form, checkRecord} = this.props;
        const {treeBackData, treeNewData} = this.state;
        // console.log(eventData,'eventData');
        let self = this;
        new Promise((resolve, reject) => {
            dispatch({
                type: 'checkRecord/fetchTreeDepartmentAction',
                companyId: eventData.backId,
                resolve,
                reject,
            });
        }).then(response => {
            // console.log(response,'部门节点');
            if (response.code === 0) {
                if(response.data.length > 0){
                    let searchParentCode = response.data[0].hasOwnProperty('parentCode') ? response.data[0].parentCode : '-';
                    self.setDepart(treeNewData, searchParentCode, response.data);
                }
                // self.setState({
                //     treeNewData: response.data
                // })
            } else {
                T.prompt.error(response.msg);
            }
        });
    };

    setDepart = (data, searchParentCode, departNodes) => {
        data.map( item => {
            if(item.code === searchParentCode && item.type === 'company'){
                item.nodes.length = 0;
                departNodes.map(val => {
                    item.nodes.push(val)
                });
            }else {
                this.setDepart(item.nodes, searchParentCode, departNodes)
            }
        });
    };

    //获取当前页数数据
    fetchDataList = (eventData) => {
        // console.log(eventData,'eventData');
        const {dispatch, form, checkRecord} = this.props;
        const {currentPage, selectedKey, treeData, selectedArea} = this.state;
        let self = this;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //地区分类
                let categoryCode = '';
                treeData.map(val => {
                    if (values.resourceType === val.name) {
                        categoryCode = val.id;
                    }
                });
                let loginInfo = T.auth.getLoginInfo();

                let params = {
                    userId:loginInfo.data.user.id,
                    current: currentPage,
                    size: EnumDataSyncPageInfo.defaultPageSize,
                    startTime: T.lodash.isUndefined(values.startDate) ? '' : T.helper.dateFormat(values.startDate),      //开始时间
                    endTime: T.lodash.isUndefined(values.endDate) ? '' : T.helper.dateFormat(values.endDate),        //结束时间
                    areaId: eventData.type === 'area' ? eventData.backId : eventData.type === 'industry' ? eventData.industryParentId: '' , //县市区Id
                    industryId: eventData.type === 'industry' ? eventData.backId : '', //行业Id 查询行业时 上级县市区ID必传
                    companyId: eventData.type === 'company' ? eventData.backId : '', //公司id
                    departId: eventData.type === 'depart' ? eventData.backId : '',//部门id
                    // area: T.auth.isAdmin() ? selectedArea === "烟台市" ? '' : selectedArea : loginInfo.data.area,           //县市区(烟台市传空)
                    memberName: T.lodash.isUndefined(values.person) ? '' : values.person,           //被调查人姓名
                    gender: T.lodash.isUndefined(values.sex) ? '' : values.sex === 'all' ? '' : values.sex,         //性别
                    // idCard: "",         //身份证号
                    bodyCondition: T.lodash.isUndefined(values.base) ? '' : values.base === '全部' ? '' : values.base,         //被调查人基本情况
                    // bodyCondition: T.lodash.isUndefined(values.status) ? '' : values.status === '全部' ? '' : values.status,         //身体状况
                    fillUser: T.lodash.isUndefined(values.head) ? '' : values.head,   //摸排人
                    fillUserId: loginInfo.data.static_auth === 0 ? loginInfo.data.id : ''   //摸排人id
                };
                console.log(params,'params');
                new Promise((resolve, reject) => {
                    dispatch({
                        type: 'checkRecord/fetchMemberInfoListAction',
                        params,
                        resolve,
                        reject,
                    });
                }).then(response => {
                    if (response.code === 0) {
                        // console.log('1111',response.data);
                        const { total, list } = response.data;
                        let endData = list.map( (val,idx) => {
                            return {
                                ...val,
                                key: (currentPage-1) * 10 + idx + 1,
                                index: (currentPage-1) * 10 + idx + 1,
                            }
                        });
                        self.setState({
                            total,
                            members: endData,
                        })
                    } else {
                        T.prompt.error(response.msg);
                    }
                });
            }
        });

    };

    //重置表单
    resetDataSource = () => {
        const {clickTree} = this.state;
        this.props.form.resetFields();
        this.fetchDataList(clickTree);
    };

    //树选择
    onSelect = (keys, event) => {
        //点击选中事件，属性可以打印查看
        const eventData = event.node.props;
        let self = this;
        // console.log(eventData,'eventData');

        if(eventData.type === 'company'){
            this.fetchDepartId(eventData)
        }
        this.setState({
            selectTreeKey: keys,
            selectedArea: eventData.name,
            clickTree: eventData,
        }, () => {
            self.fetchDataList(eventData)
        });
    };

    //渲染树节点
    /**
     *
     * @param data
     * @param industryParentId 点击行业时，行业父节点县市区ID必传 ，为了更好地拿数据，所以要做这个
     * @returns {Array|*}
     */
    renderTreeNodes = (data, industryParentId = '') => {
        return data.map(item => {
            if (item.nodes) {
                return (
                    <TreeNode
                        {...item}
                        dataRef={item}
                        name={item.text}
                        title={item.text}
                        key={item.code}
                        id={item.code}
                        backId={item.id}
                        pId={item.parentCode}
                        industryParentId={industryParentId}
                    >
                        {this.renderTreeNodes(item.nodes, item.id)}
                    </TreeNode>
                );
            }
            return <TreeNode
                {...item}
                dataRef={item}
                name={item.text}
                title={item.text}
                key={item.code}
                id={item.code}
                backId={item.id}
                isLeaf
                pId={item.parentCode}
            />;
        });
    };

    /**
     * 展开树操作
     * @param {array} expandedKeys
     */
    onExpand = expandedKeys => {
        this.setState({
            autoExpandParent: false,
        });
        this.setState({
            expandTreeKey: expandedKeys
        });
    };

    //查询
    searchDataSource = (e) => {
        const {clickTree} = this.state;
        const {dispatch, form} = this.props;
        e.preventDefault();
        this.setState({
            currentPage: EnumDataSyncPageInfo.defaultPage,
        }, () => {
            this.fetchDataList(clickTree);
        });
        // this.fetchDataList();
    };

    //页码变换
    pageChange = page => {
        this.setState({
            currentPage: page,
        }, () => {
            this.fetchDataList();
        });
    };

    //导出
    exportData = () => {
        this.setState({
            visible: true,
        });
    };

    //查看详情
    showMetadataManage = (e, key) => {
        router.push({
            pathname: '/checkRecord/showDetail',
            params: {
                isRouterPush: true,
                data: key
            },
        });
    };

    //树选择
    onTreeChange = (e, node) => {
        this.setState({
            selectedKey: node.props.id,
        });
    };

    handleOk = e => {
        const {
            total,
            startPageNum,
            endPageNum,
            maxPageSize
        } = this.state;
        // this.setState({
        //     visible: false,
        // });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            startPageNum: '',
            endPageNum: '',
        });
    };

    onStartPageChange = (e) => {
        let r = /^\+?[1-9][0-9]*$/;
        if(!r.test(e.target.value)) {
            T.prompt.error("请输入大于0的数字");
            this.setState({
                startPageNum: ''
            })
        }else {
            this.setState({
                startPageNum: e.target.value === '' ? e.target.value : Number(e.target.value)
            })
        }
        // const {
        //     total,
        //     endPageNum,
        //     maxPageSize
        // } = this.state;
        // // console.log(e.target.value,'onStartPageChange');
        // // console.log(Number(e.target.value),'Number(e.target.value)')
        // let currentNum = Number(e.target.value);
        // let startNum;
        // // let startNum = Number(e.target.value) >= total ? total : Number(e.target.value);
        // // if(currentNum >= total){
        // //     startNum = total;
        // // }else if ((endPageNum - maxPageSize) > currentNum ){
        // //     startNum = endPageNum - maxPageSize;
        // // }else {
        // //     startNum = currentNum;
        // // }
        //
        // if(currentNum >= total){
        //     startNum = total;
        // }else {
        //     startNum = currentNum;
        // }
        // this.setState({
        //     startPageNum: startNum
        // })
    };

    onStartPageCheck = (e) => {
        const {
            total,
            startPageNum,
            endPageNum,
            maxPageSize
        } = this.state;
        let currentNum = Number(startPageNum);
        this.setState({
            endPageNum: currentNum > 0 ? (currentNum + maxPageSize) : ''
        })
        // console.log(currentNum,'currentNum');
        // let startNum;
        // if(currentNum <= 0){
        //     endNum = '';
        // }else if(currentNum <= startPageNum && currentNum > 0){
        //     endNum = startPageNum;
        // }else if(currentNum > startPageNum && currentNum < (maxPageSize + startPageNum) && (maxPageSize + startPageNum) <= total){
        //     endNum = currentNum;
        // }else if(currentNum > startPageNum && currentNum < (maxPageSize + startPageNum) && currentNum < total && (maxPageSize + startPageNum) > total){
        //     endNum = currentNum;
        // }else if(currentNum > startPageNum && currentNum < (maxPageSize + startPageNum) && currentNum < total && (maxPageSize + startPageNum) < total){
        //     endNum = currentNum;
        // }else if(currentNum > startPageNum && currentNum > (maxPageSize + startPageNum) && currentNum > total && (maxPageSize + startPageNum) > total){
        //     endNum = total;
        // }else if(currentNum > startPageNum && currentNum > (maxPageSize + startPageNum) && currentNum > total && (maxPageSize + startPageNum) < total){
        //     endNum = maxPageSize + startPageNum;
        // }
        // // else if(currentNum >= (maxPageSize + startPageNum)){
        // //     endNum = maxPageSize + startPageNum;
        // // }else if(currentNum > total && (maxPageSize + startPageNum) > total){
        // //     endNum = total;
        // // }else {
        // //     endNum = currentNum;
        // // }
        // this.setState({
        //     endPageNum: endNum
        // })
    };

    onEndPageChange = (e) => {
        const {
            total,
            startPageNum,
            maxPageSize
        } = this.state;
        let currentNum = Number(e.target.value);
        let endNum;

        let r = /^\+?[1-9][0-9]*$/;
        if(!r.test(e.target.value)) {
            T.prompt.error("请输入大于0的数字");
            this.setState({
                endPageNum: ''
            })
        }else {
            this.setState({
                endPageNum: e.target.value === '' ? e.target.value : Number(e.target.value)
            })
        }
        // if(currentNum >= total){
        //     endNum = total;
        // }else if (currentNum <= 0){
        //     endNum = '';
        // } else if (currentNum > 0 && currentNum < startPageNum){
        //     endNum = startPageNum;
        // } else {
        //     if(currentNum > (startPageNum + maxPageSize)) {
        //         endNum = startPageNum + maxPageSize;
        //     }else {
        //         endNum = currentNum;
        //     }
        // }
        // //如果为空
        // if(currentNum === ''){
        //     endNum = currentNum
        // }else {
        //     endNum = Number(currentNum)
        // }

    };

    onEndPageCheck = (e) => {
        const {
            total,
            startPageNum,
            endPageNum,
            maxPageSize
        } = this.state;
        let currentNum = Number(endPageNum);
        let endNum;
        if(currentNum <= 0){
            endNum = '';
        }else if(currentNum <= startPageNum && currentNum > 0){
            endNum = startPageNum;
        }else if(currentNum > startPageNum && currentNum < (maxPageSize + startPageNum) && (maxPageSize + startPageNum) <= total){
            endNum = currentNum;
        }else if(currentNum > startPageNum && currentNum <= (maxPageSize + startPageNum) && currentNum < total && (maxPageSize + startPageNum) > total){
            endNum = currentNum;
        }else if(currentNum > startPageNum && currentNum <= (maxPageSize + startPageNum) && currentNum < total && (maxPageSize + startPageNum) < total){
            endNum = currentNum;
        }else if(currentNum > startPageNum && currentNum > (maxPageSize + startPageNum) && currentNum > total && (maxPageSize + startPageNum) > total){
            endNum = total;
        }else if(currentNum > startPageNum && currentNum > (maxPageSize + startPageNum) && currentNum > total && (maxPageSize + startPageNum) < total){
            endNum = maxPageSize + startPageNum;
        }
        // else if(currentNum >= (maxPageSize + startPageNum)){
        //     endNum = maxPageSize + startPageNum;
        // }else if(currentNum > total && (maxPageSize + startPageNum) > total){
        //     endNum = total;
        // }else {
        //     endNum = currentNum;
        // }
        this.setState({
            endPageNum: endNum
        })
    };

    sendParams = () => {
        const {
            form: {getFieldsValue},
        } = this.props;
        const {
            selectedArea,
            startPageNum,
            endPageNum,
            maxPageSize,
        } = this.state;

        let loginInfo = T.auth.getLoginInfo();
        let formTimeValue = getFieldsValue();

        let formStartTime = T.lodash.isUndefined(formTimeValue.startDate) ? '' : T.helper.dateFormat(formTimeValue.startDate,'YYYY-MM-DD');
        let formEndTime = T.lodash.isUndefined(formTimeValue.endDate) ? '' : T.helper.dateFormat(formTimeValue.endDate,'YYYY-MM-DD');
        let formArea = T.auth.isAdmin() ? selectedArea === "烟台市" ? '' : selectedArea : loginInfo.data.area;
        let formName = T.lodash.isUndefined(formTimeValue.person) ? '' : formTimeValue.person;
        let formGender = T.lodash.isUndefined(formTimeValue.sex) ? '' : formTimeValue.sex === 'all' ? '' : formTimeValue.sex;
        let formBaseInfo = T.lodash.isUndefined(formTimeValue.base) ? '' : formTimeValue.base === '全部' ? '' : formTimeValue.base;
        // let formIdCard = '';
        let formBodyCondition = T.lodash.isUndefined(formTimeValue.status) ? '' : formTimeValue.status === '全部' ? '' : formTimeValue.status;
        let formFillUserId = loginInfo.data.static_auth === 0 ? loginInfo.data.id : '';
        let formFillUserName = T.lodash.isUndefined(formTimeValue.head) ? '' : formTimeValue.head;
        let formCurrent = startPageNum;
        let formSize = endPageNum;

        // let apiHref = `${window.ENV.apiDomain}` + "/excel/memberDetail?startTime=" + formStartTime + '&endTime=' + formEndTime + '&area=' + formArea + '';
        let apiHref = `${window.ENV.apiDomain}/excel/memberDetail?startTime=${formStartTime}&endTime=${formEndTime}&area=${formArea}&name=${formName}&gender=${formGender}&baseInfo=${formBaseInfo}&bodyCondition=${formBodyCondition}&fillUserId=${formFillUserId}&fillUserName=${formFillUserName}&current=${formCurrent}&size=${formSize}`;
        if(endPageNum === '' || startPageNum === ''){
            T.prompt.error('起始条数和结束条数不能为空！')
        }else {
            const w=window.open('about:blank');
            w.location.href = apiHref;
        }
    };

    //渲染不同的下拉框
    renderSelect = (dataSource) => {
        if(dataSource>0){
            return (
                dataSource.map((item,idx) => {
                    return (
                        <Option key={item.value} value={item.name}>
                            {item.name}
                        </Option>
                    )
                })
            )
        }

    };

    render() {
        const {
            fetchTreeStatus,
            fetchMemberInfoListStatus,
            fetchCheckRecordListStatus,
            savingStatus,
            testStatus,
            metadataManage,
            form: {getFieldDecorator, getFieldValue, getFieldsValue},
        } = this.props;
        // const {dataResourceLists, dataResourceTypeTreeList, dataSourceTypeTreeOldData} = metadataManage;
        const {
            treeData,
            members,
            tableData,
            total,
            selectedArea,
            currentPage,
            selectedKey,
            bodyConditionSelect,
            baseInfoSelect,
            startPageNum,
            endPageNum,
            maxPageSize,
            treeNewData,
            autoExpandParent,
            selectTreeKey,
            expandTreeKey
        } = this.state;
        // console.log(Number(startPageNum),'startPageNum');
        // console.log(treeNewData,'treeNewData');
        let loginInfo = T.auth.getLoginInfo();
        let formTimeValue = getFieldsValue();
        // let params = {
        //     current: currentPage,
        //     size: EnumDataSyncPageInfo.defaultPageSize,
        //     startTime: T.lodash.isUndefined(values.startDate) ? '' : T.helper.dateFormat(values.startDate,'YYYY-MM-DD'),      //开始时间
        //     endTime: T.lodash.isUndefined(values.endDate) ? '' : T.helper.dateFormat(values.endDate,'YYYY-MM-DD'),        //结束时间
        //     area: T.auth.isAdmin() ? selectedArea === "烟台市" ? '' : selectedArea : loginInfo.data.area,           //县市区(烟台市传空)
        //     name: T.lodash.isUndefined(values.person) ? '' : values.person,           //被调查人姓名
        //     gender: T.lodash.isUndefined(values.sex) ? '' : values.sex === 'all' ? '' : values.sex,         //性别
        //     // idCard: "",         //身份证号
        //     baseInfo: T.lodash.isUndefined(values.base) ? '' : values.base === '全部' ? '' : values.base,         //被调查人基本情况
        //     bodyCondition: T.lodash.isUndefined(values.status) ? '' : values.status === '全部' ? '' : values.status,         //身体状况
        //     fillUserName: T.lodash.isUndefined(values.head) ? '' : values.head,   //摸排人
        //     fillUserId: loginInfo.data.static_auth === 0 ? loginInfo.data.id : ''   //摸排人id
        // };

        let formStartTime = T.lodash.isUndefined(formTimeValue.startDate) ? '' : T.helper.dateFormat(formTimeValue.startDate,'YYYY-MM-DD');
        let formEndTime = T.lodash.isUndefined(formTimeValue.endDate) ? '' : T.helper.dateFormat(formTimeValue.endDate,'YYYY-MM-DD');
        let formArea = T.auth.isAdmin() ? selectedArea === "烟台市" ? '' : selectedArea : loginInfo.data.area;
        let formName = T.lodash.isUndefined(formTimeValue.person) ? '' : formTimeValue.person;
        let formGender = T.lodash.isUndefined(formTimeValue.sex) ? '' : formTimeValue.sex === 'all' ? '' : formTimeValue.sex;
        let formBaseInfo = T.lodash.isUndefined(formTimeValue.base) ? '' : formTimeValue.base === '全部' ? '' : formTimeValue.base;
        // let formIdCard = '';
        let formBodyCondition = T.lodash.isUndefined(formTimeValue.status) ? '' : formTimeValue.status === '全部' ? '' : formTimeValue.status;
        let formFillUserId = loginInfo.data.static_auth === 0 ? loginInfo.data.id : '';
        let formFillUserName = T.lodash.isUndefined(formTimeValue.head) ? '' : formTimeValue.head;
        let formCurrent = startPageNum;
        let formSize = endPageNum;

        // let apiHref = `${window.ENV.apiDomain}` + "/excel/memberDetail?startTime=" + formStartTime + '&endTime=' + formEndTime + '&area=' + formArea + '';
        let apiHref = `${window.ENV.apiDomain}/excel/memberDetail?startTime=${formStartTime}&endTime=${formEndTime}&area=${formArea}&name=${formName}&gender=${formGender}&baseInfo=${formBaseInfo}&bodyCondition=${formBodyCondition}&fillUserId=${formFillUserId}&fillUserName=${formFillUserName}&current=${formCurrent}&size=${formSize}`;

        //管理员表格
        const adminColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '县市区',
                dataIndex: 'areaName',
                key: 'areaName',
            },
            {
                title: '所属行业',
                dataIndex: 'industryName',
                key: 'industryName',
            },
            {
                title: '单位名称',
                dataIndex: 'companyName',
                key: 'companyName',
            },
            {
                title: '所在部门',
                dataIndex: 'departName',
                key: 'departName',
            },
            {
                title: '姓名',
                dataIndex: 'memberName',
                key: 'memberName',
            },
            {
                title: '性别',
                dataIndex: 'genderName',
                key: 'genderName',
            },
            {
                title: '身份证号',
                dataIndex: 'idCard',
                key: 'idCard',
            },

            {
                title: '身体状况',
                dataIndex: 'bodyConditionName',
                key: 'bodyConditionName',
            },
            {
                title: '填报人',
                dataIndex: 'fillUser',
                key: 'fillUser',
            },
            {
                title: '填报时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                key: 'action',
                // width: '15%',
                render: (text, record) => {
                    return (
                        <span><a onClick={e => this.showMetadataManage(e, record)}>查看详情</a></span>
                    );
                },
            }
        ];
        //负责人表格
        const leaderColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '所属部门',
                dataIndex: 'departmentName',
                key: 'departmentName',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
            },
            {
                title: '身份证号',
                dataIndex: 'idCard',
                key: 'idCard',
            },
            {
                title: '第一次体温',
                dataIndex: 'firstTemperature',
                key: 'firstTemperature',
            },
            {
                title: '第二次体温',
                dataIndex: 'secondTemperature',
                key: 'secondTemperature',
            },
            {
                title: '身体状况',
                dataIndex: 'bodyConditionName',
                key: 'bodyConditionName',
            },
            {
                title: '填报人',
                dataIndex: 'fillUserName',
                key: 'fillUserName',
            },
            {
                title: '填报时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                key: 'action',
                // width: '15%',
                render: (text, record) => {
                    return (
                        <span><a onClick={e => this.showMetadataManage(e, record)}>查看详情</a></span>
                    );
                },
            }
        ];
        const rowSelection = {
            //多选所选择的key值
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectRows: selectedRows
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <PageHeaderWrapper title="行业健康信息填报查询">
                <Row gutter={24}>
                    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                        <Card
                            title="资源列表"
                            bordered={false}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            {
                                fetchTreeStatus ? <Spin/> :
                                    <DirectoryTree
                                        multiple
                                        defaultExpandAll={true}
                                        onSelect={this.onSelect}
                                        onExpand={this.onExpand}
                                        selectedKeys={selectTreeKey}
                                        expandedKeys={expandTreeKey}
                                        autoExpandParent={autoExpandParent}
                                    >
                                        {this.renderTreeNodes(treeNewData)}
                                    </DirectoryTree>
                            }
                        </Card>
                    </Col>
                    <Col xl={18} lg={18} md={18} sm={24} xs={24} className={styles.dataSourceTableList}>
                        <Form layout="inline" onSubmit={this.searchDataSource}>
                            <Row className={`${styles.dataSourceTitle} ${styles.tableListForms}`}
                                 style={{marginBottom: 10}}>
                                <Col xl={6} lg={6} md={6} sm={6} xs={24}>
                                    <Form.Item
                                        label='被填报人姓名'
                                    >
                                        {getFieldDecorator('person', {})(
                                            <Input
                                                autoComplete="off"
                                                placeholder='请输入填报人姓名'
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={24} style={{textAlign: 'left'}}>
                                    <Form.Item
                                        label='性别'
                                    >
                                        {getFieldDecorator('sex', {
                                            initialValue: "all",
                                        })(
                                            <Radio.Group onChange={this.onChange}>
                                                <Radio value={1}>男</Radio>
                                                <Radio value={2}>女</Radio>
                                                <Radio value={0}>全部</Radio>
                                            </Radio.Group>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={24}>
                                    <Form.Item
                                        label='开始时间'
                                    >
                                        {getFieldDecorator('startDate', {
                                            // rules: [{required: true, message: '请选择开始时间！'}],
                                            // initialValue: T.moment(new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()),
                                            initialValue: T.moment(new Date().getTime()),
                                        })(
                                            <DatePicker showTime={true} allowClear={false}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={24}>
                                    <Form.Item
                                        label='结束时间'
                                    >
                                        {getFieldDecorator('endDate', {
                                            // rules: [{required: true, message: '请选择结束时间！'}],
                                            initialValue: T.moment(new Date().getTime()),
                                        })(
                                            <DatePicker showTime={true} allowClear={false}/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className={`${styles.dataSourceTitle} ${styles.tableListForms}`}
                                 style={{marginBottom: 10}}>

                                <Col xl={6} lg={6} md={6} sm={6} xs={24}>
                                    <Form.Item
                                        label='身体状况'
                                    >
                                        {getFieldDecorator('base',{
                                            initialValue: 0
                                        })(
                                            <Select
                                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                            >
                                                {
                                                    this.renderSelect(bodyConditionSelect)
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={24}>
                                    <Form.Item
                                        label='填报人'
                                    >
                                        {getFieldDecorator('head', {})(
                                            <Input
                                                autoComplete="off"
                                                placeholder='请输入填报人'
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col xl={6} lg={8} md={8} sm={8} xs={24} style={{textAlign: 'left'}}>
                                    <Form.Item className={styles.searchBtnWrapper}>
                                        <Button htmlType="submit" style={{marginRight: 10}}>
                                            <FormattedMessage id="checkRecord.btn.search"/>
                                        </Button>
                                        <Button onClick={this.resetDataSource} type="primary" style={{marginRight: 10}}>
                                            <FormattedMessage id="checkRecord.btn.reset"/>
                                        </Button>
                                        {/* <Button onClick={this.exportData} type="primary">
                                            <FormattedMessage id="checkRecord.btn.output"/>
                                        </Button>*/}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Row className={`${styles.dataSourceTitle} ${styles.tableListForms}`}
                             style={{marginBottom: 10}}>
                            检索结果：{total}
                        </Row>
                        <Row>
                            <Card bordered={false}>
                                <Table
                                    columns={loginInfo.data.user.role === 0 ? adminColumns : leaderColumns}
                                    dataSource={members}
                                    // rowSelection={rowSelection}
                                    loading={fetchMemberInfoListStatus}
                                    pagination={{
                                        current: currentPage,
                                        onChange: this.pageChange,
                                        pageSize: EnumDataSyncPageInfo.defaultPageSize,
                                        total: Number(total) + 1,
                                        showQuickJumper: true
                                    }}
                                    // rowClassName={record => (record.editable ? styles.editable : '')}
                                />
                            </Card>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    title="导出功能"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.sendParams}>
                            确定
                        </Button>
                    ]}
                >
                    <div style={{fontWeight: 'bold'}}>
                        每次最多导出{maxPageSize + 1}条
                    </div>
                    <div style={{marginTop: 10}}>
                        起始条数：<Input placeholder="请输入起始条数" value={startPageNum} allowClear onChange={this.onStartPageChange} onBlur={this.onStartPageCheck}/>
                    </div>
                    <div style={{marginTop: 10}}>
                        结束条数：<Input placeholder="请输入结束条数" value={endPageNum} allowClear onChange={this.onEndPageChange} onBlur={this.onEndPageCheck}/>
                    </div>
                </Modal>
            </PageHeaderWrapper>
        );
    }
}

export default CheckRecordList;
