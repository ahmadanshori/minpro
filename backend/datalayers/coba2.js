let a = {"$and":[{"m_role_id": "RO0001"}, {"m_menu_id":"ME0004"}]};
let b = {"$and":[{"m_role_id": "RO0001"},{"m_menu_id":"ME0005"}]};
const func2 = (queryData, idData)=>{
    if(queryData.length === 0){
        return null;
    }
    else{
        return queryData.map(content=>{
            return {"m_role_id":idData, "m_menu_id": content, "created_by": "Randika", "created_date":new Date().toDateString(), "updated_by": null, "updated_date": null}
        });
    }
}
console.log(JSON.stringify(func2([], "RO0001")))