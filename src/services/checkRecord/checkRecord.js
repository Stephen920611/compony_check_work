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
    return post(EnumAPI.fetchTreeNode, userId);
}

//根据公司id,查询部门树
export async function fetchTreeDepartment(params = {}) {
    return post(EnumAPI.fetchTreeDepartment, params);
}

//查看详情页面
export async function fetchMemberInfoById(params = {}) {
    return post(EnumAPI.fetchMemberInfoById, params);
}

//分页查询列表
export async function fetchMemberInfoList(params = {}) {
    return post(EnumAPI.fetchMemberInfoList, params);
}

//获取下拉选项
export async function getAllDrops(params = {}) {
    return get(EnumAPI.getAllDrops);
}