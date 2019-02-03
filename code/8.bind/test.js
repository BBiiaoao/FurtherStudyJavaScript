//bind()函数会创建一个新函数，当这个函数被调用时，bind()的第一个参数将作为它运行时的this
//之后的一系列参数将会在传递的实参前传入作为它的参数
(function () {
    var foo={
        value:1
    };
    function bar() {
        console.log(this.value);
    }
    var bindFoo=bar.bind(foo);
    bindFoo();//1
})();
//由此可得:bind()的函数的两个特点:1.返回一个函数  2.可以传入参数
//bind()函数模拟实现第一版(通过apply来模拟this的指向):
(function () {
    Function.prototype.bind2=function (context) {
        var self=this;
        return function () {
            return self.apply(context);
        }
    }
})();
//函数需要传两个参数的时候，可以一次性再bind的时候传入
//也可以在bind()执行的时候传入一个，然后在执行返回的函数的时候，再传入另外一个参数
(function () {
    var foo={
        value:1
    };
    function bar(name,age) {
        console.log(this.value);
        console.log(name);
        console.log(age);
    }
    var bindFoo1=bar.bind(foo,"Aym",12);
    var bindFoo2=bar.bind(foo,"Tom");
    bindFoo1()//1.Aym,12
    bindFoo2('18');//1,Tom,18
})();
//第二版(用arguments进行处理):
(function () {
    Function.prototype.bind2=function (context) {
        var self=this;
        //获取bind2函数从第二个参数到最后一个参数
        console.log(arguments);
        var args=Array.prototype.slice.call(arguments,1);
        return function () {
            //这里的arguments是指bind返回的函数传入的参数
            console.log(arguments);
            var bindArgs=Array.prototype.slice.call(arguments);
            return self.apply(context,args.concat(bindArgs))//concat()用于连接数组
        }
    };
    var foo={
        value:1
    };
    function bar(name,age) {
        console.log(this.value);
        console.log(name);
        console.log(age);
    }
    var bindFoo1=bar.bind2(foo,"Aym",12);
    var bindFoo2=bar.bind2(foo,"Tom");
    bindFoo1();//1.Aym,12
    bindFoo2('18');//1,Tom,18
})();
//bind()还有一个特点:一个绑定函数也能使用new操作符创建对象:这种行为就像把原函数当成构造器
//提供的this值被忽略，同时调用的参数被提供给模拟函数
//也就是说当bind返回的函数作为构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效
(function () {
    var value=2;
    var foo={
        value:1
    };
    function bar(name,age) {
        this.habit="shopping";
        console.log(this.value);
        console.log(name);
        console.log(age);
    };
    bar.prototype.friend='Kim';
    var bindFoo=bar.bind(foo,'Mike');
    var obj=new bindFoo(12);//undefined,Mike,12
    console.log(obj.habit);//shopping
    console.log(obj.friend);//Kim
})();
//尽管在全局和foo中都声明了value值，最后依然返回了undefined，说明绑定的this失效了(此时this已经指向了obj)
//第三版(通过修改返回的函数的原型实现):
(function () {
    console.log(22222222222222);
    Function.prototype.bind2=function (context) {
        var self=this;
        console.log(self);
        var args=Array.prototype.slice.call(arguments,1);
        var fBound=function () {
            var bindArgs=Array.prototype.slice.call(arguments);
            console.log(this);
            //当作为构造函数的时候，this指向实例，此时的结果是true，将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值
            //以上面的demo为例，如果改成 'this instanceof fBound ? null:context',实例只是一个空对象，将null改成this，实例会具有habit属性
            //当作为普通函数时，this指向window，此时结果为false，将绑定函数的this指向context
            return self.apply(this instanceof fBound ? this:context,args.concat(bindArgs))
        };
        //修改返回函数的prototype为绑定函数的prototype，实例就可以继承绑定函数的原型的值
        fBound.prototype=this.prototype;
        return fBound;
    };
    var value=2;
    var foo={
        value:1
    };
    function bar(name,age) {
        this.habit="shopping";
        console.log(this.value);
        console.log(name);
        console.log(age);
    };
    bar.prototype.friend='Kim';
    var bindFoo=bar.bind2(foo,'Mike');
    var obj=new bindFoo(12);//undefined,Mike,12
    var bindFoo1=bar.bind2(foo,"Aym",12)();
})();