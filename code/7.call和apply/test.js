(function () {
    var foo={
        value:1
    };
    function bar() {
        console.log(this.value);
    }
    bar.call(foo);//1
    //call改变了this的指向，指向到foo
    //bar函数执行了
    //即相当于:
    var foo={
        value:1,
        bar:function () {
            console.log(this.value);
        }
    };
    foo.bar();//1
})();
//第一版模拟call()实现的步骤:
//1.将函数设为对象的函数
//2.执行该函数
//3.删除该函数
(function () {
    Function.prototype.call2=function (context) {
        //首先获取调用call的函数，用this可以获取
        console.log(this);
        context.fn=this;
        context.fn();
        delete context.fn;
    };
    var foo={
        value:1
    };
    function bar() {
        console.log(this.value);
    };
    bar.call2(foo);
})();
//call函数能给定参数执行函数
(function () {
    var foo={
        value:1
    };
    function bar(name,age) {
        console.log(name);
        console.log(age);
        console.log(this.value);
    }
    bar.call(foo,'Tome',12);//Tome,12,1
})();
//传入的函数并不确定，所以，call()方法模拟第二版
(function () {
    Function.prototype.call2=function (context) {
        //context即foo
        //foo.fn=bar()
        context.fn=this;
        var args=[];
        console.log(arguments);
        //arguments是this对象的参数，是一个类数组,所以push进一个数组中
        //类数组转换成数组可以使用Array.form()方法
        for(var i=1,len=arguments.length;i<len;i++){
            args.push('arguments['+i+']')
        }
        eval('context.fn('+args+')');
        console.log('context.fn('+args+')');
        delete context.fn;
    };
    var foo={
        value:1
    };
    function bar(name,age) {
        console.log(name);
        console.log(age);
        console.log(this.value);
    }
    bar.call2(foo,'kevin',18);
})();
//this的参数可以传null,当为null的时候,视为指向window
//函数是可以有返回值的
(function () {
    var obj={
        value:1
    };
    function bar(name,age) {
        return{
            value:this.value,
            name,
            age
        }
    }
    console.log(bar.call(obj, 'Tim', 18));//{age:18,name:"Time",value:1}
})();
//为了实现传入null转为window,还有可返回值，call()第三版模拟实现:
(function () {
    Function.prototype.call2=function (contetxt) {
        var context=context||window;
        context.fn=this;
        var args=[];
        for (var i=1,len=arguments.length;i<len;i++){
            args.push('arguments['+i+']')
        }
        var result=eval('context.fn('+args+')');

        delete context.fn;
        return result;
    }
})();
//同理:apply()方法模拟实现:
(function () {
    Function.prototype.apply1=function (context,arr) {
        var context=Object(context)||window;
        context.fn=this;
        var result;
        if(!arr){
            result=context.fn()
        }
        else{
            var args=[];
            for(var i=0,len=arr.length;i<len;i++){
                args.push('arr['+i+']');
            }
            result=eval('context.fn('+args+')');
        }
        delete context.fn;
        return result
    };
    var obj={
        value:1
    };
    function bar(name,age) {
        return{
            value:this.value,
            name,
            age
        }
    }
    console.log(bar.apply1(obj, ["Marry",22]));//{value: 1, name: "Marry", age: 22}
    var arr1=new Array("1","2","3");
    var arr2=new Array("4","5","6")
    console.log(Array.prototype.push.apply(arr1, arr2));//6
})();

