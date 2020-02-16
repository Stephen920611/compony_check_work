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
export async function fetchIndustrialManage(params = {}) {
    return post(EnumAPI.fetchIndustrialManage, params);
}

//获取树接口
export async function fetchTreeNode(params = {}) {
    return post(EnumAPI.fetchTreeNode, params);
}
//查看企业详情
export async function fetchIndustrialDetailById(params = {}) {
    return post(EnumAPI.fetchIndustrialDetailById, params);
}