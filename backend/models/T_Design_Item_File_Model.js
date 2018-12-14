function T_Design_File(design_file_data) {
    this._id = design_file_data._id
    this.t_design_item_id = design_file_data.t_design_id
    this.size = design_file_data.m_product_id
    this.extention = design_file_data.title_item
    this.is_delete = design_file_data.request_pic
    this.created_by = design_file_data.start_date
    this.created_date = design_file_data.end_date
    this.updated_by = design_file_data.request_due_date
    this.updated_date = design_file_data.note
   
    
}
T_Design_File.prototype.getData = function () {
    return {
        _id: this._id,
        t_design_item_id: this.t_design_item_id,
        filename: this.filename,
        size: this.size,
        extention: this.extention,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        updated_by: this.updated_by,
        updated_date: this.updated_date,
    }
}

module.exports = T_Design_File