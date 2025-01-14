const fs = require('fs');
const shell = require('shelljs');
const path = require('path');

const clearDir = require('./modules/clearDir')
const copyDir = require('./modules/copyDir');
const countFile = require('./modules/countFile');

clearDir('dist'); //清空dist
fs.mkdirSync('dist')
const _tsc = shell.exec('tsc', {
    async: true
});
copyDir('public', 'dist/public'); //复制public
fs.writeFileSync('dist/package.json', fs.readFileSync('package.json').toString())
fs.writeFileSync('dist/yarn.lock', fs.readFileSync('yarn.lock').toString())

let env = '';
fs.readdirSync('env/production').forEach(item => {
    env += `${fs.readFileSync(`env/production/${item}`).toString()}\n`
})
if (fs.existsSync('env/.env')) {
    env += `${fs.readFileSync(`env/.env`).toString()}\n`
};
fs.writeFileSync('dist/.env', env) //复制环境变量文件


const tsCount = countFile(path.join(__dirname, '../src')) //获取ts文件个数实时对比JS

new Promise((resolve, reject) => {
    _tsc.stdout.on('data', function (data) {
        let src = path.join(__dirname, '../dist/src');
        if (fs.existsSync(src)) {
            let timer = setInterval(() => {
                let jsCount = countFile('./dist/src');
                if (jsCount == tsCount) {
                    clearInterval(timer)
                    resolve()
                }
            }, 50);
        }
    });
}).then(() => {
    console.log(`打包完成,SRC下共 ${tsCount} 个文件`);
    shell.exit(1)
})