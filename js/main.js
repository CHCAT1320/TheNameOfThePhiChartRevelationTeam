function GetUserJson() {
    // var userData = "./json/usersJson.json";
    var userData = {
        "userList":[
            {
                "name":"o1b",
                "uid":437161770
            },
            {
                "name":"日向666",
                "uid":539237533
            },
            {
                "name":"LMZO",
                "uid":1245904744
            },
            {
                "name":"冰冰冰冰冰冰猫",
                "uid":1644970825
            },
            {
                "name":"班嗷",
                "uid":396563011
            },
            {
                "name":"空吧哇",
                "uid":527630410
            },
            {
                "name":"不外出汗",
                "uid":564698247
            },
            {
                "name":"hlmc",
                "uid":357681195
            },
            {
                "name":"去啊起飞",
                "uid":3537119301601486
            }
        ]
    }
    // userData = JSON.parse(userData)
    for(let i=0; i<userData.userList.length; i++){
        GetBiliUserInfo(userData.userList[i].uid)
        // console.log(userData.userList.length)
    }
    

}
GetUserJson()
var boardId = 0
function GetBiliUserInfo(uid) {
    // 获取用户 UID
    // var uid = 1644970825;
    const url = 'http://cn-hk-bgp-4.ofalias.net:28643/?url=https://api.bilibili.com/x/web-interface/card?mid=' + uid;

    // 创建一个新的XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    // 配置请求类型和URL
    xhr.open('GET', url, true);

    // // 添加请求头"User-Agent"
    // xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)');


    // 设置请求完成后的回调函数
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // 解析响应为JSON
            const data = JSON.parse(xhr.responseText);
            console.log('Fetched JSON data:', data);
            console.log(data.data.card.name)
            // 处理 JSON数据
            if (data.code === -400){
                var board = document.getElementById("board");
                var newBoard = document.createElement('div');
                newBoard.className = 'board';
                newBoard.innerHTML = "请求次数太多，请稍后再试"
                board.appendChild(newBoard);
            }else{
                var board = document.getElementById("board");
                var newBoard = document.createElement('div');
                newBoard.className = 'board';
                newBoard.id = 'board' + boardId;
                board.appendChild(newBoard);
                var newUserImg = document.createElement('img');
                // newUserImg.src = data.data.face;
                newBoard.appendChild(newUserImg);
                var newH2 = document.createElement('h2');
                newH2.textContent = data.data.card.name;
                newBoard.appendChild(newH2);
                var newP = document.createElement('p');
                newP.textContent= data.data.card.sign;
                newBoard.appendChild(newP);
                var newButton = document.createElement('button');
                newButton.innerHTML = "Go BiliBili";
                newButton.onclick = function() {
                    window.open('https://space.bilibili.com/' + uid);
                }
                newBoard.appendChild(newButton);
                boardId++;
            }
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    // 设置请求错误时的回调函数
    xhr.onerror = function() {
        console.error('Request failed due to a network error.');
    };

    // 发送请求
    xhr.send();
}
