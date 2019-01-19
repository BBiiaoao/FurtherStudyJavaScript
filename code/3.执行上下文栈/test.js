(function () {
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