import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import styles from './IndustrialManageDetail.less';
import T from './../../utils/T';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CustomBreadcrumb from '@/templates/ToolComponents/CustomBreadcrumb';

import {
    Row,
    Col,
    Card,
} from 'antd';

/* eslint react/no-multi-comp:0 */
@connect(({industrialManage, loading}) => ({
    industrialManage,
    fetchStatus: loading.effects['industrialManage/fetchIndustrialDetailByIdAction'],
}))
class IndustrialManageDetail extends PureComponent {
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
                    type: 'industrialManage/fetchIndustrialDetailByIdAction',
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
                                        <span>注册地址：</span>
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
                                        <span>联系方式：</span>
                                        <span>
                                        {member.hasOwnProperty('departmentName') ? member.departmentName : '---'}
                                    </span>
                                    </Col>

                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <span>在册人数：</span>
                                        <span>
                                        {member.hasOwnProperty('name') ? member.name : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>开工时间：</span>
                                        <span>
                                        {member.hasOwnProperty('suspectTime') ? member.suspectTime===null ? '':T.helper.dateFormat(member.suspectTime,'YYYY-MM-DD') : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>在湖北设分厂个数：</span>
                                        <span>
                                        {member.hasOwnProperty('gender') ? member.gender===1?'男':member.gender===0?'女':'---' : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>是否与湖北业务往来频繁：</span>
                                        <span>
                                        {member.hasOwnProperty('nativePlace') ? member.nativePlace : '---'}
                                    </span>
                                    </Col>
                                </Row>
                                <Row className={styles.detailTitle}>
                                    <Col span={6}>
                                        <span>在册员工湖北籍人数：</span>
                                        <span>
                                        {member.hasOwnProperty('address') ? member.address : '---'}
                                    </span>
                                    </Col>
                                    <Col span={6}>
                                        <span>在册员工非烟台籍（含湖北籍）人数：</span>
                                        <span>
                                        {member.hasOwnProperty('idCard') ? member.idCard : '---'}
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
                            企业疫情防控体系建立情况
                        </div>
                        <Card
                            style={{marginBottom: 20}}
                            loading={fetchStatus}
                        >
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>疫情防控工作方案</span>
                                    <span>
                                        {member.hasOwnProperty('isTouchSuspect') ? member.isTouchSuspect===1?'是':member.isTouchSuspect===0?'否':'---' : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>疫情防控领导机构：</span>
                                    <span>
                                        {member.hasOwnProperty('suspectName') ? member.suspectName : '---'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={styles.detailTitle}>
                                <Col span={6}>
                                    <span>复工企业批准文件：</span>
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

export default IndustrialManageDetail;
