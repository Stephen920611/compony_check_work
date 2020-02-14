/**
 * @description
 * @Version Created by Stephen on 2019/8/12.
 * @Author Stephen
 * @license dongfangdianzi
 */
import EnumAPI from './../../constants/EnumAPI';
import {postJSON, post, get} from './../../utils/core/requestTj';
import T from './../../utils/T';
//fetchTreeData
//获取树节点
export async function fetchTreeNode(userId) {
    return post(EnumAPI.fetchTreeNode,userId);
}

//查看详情页面
export async function fetchMemberInfo(id) {
    return get(EnumAPI.fetchMemberInfo(id));
}

//获取摸排记录查询列表
export async function fetchCheckRecordList(params = {}) {
    return get(EnumAPI.fetchCheckRecordList, params);
}

//获取下拉选项
export async function fetchSelectInfo(params = {}) {
    return post(EnumAPI.fetchSelectInfo, params);
}