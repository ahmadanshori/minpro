const func = (queryData)=>{
    return queryData.map(content=>{
        return {"$and":[{"m_role_id": "RO0001"}, {"m_menu_id": content}]}
    });
}
console.log(JSON.stringify(func(["lele", "lulu"])))