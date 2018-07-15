const express = require('express');
const router = express.Router();
const fs = require('fs');
const osmosis = require('osmosis');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Write your URL:', example: "http://chessproblem.ru/id13538" });
});

router.post('/send', function(req, res, next) {

    osmosis
        .get(req.body.url)
        .set({
          'title' : '#pr_right > p > b',
          'pieces' : '#pr_right > ul',
          'answer': '#answer'
        })
        .data(function(data) {
            let pieces = data.pieces;
            let startWhite = pieces.indexOf("Белые");
            let endWhite = pieces.indexOf("Черные");
            let endBlack = pieces.indexOf("Просмотров");

            let white = pieces.slice(startWhite, endWhite);
            let black = pieces.slice(endWhite, endBlack);

            let answer = data.answer;
            let startAnswerText = answer.indexOf("1");
            let endAnswerText = answer.indexOf("Как");

            answer = answer.slice(startAnswerText, endAnswerText);

            answer = answer.replaceAll(' # ', ', "#"');
            answer = answer.replaceAll(/ \+/g, ', "+"');

            // дикий костыль
            answer = answer.replaceAll("0 угроза:", ', "угроза:"');
            answer = answer.replaceAll("1 угроза:", ', "угроза:"');
            answer = answer.replaceAll("2 угроза:", ', "угроза:"');
            answer = answer.replaceAll("3 угроза:", ', "угроза:"');
            answer = answer.replaceAll("4 угроза:", ', "угроза:"');
            answer = answer.replaceAll("5 угроза:", ', "угроза:"');
            answer = answer.replaceAll("6 угроза:", ', "угроза:"');
            answer = answer.replaceAll("7 угроза:", ', "угроза:"');
            answer = answer.replaceAll("8 угроза:", ', "угроза:"');
            answer = answer.replaceAll("9 угроза:", ', "угроза:"');

            answer = answer.replaceAll("0 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("1 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("2 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("3 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("4 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("5 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("6 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("7 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("8 цугцванг.", ', "цугцванг."');
            answer = answer.replaceAll("9 цугцванг.", ', "цугцванг."');


            answer = answer.replaceAll("! угроза:", ', "! угроза:"');
            answer = answer.replaceAll("! цугцванг.", ', "! цугцванг."');

            let count_strings = answer.split('\n').length - 1;

            if(count_strings === 1 || count_strings === 2) {

                // const regex = /\d+. /gm;
                //
                // let m;
                //
                // while ((m = regex.exec(answer)) !== null) {
                //     // This is necessary to avoid infinite loops with zero-width matches
                //     if (m.index === regex.lastIndex) {
                //         regex.lastIndex++;
                //     }
                //
                //     // The result can be accessed through the `m`-variable.
                //     m.forEach((match, groupIndex) => {
                //         console.log(`Found match, group ${groupIndex}: ${match}`);
                //     });
                // }

                answer = answer.replaceAll(' 2. ', '\n2. ');
                answer = answer.replaceAll(' 3. ', '\n3. ');
                answer = answer.replaceAll(' 4. ', '\n4. ');
                answer = answer.replaceAll(" 5. ", '\n5. ');
                answer = answer.replaceAll(' 6. ', '\n6. ');
                answer = answer.replaceAll(' 7. ', '\n7. ');
                answer = answer.replaceAll(' 8. ', '\n8. ');
                answer = answer.replaceAll(' 9. ', '\n9. ');
            }

            //get id from url
            let txt_name = null;

            const regex = /[\d]+$/gm;
            const str = req.body.url;
            let m;

            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);
                    txt_name = match;
                });
            }

            let textFile = '#checkmate\n' + '"' +data.title + '"\n' + white + '\n' + black + '\n' + answer;

            fs.writeFile('txt/' + txt_name + '.txt', textFile, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Файл сохранён.");
            });


            res.render("index", {
                title: "Answer",
                name : data.title,
                white: white,
                black: black,
                result: answer,
                textFile : data.title + '\n' + white + '\n' + black + '\n' + answer,
                txt_name : txt_name
            });
        })
});

module.exports = router;
