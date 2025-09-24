// script.js
const scoreMap = [3, 2, 1, 0]; // 「とてもそう思う」→3点、「まったくそう思わない」→0点

let currentIndex = 0;
let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
let username = "";

// DOM要素の取得
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
// const historyListElem = document.getElementById("history-list"); // 履歴表示用（index.html用だが、共通スクリプトに含めておく）

// MBTIタイプと説明
const mbtiDescriptions = {
  ISTJ: "責任感が強く、現実的な実務家タイプ。",
  ISFJ: "思いやりがあり、忠実な保護者タイプ。",
  INFJ: "直感的で洞察力に富んだ理想主義者。",
  INTJ: "戦略的で独立心の強い計画者。",
  ISTP: "柔軟で冷静な実践者タイプ。",
  ISFP: "穏やかで感受性豊かな芸術家。",
  INFP: "理想主義で内向的な仲介者。",
  INTP: "分析的で好奇心旺盛な論理学者。",
  ESTP: "行動的で現実主義な冒険家タイプ。",
  ESFP: "社交的で陽気なエンターテイナー。",
  ENFP: "情熱的で創造力豊かな広報担当者。",
  ENTP: "独創的で議論好きな起業家。",
  ESTJ: "現実的でリーダーシップのある管理者。",
  ESFJ: "協調的で世話好きなホスピタリティタイプ。",
  ENFJ: "人を導くカリスマ性のある教師。",
  ENTJ: "決断力があり戦略に優れた指導者。"
};

// MBTIタイプと背景色
const mbtiColors = {
  ISTJ: "#4B6587", ISFJ: "#A3C4BC", INFJ: "#735D78", INTJ: "#2D132C",
  ISTP: "#1B1B2F", ISFP: "#6A0572", INFP: "#6F1E51", INTP: "#3D3B8E",
  ESTP: "#FF6B6B", ESFP: "#FFA41B", ENFP: "#E17055", ENTP: "#00B894",
  ESTJ: "#2C3A47", ESFJ: "#45A29E", ENFJ: "#0984E3", ENTJ: "#2D3436"
};

// --- ここから追加 ---
// 名前入力エラー時の音声ファイル
const soujanaiAudio = new Audio('sound/soujanai.mp3');
// --- ここまで追加 ---


// Startボタンクリックイベント
if (startBtn) { // startBtnが存在する場合のみイベントリスナーを設定 (index.htmlには無い)
  startBtn.addEventListener("click", () => {
    username = nameInput.value.trim();
    if (!username) {
      alert("名前を入力してください");
      // --- ここから追加 ---
      soujanaiAudio.play(); // 音声を再生
      // --- ここまで追加 ---
      return;
    }
    startScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    currentIndex = 0;
    scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    showQuestion();
  });
}


function showQuestion() {
  const q = questions[currentIndex]; // questionsは各HTMLファイルで読み込まれる
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

  // アニメーション
  questionTextElem.classList.remove("fade-in"); // ensure it's removed before adding to re-trigger
  void questionTextElem.offsetWidth; // Trigger reflow
  questionTextElem.classList.add("fade-in");
}

function recordAnswer(type, choiceIndex) {
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

  // 4指標の判定 (動的に質問数から閾値を計算)
  // questions変数が定義されていることを前提とする
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

  // 結果画像を設定（img/ISTJ.png など用意しておく）
  resultImage.src = `img/${mbtiType}.png`;
  resultImage.alt = `${mbtiType}のイメージ`;

  // 説明文
  resultDescription.textContent = mbtiDescriptions[mbtiType] || "このタイプの説明はありません。";

  // 背景色設定
  resultScreen.style.backgroundColor = mbtiColors[mbtiType] || "#ffffff";

  saveHistory(mbtiType);
}

if (restartBtn) { // restartBtnが存在する場合のみイベントリスナーを設定
  restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    nameInput.value = "";
  });
}


function saveHistory(type) {
  const history = JSON.parse(localStorage.getItem("mbtiHistory") || "[]");
  history.unshift({ name: username, type, date: new Date().toLocaleString() });
  localStorage.setItem("mbtiHistory", JSON.stringify(history.slice(0, 10))); // 最新10件を保存
}

// 履歴表示機能はindex.htmlで読み込む際に実装するため、ここではコメントアウトまたは個別で実装
// function displayHistory() {
//     const history = JSON.parse(localStorage.getItem("mbtiHistory") || "[]");
//     if (historyListElem) { // index.htmlにのみ存在する要素
//         historyListElem.innerHTML = "<h3>過去の診断履歴</h3>";
//         if (history.length === 0) {
//             historyListElem.innerHTML += "<p>診断履歴はありません。</p>";
//             return;
//         }
//         const ul = document.createElement("ul");
//         history.forEach(item => {
//             const li = document.createElement("li");
//             li.textContent = `${item.date}: ${item.name} - ${item.type}`;
//             ul.appendChild(li);
//         });
//         historyListElem.appendChild(ul);
//     }
// }

// // ページロード時に履歴を表示 (index.htmlにのみ適用)
// document.addEventListener("DOMContentLoaded", displayHistory);