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
})();

//this例子
(function () {
    function foo() {
        console.log(this);
    };
    foo();//MemberExpression是foo
    function foo() {
        return function () {
            console.log(this);
        }
    };
    foo()();//MemberExpression是foo()
    var foo={
        bar:function () {
            return this;
        }
    };
    foo.bar();//MemberExpression是foo.bar
})();
(function () {
    var obj={
        a:1,
        b:function () {
            console.log(this);
        }
    };
    obj.b();                            //作为对象调用的时,this指向该对象:指向obj
    var b=obj.b;
    b();                                //作为函数调用,this指向全局windows
    var b=new Fun();                    //作为构造函数调用,this指向当前实例对象
    obj.b.apply(object,[])     //作为call与apply调用,this指向当前的object
})();
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


//当查找变量的时候，会在当前上下文的变量对象查找，如果没有，然后到词法层面上的父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象
//这样由多个执行上下文的变量对象构成的链表就叫做作用域链
//1.从函数的创建和激活两个时期来解释作用域链如何创建和变化
//  1.1.函数创建
//      函数的作用域在函数定义的时候就决定了，这是因为函数内部有一个内部属性[[scope]]
//      函数创建时，所有的父变量对象都会保存到其中，可以理解为[[scope]]就是所有父变量对象的层级链(但是[[scope]]并不代表完整的作用域链)
//  1.2.函数激活
//      当函数激活时，进入函数上下文，创建VO/AO后,就会将活动对象添加到作用域链的前端
//      这时候执行上下文的作用域链，命名为Scope:Scope=[AO].concat([[scope]]),至此，作用域链创建完毕


//1.ECMAScript的类型分为语言类型和规范类型:
//  1.1.语言类型:6个基本类型:Undefined,Null,Boolean,String,Number,Object
//  1.2.规范类型:相当于meta-values,用来用算法描述ECMAScript语言结构和ECMAScript语言类型的,(只需知道在ECMAScript规范中还有一种只存在于规范中的类型，它们是用来描述语言底层性为逻辑的）
//    其中的Reference类型，它与this的指向有密切联系
//2.Reference类型一个Specification Type,也就是"只存在于规范里的抽象类型".它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的js中
//  Reference由3个部分组成:
//  2.1.base value:属性所在的对象或者就是EnvironmentRecord,它的值只可能是undefined,an Object,a Boolean,a String,a Number,an environment record其中的一种
//  2.2.referenced name:就是属性的名字
//  2.3.strict reference
//3.确认this的值
//  3.1.计算MemberExpression的结果赋值给ref
//      可以简单理解为MemberExpression就是()左边的部分
//  3.2.判断ref是不是一个Reference类型
//      3.2.1.如果ref是Reference,并且IsPropertyReference(ref)是true,()那么this的值为GetBase(ref)
//      3.2.2.如果ref是Reference,并且base value值是Environment Record,那么this的值为ImplicitThisValue(ref)
//      3.2.3.如果ref不是Reference,那么this的值为undefined
