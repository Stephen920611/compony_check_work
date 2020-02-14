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
    fetchStatus: loading.effects['checkRecord/fetchMemberInfoByIdAction'],
}))
class CheckRecordDetail extends PureComponent {
    constructor() {
        super();
        this.state = {
            activities: {},
            currentInfo: {},
            member: {},
            touch: [],
            industryId:3
        //    1复工企业  2 商超  3快递外卖 4酒店
        }
    }

    componentDidMount() {
        const {dispatch, location} = this.props;
        let self = this;
        //验证是否刷新页面
        T.auth.returnSpecialMainPage(location, '/checkRecord');
        if (location.hasOwnProperty("params") && location["params"].hasOwnProperty("data")) {
            self.setState({
                industryId:location["params"]["data"]['industryId']
            });
            new Promise((resolve, reject) => {
                dispatch({
                    type: 'checkRecord/fetchMemberInfoByIdAction',
                    params:{
                        id: location["params"]["data"]["id"],
                    },
                    resolve,
                    reject,
                });
            }).then(response => {
                console.log('11111',response.data);

                if (response.code === 0) {
                    self.setState({
                        // activities: T.lodash.isUndefined(activities[0]) ? {} : activities[0],
                        // currentInfo: T.lodash.isUndefined(currnets[0]) ? {} : currnets[0],
                        member:response.data,
                        // touch: T.lodash.isUndefined(touch[0]) ? {} : touch[0],
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
            industryId
        } = this.state;
        const breadcrumbDetail = [
            {
                linkTo: '/checkRecord',
                name: '行业健康信息填报查询',
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
                        { industryId === 1 ? ''
                            :<div>
                            <div className={styles.detailTitleName}>
                                所属行业
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
                                            member.hasOwnProperty('areaName') ? member.areaName : '---'
                                        }
                                    </span>
                                    </Col>
                                    <Col span={6} className={styles.detailBtns}>
                                        <span>所属行业：</span>
                                        <span>
                                        {
                                            member.hasOwnProperty('industryName') ? member.industryName : '---'
                                        }
                                    </span>
                                    </Col>
                                    {industryId===3?<Col span={6} className={styles.detailBtns}>
                                        <span>身份：</span>
                                        <span>
                                        {
                                            member.hasOwnProperty('hotelRole') ? member.hotelRole===1?'宾客': member.hotelRole===0?'员工':'---' : '---'
                                        }
                                    </span>
                                    </Col>:''}
                                </Row>
                            </Card>
                        </div>}


                        <div className={styles.detailTitleName}>
                            基本信息
                        </div>
                        {industryId===4?
                            <Card style={{marginBottom:20}}
                                          loading={fetchStatus}
                        >
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>酒店名称：</span>
                                    <span>
                                        {
                                            member.hasOwnProperty('companyName') ? member.companyName : '---'
                                        }
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>酒店地址：</span>
                                    <span>
                                        {member.hasOwnProperty('companyAddress') ? member.companyAddress : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>入住房间：</span>
                                    <span>
                                        {member.hasOwnProperty('hotelRole') ? member.hotelRole : '---'}
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
                                        {member.hasOwnProperty('gender') ? member.gender : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>籍贯</span>
                                    <span>
                                        {member.hasOwnProperty('nativePlace') ? member.nativePlace : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>现住址：</span>
                                    <span>
                                        {member.hasOwnProperty('address') ? member.address : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>身份证号码：</span>
                                    <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>联系电话：</span>
                                    <span>
                                        {member.hasOwnProperty('phoneNum') ? member.phoneNum : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>交通工具</span>
                                    <span>
                                        {member.hasOwnProperty('trafficway') ? member.trafficway : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>1月25日之后是否离开过烟台：</span>
                                    <span>
                                        {member.hasOwnProperty('leaveYt') ? member.leaveYt : '---'}
                                    </span>
                                </Col>
                            </Row>

                        </Card>
                        :<Card style={{marginBottom:20}}
                               loading={fetchStatus}
                            >
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <span>企业名称：</span>
                                        <span>
                                        {
                                            member.hasOwnProperty('companyName') ? member.companyName : '---'
                                        }
                                    </span>
                                    </Col>
                                    <Col span={6} className={styles.detailBtns}>
                                        <span>企业地址：</span>
                                        <span>
                                        {member.hasOwnProperty('companyAddress') ? member.companyAddress : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>员工所在部门：</span>
                                        <span>
                                        {member.hasOwnProperty('departmentName') ? member.departmentName : '---'}
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
                                        {member.hasOwnProperty('gender') ? member.gender===1?'男':member.gender===0?'女':'---' : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>籍贯</span>
                                        <span>
                                        {member.hasOwnProperty('nativePlace') ? member.nativePlace : '---'}
                                    </span>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <span>现住址：</span>
                                        <span>
                                        {member.hasOwnProperty('address') ? member.address : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>身份证号码：</span>
                                        <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>联系电话：</span>
                                        <span>
                                        {member.hasOwnProperty('phoneNum') ? member.phoneNum : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>通勤方式</span>
                                        <span>
                                        {member.hasOwnProperty('trafficWay') ? member.trafficWay : '---'}
                                    </span>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    {industryId===3 ? <Col span={6}>
                                        <span>工作覆盖区域</span>
                                        <span>
                                        {member.hasOwnProperty('workCover') ? member.workCover : '---'}
                                    </span>
                                    </Col>:''}
                                    <Col span={6}>
                                        <span>1月25日之后是否离开过烟台：</span>
                                        <span>
                                        {member.hasOwnProperty('leaveYt') ? member.leaveYt===1?'是':member.leaveYt===0?'否':'---' : '---'}
                                    </span>
                                    </Col>
                                </Row>

                            </Card>
                        }


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
                                        {member.hasOwnProperty('isTouchSuspect') ? member.isTouchSuspect===1?'是':member.isTouchSuspect===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>接触者姓名：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectName') ? member.suspectName : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触者身份证号：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectIdCard') ? member.suspectIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>接触时间：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectTime') ?  T.helper.dateFormat(member.suspectTime,'YYYY-MM-DD HH:mm') : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触地点：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectPoint') ? member.suspectPoint : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>是否与密切接触者共同生活、工作、学习、聚会过：</span>
                                    <span>
                                        {member.hasOwnProperty('isTouchIntimate') ? member.isTouchIntimate===1?'是':member.isTouchIntimate===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>接触者姓名：</span>
                                    <span>
                                        {member.hasOwnProperty('intimateName') ? member.intimateName : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触者身份证号：</span>
                                    <span>
                                        {member.hasOwnProperty('intimateIdCard') ? member.intimateIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>接触时间：</span>
                                    <span>
                                        {member.hasOwnProperty('intimateTime') ? T.helper.dateFormat(member.intimateTime,'YYYY-MM-DD HH:mm') : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触地点：</span>
                                    <span>
                                        {member.hasOwnProperty('intimatePoint') ? member.intimatePoint : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>是否与重点疫区人员接触过：</span>
                                    <span>
                                        {member.hasOwnProperty('isTouchInfector') ? member.isTouchInfector===1?'是':member.isTouchInfector===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>接触者姓名：</span>
                                    <span>
                                        {member.hasOwnProperty('infectorName') ? member.infectorName : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触者身份证号：</span>
                                    <span>
                                        {member.hasOwnProperty('infectorIdCard') ? member.infectorIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>接触时间：</span>
                                    <span>
                                        {member.hasOwnProperty('infectorTime') ? T.helper.dateFormat(member.infectorTime,'YYYY-MM-DD') : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>接触地点：</span>
                                    <span>
                                        {member.hasOwnProperty('infectorPoint') ? member.infectorPoint : '---'}
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
                                        {member.hasOwnProperty('temperatureOne') ? member.temperatureOne : '---'}
                                    </span>
                                </Col>
                                <Col span={6} className={styles.detailBtns}>
                                    <span>第二次体温：</span>
                                    <span>
                                        {member.hasOwnProperty('temperatureTwo') ? member.hasSeek : 'temperatureTwo'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>具体状况：</span>
                                    <span>
                                        {member.hasOwnProperty('bodyConditionName') ? member.bodyConditionName : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>

                                <Col span={12} className={styles.detailBtns}>
                                    <span>家人是否有湖北等疫情较重地区居住史、旅行史或者病例接触史：</span>
                                    <span>
                                        {member.hasOwnProperty('familyToHubei') ? member.familyToHubei === 1 ? '是':member.familyToHubei===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>填报责任人：</span>
                                    <span>
                                        {member.hasOwnProperty('fillUser') ? member.fillUser : '---'}
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
