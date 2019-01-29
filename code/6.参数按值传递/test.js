(function () {
        var obj={
            value:1
        };
        function fooo(o) {
            o=4;
            console.log(o);//4
        };
        function foo(o) {
            o.value=2;
            console.log(o.value);//2
        }
        fooo(obj);
        foo(obj);
        console.log(obj.value);//2
    }
)();
//小红书中说ECMAScript中所有函数参数都是按值传送的
//上述函数不是按引用传递，而是按共享传递来传递对象的引用的副本(call by sharing)
//因为拷贝副本也是一种值的拷贝，所以也直接认为是按值传递了