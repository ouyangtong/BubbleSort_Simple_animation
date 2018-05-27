(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    var circle = document.getElementById("circle");
    var inputbox = document.getElementById("inputbox");
    var start_sort = document.getElementById("start_sort");
    var input_arr;

    inputbox.addEventListener("focus",function () {
        if (this.value==="请输入..."){
            this.value = "";
        }
    });

    inputbox.addEventListener("blur",function () {
        if (this.value===""){
            this.value = "请输入...";
        }
    });

    start_sort.addEventListener("click",function () {
        input_arr = inputbox.value;
        input_arr = ReplaceChina(input_arr).split(",");
        clearUl();              //清空ul下的li元素
        if (input_arr === "请输入..."||new RegExp("^[ ]+$").test(input_arr.toString()))        //判断输入是否为空或者全是空格
            alert("error:请输入需要排序的数字，并以逗号隔开，或者直接输入希望产生随机数的个数。");
        if (input_arr.length !== 1){
            input_arr.forEach(function (v,i) {
                let li_node = document.createElement('li');
                li_node.innerHTML = v;
                li_node.setAttribute('class','ele');
                circle.appendChild(li_node);
            });
            setMargin(input_arr.length);                    //设置左margin
            setTimeout(function (){Bubble_sort_animation();},500);
        }
        if (input_arr.length ===1){
            let num = parseInt(input_arr.toString());
            for (let i = 0; i <num ; i++) {
                let random =Math.floor(Math.random()*1000);
                let li_node = document.createElement('li');
                li_node.innerHTML = random;
                li_node.setAttribute('class','ele');
                circle.appendChild(li_node);
            }
            setMargin(num);
            setTimeout(function (){Bubble_sort_animation();},500);
        }

    });

    function ReplaceChina(obj) {
        let oldValue=obj;
        while(oldValue.indexOf("，")!==-1){  //寻找每一个中文逗号，并替换
            obj=oldValue.replace(/，/ig,',');
            oldValue=obj;
        }
        obj = oldValue;
        return obj;

    }

    function clearUl() {
        if (circle.innerHTML = '');
        return true;
        for (let i = 0; i < circle.length; i++) {
            circle.remove(circle.firstChild);
        }

    }

    function setMargin(num) {
        let m_left = (num*40+10)/2;
        circle.style.marginLeft = '-'+m_left+'px';
    }




    //排序过程

    function hasClass(element, cName) {
        return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格
        // （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
    }
    function addClass(element,cName) {
        if (!hasClass(element,cName))
            element.className +=" " + cName;
    }

    function removeClass(element,cName) {
        if(hasClass(element,cName))
            element.className = element.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    }


    function exchange(ele1,ele2) {
        addClass(ele1,"exchange1");
        addClass(ele2,"exchange2");
        // await sleep(2000);
        setTimeout(function () {
            removeClass(ele1,"exchange1");
            removeClass(ele2,"exchange2");
            ele2.parentNode.insertBefore(ele2,ele1);
        },2000);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }


    async function Bubble_sort_animation() {
        var arr = document.querySelectorAll("li.ele");
        var arr = Array.apply(null,arr);
        let arr_inner = [];
        let temp;
        arr.forEach(function (v, i) {
            arr_inner[i] = v.innerHTML;
        });
        for (let i = 0; i < arr.length - 1; i++)
            for (let j = 0; j < arr.length - 1; j++) {
                if (arr_inner[j] > parseInt(arr_inner[j + 1])) {
                    exchange(arr[j], arr[j + 1]);
                    await sleep(2100);
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    arr.forEach(function (v, i) {
                        arr_inner[i] = v.innerHTML;
                    });
                }
            }
    }

})));
