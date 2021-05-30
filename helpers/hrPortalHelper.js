exports.generateHrportalGetResponse = (limit,offset,query,result) => {
    const count = result.count;
    const rowsData = result.rows;
    const rowLength = rowsData.length;
    return {
        limit: rowLength,
        offset: offset + rowLength,
        jobs: rowsData,
        query: query,
        count: count,
        rowCount: rowLength
    }
}