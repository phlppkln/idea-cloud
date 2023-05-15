import { StickyNoteColor } from "@mirohq/websdk-types";

/**
 * create sticky with text
 * @param content text of sticky
 * @param x x position of sticky (optional)
 * @param y y position of sticky (optional)
 * @param width width of sticky (optional)
 * @returns new sticky that was created
 */
export async function createStickyWithText(content:string, x?:number, y?:number, width?:number, color?: StickyNoteColor){
    const sticky = await miro.board.createStickyNote({
        content: content,
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y,
        style: {
            fillColor: color,
        },
        width: width === undefined ? 100 : width,
    });
    return sticky;
}

export const surroundItemWithFrame = async (item:any, marginTop:number, marginRight:number, marginBottom:number, marginLeft:number) => {
    //get item position
    const itemX = item.x;
    const itemY = item.y;

    //get item size
    const itemWidth = item.width;
    const itemHeight = item.height;

    //get item title with restAPI
    const itemTitle = item.title;
    

    //create frame
    const frame = await miro.board.createFrame({
        x: itemX - marginLeft,
        y: itemY - marginTop,
        width: itemWidth + marginLeft + marginRight,
        height: itemHeight + marginTop + marginBottom,
        title: "frame",
        style: {
            fillColor: 'ffffff'
        },
    });

    //add item to frame

    //sync board
    
}