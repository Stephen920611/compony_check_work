/**
 * @description
 * @Version Created by Stephen on 2019/8/12.
 * @Author Stephen
 * @license dongfangdianzi
 */

import {
    fetchMemberInfo,
    fetchCheckRecordList,
    fetchSelectInfo,
    fetchTreeNode,
    fetchTreeDepartment,
    fetchMemberInfoList,
    fetchMemberInfoById,
} from '@/services/checkRecord/checkRecord';
import T from '../../utils/T';

export default {
    namespace: 'checkRecord',//要唯一

    state: {
        statisticsList: [
            {
                key: 1,
                totalNum: 10,
                returnNum: 20,
                closeContactsNum: 30,
                partyNum: 40,
                keyEpidemicAreasNum: 50,
                abnormalPhysicalConditionsNum: 60,
                quarantinedOnThatDayNum: 70,
                isolatedTotalNum: 80,
                quarantinedAtHomeOnThatDayNum: 90,
                atHomeTotalNum: 100,
            }
        ],//插件管理表格
    },

    effects: {
        //根据公司id,查询部门树
        * fetchTreeDepartmentAction({companyId, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchTreeDepartment, {companyId});
                resolve(response);
            } catch (error) {
                reject(error);
            }
        },

        //获取列表页面
        * fetchMemberInfoListAction({params, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchMemberInfoList, params);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        },
        //获取下拉选项
        * fetchSelectInfoAction({params, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchSelectInfo, params);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        },
        //查看详情页面
        * fetchMemberInfoByIdAction({params, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchMemberInfoById, params);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        },
    },

    reducers: {
        setStatisticsList(state, {statisticsList}) {
            return {
                ...state,
                statisticsList
            };
        },
    },
};
