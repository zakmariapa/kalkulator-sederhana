const expr = document.getElementById("expr");
const res = document.getElementById("res");
const modeEl = document.getElementById("mode");
const historyBox = document.getElementById("historyBox");
const historyList = document.getElementById("historyList");

let current = "";
let exp = "";
let calc = "";
let isDeg = true;
let history = [];

function toggleDeg() {
  isDeg = !isDeg;
  modeEl.innerText = isDeg ? "DEG" : "RAD";
}

function num(n) {
  current += n;
  expr.innerText = exp + current;
}

function operator(o) {
  if (!current) return;
  exp += current + o;
  calc += current + (o === "×" ? "*" : o === "÷" ? "/" : o);
  current = "";
  expr.innerText = exp;
}

function equal() {
  if (!current) return;
  const result = eval(calc + current);
  history.unshift(exp + current + " = " + result);
  renderHistory();
  expr.innerText = result;
  current = result.toString();
  exp = "";
  calc = "";
}

function trig(t) {
  if (!current) return;
  let val = parseFloat(current);
  let rad = isDeg ? val * Math.PI / 180 : val;
  let r =
    t === "sin" ? Math.sin(rad) :
    t === "cos" ? Math.cos(rad) :
    Math.tan(rad);
  current = r.toString();
  expr.innerText = current;
}

function math(t) {
  let v = parseFloat(current || 0);
  let r =
    t === "sqrt" ? Math.sqrt(v) :
    t === "pow2" ? v ** 2 :
    t === "pow3" ? v ** 3 :
    t === "log" ? Math.log10(v) :
    t === "ln" ? Math.log(v) :
    t === "pi" ? Math.PI :
    Math.E;
  current = r.toString();
  expr.innerText = current;
}

function del() {
  current = current.slice(0, -1);
  expr.innerText = exp + current;
}

function clearAll() {
  current = exp = calc = "";
  expr.innerText = res.innerText = "";
}

function toggleHistory() {
  historyBox.classList.toggle("show");
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(h => {
    const d = document.createElement("div");
    d.className = "history-item";
    d.innerText = h;
    historyList.appendChild(d);
  });
}

function clearHistory() {
  history = [];
  renderHistory();
}
