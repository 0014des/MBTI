const questions = [
  // E/I（1〜10）
  { q: "初対面でもすぐ打ち解けられる方だ", type: "EI", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "一人の時間が大切で、長くても苦にならない", type: "EI", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "話すよりも聞くほうが得意だ", type: "EI", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "グループ活動が好き", type: "EI", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "深く狭い人間関係を築くタイプだ", type: "EI", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "話しながら考えることが多い", type: "EI", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "周囲の注目を集めるのが苦手", type: "EI", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "友達と一緒に過ごすと元気になる", type: "EI", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "人との関わりは少ないほうが楽だ", type: "EI", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "イベントで主催や司会をやるのが好き", type: "EI", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },

  // S/N（11〜20）
  { q: "現実的な事実やデータを重視する", type: "SN", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "アイデアを出すことが得意", type: "SN", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "日常の些細な変化に気づきやすい", type: "SN", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "空想にふけることがある", type: "SN", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "過去の経験を活かすのが得意", type: "SN", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "未来の可能性にワクワクする", type: "SN", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "マニュアルや手順通りにやるのが安心", type: "SN", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "抽象的な理論を考えるのが好き", type: "SN", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "目に見える成果が重要だ", type: "SN", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "直感でひらめいたアイデアをすぐ試す", type: "SN", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },

  // T/F（21〜30）
  { q: "判断は感情よりも論理を優先する", type: "TF", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "他人の気持ちに共感しやすい", type: "TF", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "ルールは守るべきだと考える", type: "TF", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "人の悩みに寄り添って話を聞ける", type: "TF", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "物事の正しさや妥当性を重視する", type: "TF", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "場の雰囲気を大切にして発言を控えることがある", type: "TF", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "客観的に評価されたい", type: "TF", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "人の成長を手助けすることにやりがいを感じる", type: "TF", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "正論をぶつけてトラブルになることがある", type: "TF", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "人に嫌われたくない気持ちが強い", type: "TF", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },

  // J/P（31〜50）
  { q: "計画通りに物事を進めたい", type: "JP", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "突発的な予定変更にも対応できる", type: "JP", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "締め切り前に余裕を持って終わらせる", type: "JP", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "ギリギリまで手をつけないことが多い", type: "JP", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "タスクを細かく管理して安心する", type: "JP", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "気分で行動するのが好き", type: "JP", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "整理整頓が得意", type: "JP", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "変化が多い方がワクワクする", type: "JP", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] },
  { q: "決めたことを最後までやり抜く", type: "JP", choices: ["とてもそう思う", "ややそう思う", "あまりそう思わない", "まったくそう思わない"] },
  { q: "その場その場で判断して行動する", type: "JP", choices: ["まったくそう思わない", "あまりそう思わない", "ややそう思う", "とてもそう思う"] }
];

const scoreMap = [3, 2, 1, 0]; // 「とてもそう思う」→3点、「まったくそう思わない」→0点

let currentIndex = 0;
let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
let username = "";

const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("username");
const questionNumberElem = document.getElementById("question-number");
const questionTextElem = document.getElementById("question-text");
const choicesElem = document.getElementById("choices");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const resultTitle = document.getElementById("result-title");
const resultImage = document.getElementById("result-image");
const resultDescription = document.getElementById("result-description");
const restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", () => {
  username = nameInput.value.trim();
  if (!username) {
    alert("名前を入力してください");
    return;
  }
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  currentIndex = 0;
  scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  showQuestion();
});

function showQuestion() {
  const q = questions[currentIndex];
  questionNumberElem.textContent = `質問 ${currentIndex + 1} / ${questions.length}`;
  questionTextElem.textContent = q.q;

  // 選択肢ボタンをクリア
  choicesElem.innerHTML = "";

  // 4択ボタン作成
  q.choices.forEach((choiceText, i) => {
    const btn = document.createElement("button");
    btn.textContent = choiceText;
    btn.className = "btn choice-btn";
    btn.addEventListener("click", () => {
      recordAnswer(q.type, i);
      nextQuestion();
    });
    choicesElem.appendChild(btn);
  });
}

function recordAnswer(type, choiceIndex) {
  // type は EI/SN/TF/JP のいずれか
  // choiceIndex は 0~3、0が「とてもそう思う」なので高得点として扱う
  // 質問によって逆転もあるので簡単に分けます：
  // EI, TF, JP は index 0 = 3点、1=2点, 2=1点, 3=0点
  // SN は逆向き（質問により反転されてるのでここは基本正方向で）
  // ただし質問文で「逆」のものはchoicesが逆順になっているため、
  // すべての質問で統一的に scoreMap を適用すれば良い

  scores[type] += scoreMap[choiceIndex];
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  // 4指標の判定
  const EI = scores.EI >= (3 * 10 / 2) ? "E" : "I"; // 最大30点、閾値15点
  const SN = scores.SN >= (3 * 10 / 2) ? "S" : "N";
  const TF = scores.TF >= (3 * 10 / 2) ? "T" : "F";
  const JP = scores.JP >= (3 * 10 / 2) ? "J" : "P";

  const mbtiType = EI + SN + TF + JP;

  resultTitle.textContent = `${username}さんのMBTIタイプは ${mbtiType} です！`;

  // 結果画像を設定（img/ISTJ.png など用意しておく）
  resultImage.src = `img/${mbtiType}.png`;
  resultImage.alt = `${mbtiType}のイメージ`;

  // 説明文（適宜追加してください）
  const descriptions = {
    ISTJ: "責任感が強く、現実的な実務家タイプ。",
    INFP: "理想主義で内向的な仲介者。",
    ENTP: "独創的で議論好きな起業家。",
    // 16タイプすべて用意してください
  };
  resultDescription.textContent = descriptions[mbtiType] || "このタイプの説明はありません。";

  saveHistory(mbtiType);
}

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  nameInput.value = "";
});

function saveHistory(type) {
  const history = JSON.parse(localStorage.getItem("mbtiHistory") || "[]");
  history.unshift({ name: username, type, date: new Date().toLocaleString() });
  localStorage.setItem("mbtiHistory", JSON.stringify(history.slice(0, 10)));
}

