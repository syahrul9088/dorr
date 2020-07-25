const fetch = require('node-fetch');
var randomize = require('randomatic')
var random = require('random-name')
const fs = require('fs-extra');
const readlineSync = require('readline-sync');

const functionRegist = (email, reff) => new Promise((resolve, reject) => {
    const bodys = {
        area: "+86",
        phone: email,
        password: "japro908",
        repassword: "japro908",
        invite_code: reff,
        agree: true
        }
    
      fetch('http://api.3qex.top/api//login/register', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            'Host': 'api.3qex.top',
            Connection: 'keep-alive',
            'Content-Length': 132,
            'Accept': 'application/json, text/plain, */*',
            'lang': 'en-us',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
            'token': '[object Object]',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'http://www.3qex.top',
            'Referer': 'http://www.3qex.top/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

(async () => {
    const reff = readlineSync.question('[?] Reff: ')
    const jumlah = readlineSync.question('[?] Jumlah: ')
    for (var i = 0; i < jumlah; i++){
    try {
        const rand = randomize('0', 5)
        const name = random.first()
        const email = `${name}${rand}@gmail.com`
        const regist = await functionRegist(email, reff)
        if(regist.message == 'Success'){
            console.log('[+] Regist sukses !')
            await fs.appendFile('pampAccount.txt', email+'\r\n', err => {
                if (err) throw err;
            })
        } else {
            console.log('[!] Gagal regist !')
        }
    } catch (e) {
        console.log(e)
    }
}
})()
