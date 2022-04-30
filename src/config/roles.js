export const roles = [
  {
    key: 'student',
    roleName: '学生',
    group_id: 10001
  },
  {
    key: 'teacher',
    roleName: '老师',
    group_id: 10002
  },
  {
    key: 'teacher-admin',
    roleName: '教学管理员',
    group_id: 10003
  },
  {
    key: 'admin',
    roleName: '系统管理员',
    group_id: 10004
  }

]

export const getRoles = (getRolesArr, isEq = true) => {
  const filterRes = roles.filter(ele => {
    const isIncludes = getRolesArr.includes(ele.roleName)
    return isEq ? isIncludes : !isIncludes
  })
  return filterRes
}

export const getRolesIdByName = (...rolesParm) => {
  return getRoles(rolesParm).map(ele => ele.group_id)
}
export const getRolesIdExByName = (...rolesParm) => {
  return getRoles(rolesParm, false).map(ele => ele.group_id)
}
