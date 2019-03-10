//先放一个函数作为参数传递的例子
(function () {
    function test1(Func) {
        Func();
    }
    function test2() {
        alert("我是test2");
    }
    test1(test2);
})();
(function () {
    function getUserId() {
        return new Promise(function (resolve) {
            //异步请求
            http.get(url, function (results) {
                resolve(results.id)
            })
        })
    }
    getUserId().then(function (id) {
        //一些处理
    })
    //getUserId方法返回一个promise，可以通过它的then方法注册在promise异步操作成功时执行的回调
})();

//1.极简promise模型
function Promise(fn) {
    var value = null,
        callbacks = [];//callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
        return this;//让then能够链式调用
    };
    function resolve(value) {
        callbacks.forEach(function (callback) {
            callback(value)
        })
    };
    fn(resolve);
}
//上述代码大致逻辑:
//1.1 调用then方法，将想要在Promise异步操作成功的执行的回调放入callbacks队列，其实也就是注册回调函数，可以向观察者模式方向思考
//1.2 创建Promise实例时传入的函数会被赋予一个函数类型的参数，即resolve，它接受一个参数value，代表异步操作返回的结果，当异步操作成功后，用户会
//    调用resolve方法，这时候其实真正执行的操作时将callbacks队列中的回调一一执行

//2.加入延时机制,保证在resolve执行之前，then方法已经注册完所有的回调
function Promise(fn) {
    var value = null,
        callbacks = [];//callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
        return this;//让then能够链式调用
    };
    function resolve(value) {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value)
            })
        },0)
    };
    fn(resolve);
}
//上述代码的思路:
//通过setTimeout机制，将resolve中执行回调的逻辑放置到JS任务队列末尾,以保证在resolve执行时，then方法的回调函数已经注册完成

//3.加入状态,即pending,fulfilled,rejected
//  pending可以转换为fulfilled或rejected并且只能转换一次
function Promise(fn) {
    var state="pending",
        value=null,
        callbacks=[];
    this.then=function (onFulfilled) {
        if(state==="pending"){
            callbacks.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    };
    function resolve(newValue) {
        value=newValue;
        state='fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            })
        },0);
    }
    fn(resolve)
}
//上诉代码的思路是这样:
//resolve执行时，会将状态设置为fulfilled，在此之后调用then添加的新回调，都会立即执行

//4.链式Promise
//  链式Promise是指在当前的promise达到fulfilled状态后，即开始进行下一个promise(后邻promise)
function Promsie(fn) {
    var state='pending',
        value=null,
        callbacks=[];
    this.then=function (onFulfilled) {
        return new Promise(function (resolve) {
            handle({
                onFulfilled:onFulfilled||null,
                resolve:resolve
            });
        });
    };
    function handle(callback) {
        if (state==="pending"){
            callbacks.push(callback);
            return
        }
        //如果then中没有传递任何东西
        if (!callback.onFulfilled){
            callback.resolve(value);
            return;
        }
        var ret=callback.onFulfilled(value);
        callback.resolve(ret);
    }
    function resolve(newValue) {
        if(newValue && (typeof newValue==="object" || typeof newValue==="function")){

        }
    }
}