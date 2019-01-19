(function () {
    //prototype是函数才有的属性
    Person.prototype.name='tim';
    var person1=new Person();
    var person2=new Person();
    console.log(person1.name);
    console.log(person2.name);
    var person=new Person();
    //每一个js对象(除了null)都具有__proto__的属性，这个属性会指向该对象的原型
    console.log(person.__proto__);
    console.log(person.__proto__ === Person.prototype);//__是两个下划线
})();
function Person() {
    
}