// 处理图片文件
declare module '*.png' {
    const content: string;
    export default content;
}

// 也可以添加其他类型的文件支持
declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}
