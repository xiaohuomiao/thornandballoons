const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// 读取JSON文件中的数据
const jsonDataNewGames = fs.readFileSync(path.join(__dirname, 'data-new-games.json'), 'utf-8');
const newGames = JSON.parse(jsonDataNewGames);

const jsonDataTopGames = fs.readFileSync(path.join(__dirname, 'data-top-games.json'), 'utf-8');
const topGames = JSON.parse(jsonDataTopGames);

const jsonDataEditorChoiceGames = fs.readFileSync(path.join(__dirname, 'data-editor-choice-games.json'), 'utf-8');
const editorChoiceGames = JSON.parse(jsonDataEditorChoiceGames);

const jsonDataLeftGames = fs.readFileSync(path.join(__dirname, 'data-left-games.json'), 'utf-8');
const leftGames = JSON.parse(jsonDataLeftGames);

const jsonDataBrainGames = fs.readFileSync(path.join(__dirname, 'data-brain-games.json'), 'utf-8');
const brainGames = JSON.parse(jsonDataBrainGames);

const jsonDataRatingGames = fs.readFileSync(path.join(__dirname, 'data-rating-games.json'), 'utf-8');
const ratingGames = JSON.parse(jsonDataRatingGames);

// 设置 EJS 为模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 定义路由
app.get('/', (req, res) => {
    // res.render('index', { title: 'Home Page' });
    res.render('index', { newGames, topGames, editorChoiceGames, leftGames, brainGames, ratingGames });
});


// 渲染游戏详情页面
app.get('/games/:urlTag', (req, res) => {
    const urlTag = decodeURIComponent(req.params.urlTag); // 获取游戏名称
    let game = findGameByJson(urlTag);
    const data = {
        title: 'Hello, EJS!',
        content: '<p style="color: red;">This is a red paragraph.</p>'
    };
    if (game) {
        res.render('gameDetail', { game, topGames, data });
    }else {
        res.status(404).send('Game not found');
    }

});

function findGameByJson(urlTag) {
    // newGames, topGames, editorChoiceGames, leftGames, brainGames, ratingGames
    const gameResult = newGames.find(game => game.urlTag.toLowerCase().replace(/ /g, '-') === urlTag) ||
        topGames.find(game => game.urlTag.toLowerCase().replace(/ /g, '-') === urlTag) ||
        editorChoiceGames.find(game => game.urlTag.toLowerCase().replace(/ /g, '-') === urlTag) ||
        leftGames.find(game => game.urlTag.toLowerCase().replace(/ /g, '-') === urlTag) ||
        brainGames.find(game => game.urlTag.toLowerCase().replace(/ /g, '-') === urlTag) ||
        ratingGames.find(game => game.urlTag.toLowerCase().replace(/ /g, '-') === urlTag);

    return gameResult;
}

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

const PORT = process.env.PORT || 3000; // 使用环境变量中的 PORT，如果没有则使用 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 导出 app
module.exports = app;

