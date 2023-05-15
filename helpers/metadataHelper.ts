/**
 * Save metadata to the board
 * @param key
 * @param value 
 */
export async function saveAppData(key:string, value:any) {
    await miro.board.setAppData(key, value);    
}

/**
 * Get metadata from the board by key
 * @param key
 * @returns metadata with key from board
 */
export async function getAppData(key:string){
    const data = await miro.board.getAppData(key);
    return data;
}

/**
 * Get all metadata from the board
 * @returns all metadata from the board
 */
export async function getAllAppData(){
    const data = await miro.board.getAppData();
    return data;
}

/**
 * !!!WATCH OUT!!!
 * Delete all metadata on the board
 */
export async function resetAllAppData(){
    await miro.board.setAppData('metaData', {});
}

/**
 * !!!WATCH OUT!!!
 * Delete metadata on the board by key
 * @param key 
 */
export async function resetAppData(key:string){
    await miro.board.setAppData(key, {});
}