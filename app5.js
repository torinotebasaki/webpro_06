const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け'; 
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち'; 
    win += 1; 
  } else {
    judgement = '負け'; 
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

let add = 0;
let one = 0;
let two = 0;
let three = 0;
let four = 0;
let count = 0;
app.get("/gatya", (req, res) => {
  let probabilities = {}; // スコープを関数外に変更
  const baseProbabilities = {
    1: 0.006,  
    2: 0.05,   
    3: 0.05,   
    4: 0.894   
  };
  const maxProbability = 1.00;

  function getRandomValue() {
    const randomNum = Math.random();
    probabilities = { // 関数内で更新
      1: baseProbabilities[1] + (count >= 73 ? (count - 73) * 0.0622 : 0),
      2: baseProbabilities[2] - (count >= 73 ? (count - 73) * 0.00313 : 0),
      3: baseProbabilities[3] - (count >= 73 ? (count - 73) * 0.00313 : 0),
      4: baseProbabilities[4] - (count >= 73 ? (count - 73) * 0.0559 : 0),
    };

    probabilities[1] = Math.min(Math.max(probabilities[1], 0), maxProbability);
    probabilities[2] = Math.min(Math.max(probabilities[2], 0), maxProbability);
    probabilities[3] = Math.min(Math.max(probabilities[3], 0), maxProbability);
    probabilities[4] = Math.min(Math.max(probabilities[4], 0), maxProbability);

    let cumulative = 0;
    let num;
    for (let key in probabilities) {
      cumulative += probabilities[key];
      if (randomNum < cumulative) {
        num = parseInt(key);
        break;
      }
    }

    if (num === 1) {
      count = 0;
      add++;
    } else {
      count++;
      add++;
    }
    return num;
  }

  const num = getRandomValue();

  let gatya = '';
  if (num === 1) {
    gatya = '星５';
    one++;
  } else if (num === 2) {
    gatya = '星４(キャラ)';
    two++;
  } else if (num === 3) {
    gatya = '星４(武器)';
    three++;
  } else if (num === 4) {
    gatya = '星３';
    four++;
  }

  console.log('あなたが獲得したのは' + gatya + 'です');
  res.render('gatya', { 
    number: num, 
    count2: count,
    gatya: gatya, 
    count: add, 
    one: one, 
    two: two, 
    three: three,
    four: four, 
    rate: probabilities[1] // 星5の排出率
  });
});


let secretNumber = Math.floor(Math.random() * 100) + 1; 
let time = 0;
app.get("/find_number", (req, res) => {
  let judgement = '';

  const guess = +req.query.number; 
  function guessNumber(secret) {
    if(guess === secret){
      secretNumber = Math.floor(Math.random() * 100) + 1;      
      time = 0;
      judgement = '正解！';
    }else if (guess < secret) {
      time ++;
      judgement = 'もっと大きい！';
    }else if (guess > secret) {
      time ++;
      judgement = 'もっと小さい！';
    }
  }

  guessNumber(secretNumber);
  console.log("guess!");
  res.render('find_number',{ time: time, judgement: judgement});
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));