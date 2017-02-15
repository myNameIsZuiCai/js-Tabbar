function $(id) {
    return typeof id === "string" ? document.getElementById(id) : id
}
//页面加载完毕
window.onload = function () {
    //实现瀑布流
    waterFall("main","box");
}
//实现瀑布流
function waterFall(para,box) {
    //让所有盒子的父标签居中
    //1.得到所有的盒子
    var allBoxes=$(para).getElementsByClassName(box);
    // console.log(allBoxes.length);
    //2.得到其中一个盒子的宽度
    var boxWidth = allBoxes[0].offsetWidth;
    // alert(boxWidth)
    //3.求出屏幕宽度
    var screenWidth=document.body.clientWidth;
    // alert(screenWidth)
    //求出列数
    var  cols=Math.floor(screenWidth/boxWidth);
    //让父标签居中
    $(para).style.cssText = "width:" + boxWidth*cols + "px; margin: 0 auto";
    //进行定位
    //定义一个高度数组
    var heightArr=[]
    for(var i=0;i<allBoxes.length;i++){
        var boxHeight=allBoxes[i].offsetHeight;
        if (i<cols){
            heightArr.push(boxHeight)
        }else {
            var minBoxHeight= Math.min.apply(null,heightArr)
            var minBoxIndex=getMinIndex(minBoxHeight,heightArr)
            //对剩余盒子进行定位
            allBoxes[i].style.position="absolute";
            allBoxes[i].style.top = minBoxHeight + "px"
            allBoxes[i].style.left = minBoxIndex * boxWidth + "px"
            //更新盒子高度
            heightArr[minBoxIndex] +=boxHeight
        }
    }

}
//求出最矮盒子在数组中的索引
function getMinIndex(value,arr) {
    //遍历数组
    for(var i=0;i<arr.length;i++){
        if (arr[i] == value){
            return i;
        }
    }
}