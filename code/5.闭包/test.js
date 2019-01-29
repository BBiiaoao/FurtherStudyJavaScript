(function () {
    var data1=[];
    for(var i=0;i<3;i++){
        data1[i]=function () {
            console.log(i);
        };
    }
    data1[0]();//3
    data1[1]();//3
    data1[2]();//3
    var data2=[];
    for (var i=0;i<3;i++){
        data2[i]=(function (i) {
            return function () {
                console.log(i);
            }
        })(i)
    }
    data2[0]();//0
    data2[1]();//1
    data2[2]();//2
})();
//内部函数自己执行上下文维护了一个作用域链，因为这个作用域链([[scope]])，内部函数依然可以读取到外部函数变量对象中的AO的值
//说明内部函数引用了外部函数AO中的值的时候，即使外部函数变量对象被销毁了，但是js依然会让外部函数的变量对象的AO活在内存中
//内部函数依然可以通过自身作用域链找到它，正是因为js做到了这一点，从而实现了闭包这个概念
//data2中console函数与data1的全局上下文的VO没有变，区别在于其作用域链变了，data2的Scope多了匿名函数的AO
//匿名函数Context={
//  AO:{
//      argument:{
//          0:0,
//          length:1
//      },
//      i:0
//  }
//}