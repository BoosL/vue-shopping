let eventData = [];
let $lockCheck = false;
// event结构
// {
//    fn:function() // 需要执行的函数
//    position: //执行位置,数字为滚动条距离,字符为top bottom left right move,对应滚动条到哪个底部位置触发
// }
let t, onscrollEvent;
// 滚动条在Y轴上的滚动距离
let _d = document;
let getScrollTop = () => {
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (_d.body) {
        bodyScrollTop = _d.body.scrollTop;
    }
    if (_d.documentElement) {
        documentScrollTop = _d.documentElement.scrollTop;
    }
    return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
};

// 文档的总高度
let getScrollHeight = () => {
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
};

// 浏览器视口的高度
let getWindowHeight = () => {
    var windowHeight = 0;
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
};

let check = () => {
    // TODO 可以考虑这里加一些预留的参数底
    // 到顶
    if($lockCheck) return;
    $lockCheck = true;
    if(getScrollTop() === 0) {
        console.log('go to top');
        eventData.filter(p=>p.position === 'top').forEach(p=>{
            p.fn();
        });
    } else if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 50) {
        console.log('go to bottom');
        // 到底
        eventData.filter(p=>p.position === 'bottom').forEach(p=> {
            p.fn();
        });
        return true;
    }
    $lockCheck = false;
    return false;
};
// TODO 滚动条自动加载
let fn = {
    bind (_opt) {
        this.options = _opt;
        console.log('ready ok');
        let event = () => {
            clearTimeout(t);
            let scrollHeight = getScrollTop() + getWindowHeight();
            //scrollHeight = getScrollTop();
            eventData.filter(p=>p.position === 'move').forEach(p=> {
                console.log('move');
                p.fn(scrollHeight);
            });
            t = setTimeout(function () {
                console.log('check position');
                check();
            }, 100);
        };
        // TODO 如有性能问题 将此注释
        // window.addEventListener('touchmove', event);
        window.addEventListener('scroll', e=> {
            event();
        });
        // document.dispatchEvent('scroll');
    },
    //仅支持到底触发
    push (event) {
        eventData.push(event);
    },
    //清除所有事件
    clear () {
        eventData.length = 0;
        otherEvent.length = 0;
        if (onscrollEvent) {
            window.onscroll = onscrollEvent;
        }
    }
};
export default {
    install (vue, options) {
        Object.defineProperty(vue.prototype, '$scroll', {
          get () { return fn }
        });
        vue.prototype.$scroll.bind(options);
    }
};