function M_access (m_access_data){
    this._id = m_access_data._id;
    this.m_role_id = m_access_data.m_role_id;
    this.controller = m_access_data.controller;
    this.role_name = m_access_data.role_name;
    this.m_menu_id = m_access_data.m_menu_id;
    this.is_delete = m_access_data.is_delete;
    this.created_by = m_access_data.created_by;
    this.created_date = m_access_data.created_date;
    this.updated_by = m_access_data.updated_by;
    this.updated_date = m_access_data.updated_date;
    this.name       = m_access_data.name
}

M_access.prototype.getData = function(){
    return{
        _id         : this._id,
        m_role_id   : this.m_role_id,
        m_menu_id   : this.m_menu_id,
        name: this.name,
        controller: this.controller,
        role_name   : this.role_name,
        is_delete   : this.is_delete,
        created_by  : this.created_by,
        created_date: this.created_date,
        updated_by   : this.updated_by,
        updated_date :this.updated_date
    }
}

module.exports = M_access