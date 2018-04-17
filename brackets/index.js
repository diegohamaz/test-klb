const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {response: null, error: null});
})

app.post('/', function (req, res) {
  let brackets = req.body.brackets;
  let test = run(brackets);
  var text = '';
  if(test == false){
    text = `INVALID`;
  }else{
    text = `VALID !`;
  }
  res.render('index', {response: text, error: null}); 
})

function run(str)
{
 if (str.length <= 1)
    return false

  let matchingOpeningBracket, ch
  let stack = []

  let openingBrackets = ['[', '{', '(']
  let closingBrackets = [']', '}', ')']

  for (let i = 0; i < str.length; i++) {
    ch = str[i]

    if (closingBrackets.indexOf(ch) > -1) {
      matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(ch)]
      if (stack.length == 0 || (stack.pop() != matchingOpeningBracket)) {
        return false
      }
    } else {
      stack.push(ch)
    }
  }

  return (stack.length == 0)
}
app.listen(8080, function () {
  console.log('Running on port 8080!')
})