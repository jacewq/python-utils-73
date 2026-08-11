type DataRecord = { id: number; name: string; value: number; };  

/**  
 * Filters the given records to return only those  
 * that have a value above the specified threshold.  
 *  
 * @param records - An array of DataRecord objects.  
 * @param threshold - The minimum value to filter by.  
 * @returns An array of DataRecord objects that meet the criteria.  
 */  
function filterRecordsAboveThreshold(records: DataRecord[], threshold: number): DataRecord[] {  
    return records.filter(record => record.value > threshold);  
}  

/**  
 * Sorts the given records in ascending order by their value.  
 *  
 * @param records - An array of DataRecord objects.  
 * @returns A sorted array of DataRecord objects.  
 */  
function sortRecordsByValue(records: DataRecord[]): DataRecord[] {  
    return records.slice().sort((a, b) => a.value - b.value);  
}  

/**  
 * Groups the given records by their names and sums their values.  
 *  
 * @param records - An array of DataRecord objects.  
 * @returns An object where the keys are names and the values are the summed values.  
 */  
function groupRecordsByName(records: DataRecord[]): Record<string, number> {  
    return records.reduce((acc, record) => {  
        acc[record.name] = (acc[record.name] || 0) + record.value;  
        return acc;  
    }, {} as Record<string, number>);  
}  

export { filterRecordsAboveThreshold, sortRecordsByValue, groupRecordsByName };