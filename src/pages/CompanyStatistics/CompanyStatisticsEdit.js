import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import styles from './CompanyStatisticsEdit.less';
import T from './../../utils/T';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CustomBreadcrumb from '@/templates/ToolComponents/CustomBreadcrumb';
// import CustomBreadcrumb from '@/tempAddInfoListlates/ToolComponents/CustomBreadcrumb';

import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Radio,
} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

/* eslint react/no-multi-comp:0 */
@connect(({companyStatistics, checkRecord, loading}) => ({
    companyStatistics,
    checkRecord,
    fetchStatus: loading.effects['companyStatistics/fetchCompanyPersonNumberAction'],
}))
@Form.create()
class CompanyStatisticsEdit extends PureComponent {
    constructor() {
        super();
        this.state = {
            formItemLayout: {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 6},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                    md: {span: 16},
                },
            },
            formItemHalf: {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 12},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 12},
                    md: {span: 12},
                },
            },
            submitFormLayout: {
                wrapperCol: {
                    xs: {span: 24, offset: 0},
                    sm: {span: 24, offset: 0},
                },
            },
            baseInfoSelect: [],     //被调查人基本情况
            bodyConditionSelect: [],     //身体状况
            activities: {},
            currentInfo: {},
            member: {},
            touch: [],
            isCreate:true,


        }
    }

    componentDidMount() {
        const {dispatch, location} = this.props;

        let self = this;
        //验证是否刷新页面
        T.auth.returnSpecialMainPage(location, '/companyStatistics');
        //获取重点人员统计
        /*new Promise((resolve, reject) => {
            dispatch({
                type: 'companyStatistics/fetchCompanyPersonNumberAction',
                params: {
                    type: 'BASE_INFO'
                },
                resolve,
                reject,
            });
        }).then(response => {
            if (response.code === 0) {
                self.setState({
                    baseInfoSelect: response.data
                })
            } else {
                T.prompt.error(response.msg);
            }
        });*/

        if (location.hasOwnProperty("params") && location["params"].hasOwnProperty("data")&&location["params"].hasOwnProperty("status")) {
            this.setState({
                isCreate:location["params"]["status"],
            })

            //查看详情
            /*new Promise((resolve, reject) => {
                dispatch({
                    type: 'companyStatistics/fetchCompanyDetailByIdAction',
                    id: location["params"]["data"]["id"],
                    resolve,
                    reject,
                });
            }).then(response => {
                if (response.code === 0) {
                    const {currnets, member, touch, activities} = response.data;

                    let formValue = {
                        area: member.area,	//县市区名字
                        name: member.name,
                        age: member.age,
                        phoneNum: member.phoneNum,
                        baseInfo: member.baseInfo,

                        backTime: T.lodash.isUndefined(activities[0]) ? '' : (activities[0].backTime === null || activities[0].backTime === '') ? null : T.moment( new Date(activities[0].backTime).getTime()),

                        isTouchSuspect: T.lodash.isUndefined(touch[0]) ? '' : touch[0].isTouchSuspect,	  //是否
                        suspectPoint: T.lodash.isUndefined(touch[0]) ? '' : touch[0].suspectPoint,

                        seekTime: T.lodash.isUndefined(currnets[0]) ? '' : (currnets[0].seekTime === null || currnets[0].seekTime === '') ? null : T.moment( new Date(currnets[0].seekTime).getTime()),
                        controlTime: T.lodash.isUndefined(currnets[0]) ? '' : (currnets[0].controlTime === null || currnets[0].controlTime === '') ? null : T.moment( new Date(currnets[0].controlTime).getTime()),
                    };

                    self.props.form.setFieldsValue(formValue);
                } else {
                    T.prompt.error(response.msg);
                }
            });*/
        }
    }

    //提交功能
    onSubmitData = (e) => {
        let self = this;
        const {dispatch, form, location} = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let loginInfo = T.auth.getLoginInfo();
                let userId = loginInfo.data.id;
                console.log(values,'values');
                let params = {
                    member: {
                        area: values.area,	//县市区名字
                        name: T.lodash.isUndefined(values.name) ? '' : values.name,
                        age: T.lodash.isUndefined(values.age) ? '' : values.age,
                        gender: T.lodash.isUndefined(values.gender) ? '' : values.gender,
                        nativePlace: T.lodash.isUndefined(values.nativePlace) ? '' : values.nativePlace,
                        address: T.lodash.isUndefined(values.address) ? '' : values.address,
                        idCard: T.lodash.isUndefined(values.idCard) ? '' : values.idCard,
                        phoneNum:T.lodash.isUndefined(values.phoneNum) ? '' : values.phoneNum,
                        baseInfo:T.lodash.isUndefined(values.baseInfo) ? '' : values.baseInfo,	//名字
                        fillUserId: userId,  //后端返回
                        id: location["params"]["data"]["id"]
                    },
                    memberActivity: {
                        backFromWhere: T.lodash.isUndefined(values.backFromWhere) ? '' : values.backFromWhere,
                        backTime: T.lodash.isUndefined(values.backTime) ? '' : (values.backTime === null || values.backTime === '') ? '': T.helper.dateFormat(values.backTime),
                        backType:T.lodash.isUndefined(values.backType) ? '' : values.backType,
                        carNum:T.lodash.isUndefined(values.carNum) ? '' : values.carNum,
                        wayCity:T.lodash.isUndefined(values.wayCity) ? '' : values.wayCity,
                        fillUserId: userId  //后端返回
                    },
                    memberTouch: {
                        isTouchSuspect: T.lodash.isUndefined(values.isTouchSuspect) ? '' : values.isTouchSuspect,	  //是否
                        suspectName:T.lodash.isUndefined(values.suspectName) ? '' : values.suspectName,
                        suspectIdCard:T.lodash.isUndefined(values.suspectIdCard) ? '' : values.suspectIdCard,
                        suspectTime: T.lodash.isUndefined(values.suspectTime) ? '' : (values.suspectTime === null || values.suspectTime === '') ? '': T.helper.dateFormat(values.suspectTime),
                        suspectPoint:T.lodash.isUndefined(values.suspectPoint) ? '' : values.suspectPoint,

                        isTouchIntimate: T.lodash.isUndefined(values.isTouchIntimate) ? '' : values.isTouchIntimate,	  //是否
                        intimateName:T.lodash.isUndefined(values.intimateName) ? '' : values.intimateName,
                        intimateIdCard:T.lodash.isUndefined(values.intimateIdCard) ? '' : values.intimateIdCard,
                        intimateTime: T.lodash.isUndefined(values.intimateTime) ? '' : (values.intimateTime === null || values.intimateTime === '') ? '': T.helper.dateFormat(values.intimateTime),
                        intimatePoint:T.lodash.isUndefined(values.intimatePoint) ? '' : values.intimatePoint,

                        isTouchInfector: T.lodash.isUndefined(values.isTouchInfector) ? '' : values.isTouchInfector,	  //是否
                        infectorName:T.lodash.isUndefined(values.infectorName) ? '' : values.infectorName,
                        infectorIdCard:T.lodash.isUndefined(values.infectorIdCard) ? '' : values.infectorIdCard,
                        infectorTime: T.lodash.isUndefined(values.infectorTime) ? '' : (values.infectorTime === null || values.infectorTime === '') ? '': T.helper.dateFormat(values.infectorTime),
                        infectorPoint:T.lodash.isUndefined(values.infectorPoint) ? '' : values.infectorPoint,

                        fillUserId: userId  //后端返回
                    },
                    memberCurstate: {
                        bodyCondition: T.lodash.isUndefined(values.bodyCondition) ? '' : values.bodyCondition,	//名字
                        hasSeek: T.lodash.isUndefined(values.hasSeek) ? '' : values.hasSeek,	//名字
                        seekHospital: T.lodash.isUndefined(values.seekHospital) ? '' : values.seekHospital,	//名字
                        seekTime: T.lodash.isUndefined(values.seekTime) ? '' : (values.seekTime === null || values.seekTime === '') ? '': T.helper.dateFormat(values.seekTime),	//名字
                        controlMeasures: T.lodash.isUndefined(values.controlMeasures) ? '' : values.controlMeasures,	//名字
                        controlTime: T.lodash.isUndefined(values.controlTime) ? '' : (values.controlTime === null || values.controlTime === '') ? '': T.helper.dateFormat(values.controlTime),	//名字
                        nextMeasures: T.lodash.isUndefined(values.nextMeasures) ? '' : values.nextMeasures,	//名字
                        fillUserId: userId  //后端返回
                    },
                };
                new Promise((resolve, reject) => {
                    dispatch({
                        type: 'addInfo/addInfoAction',
                        params,
                        resolve,
                        reject,
                    });
                }).then(response => {
                    if (response.code === 0) {
                        T.prompt.success("更新成功");
                        self.resetForm();
                        router.push({
                            pathname: '/addInfo',
                        });
                    } else {
                        T.prompt.error(response.msg);
                    }
                });
            }
        })
    };

    //验证年龄
    checkAge = (rule, value, callback) => {
        // const { getFieldValue } = this.props.form;
        let reg=/^(?:[0-9][0-9]?|1[01][0-9]|200)$/;//年龄是0-200之间有
        if(!reg.test(value) && value !== null){
            callback("年龄输入不合法！");
            return;
        }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback()
    };

    //重置功能
    resetForm = () => {
        this.props.form.resetFields();
    };

    //渲染不同的下拉框
    renderSelect = (dataSource, isArea = false) => {
        let loginInfo = T.auth.getLoginInfo();
        return (
            dataSource.map((item,idx) => {
                return (
                    <Option key={idx} value={item.name} disabled={isArea ? loginInfo.data.area === item.name ? false : true : false}>
                        {item.name}
                    </Option>
                )
            })
        )
    };

    render() {
        const {
            fetchStatus,
            form: {getFieldDecorator, getFieldValue},
        } = this.props;
        const {
            activities,
            currentInfo,
            member,
            touch,
            formItemLayout,
            formItemHalf,
            submitFormLayout,
            bodyConditionSelect,
            baseInfoSelect,
            isCreate,
        } = this.state;
        let loginInfo = T.auth.getLoginInfo();

        let areaSelect = [
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
                value: "福山区",
            },
            {
                id: "GA003",
                key: "GA003",
                name: "莱山区",
                pId: "GA",
                value: "莱山区",
            },
            {
                id: "GA004",
                key: "GA004",
                name: "牟平区",
                pId: "GA",
                value: "牟平区",
            },
            {
                id: "GA005",
                key: "GA005",
                name: "海阳市",
                pId: "GA",
                value: "海阳市",
            },
            {
                id: "GA006",
                key: "GA006",
                name: "莱阳市",
                pId: "GA",
                value: "莱阳市",
            },
            {
                id: "GA007",
                key: "GA007",
                name: "栖霞市",
                pId: "GA",
                value: "栖霞市",
            },
            {
                id: "GA008",
                key: "GA008",
                name: "蓬莱市",
                pId: "GA",
                value: "蓬莱市",
            },
            {
                id: "GA009",
                key: "GA009",
                name: "长岛县",
                pId: "GA",
                value: "长岛县",
            },
            {
                id: "GA010",
                key: "GA010",
                name: "龙口市",
                pId: "GA",
                value: "龙口市",
            },
            {
                id: "GA011",
                key: "GA011",
                name: "招远市",
                pId: "GA",
                value: "招远市",
            },
            {
                id: "GA012",
                key: "GA012",
                name: "莱州市",
                pId: "GA",
                value: "莱州市",
            },
            {
                id: "GA013",
                key: "GA013",
                name: "开发区",
                pId: "GA",
                value: "开发区",
            },
            {
                id: "GA014",
                key: "GA014",
                name: "高新区",
                pId: "GA",
                value: "高新区",
            },
            {
                id: "GA015",
                key: "GA015",
                name: "保税港区",
                pId: "GA",
                value: "保税港区",
            },
            {
                id: "GA016",
                key: "GA016",
                name: "昆嵛山保护区",
                pId: "GA",
                value: "昆嵛山保护区",
            },
        ];

        const breadcrumbDetail = [
            {
                linkTo: '/companyStatistics',
                name: '企业信息填报管理',
            },
            {
                name: isCreate?'新建企业信息填报':'编辑企业信息填报',
            },
        ];

        return (
            <PageHeaderWrapper
                title={ isCreate ? '新建企业信息填报':'编辑企业信息填报'}
                isSpecialBreadcrumb={true}
                breadcrumbName={<CustomBreadcrumb dataSource={breadcrumbDetail}/>}
            >
                <div>
                    <div className={styles.detailItem}>
                        <Form
                            onSubmit={this.onSubmitData}
                            hideRequiredMark
                        >
                            <div className={styles.detailTitleName}>
                                企业基本信息
                            </div>
                            <Card
                                style={{marginBottom: 20}}
                                loading={fetchStatus}
                            >
                                <Row className={styles.detailTitle}>
                                   {/* <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='县市区：'
                                        >
                                            {getFieldDecorator('area', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: "请选择县市区",
                                                        },
                                                    ],
                                                    initialValue: T.auth.getLoginInfo().data.area
                                                }
                                            )(
                                                <Select
                                                    // onChange={this.onChangeConnectionUrl.bind(this, "dataOrigin", "connectionUrl")}
                                                    // onSelect={this.selectDataSource.bind(this, 'FTP')}
                                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    placeholder="请选择县市区"
                                                >
                                                    {
                                                        this.renderSelect(areaSelect, true)
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>*/}
                                    <Col span={6} className={styles.detailBtns}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='企业名称：'
                                        >
                                            {getFieldDecorator('name', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: "请输入企业名称",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入企业名称"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='法人代表：'
                                        >
                                            {getFieldDecorator('age', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: "请输入法人代表",
                                                    },
                                                    {
                                                        validator: this.checkAge
                                                    }
                                                ],
                                            })(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入法人代表"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='填报人：'
                                        >
                                            {getFieldDecorator('age1', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: "请输入填报人",
                                                    },
                                                    {
                                                        validator: this.checkAge
                                                    }
                                                ],
                                            })(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入填报人"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='联系电话：'
                                        >
                                            {getFieldDecorator('age2', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: "请输入联系电话",
                                                    },
                                                    {
                                                        validator: this.checkAge
                                                    }
                                                ],
                                            })(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入联系电话"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {/*<Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='填报人：'
                                        >
                                            {getFieldDecorator('gender', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请选择填报人",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Radio.Group >
                                                    <Radio value={"男"}>男</Radio>
                                                    <Radio value={"女"}>女</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>*/}
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='员工人数：'
                                        >
                                            {getFieldDecorator('nativePlace', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请输入员工人数",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入员工人数"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} className={styles.detailBtns}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='今日上岗人数：'
                                        >
                                            {getFieldDecorator('address', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请输入今日上岗人数",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入今日上岗人数"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} className={styles.detailBtns}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='填报时间：'
                                        >
                                            {getFieldDecorator('backTime', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请选择填报时间",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <DatePicker showTime={true}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </Card>
                            <div className={styles.detailTitleName}>
                                防控信息
                            </div>
                            <Card
                                style={{marginBottom: 20}}
                                loading={fetchStatus}
                            >
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='口罩库存(个)：'
                                        >
                                            {getFieldDecorator('backFromWhere', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请输入口罩库存",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入口罩库存"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='消毒液库存(公斤)：'
                                        >
                                            {getFieldDecorator('backFromWhere1', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请输入消毒液库存",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="请输入口罩库存"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} className={styles.detailBtns}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='今日是否对厂区进行了两次消毒：'
                                        >
                                            {getFieldDecorator('backTime', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请选择来烟(返烟)时间",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Radio.Group >
                                                    <Radio value={1}>是</Radio>
                                                    <Radio value={0}>否</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={6} className={styles.detailBtns}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='今日是否落实食堂防疫措施：'
                                        >
                                            {getFieldDecorator('backTime1', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请选择今日是否落实食堂防疫措施",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Radio.Group >
                                                    <Radio value={1}>是</Radio>
                                                    <Radio value={0}>否</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} className={styles.detailBtns}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='今日是否落实宿舍（出租屋、工棚）防疫措施：'
                                        >
                                            {getFieldDecorator('backTime2', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message: "请选择今日是否落实宿舍（出租屋、工棚）防疫措施",
                                                        },
                                                    ],
                                                }
                                            )(
                                                <Radio.Group >
                                                    <Radio value={1}>是</Radio>
                                                    <Radio value={0}>否</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </Card>
                            <div className={styles.detailTitleName}>
                                重点人员统计
                            </div>
                            <Card
                                style={{marginBottom: 20}}
                                loading={fetchStatus}
                            >
                                <Row className={styles.detailTitle}>
                                    <Col span={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='2月2日之后抵烟人员：'
                                        >
                                            {getFieldDecorator('suspectName1', {
                                                }
                                            )(
                                                <Input
                                                    disabled
                                                    autoComplete="off"
                                                    placeholder="请输入2月2日之后抵烟人员"

                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='与确诊、疑似病例有过密切接触的人数：'
                                        >
                                            {getFieldDecorator('suspectName2', {
                                                }
                                            )(
                                                <Input
                                                    disabled
                                                    autoComplete="off"
                                                    placeholder="请输入与确诊、疑似病例有过密切接触的人数"

                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='与重点疫区人员有过接触的人数：'
                                        >
                                            {getFieldDecorator('suspectName3', {
                                                }
                                            )(
                                                <Input
                                                    disabled
                                                    autoComplete="off"
                                                    placeholder="请输入与重点疫区人员有过接触的人数"

                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='与密切接触者有过共同生活、工作、学习、聚会的人数：'
                                        >
                                            {getFieldDecorator('suspectName4', {
                                                }
                                            )(
                                                <Input
                                                    disabled
                                                    autoComplete="off"
                                                    placeholder="请输入与密切接触者有过共同生活、工作、学习、聚会的人数"

                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='身体状况异常人数：'
                                        >
                                            {getFieldDecorator('suspectIdCard', {
                                                }
                                            )(
                                                <Input
                                                    disabled
                                                    autoComplete="off"
                                                    placeholder="请输入身体状况异常人数"

                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={24}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label='对发现的重点人群采取的措施（具体到什么人、什么情况，采取了什么措施）：'
                                        >
                                            {getFieldDecorator('wayCity', {

                                                }
                                            )(
                                                <TextArea
                                                    placeholder="请填写对发现的重点人群采取的措施（具体到什么人、什么情况，采取了什么措施）"
                                                    autoSize={{minRows: 3, maxRows: 6}}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </Card>
                            <FormItem {...submitFormLayout} style={{marginTop: 32, paddingBottom: 24,textAlign:'center'}}>
                                <Button
                                    style={{marginLeft: 16}}
                                    type="primary"
                                    htmlType="submit"
                                    // loading={savingStatus}
                                >
                                    保存
                                </Button>
                                <Button
                                    style={{marginLeft: 8}}
                                    type="primary"
                                    onClick={this.resetForm}
                                >
                                    清空
                                </Button>
                            </FormItem>
                        </Form>

                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default CompanyStatisticsEdit;
