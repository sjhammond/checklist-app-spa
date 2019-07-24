import path from 'path';
declare const __static:string; 

export const createStaticPath = (filepath:string) => {
    if(process.env.NODE_ENV !== 'development') {
        return path.join(__static, filepath);
    } else {
        return filepath;
    }
}