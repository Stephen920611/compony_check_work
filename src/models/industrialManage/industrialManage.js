/**
 * @description
 * @Version Created by Stephen on 2019/8/12.
 * @Author Stephen
 * @license dongfangdianzi
 */

import {
    fetchTreeNode,
    // fetchJobStatisticsList,
    fetchIndustrialManage,
    fetchIndustrialDetailById,

} from '@/services/industrialManage/industrialManage';
import T from '../../utils/T';

export default {
    namespace: 'industrialManage',//要唯一

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

        //统计查询
        * fetchIndustrialManageAction({params, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchIndustrialManage, params);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        },

        //获取树
        * fetchTreeNodeAction({userId, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchTreeNode, {userId});
                resolve(response);
            } catch (error) {
                reject(error);
            }
        },
        //查看详情页面
        * fetchIndustrialDetailByIdAction({params, resolve, reject}, {call, put}) {
            try {
                const response = yield call(fetchIndustrialDetailById, params);
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
