// script.js

// ---------------------------------
// サウンドエフェクトの読み込み
// ---------------------------------
const clickSound = new Audio('sound/click.mp3'); // 進むときの音
const cancelSound = new Audio('sound/cancel.mp3'); // 戻るときの音
const startSound = new Audio('sound/J06_destination_short.dspadpcm.mp3'); // 診断開始ボタンの音
startSound.volume = 0.3; // 音量を30%に設定
const soujanaiAudio = new Audio('sound/soujanai.mp3'); // 名前未入力時の音
soujanaiAudio.volume = 0.1; // 音量を20%に設定

// ---------------------------------
// グローバル変数
// ---------------------------------
const scoreMap = [3, 2, 1, 0];
let currentIndex = 0;
let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
let username = "";

// ---------------------------------
// DOM要素の取得
// ---------------------------------
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
const progressBar = document.getElementById("progress-bar"); // ←★この行を追加

// (MBTIタイプの説明や色の定義は変更なし)
const mbtiDescriptions = {
  ISTJ: "責任感が強く、現実的な実務家タイプ。", ISFJ: "思いやりがあり、忠実な保護者タイプ。", INFJ: "直感的で洞察力に富んだ理想主義者。", INTJ: "戦略的で独立心の強い計画者。", ISTP: "柔軟で冷静な実践者タイプ。", ISFP: "穏やかで感受性豊かな芸術家。", INFP: "理想主義で内向的な仲介者。", INTP: "分析的で好奇心旺盛な論理学者。", ESTP: "行動的で現実主義な冒険家タイプ。", ESFP: "社交的で陽気なエンターテイナー。", ENFP: "情熱的で創造力豊かな広報担当者。", ENTP: "独創的で議論好きな起業家。", ESTJ: "現実的でリーダーシップのある管理者。", ESFJ: "協調的で世話好きなホスピタリティタイプ。", ENFJ: "人を導くカリスマ性のある教師。", ENTJ: "決断力があり戦略に優れた指導者。"
};
const mbtiColors = {
  ISTJ: "#4B6587", ISFJ: "#A3C4BC", INFJ: "#735D78", INTJ: "#2D132C", ISTP: "#1B1B2F", ISFP: "#6A0572", INFP: "#6F1E51", INTP: "#3D3B8E", ESTP: "#FF6B6B", ESFP: "#FFA41B", ENFP: "#E17055", ENTP: "#00B894", ESTJ: "#2C3A47", ESFJ: "#45A29E", ENFJ: "#0984E3", ENTJ: "#2D3436"
};


// ---------------------------------
// イベントリスナー
// ---------------------------------
if (startBtn) {
  startBtn.addEventListener("click", () => {
    username = nameInput.value.trim();
    if (!username) {
      alert("名前を入力してください(音声が流れます)");
      soujanaiAudio.play();
      return;
    }
    startSound.play();
    startScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    currentIndex = 0;
    scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    showQuestion();
  });
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    clickSound.play();
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    nameInput.value = "";
  });
}

// ---------------------------------
// 関数
// ---------------------------------
function showQuestion() {
  // --- ここから追加 ---
  // プログレスバーの幅を更新
  if (progressBar) { // progressBar要素が存在する場合のみ処理
    const progress = (currentIndex / questions.length) * 100;
    progressBar.style.width = progress + '%';
  }
  // --- ここまで追加 ---

  const q = questions[currentIndex];
  questionNumberElem.textContent = `質問 ${currentIndex + 1} / ${questions.length}`;
  questionTextElem.textContent = q.q;
  choicesElem.innerHTML = "";

  q.choices.forEach((choiceText, i) => {
    const btn = document.createElement("button");
    btn.textContent = choiceText;
    btn.className = "btn choice-btn";
    btn.addEventListener("click", () => {
      clickSound.play();
      recordAnswer(q.type, i);
      nextQuestion();
    });
    choicesElem.appendChild(btn);
  });

  questionTextElem.classList.remove("fade-in");
  void questionTextElem.offsetWidth;
  questionTextElem.classList.add("fade-in");
}

function recordAnswer(type, choiceIndex) {
  scores[type] += scoreMap[choiceIndex];
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    // 最終問題が終わったらバーを100%にする
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const numEIQuestions = questions.filter(q => q.type === "EI").length;
  const numSNQuestions = questions.filter(q => q.type === "SN").length;
  const numTFQuestions = questions.filter(q => q.type === "TF").length;
  const numJPQuestions = questions.filter(q => q.type === "JP").length;

  const EI = scores.EI >= (3 * numEIQuestions / 2) ? "E" : "I";
  const SN = scores.SN >= (3 * numSNQuestions / 2) ? "S" : "N";
  const TF = scores.TF >= (3 * numTFQuestions / 2) ? "T" : "F";
  const JP = scores.JP >= (3 * numJPQuestions / 2) ? "J" : "P";

  const mbtiType = EI + SN + TF + JP;

  resultTitle.textContent = `${username}さんのMBTIタイプは ${mbtiType} です！`;
  resultImage.src = `img/${mbtiType}.png`;
  resultImage.alt = `${mbtiType}のイメージ`;
  resultDescription.textContent = mbtiDescriptions[mbtiType] || "このタイプの説明はありません。";
  resultScreen.style.backgroundColor = mbtiColors[mbtiType] || "#ffffff";

  saveHistory(mbtiType);
}

function saveHistory(type) {
  const history = JSON.parse(localStorage.getItem("mbtiHistory") || "[]");
  history.unshift({ name: username, type, date: new Date().toLocaleString() });
  localStorage.setItem("mbtiHistory", JSON.stringify(history.slice(0, 10)));
}

// ---------------------------------
// 「ホームに戻る」ボタンのサウンド処理
// ---------------------------------
const backToHomeLinks = document.querySelectorAll('a.back-to-home-btn, a.home-btn-fixed');
backToHomeLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        cancelSound.play();
        const destination = this.href;
        setTimeout(() => {
            window.location.href = destination;
        }, 300);
    });
});