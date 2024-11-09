async function GetUserJson() {
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
    const url = 'https://bzapi.bzweb.xyz/api/public/bili/user?uid=' + uid;

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
            // 处理 JSON数据
            if (data.code === -400){
                var board = document.getElementById("board");
                var newBoard = document.createElement('div');
                newBoard.className = 'board';
                newBoard.innerHTML = data.msg
                board.appendChild(newBoard);
            }else{
                var board = document.getElementById("board");
                var newBoard = document.createElement('div');
                newBoard.className = 'board';
                newBoard.id = 'board' + boardId;
                board.appendChild(newBoard);
                var newUserImg = document.createElement('img');
                newUserImg.src = data.data.face;
                newBoard.appendChild(newUserImg);
                var newH2 = document.createElement('h2');
                newH2.innerHTML = data.data.name;
                newBoard.appendChild(newH2);
                var newP = document.createElement('p');
                newP.innerHTML = data.data.sign;
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
