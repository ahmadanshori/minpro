function M_role (m_role_data){
    this._id = m_role_data._id
    this.code = m_role_data.code
    this.name = m_role_data.name
    this.description = m_role_data.description
    this.is_delete = m_role_data.is_delete
    this.created_by = m_role_data.created_by
    this.created_date = m_role_data.created_date
    this.updated_by = m_role_data.updated_by
    this.updated_date = m_role_data.updated_date
}

M_role.prototype.getData = function(){
    return{
        _id         : this._id,
        code        : this.code,
        name        : this.name,
        description : this.description,
        is_delete   : this.is_delete,
        created_by  : this.created_by,
        created_date: this.created_date,
        updated_by   : this.updated_by,
        updated_date :this.updated_date
    }
}

module.exports = M_role