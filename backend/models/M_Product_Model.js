function M_product(m_product_data) {
    this._id = m_product_data._id;
    this.code = m_product_data.code;
    this.name = m_product_data.name;
    this.description = m_product_data.description
    this.is_delete = m_product_data.is_delete;
    this.created_by = m_product_data.created_by;
    this.created_date =m_product_data.created_date;
    this.updated_by = m_product_data.update_by;
    this.updated_date = m_product_data.update_date;
  }
  
  M_product.prototype.getData = function() {
    return {
      _id: this._id,
      code: this.code,
      name: this.name,
      description: this.description,
      province: this.province,
      is_delete: this.is_delete,
      created_by: this.created_by,
      created_date: this.created_date,
      update_by: this.update_by,
      update_date: this.update_date
    };
  };
  
  module.exports = M_product;
  