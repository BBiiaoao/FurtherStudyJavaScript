(function () {
    console.log(this instanceof Object);
    console.log(window);
    var test=function () {
        console.log("test1");
    };
    test();//test1
    var test=function () {
        console.log("test2");
    };
    test();//test2
})();
//Javascript引擎并非一行一行地分析和执行程序，而是一段一段地分析执行
(function () {
    function test() {
        console.log("test3");
    }
    test();//test4
    function test() {
        console.log("test4");
    }
    test();//test4
})();
//变量对象例子
(function () {
    console.log(foo);   //会打印出"fo"的foo函数，因为在进入执行上下文时，会首先处理函数声明，其次会声明变量声明
                        //函数声明会完全替换相同名称的属性，变量声明则不会打扰相同名称的属性
    function foo() {
        console.log("foo");
    }
    function foo() {
        console.log("fo");
    }
    var foo=1;
})()
//JavaScript当执行到一个函数的时候，就会创建一个执行上下文，js引擎会创建一个执行上下文栈来管理执行上下文
//每个执行上下文有三个重要属性:
//1.变量对象  2.作用域链  3.this

//变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明
//1.全局上下文的变量对象初始化就是全局对象(window)
//2.函数上下文的变量对象初始化只包括Arguments对象
//  活动对象(activation object, AO)和变量对象(VO)其实是一个东西，只是处于执行上下文的不同生命周期
//  执行上下文的代码会分成两个阶段处理:分析和执行，即 1.进入执行上下文 2.代码执行
//  2.1.进入执行上下文:
//      当进入执行上下文时，这时候还没有执行代码
//      变量对象会包括: 1.函数的所有形参 2.函数声明 3.变量声明
//      函数的所有形参 由名称和对应值组成的一个变量对象的属性被创建(只有这个一开始就确定)，没有实参，属性值设置为undefined
//      函数声明 由名称和对应值(function-object)组成一个变量对象的属性被创建
//               如果变量对象已经存在相同名称的属性，则完全替换这个属性
//      变量声明 由名称和对应值(undefined)组成一个变量对象的属性被创建
//               如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性
//  2.2.代码执行
//      在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值(这时候才会完成变量赋值，函数引用)
