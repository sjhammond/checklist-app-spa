import path from 'path';
declare const __static:string; 

export const loadInfoContent = (filepath:string) => {
    if(process.env.NODE_ENV !== 'development') {
        return path.join(__static, './info_content/' + filepath + '.html');
    } else {
        return './info_content/' + filepath + '.html';
    }
}