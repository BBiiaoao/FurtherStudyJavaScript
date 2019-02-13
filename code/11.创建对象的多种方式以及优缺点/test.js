(function () {
        //1.工厂模式:不暴露创建对象的具体逻辑，而是将逻辑封装在一个函数中，这个函数可以被视为一个工厂
        function createPerson() {
            var o=new Object();
            o.name=name;
            o.getName=function () {
                console.log(this.name);
            };
            return o;
        }
        var person1=createPerson("Kim");
        //缺点:对象无法识别，因为所有的实例都指向一个原型

        //2.构造函数模式
        function Person1(name) {
            this.name=name;
            this.getName=function () {
                console.log(this.name);
            }
        }
        var person1=new Person1("kim")
        //优点:实例可以识别为一个特定的类型
        //缺点:每次创建实例时,每个方法都要被创建一次

        //3.原型模式
        function Person3() {

        }
        Person3.prototype.name="kim";
        Person3.prototype.getName=function () {
            console.log(this);
            console.log(this.name);
        };
        var person3=new Person3();
        //优点:方法不会被重新创建
        //缺点:1.所有的属性和方法都共享 2.不能初始化参数

        //3.1.原型模式优化
        function Person3() {

        }
        Person4.prototype={
            name:"kim",
            getName:function () {
                console.log(this.name);
            }
        };
        var person3=new Person3();
        //优点:封装性好了一点
        //缺点:重写了原型，丢失了construct属性
        //3.2.原型模式优化
        function Person3() {

        }
        Person3.prototype={
            constructor:Person3,
            name:"kim",
            getName:function () {
                console.log(this.name);
            }
        };
        var person3=new Person3();
        //优点:实例可以通过constructor属性找到所属构造函数
        //缺点:原型模式该有的缺点还是有

        //4.组合模式:构造函数模式与原型模式双剑合璧
        function Person4(name) {
            this.name=name;
        }
        Person4.prototype={
            constructor:Person4,
            getName:function () {
                console.log(this.name);
            }
        };
        var person4=new Person4()
        //优点:该共享的共享，该私有的私有，使用最广泛的方式
        //缺点:有的要求就是希望全部写在一起，即更好地封装性，例如工厂模式

        //5.动态原型模式
        function Person5(name) {
            this.name=name;
            if(typeof this.getName()!="function"){
                Person5.prototype.getName=function () {
                    console.log(this.name);
                }
            }
        }
        var person5=new Person5()
    }
)();