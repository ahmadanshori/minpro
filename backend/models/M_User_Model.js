function M_User(m_user_data) {
  this._id = m_user_data._id;
  this.username = m_user_data.username;
  this.password = m_user_data.password;
  this.m_role_id = m_user_data.m_role_id;
  this.m_employee_id = m_user_data.m_employee_id;
  this.role_name = m_user_data.role_name;
  this.name = m_user_data.name;
  this.company_name = m_user_data.company_name;
  this.is_delete = m_user_data.is_delete;
  this.created_by = m_user_data.created_by;
  this.created_date = m_user_data.created_date;
  this.updated_by = m_user_data.updated_by;
  this.updated_date = m_user_data.updated_date;
}

M_User.prototype.getData = function() {
  return {
    _id: this._id,
    username: this.username,
    password: this.password,
    m_role_id: this.m_role_id,
    m_employee_id: this.m_employee_id,
    role_name: this.role_name,
    name: this.name,
    company_name: this.company_name,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = M_User;
