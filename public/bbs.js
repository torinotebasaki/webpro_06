"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

document.querySelector('#reset').addEventListener('click', () => {
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('/reset', params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            // コメントの表示を消す
            document.querySelector('#bbs').innerHTML = '';
            return response.json();
        })
        .then( (response) => {
            console.log( response.message );
        });
});


document.querySelector('#reset-name').addEventListener('click', () => {
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('/reset-name', params)
        .then( (response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            // クライアント側でも名前欄をリセット
            document.querySelector('#name').value = '';
            return response.json();
        })
        .then( (response) => {
            console.log(response.message);  // リセット結果を表示
        });
});

document.querySelector('#show-post-count').addEventListener('click', () => {
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('/check', params)
        .then( (response) => {
            return response.json();  // 最初にJSONに変換
        })
        .then( (response) => {
            // 投稿数を表示
            document.querySelector('#post-count').textContent = `現在の投稿数: ${response.number}`;
            // fetch()で受け取ったデータをJSON形式にしてからじゃないとresponse.number使えない
            // response.number は、fetch() が成功してサーバーからレスポンスが返ってきた後でしか取得できない
            console.log(response);  // データを表示
        });
});

