/**
 * @description
 * @Version Created by Stephen on 2019/8/12.
 * @Author Stephen
 * @license dongfangdianzi
 */
import EnumAPI from './../../constants/EnumAPI';
import {postJSON, post, get} from './../../utils/core/requestTj';
import T from './../../utils/T';

//统计查询
export async function fetchTotalStatistics(params = {}) {
    return post(EnumAPI.fetchTotalStatistics, params);
}

//获取树接口
export async function fetchTreeNode(params = {}) {
    return post(EnumAPI.fetchTreeNode, params);
}