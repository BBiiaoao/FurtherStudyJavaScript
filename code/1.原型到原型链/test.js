(function () {
    //1.prototype
    //  函数才有该属性
    //  函数的prototype属性指向了一个原型对象
    Person.prototype.name='tim';
    var person1=new Person();
    var person2=new Person();
    console.log(person1.name);
    console.log(person2.name);
    //2.__proto__
    //  每一个js对象(除了null)都具有__proto__的属性，这个属性会指向该对象的原型
    var person=new Person();
    console.log(person.__proto__);
    console.log(person.__proto__ === Person.prototype);//__是两个下划线
    //3.constructor
    //  原型对象指向构造函数的属性
    console.log(Person.prototype.constructor);
    console.log(Person === Person.prototype.constructor);//true
    //  3.1.person是没有constructor属性的，所以会根据原型链找到其person.__proto__
    //      即Person.prototype
    console.log(person.constructor);
    console.log(person.constructor === Person);//true
    //4.原型的原型
    //  原型对象也是一个对象，所以它也有__proto__属性
    //  它的__proto__属性指向Object.prototype,即Object()构造函数的原型
    console.log(Person.prototype.__proto__);
    console.log(Person.prototype.__proto__.constructor);
    //5.Object.prototype的原型为null
    //  即表示没有对象，即该处不应该有值
    //  所以原型链的最顶端即null，倒数第二层为Object.prototype
    console.log(Object.prototype.__proto__);


})();
function Person() {
    
}