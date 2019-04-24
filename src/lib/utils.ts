export const isAlpha = (ch: string): boolean => {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_';
};

export const isDigit = (ch: string): boolean => {
  return ch >= '0' && ch <= '9';
};

const boundary = [',', ';', '[', ']', '(', ')', '.', '{', '}'];

export const isOperator = (ch: string): boolean => {
  const operators = [
    '+',
    '-',
    '*',
    '=',
    '<',
    '>',
    '&',
    '|',
    '~',
    '^',
    '!',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '%',
    ';',
    ',',
    '#',
    '.',
  ];
  return operators.includes(ch);
};

export const isKeyword = (ch: string): boolean => {
  return [
    "auto", "double", "int", "struct",
    "break", "else", "long", "switch", "case", "enum", "register",
    "typedef", "char", "extern", "return", "union", "const", "float",
    "short", "unsigned", "continue", "for", "signed", "void",
    "default", "goto", "sizeof", "volatile", "do", "if", "while",
    "static", "String"
  ].includes(ch);
};

export const canAddPlusOp = (ch: string): boolean => {
  const arr = ['+', '-', '*', '/', '=', '>', '<', '&', '|', '^'];
  return arr.includes(ch);
};

export const canRepeat = (ch: string): boolean => {
  const arr = ['+', '-', '&', '|'];
  return arr.includes(ch);
};

/**
 * a stands for any chars
 * b stands for any chars except "\", "'".
 */
export const stringDFA = ['#\\b#', '##a#', '#\\b"', '####'];
export const charDFA = ['#\\b#', '##a#', "###'", '####'];

export const isStringDFA = (ch: string, key: string): boolean => {
  if (key === 'a') {
    return true;
  }
  if (key === '\\') {
    return ch === key;
  }
  if (key === '"') {
    return ch === key;
  }
  if (key === 'b') {
    return ch !== '\\' && ch !== '"';
  }

  return false;
};

export const isCharDFA = (ch: string, key: string): boolean => {
  if (key === 'a') {
    return true;
  }
  if (key === '\\') {
    return ch === key;
  }
  if (key === "'") {
    return ch === key;
  }
  if (key === 'b') {
    return ch !== '\\' && ch !== "'";
  }
  return false;
};

export const isEscapeChar = (ch: string): boolean => {
  const escapes = ['a', 'b', 'f', 'n', 'r', 't', 'v', '?', '0'];
  return escapes.includes(ch);
};

export const digitDFA = [
  "#d#####",
  "#d.#e##",
  "###d###",
  "###de##",
  "#####-d",
  "######d",
  "######d"];

export const isDigitDFA = (ch: string, key: string): boolean => {
  if (key === 'd') {
    return isDigit(ch);
  } else {
    return ch === key;
  }
};

export const commentDFA = [
  "#####",
  "##*##",
  "##c*#",
  "##c*/",
  "#####"];

export const isCommentDFA = (ch: string, nD: string, s: number): boolean => {
  if (s === 2) {
    if (nD === 'c') {
      return ch !== '*';
    }
  }
  if (s === 3) {
    if (nD === 'c') {
      return ch !== '*' && ch !== '/';
    }
  }
  return ch === nD;
};

let pos = 0;
const map = new Map<string, number>();

