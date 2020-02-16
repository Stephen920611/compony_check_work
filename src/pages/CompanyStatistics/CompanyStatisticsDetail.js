import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import styles from './CompanyStatisticsDetail.less';
import T from './../../utils/T';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CustomBreadcrumb from '@/templates/ToolComponents/CustomBreadcrumb';

import {
    Row,
    Col,
    Card,
} from 'antd';

/* eslint react/no-multi-comp:0 */
@connect(({companyStatistics, loading}) => ({
    companyStatistics,
    fetchStatus: loading.effects['companyStatistics/fetchCompanyDetailByIdAction'],
}))
class CompanyStatisticsDetail extends PureComponent {
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
        T.auth.returnSpecialMainPage(location, '/industrialManage');
        if (location.hasOwnProperty("params") && location["params"].hasOwnProperty("data")) {
            self.setState({
                industryId:location["params"]["data"]['industryId']
            });
            /*new Promise((resolve, reject) => {
                dispatch({
                    type: 'companyStatistics/fetchCompanyDetailByIdAction',
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
            });*/
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
                linkTo: '/companyStatistics',
                name: '企业信息填报管理',
            },
            {
                name: '企业信息填报详情查看',
            },
        ];
        return (
            <PageHeaderWrapper
                title={"企业信息填报详情查看"}
                isSpecialBreadcrumb={true}
                breadcrumbName={<CustomBreadcrumb dataSource={breadcrumbDetail}/>}
            >
                <div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailTitleName}>
                            企业基本信息
                        </div>
                        <Card style={{marginBottom:20}}
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
                                        <span>法人代表：</span>
                                        <span>
                                        {member.hasOwnProperty('companyAddress') ? member.companyAddress : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>填报人：</span>
                                        <span>
                                        {member.hasOwnProperty('departmentName') ? member.departmentName : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>联系电话：</span>
                                        <span>
                                        {member.hasOwnProperty('departmentName') ? member.departmentName : '---'}
                                    </span>
                                    </Col>

                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <span>员工人数：</span>
                                        <span>
                                        {member.hasOwnProperty('name') ? member.name : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>今日上岗人数：</span>
                                        <span>
                                            {member.hasOwnProperty('name') ? member.name : '---'}
                                            {/*{member.hasOwnProperty('suspectTime') ? member.suspectTime===null ? '':T.helper.dateFormat(member.suspectTime,'YYYY-MM-DD') : '---'}*/}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>填报时间：</span>
                                        <span>
                                         {member.hasOwnProperty('suspectTime') ? member.suspectTime===null ? '':T.helper.dateFormat(member.suspectTime,'YYYY-MM-DD') : '---'}
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
                                    <span>口罩库存（个）：</span>
                                    <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>消毒液库存（公斤）：</span>
                                    <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>今日是否对厂区进行了两次消杀：</span>
                                    <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
                                    </span>
                                </Col>
                                {/* <Col span={6}>
                                        <span>填报时间：</span>
                                        <span>
                                         {member.hasOwnProperty('suspectTime') ? member.suspectTime===null ? '':T.helper.dateFormat(member.suspectTime,'YYYY-MM-DD') : '---'}
                                    </span>
                                    </Col>*/}

                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>今日是否落实食堂防疫措施：</span>
                                    <span>
                                        {member.hasOwnProperty('isTouchSuspect') ? member.isTouchSuspect===1?'是':member.isTouchSuspect===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>今日是否落实宿舍（出租房、工棚）：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectName') ? member.suspectName : '---'}
                                    </span>
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
                                <Col span={6}>
                                    <span>2月2日之后抵烟人员：</span>
                                    <span>
                                        {member.hasOwnProperty('isTouchSuspect') ? member.isTouchSuspect===1?'是':member.isTouchSuspect===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>与确诊、疑似病例有过密切接触的人数：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectName') ? member.suspectName : '---'}
                                    </span>
                                </Col>

                                <Col span={6}>
                                    <span>与重点疫区人员有过接触的人数：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectIdCard') ? member.suspectIdCard : '---'}
                                    </span>
                                </Col>
                                <Col span={6}>
                                    <span>与密切接触者有过共同生活、工作、学习、聚会的人数：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectIdCard') ? member.suspectIdCard : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>身体状况异常人数：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectIdCard') ? member.suspectIdCard : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={24}>
                                    <span>对发现的重点人群采取的措施（具体到什么人、什么情况，采取了什么措施）：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectIdCard') ? member.suspectIdCard : '---'}
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

export default CompanyStatisticsDetail;
