/**
 * @file Typescript third part dependence declare file
 * @date 2023-11-08
 * @author Frank Su
 * @lastModify Frank Su 2023-11-08
 */
declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}
declare module '*.png' {
    const value: any;
    export = value;
}
