function getStorage(key){
    return localStorage.getItem(key);
}
function setStorage(key,value){
   localStorage.setItem(key,value)
}
function getUser(){
    return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
}
function setUser(user){
    return localStorage.setItem('user',JSON.stringify(user));
}
function clearUser(){
    localStorage.removeItem('user');
}

function parseUser(item) {
    return `<li>
                    <div class="head">
                        <a href="detail.html">
                            <img src="${item.head_icon}" alt="">
                        </a>
                    </div>
                    <div class="up">
                        <div class="vote">
                            <span>${item.vote}票</span>
                        </div>
                        <div class="btn" data-id="${item.id}">
                            投TA一票
                        </div>
                    </div>
                    <div class="descr">
                        <a href="/vote/detail/${item.id}">
                            <div>
                                <span>${item.username}</span>
                                <span>|</span>
                                <span>编号#${item.id}</span>
                            </div>
                            <p>谁比我美？</p>
                        </a>
                    </div>
                </li>`
}