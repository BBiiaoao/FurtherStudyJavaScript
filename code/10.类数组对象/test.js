(function () {
    var array=['name','age','sex'];
    //类数组对象:拥有一个length属性和若干索引属性的对象
    var arrayList={
        0:'name',
        1:'age',
        2:'sex',
        length:3
    };
    //在读写，获取长度，遍历三个方向这两个对象很是相似
    //但是类数组无法使用数组的方法:push(),pop()
    //所以可以用Function.call间接调用
    Array.prototype.join.call()
})();
