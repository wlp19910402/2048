window.onload = function () {
  let imgs = this.document.querySelectorAll('img')
  initNum();
  function randowCreat () {
    var random = Math.ceil(Math.random() * imgs.length);
    if (imgs[ random - 1 ].getAttribute('value') != 0) {//判断随机数的位置的值是否为0
      randowCreat();
    } else {
      imgs[ random - 1 ].setAttribute('value', 2);
      imgs[ random - 1 ].src = 'img/cube_' + 2 + '.png';
    }
  }

  function initNum () {
    var initializedNum = Math.ceil(Math.random() * 3 + 2);
    for (var i = 0; i < initializedNum; i++) {
      randowCreat()
    }
  }
  var maxScore = 0;
  var maxScoreNum = 1;
  this.document.onkeydown = function (e) {
    switch (e.keyCode) {//当前按下的对应的键值
      case 37:
        // ←
        console.log("←");
        run([ 0, 1, 2, 3 ]);
        run([ 4, 5, 6, 7 ]);
        run([ 8, 9, 10, 11 ]);
        run([ 12, 13, 14, 15 ]);
        break;
      case 38:
        // ↑
        console.log("↑");
        run([ 0, 4, 8, 12 ]);
        run([ 1, 5, 9, 13 ]);
        run([ 2, 6, 10, 14 ]);
        run([ 3, 7, 11, 15 ]);
        break;
      case 39:
        // ➡️
        console.log("➡️");
        run([ 3, 2, 1, 0 ]);
        run([ 7, 6, 5, 4 ]);
        run([ 11, 10, 9, 8 ]);
        run([ 15, 14, 13, 12 ]);
        break;
      case 40:
        //↓
        console.log("↓");
        run([ 12, 8, 4, 0 ]);
        run([ 13, 9, 5, 1 ]);
        run([ 14, 10, 6, 2 ]);
        run([ 15, 11, 7, 3 ]);
        break;
    }
    //获取最大值
    for (var i = 0; i < imgs.length; i++) {
      if (Number(imgs[ i ].getAttribute('value')) > maxScore) {
        maxScore = Number(imgs[ i ].getAttribute('value'));
      }
    }
    document.getElementsByClassName("scroeNum")[ 0 ].innerHTML = maxScore;
    if (maxScore == 2048 * maxScoreNum) {
      document.getElementById("jump").getElementsByTagName('p')[ 0 ].innerHTML = "恭喜你,已经达到" + 2048 * maxScoreNum;
      maxScoreNum++;
      document.getElementById("mask").style.display = "block";
      document.getElementById("jump").style.display = "block";
    }
    for (var i = 0; i < imgs.length; i++) {//说明有空位
      if (imgs[ i ].getAttribute('value') == 0) {
        randowCreat();
        break;
      }
      if (i == 15) {
        document.getElementById("mask").style.display = "block";
        document.getElementById("jumpFail").style.display = "block";
      }
    }
  }
  /**
   * 把问题进行数据化
   */

  // let arr = [ 2, 2, 2, 2 ];

  /**
   *[2,2,2,2]=>[4,4,0,0]
   *[2,0,2,2]=>[4,2,0,0]
   *[2,4,2,2]=>[2,4,4,0]
   *[0,2,0,2]=>[4,0,0,0]
   */
  // console.log(_2048([ 2, 0, 2, 2 ]));
  // _2048([ img[ 0 ], img[ 1 ], img[ 2 ], img[ 3 ] ])
  function _2048 (arr) {
    /**
     *根据arr得到一个newArr
     *设置一个指针，默认为0
     *获取i的值
     *  当i的值为空，进入下一轮
     *  当i的值不为空
     *      设置j=i+1
     *      获取j的值
     *      比较i和j的值
     *          如果i的值不等于j的值
     *              把i的值添加到newArr中
     *              进入下一轮
     *          如果i的值等于j的值
     *              把i+j的值相加，添加newArr
     *              i=j+1
     *
     */
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[ i ] != 0) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[ j ] != 0) {
            break;
          }
        }
        if (arr[ i ] != arr[ j ]) {
          newArr.push(arr[ i ]);
        } else {
          newArr.push(arr[ i ] + arr[ j ]);
          i = j;
        }
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (!newArr[ i ]) { newArr[ i ] = 0 }
    }
    return newArr;
  }

  function run (arr) {
    let newValue = _2048([
      Number(imgs[ arr[ 0 ] ].getAttribute('value')),
      Number(imgs[ arr[ 1 ] ].getAttribute('value')),
      Number(imgs[ arr[ 2 ] ].getAttribute('value')),
      Number(imgs[ arr[ 3 ] ].getAttribute('value')),
    ]);
    for (var i = 0; i < newValue.length; i++) {
      imgs[ arr[ i ] ].setAttribute('value', newValue[ i ]);
      imgs[ arr[ i ] ].src = 'img/cube_' + newValue[ i ] + '.png';
    }
  }
}