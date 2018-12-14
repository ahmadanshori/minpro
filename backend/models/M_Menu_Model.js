function M_menu(m_menu_data) {
    this._id = m_menu_data._id
    this.code = m_menu_data.code
    this.name = m_menu_data.name
    this.controller = m_menu_data.controller
    this.parentId = m_menu_data.parent_id
    this.isDelete = m_menu_data.is_delete
    this.createdBy = m_menu_data.created_by
    this.createdDate = m_menu_data.created_date
    this.updatedBy = m_menu_data.updated_by
    this.updatedDate = m_menu_data.updated_date
}

M_menu.prototype.getData = function () {
    return {
        _id: this._id,
        code: this.code,
        name: this.name,
        controller: this.controller,
        isDelete: this.is_delete,
        createdBy: this.created_by,
        createdDate: this.created_date,
        updatedBy: this.updated_by,
        updatedDate: this.updated_date
    }
}

module.exports = M_menu