export const analyze = (input: string): string[] => {
  const inputs: string[] = input.split('\n');
  console.log(inputs);
  // reset state
  map.clear();
  pos = 0;
  const tokens: string[] = [];
  for (let m = 0; m < inputs.length; m++) {
    const str = inputs[m];
    if (str === '') {
      continue;
    } else {
      const arr = str.split('');
      for (let i = 0; i < arr.length; i++) {
        let ch = arr[i];

        let token = '';

        if (isAlpha(ch)) {
          do {
            token += ch;
            i++;
            if (i >= arr.length) break;
            ch = arr[i];
          } while (ch !== '\0' && (isAlpha(ch) || isDigit(ch)));
          i--;

          //keyword
          if (isKeyword(token)) {
            console.log('table1', token, 'keyword', '100', m + 1);
            tokens.push(token);
          } else {
            // symbol here
            if (!map.has(token)) {
              map.set(token, pos);
              console.log('table3', token, pos);
              pos++;
            }
            console.log('table1', token, "标识符", "200", m + 1);
            tokens.push('IDN');

          }


        } else if (isDigit(ch)) {
          let state = 1;
          let k = 0;

          let isFloat = false;

          while ((ch !== '\0') && (isDigit(ch) || ch === '.' || ch === 'e' || ch === '-')) {
            if (ch === '.' || ch === 'e')
              isFloat = true;

            for (k = 0; k <= 6; k++) {
              const tmp = digitDFA[state].split('');
              if (ch !== '#' && isDigitDFA(ch, tmp[k])) {
                token += ch;
                state = k;
                break;
              }
            }
            if (k > 6) break;
            //遍历符号先前移动
            i++;
            if (i >= arr.length) break;
            ch = arr[i];
          }

          let error = false;


          if (state === 2 || state === 4 || state === 5) {
            error = true;
          } else//1,3,6
          {
            if ((!isOperator(ch) || ch === '.') && !isDigit(ch))
              error = true;
          }

          // error handling
          //错误处理
          if (error) {
            //一直到“可分割”的字符结束
            while (ch !== '\0' && ch !== ',' && ch !== ';' && ch !== ' ') {
              token += ch;
              i++;
              if (i >= arr.length) break;
              ch = arr[i];
            }
            console.log('table2', m + 1, token + " 确认无符号常数输入正确");
          } else {
            if (isFloat) {
              console.log('table1 ', token, "浮点型常量", "300", m + 1);
              tokens.push('FLOAT');
            } else {
              console.log('table1', token, "整型常量", "301", m + 1);
              tokens.push('INT10');
            }
          }
          i--;
        } else if (ch === '\'') {    //识别字符常量
          //初始化状态为0
          let state = 0;
          //token加上’
          token += ch;

          while (state !== 3) {
            i++;
            if (i >= arr.length) break;
            ch = arr[i];
            for (let k = 0; k < 4; k++) {
              const tmp = charDFA[state].split('');
              if (isCharDFA(ch, tmp[k])) {
                token += ch;
                state = k;
                break;
              }
            }
          }
          if (state !== 3) {
            console.log('table2', m + 1, token + " 字符常量引号未封闭");
            i--;
          } else {
            console.log('table1', token, "字符常量", "302", m + 1);
            tokens.push('CHAR');
          }
          token = "";
          //识别字符常量

        } else if (ch === '"') {//识别字符串常量
          let string = '';
          string += ch;

          let state = 0;
          let error = false;


          while (state !== 3) {
            i++;

            if (i >= arr.length - 1) {
              error = true;
              break;
            }

            ch = arr[i];

            if (ch === '\0') {
              error = true;
              break;
            }

            for (let k = 0; k < 4; k++) {
              const tmp = stringDFA[state].split('');
              if (isStringDFA(ch, tmp[k])) {
                string += ch;
                if (k === 2 && state === 1) {
                  if (isEscapeChar(ch)) //是转义字符
                    token = token + '\\' + ch;
                  else
                    token += ch;
                } else if (k !== 3 && k !== 1)
                  token += ch;
                state = k;
                break;
              }
            }
          }

          if (error) {
            console.log('table2', m + 1, string + " 字符串常量引号未封闭");
            --i;
          } else {
            console.log('table1', token, "字符串常量", "303", m + 1);

            tokens.push('STR');

          }
          token = "";
          //识别字符串常量


        } else if (isOperator(ch)) { // 运算符和界符
          token += ch;
          //后面可以用一个"="
          if (canAddPlusOp(ch)) {
            i++;
            if (i >= arr.length) break;
            ch = arr[i];
            if (ch === '=')
              token += ch;
            else { // could repeast
              if (canRepeat(arr[i - 1]) && ch === arr[i - 1])
                token += ch;
              else
                --i;
            }
          }
          //判断是否为界符

          if (token.length === 1) {
            const signal = token.charAt(0);
            let isbound = false;
            for (let bound = 0; bound < boundary.length; bound++) {
              if (signal === boundary[bound]) {
                console.log('table1', token, "界符", "304", m + 1);
                tokens.push(token);
                isbound = true;
                break;
              }
            }
            if (!isbound) {
              console.log('table1', token, "运算符", "305", m + 1);
              tokens.push(token);
            }
          } else {
            console.log('table1', token, "运算符", "305", m + 1);
            tokens.push(token);
          }

          token = "";
          //识别运算符
        } else if (ch === '/') { // comments
          token += ch;
          i++;
          if (i >= arr.length) break;
          ch = arr[i];

          //不是多行注释或单行注释
          if (ch !== '*' && ch !== '/') {
            if (ch === '=')
              token += ch; // /=
            else {
              --i;
            }
            console.log('table1', token, "运算符", "305", m + 1);
            tokens.push(token);
            token = "";
          } else {
            let error = false;
            let State = 0;
            if (ch === '*') {
              // ch == '*'
              token += ch;
              let state = 2;

              while (state !== 4) {
                i++;
                if (i >= arr.length) break;
                ch = arr[i];

                if (ch === '\0') {
                  error = true;
                  break;
                }
                for (let k = 2; k <= 4; k++) {
                  const tmpstr = commentDFA[state].split('');
                  if (isCommentDFA(ch, tmpstr[k], state)) {
                    token += ch;
                    state = k;
                    break;
                  }
                }
              }
              State = state;
              //if '*'
            } else if (ch === '/') {

              let index = str.lastIndexOf("//");

              let tmpstr = str.substring(index);
              let tmpint = tmpstr.length;
              for (let k = 0; k < tmpint; k++)
                i++;
              token = tmpstr;
            }
            if (error || State !== 4) {
              console.log('table2', m + 1, "注释未封闭");
              --i;
            } else {
              console.log('table1', token, "注释", "306", m + 1);
            }
            token = "";
            //comment
          }
        } else { // invalid
          if (ch !== ' ' && ch !== '\t' && ch !== '\0' && ch !== '\n' && ch !== '\r') {
            console.log('table2', m + 1, "存在不合法字符");
            console.log(ch);
          }
        }

      }
    }

  }
  console.log('tokens', tokens);
  return tokens;
};


