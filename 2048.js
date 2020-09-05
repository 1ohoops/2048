//移动后随机选择两个空白空格加上2
function found(){
    var em=document.getElementsByTagName("td");
    var emp1=0;
    var i;
    for(i=0;i<em.length;i++){
        if(em[i].innerText=="")emp1++;
    }
    var emp2=Math.floor(Math.random()*emp1);
    var emp3=Math.floor(Math.random()*(emp1-1));
    var emp4=0;
    for(i=0;i<em.length;i++){
        if(em[i].innerText==""){
            if(emp4==emp2){
                em[i].innerText="2";
                break;
            }
            else{
                emp4++;
            }
        }
    }
    emp4=0;
    for(i=0;i<em.length;i++){
        if(em[i].innerText==""){
            if(emp4==emp3){
                em[i].innerText="2";
                break;
            }
            else{
                emp4++;
            }
        }
    }
}

//初始化游戏页面，随机选择两个空白空格加上2
function init(){
    var em=16;
    var emp1=Math.floor(Math.random()*em);
    var emp2=Math.floor(Math.random()*(em-1));
    var e=document.getElementsByTagName("td");
    while(emp1==emp2){
        emp2=Math.floor(Math.random()*(em-1));
    }
    e[emp1].innerText="2";
    e[emp2].innerText="2";
}

function combind(way){
    if(way=="top"){
        com(0,1,4);
    }
    else if(way=="down"){
        com(12,1,-4);
    }
    else if(way=="left"){
        com(0,4,1);
    }
    else{
        com(3,4,-1);
    }
}

//非空白空格的移动和合并方法
function com(start,move,next){
    var em=document.getElementsByTagName("td");
    var i,j,s;
    for(i=0;i<4;i=i+1){
        s=start;
        for(;s!=start+4*next;){
            if(em[s].innerText==""||s==start){
                s=s+next;
            }
            else{
                if(em[s-next].innerText==""){
                    em[s-next].innerText=em[s].innerText;
                    em[s].innerText="";
                    s=s-next;
                }
                else {
                    if(em[s-next].innerText==em[s].innerText){
                        em[s-next].innerText=(Number(em[s-next].innerText)*2).toString();
                        em[s].innerText="";
                        s=s-next;
                        score=score+Number(em[s].innerText);
                    }
                    else{
                        s=s+next;
                    }
                }
            }
        }
        start=start+move;
    }
}

//游戏胜利时的画面设置
function victor(){
    var em=document.getElementsByTagName("td");
    for(var i=0;i<em.length;i++){
        if(em[i].innerText=="32"){
            return true;
        }
    }
    return false;
}

//游戏失败时的画面设置
function loss(){
    var em=document.getElementsByTagName("td");
    for(var i=0;i<em.length;i++){
        if(em[i].innerText==""){
            return false;
        }
    }
    return true;
}

//调用移动方法和游戏判断方法
function game(){
    var key="";
    var keyNum;
    var sco=document.getElementById('score');
    keyNum=kcode;
    switch (keyNum) {
        case 87:key="top";break;
        case 65:key="left";break;
        case 68:key="right";break;
        case 83:key="down";break;
    }
    //判断是否是方向按键，是则调用移动和合并方法
    if(key!=""){
        combind(key);
        found();
        sco.innerText=score;
    }
    var v,l;
    v=victor();
    l=loss();
    result(v,l);
}

//判断游戏是否成功或者失败
function result(v,l){
    var n=document.getElementById('result');
    if(v){
        n.className="result";
        n.innerText=" you win !";
        cancle();
    }
    else if(l){
        n.className="result";
        n.innerText=" you lost !";
        cancle();
    }
}

//设置键盘的监听事件
function listen(){
    document.onkeydown=function(){
        if(window.event){
            kcode=event.keyCode;
        }
        else{
            kcode=event.keyWhich;
        }
        game();
    }
}

//结束时停止键盘的监听事件
function cancle(){
    document.onkeydown=null;
}

//调用随机选择两个空格加上2，然后监听键盘上的按键信息
function start(){
    score=0;
    init();
    listen();
}

var kcode;
var score=0;

window.onload=function(){
    var btm=document.getElementById('btm');
    //重置按键
    btm.onclick=function(){
        location.reload();
    }
    start();
}