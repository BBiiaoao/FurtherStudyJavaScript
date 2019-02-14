(function () {
    //1.原型链继承
    function Parent() {
        this.name=['father','mother']
    }
    Parent.prototype.getName=function () {
        console.log(this.name);
    };
    function Child() {

    }
    Child.prototype=new Parent();
    console.log(Child.prototype);
    console.log(Parent.prototype);
    var child1=new Child();
    child1.getName();//["father", "mother"]
    child1.name.push('uncle');
    var child2=new Child();
    child2.getName();//["father", "mother", "uncle"]
    //问题:
    //1.应用类型被所有的实例共享
    //2.在创建Child的实例时，不能向Parent传参
})();
(function () {
    //2.借用构造函数(经典继承)
    function Parent() {
        this.name=['father','mother'];
    }
    function Child() {
        Parent.call(this);
    }
    var child1=new Child();
    child1.name.push('uncle');
    console.log(child1.name);//["father", "mother", "uncle"]
    var child2=new Child();
    console.log(child2.name);//["father", "mother"]
    //优点:
    //1.避免了引用类型的属性被所有实例共享
    //2.可以在Child中向Parent传参
    (function () {
        function Parent(name) {
            this.name=name;
        }
        function Child(name) {
            Parent.call(this,name);
        }
        var child1=new Child('Tim');
        console.log(child1.name);//Tim
        var child2=new Child('Kim');
        console.log(child2.name);//Kim
    })()
    //缺点:方法都在构造函数中定义，每次创建实例都会创建一遍方法
})();
(function () {
    //3.组合继承:原型链继承和经典继承双剑合璧
    function Parent(name) {
        this.name=name;
        this.color=['red','blue','green'];
    }
    Parent.prototype.getName=function () {
        console.log(this.name);
    };
    function Child(name,age) {
        Parent.call(this,name);
        this.age=age;
    }
    Child.prototype=new Parent();
    // Child.prototype.constructor=Child;
    var child1=new Child('Kim',18);
    child1.color.push('black');
    console.log(child1.name);//Kim
    console.log(child1.age);//18
    console.log(child1.color);//["red", "blue", "green", "black"]

    var child2=new Child('Tim',12);
    child2.getName();//Tim
    console.log(child2.age);//12
    console.log(child2.color);//["red", "blue", "green"]
    //优点:融合了原型链继承和构造函数的优点，是js中最常用的继承方式
})();
(function () {
    //4.原型式继承
    function createObj(o) {
        function F() {};
        F.prototype=o;
        return new F()
    }
    //这是ES5 Object.create的模拟实现,将传入的对象作为创建的对象的原型
    var person={
        name:"Kevin",
        friends:['Kim',"Tom"]
    };
    var person1=createObj(person);
    var person2=createObj(person);
    person1.name='person1';
    console.log(person1.name);//person1
    console.log(person2.name);//Kevin
    person1.friends.push('Taylor');
    console.log(person2.friends);//["Kim", "Tom", "Taylor"]
    //缺点:包含引用类型的属性值始终都会共享相应的值，这点跟原型继承一样
    //注意点:修改person1.name的值并不是因为person1和person2有独有的name值，是因为给person1添加了name值，并非修改了原型上的name值
})();
(function () {
    //5.寄生式继承:创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
    function createObj(o) {
        var clone=Object.create(o);
        clone.sayName=function () {
            console.log('hi');
        };
        return clone;
    }
    //缺点:跟借用构造函数模式一样，每次创建对象都会创建一遍方法
})();
(function () {
    //6.寄生组合式继承
    //在组合继承中，会调用两次父构造函数:
    //一次是设置子类型原型的时候:Child.prototype=new Parent()
    //一次是创建子类型实例的时候:var child1=new Child('Kim',18),在这句中，又会执行Parent.call(this,name),这里又调用了一次Parent构造函数
    //所以我们会发现Child.prototype 和 child1 都有一个属性为colors，属性值为['red', 'blue', 'green']
    //所以为了避免重复调用,不使用Child.prototype=new Parent()，而是间接的让Child.prototype访问到Parent.prototype
    function Parent (name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
    };
    Parent.prototype.getName = function () {
        console.log(this.name)
    };
    function Child (name, age) {
        Parent.call(this, name);
        this.age = age;
    };
    //关键三步:
    var F=function () {};
    F.prototype=Parent.prototype;
    Child.prototype=new F;
    var child1=new Child('Kevin',18);
    console.log(Child.prototype);
    console.log(child1);

    //封装一下:
    (function () {
        function object(o) {
            function F() {};
            F.prototype=o;
            return new F;
        }
        function prototype(child,parent) {
            var prototype=object(parent.prototype);
            prototype.constructor=child;
            child.prototype=prototype;
        }
        //使用的时候:
        prototype(Child,Parent)
    })()
    //这种方式的高效率体现在它只调用了一次Parent构造函数，并且因此避免了在Parent.prototype上面
    //创建不必要的，多余的属性，与此同时，原型链还能保持不变；因此，还能够正常使用instanceof和
    //isPrototypeOf，开发人员普遍认为寄生组合式继承是引用类型的最理想的继承范式
})();