(function () {
    var scope="globe scope";
    function checkScope() {
        var scope="local scope";
        function f() {
            return scope
        }
        return f()
    }
    checkScope();
})();
//执行上下文总体概述:
//1.执行全局代码，创建全局执行上下文(globalContext),全局上下文被压入执行上下文栈
//  ECStack=[globalContext]
//2.全局上下文初始化(初始化VO、Scope、this),同时checkScope函数被创建，保存作用域链到函数的内部属性[[scope]]
//  globeContext={VO:[global],Scope:[globalContext.VO],this:globalContext.VO}
//  checkScope.[[scope]]=[globalContext.Vo]
//3.执行checkScope函数，创建checkScope函数执行上下文，checkScope函数执行上下文被压入执行上下文栈
//  ECStack=[checkScopeContext,globalContext]
//4.checkScope函数执行上下文初始化:
//  4.1.复制函数[[scope]]属性创建作用域链，
//  4.2.用argument创建活动对象
//  4.3.初始化活动对象，即加入形参，函数声明，变量声明
//  4.4.将活动对象压入checkScope作用域链顶端
//  checkScopeContext={
//      AO:{
//          arguments:{
//              length:0
//          },
//          scope:undefined,
//          f:reference to function f(){}
//      },
//      Scope:[AO,globalContext.VO],
//      this:undefined
//   }
//  同时f函数被创建，保存作用域链到f函数的内部属性[[scope]]
//5.执行f函数，创建f函数执行上下文，f函数执行上下文被压入执行上下文栈
//  ECStack=[fContext,checkScopeContext,globalContext]
//6.f函数执行上下文初始化
//  6.1.复制函数[[scope]]属性创建作用域链
//  6.2.用arguments创建活动对象
//  6.3.初始化活动对象，即加入形参，函数声明，变量声明
//  6.4.将活动对象压入f作用域顶端
//  fContext={
//      AO:{
//          arguments:{
//              length:0
//          }
//      Scope:[AO,checkScopeContext.AO,globalContext.VO],
//      this:undefined
//  }
//7.f函数执行，沿着作用域链查找scope的值，返回scope值
//8.f函数执行完毕，f函数上下文从执行上下文栈中弹出
//  ECStack=[checkScopeContext,globalContext]
//9.checkScope函数执行完毕，checkScope执行上下文从执行上下文栈中弹出
//  ECStack=[globalContext]