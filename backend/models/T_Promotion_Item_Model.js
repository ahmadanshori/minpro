function T_Promotion_Item(promotionData) {
  this._id = promotionData._id;
  this.t_promotion_id = promotionData.t_promotion_id;
  this.t_design_item_id = promotionData.t_design_item_id;
  this.m_product_id = promotionData.m_product_id;
  this.title = promotionData.title;
  this.request_pic = promotionData.request_pic;
  this.start_date = promotionData.start_date;
  this.end_date = promotionData.end_date;
  this.request_due_date = promotionData.request_due_date;
  this.qty = promotionData.qty;
  this.todo = promotionData.todo;
  this.note = promotionData.note;
  this.is_delete = promotionData.is_delete;
  this.created_by = promotionData.created_by;
  this.created_date = promotionData.created_date;
  this.updated_by = promotionData.updated_by;
  this.updated_date = promotionData.updated_date;
}

T_Promotion_Item.prototype.getData = function() {
  return {
    _id: this._id,
    t_promotion_id: this.t_promotion_id,
    t_design_item_id: this.t_design_item_id,
    m_product_id: this.m_product_id,
    title: this.title,
    request_pic: this.request_pic,
    start_date: this.start_date,
    end_date: this.end_date,
    request_due_date: this.request_due_date,
    qty: this.qty,
    todo: this.todo,
    note: this.note,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = T_Promotion_Item;
