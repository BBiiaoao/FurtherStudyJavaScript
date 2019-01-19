(function () {
    //1.js的变量是词法作用域:函数的作用域在函数定义的时候就决定了
    //  与之相对的是动态作用域:函数的作用域是在函数调用的时候才决定
    var value=1;
    function test1() {
        console.log(value);
    }
    function test2() {
        var value=2;
        test1();
    }
    test2();//输出1
})();