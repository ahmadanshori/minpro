function T_souvenir_item_view(t_souvenir_item_view_data) {
    this._id = t_souvenir_item_view_data._id;
    this.m_souvenir_id = t_souvenir_item_view_data.m_souvenir_id;
    this.qty = t_souvenir_item_view_data.qty;
    this.qty_settlement = t_souvenir_item_view_data.qty_settlement;
    this.note = t_souvenir_item_view_data.note;
    this.t_souvenir_id = t_souvenir_item_view_data.t_souvenir_id;
    this.name = t_souvenir_item_view_data.name;
  }
  
  T_souvenir_item_view.prototype.getData = function() {
    return {
      _id: this._id,
      m_souvenir_id: this.m_souvenir_id,
      qty: this.qty,
      qty_settlement: this.qty_settlement,
      note: this.note,
      t_souvenir_id: this.t_souvenir_id,
      name: this.name
    };
  };
  
  module.exports = T_souvenir_item_view;