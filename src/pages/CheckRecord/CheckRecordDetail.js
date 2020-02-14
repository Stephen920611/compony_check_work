import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import styles from './CheckRecordDetail.less';
import T from './../../utils/T';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CustomBreadcrumb from '@/templates/ToolComponents/CustomBreadcrumb';

import {
    Row,
    Col,
    Card,
} from 'antd';

/* eslint react/no-multi-comp:0 */
@connect(({checkRecord, loading}) => ({
    checkRecord,
    fetchStatus: loading.effects['checkRecord/fetchMemberInfoAction'],
}))
class CheckRecordDetail extends PureComponent {
    constructor() {
        super();
        this.state = {
            activities: {},
            currentInfo: {},
            member: {},
            touch: [],
        }
    }

    componentDidMount() {
        const {dispatch, location} = this.props;
        let self = this;
        //验证是否刷新页面
        T.auth.returnSpecialMainPage(location, '/checkRecord');
        if (location.hasOwnProperty("params") && location["params"].hasOwnProperty("data")) {
            new Promise((resolve, reject) => {
                dispatch({
                    type: 'checkRecord/fetchMemberInfoAction',
                    id: location["params"]["data"]["id"],
                    resolve,
                    reject,
                });
            }).then(response => {
                const {currnets, member, touch, activities} = response.data;
                if (response.code === 0) {
                    self.setState({
                        activities: T.lodash.isUndefined(activities[0]) ? {} : activities[0],
                        currentInfo: T.lodash.isUndefined(currnets[0]) ? {} : currnets[0],
                        member,
                        touch: T.lodash.isUndefined(touch[0]) ? {} : touch[0],
                    })
                } else {
                    T.prompt.error(response.msg);
                }
            });
        }
    }

    render() {
        const {fetchStatus} = this.props;
        const {
            activities,
            currentInfo,
            member,
            touch,
        } = this.state;
        const breadcrumbDetail = [
            {
                linkTo: '/checkRecord',
                name: '行业健康信息填报查询（管理员）',
            },
            {
                name: '行业健康信息详情查看',
            },
        ];
        return (
            <PageHeaderWrapper
                title={"行业健康信息详情查看"}
                isSpecialBreadcrumb={true}
                breadcrumbName={<CustomBreadcrumb dataSource={breadcrumbDetail}/>}
            >
                <div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailTitleName}>
                            人员基本信息
                        </div>
                        <Card
                            style={{marginBottom: 20}}
                            loading={fetchStatus}
                        >
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>县市区：</span>
                                    <span>
                                        {
                                            member.hasOwnProperty('area') ? member.area : '---'
                                        }
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>所属行业：</span>
                                    <span>
                                        {
                                            member.hasOwnProperty('name') ? member.name : '---'
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Card>
                        <div className={styles.detailTitleName}>
                            基本信息
                        </div>
                        <Card style={{marginBottom:20}}
                              loading={fetchStatus}
                        >
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>企业名称：</span>
                                    <span>
                                        {
                                            member.hasOwnProperty('nativePlace') ? member.nativePlace : '---'
                                        }
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>地址：</span>
                                    <span>
                                        {member.hasOwnProperty('address') ? member.address : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>员工所在部门：</span>
                                    <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
                                    </span>
                                </Col>

                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>姓名：</span>
                                    <span>
                                        {member.hasOwnProperty('name') ? member.name : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>年龄：</span>
                                    <span>
                                        {member.hasOwnProperty('age') ? member.age : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>性别：</span>
                                    <span>
                                        {member.hasOwnProperty('sex') ? member.sex : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>籍贯</span>
                                    <span>
                                        {member.hasOwnProperty('baseInfo') ? member.baseInfo : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>现住址：</span>
                                    <span>
                                        {member.hasOwnProperty('name') ? member.name : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>身份证号码：</span>
                                    <span>
                                        {member.hasOwnProperty('age') ? member.age : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>联系电话：</span>
                                    <span>
                                        {member.hasOwnProperty('sex') ? member.sex : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>通勤方式</span>
                                    <span>
                                        {member.hasOwnProperty('baseInfo') ? member.baseInfo : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>1月25日之后是否离开过烟台：</span>
                                    <span>
                                        {member.hasOwnProperty('name') ? member.name : '---'}
                                    </span>
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
                                    <span>是否与确诊、疑似病例密切接触过：</span>
                                    <span>
                                        {touch.hasOwnProperty('isTouchSuspect') ? touch.isTouchSuspect : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>接触者姓名：</span>
                                    <span>
                                        {touch.hasOwnProperty('suspectName') ? touch.suspectName : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触者身份证号：</span>
                                    <span>
                                        {touch.hasOwnProperty('suspectIdCard') ? touch.suspectIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>接触时间：</span>
                                    <span>
                                        {touch.hasOwnProperty('suspectTime') ? touch.suspectTime : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触地点：</span>
                                    <span>
                                        {touch.hasOwnProperty('suspectPoint') ? touch.suspectPoint : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>是否与密切接触者共同生活、工作、学习、聚会过：</span>
                                    <span>
                                        {touch.hasOwnProperty('isTouchIntimate') ? touch.isTouchIntimate : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>接触者姓名：</span>
                                    <span>
                                        {touch.hasOwnProperty('intimateName') ? touch.intimateName : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触者身份证号：</span>
                                    <span>
                                        {touch.hasOwnProperty('intimateIdCard') ? touch.intimateIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>接触时间：</span>
                                    <span>
                                        {touch.hasOwnProperty('intimateTime') ? touch.intimateTime : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触地点：</span>
                                    <span>
                                        {touch.hasOwnProperty('intimatePoint') ? touch.intimatePoint : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>是否与重点疫区人员接触过：</span>
                                    <span>
                                        {touch.hasOwnProperty('isTouchInfector') ? touch.isTouchInfector : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>接触者姓名：</span>
                                    <span>
                                        {touch.hasOwnProperty('infectorName') ? touch.infectorName : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触者身份证号：</span>
                                    <span>
                                        {touch.hasOwnProperty('infectorIdCard') ? touch.infectorIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>接触时间：</span>
                                    <span>
                                        {touch.hasOwnProperty('infectorTime') ? touch.infectorTime : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触地点：</span>
                                    <span>
                                        {touch.hasOwnProperty('infectorPoint') ? touch.infectorPoint : '---'}
                                    </span>
                                </Col>
                            </Row>
                        </Card>
                        <div className={styles.detailTitleName}>
                            当前状态
                        </div>
                        <Card
                            style={{marginBottom: 20}}
                            loading={fetchStatus}
                        >
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>第一次体温：</span>
                                    <span>
                                        {currentInfo.hasOwnProperty('bodyCondition') ? currentInfo.bodyCondition : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>第二次体温：</span>
                                    <span>
                                        {currentInfo.hasOwnProperty('hasSeek') ? currentInfo.hasSeek : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>具体状况：</span>
                                    <span>
                                        {currentInfo.hasOwnProperty('seekHospital') ? currentInfo.seekHospital : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>

                                <Col span={12} className={styles.detailBtns}>
                                    <span>家人是否有湖北等疫情较重地区居住史、旅行史或者病例接触史：</span>
                                    <span>
                                        {currentInfo.hasOwnProperty('controlTime') ? currentInfo.controlTime : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>填报责任人：</span>
                                    <span>
                                        {currentInfo.hasOwnProperty('nextMeasures') ? currentInfo.nextMeasures : '---'}
                                    </span>
                                </Col>

                            </Row>

                        </Card>
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default CheckRecordDetail;
