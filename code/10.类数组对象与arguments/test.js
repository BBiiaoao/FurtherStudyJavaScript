(function () {
    var array=['name1','age1','sex1'];
    //类数组对象:拥有一个length属性和若干索引属性的对象
    var arrayList={
        0:'name',
        1:'age',
        2:'sex',
        length:3
    };
    //在读写，获取长度，遍历三个方向这两个对象很是相似

    //但是类数组无法使用数组的方法:push(),pop()……
    //所以可以用Function.call间接调用
    Array.prototype.join.call(arrayList,'&')//name&age&sex
    Array.prototype.slice.call(arrayList,0)//["name","age","sex"]
    //slice()可以做到类数组转数组
    Array.prototype.map.call(arrayList,function (item) {
        return item.toUpperCase();
    })//["NAME","AGE","SEX"]

    //类数组转数组
    //1.slice:返回从start到end(不包括该元素)的新数组
    Array.prototype.slice.call(arrayList,0);//["name","age","sex"]
    //2.splice(index,howmany,item1,.....,itemX):向/从数组中添加/删除项目，然后返回被删除的项目
    Array.prototype.splice.call(arrayList, 0);//["name","age","sex"]
    //3.ES6 Array.from
    Array.from(arrayList);//["name","age","sex"]
    //4.concat()
    Array.prototype.concat.apply([], arrayList);//["name","age","sex"]
})();
//arguments对象
(function () {
    function foo(name,age,sex) {
        console.log(arguments);
    };
    foo('name','age','sex');
    //{0:"name",1:"age",2:"sex",callee:foo(name,age,sex),length:3,Symbol:values()}
    //length属性:实参长度
    //callee属性:通过callee属性可以调用函数自身
    var data=[];
    for(var i=0;i<3;i++){
        (data[i]=function () {
            console.log(arguments.callee.i);
        }).i=i;
    }
    data[0]();//0
    data[1]();//1
    data[2]();//2
    //arguments和对应参数的绑定
    function foo2(name,age,sex,habit) {
        console.log(name,arguments[0]);//name name

        //改变形参
        name='new name';
        console.log(name,arguments[0]);//new name new name

        //改变arguments
        arguments[1]='new age';
        console.log(age,arguments[1]);//new age new age

        //测试未传入的是否会绑定
        console.log(sex);//undefined
        sex='new sex';
        console.log(sex,arguments[2]);//new sex undefined

        arguments[3]='new habit';
        console.log(habit,arguments[3]);//undefined "new habit"
    }
    foo2('name','age');
    //由此可见，传入的参数，实参和arguments的值会共享，当没有参数传入时，实参与arguments值不会共享
    //以上是在非严格模式下，如果是在严格模式下，实参和arguments是不会共享的
    
})();
