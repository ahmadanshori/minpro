function mEmployee(m_employee_data) {
	this._id             = m_employee_data._id;
	this.employee_number = m_employee_data.employee_number;
	this.first_name      = m_employee_data.first_name;
	this.last_name       = m_employee_data.last_name;
	this.m_company_id    = m_employee_data.m_company_id;
	this.m_company_name  = m_employee_data.m_company_name;
	this.email           = m_employee_data.email;
	this.is_delete       = m_employee_data.is_delete;
	this.created_by      = m_employee_data.created_by;
	this.created_date    = m_employee_data.created_date;
	this.updated_by      = m_employee_data.updated_by;
	this.updated_date    = m_employee_data.updated_date;
	
}

mEmployee.prototype.getData = function() {
	return {
		_id             : this._id,
		employee_number : this.employee_number,
		first_name      : this.first_name,
		last_name       : this.last_name,
		m_company_id    : this.m_company_id,
		m_company_name  : this.m_company_name,
		email           : this.email,
		is_delete       : this.is_delete,
		created_by      : this.created_by,
		created_date    : this.created_date,
		updated_by      : this.updated_by,
		updated_date    : this.updated_date
	}
}

module.exports = mEmployee;