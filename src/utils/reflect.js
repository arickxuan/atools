function getPropertyValue(obj, propertyPath) {
    const properties = propertyPath.split('.');
    for (let i = 0; i < properties.length; i++) {
        // console.log_init("start", properties[i]);
        if (obj && typeof obj === 'object' && properties[i] in obj) {
            // obj = obj[properties[i]];  
            obj = Reflect.get(obj, properties[i])
            // console.log_init("ok");
        } else {
            // console.log_init("err");
            return undefined;
        }
        // console.log_init("end");
    }
    return obj;
}

function setPropertyValue(json, path, value) {
    // 递归函数，遍历JSON对象并修改指定路径的属性值  
    function traverse(obj, pathArr, newValue) {
        let key = pathArr[0];
        if (pathArr.length === 1) {
            // 到达目标路径，修改属性值  
            // obj[key] = newVal;
            Reflect.defineProperty(obj, key, {
                value: newValue,
                writable: true, // 可选，表示这个属性是否可以被重新赋值  
                enumerable: true, // 可选，表示这个属性是否可以在for...in循环中枚举出来  
                configurable: true // 可选，表示这个属性是否可以被删除或者再次重新配置  
            });
        } else {
            // 继续遍历下一层级  
            if (obj[key] !== undefined && typeof obj[key] === 'object') {
                traverse(obj[key], pathArr.slice(1), newValue);
            }
        }
        return obj;
    }

    // 调用递归函数，修改属性值  
    return traverse(json, path.split('.'), value);
} 