exports.generateUsersAdminGetResponse = (limit,offset,query,result) => {
    const count = result.count;
    const rowsData = result.rows;
    const rowLength = rowsData.length;
    return {
        limit: rowLength,
        offset: offset + rowLength,
        users: rowsData,
        query: query,
        count: count,
        rowCount: rowLength
    }
}