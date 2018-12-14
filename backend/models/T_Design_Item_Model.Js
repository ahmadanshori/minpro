function T_Design_Item(design_item_data) {
    this._id = design_item_data._id
    this.t_design_id = design_item_data.t_design_id
    this.m_product_id = design_item_data.m_product_id
    this.title_item = design_item_data.title_item
    this.request_pic = design_item_data.request_pic
    this.start_date = design_item_data.start_date
    this.end_date = design_item_data.end_date
    this.request_due_date = design_item_data.request_due_date
    this.note = design_item_data.note
    this.is_delete = design_item_data.is_delete
    this.created_by = design_item_data.created_by
    this.created_date = design_item_data.created_date
    this.updated_by = design_item_data.updated_by
    this.updated_date = design_item_data.updated_date

   
}
T_Design_Item.prototype.getData = function () {
    return {
        _id: this._id,
        t_design_id: this.t_design_id,
        m_product_id: this.m_product_id,
        title_item: this.title_item,
        request_pic: this.request_pic,
        start_date: this.start_date,
        end_date: this.end_date,
        request_due_date: this.request_due_date,
        note: this.note,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        updated_by: this.updated_by,
        updated_date: this.updated_date,

    }
}

module.exports = T_Design_Item

// created by Fahmi