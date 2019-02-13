(function () {
    //Otaku,宅男
    function Otaku(name, age) {
        this.name = name;
        this.age = age;
        this.habit = 'Games';
    }

    //缺乏锻炼,身体强度不行
    Otaku.prototype.strength = 60;
    Otaku.prototype.sayYourName = function () {
        console.log('I am ' + this.name);
    };
    var person = new Otaku('Tom', '18');
    console.log(person.name);//Tom
    console.log(person.habit);//'Games'
    console.log(person.strength);//60
    person.sayYourName();//I am Tom
})();
//new运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
//模拟实现new第一版:
(function () {
        function objectFactory() {
            var obj = new Object();
            var Constructor = [].shift.call(arguments);//Constructor为参数第一个，即我们要传入的构造函数，此外shift会修改原数组，所以arguments会被去除第一个参数
            obj.__proto__ = Constructor.prototype;//将obj的原型指向构造函数，这样obj就可以访问到构造函数中的属性
            Constructor.apply(obj, arguments);
            return obj;
        };
        function Otaku (name, age) {
            this.name = name;
            this.age = age;

            this.habit = 'Games';
        }

        Otaku.prototype.strength = 60;

        Otaku.prototype.sayYourName = function () {
            console.log('I am ' + this.name);
        };

        var person = objectFactory(Otaku, 'Kevin', '18');

        console.log(person.name); // Kevin
        console.log(person.habit); // Games
        console.log(person.strength); // 60

        person.sayYourName(); // I am Kevin
    }
)();
//构造函数有返回值
(function () {
    function Otaku(name,age) {
        this.strength=60;
        this.age=age;
        return{
            name:name,
            habit:'Games'
        }
    }
    var person=new Otaku('Tim','12');
    console.log(person.name);//'Tim'
    console.log(person.habit);//'Games'
    console.log(person.strength);//undefined
    console.log(person.age);//undefined
    //所以构造函数返回了一个对象，在实例person中只能访问返回的对象中的属性
})();
//如果构造函数返回一个基本类型的值
(function () {
    function Otaku(name,age) {
        this.strength=60;
        this.age=age;
        return 'handsome boy';
    }
    var person=new Otaku('Tim','12');
    console.log(person.name);//undefined
    console.log(person.habit);//undefined
    console.log(person.strength);//60
    console.log(person.age);//'12'
    //尽管这次有返回值，但是相当于没有返回值处理
})();
//所以判断返回的值是不是一个对象，第二版:
(function () {
    function objectFactory() {
        var obj=new Object();
        var Constructor=[].shift.call(arguments);
        obj.__proto__=Constructor.prototype;
        var ret=Constructor.apply(obj,arguments);
        return typeof ret === 'object' ? ret :obj;
    }
    function Otaku(name,age) {
        this.strength=60;
        this.age=age;
        return 'handsome boy';
    }
    var person=objectFactory(Otaku,'Tim',22);
    console.log(person.name);//undefined
    console.log(person.habit);//undefined
    console.log(person.strength);//60
    console.log(person.age);//22
})();