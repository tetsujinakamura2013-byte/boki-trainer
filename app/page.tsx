"use client";

import { useEffect, useMemo, useState } from "react";

type ElementType = "資産" | "負債" | "純資産" | "費用" | "収益" | "その他";

type Account = {
  name: string;
  type: ElementType;
};

const accounts: Account[] = [
  { name: "現金", type: "資産" },
  { name: "当座預金", type: "資産" },
  { name: "普通預金", type: "資産" },
  { name: "定期預金", type: "資産" },
  { name: "小口現金", type: "資産" },
  { name: "受取手形", type: "資産" },
  { name: "売掛金", type: "資産" },
  { name: "電子記録債権", type: "資産" },
  { name: "商品", type: "資産" },
  { name: "繰越商品", type: "資産" },
  { name: "貯蔵品", type: "資産" },
  { name: "前払金", type: "資産" },
  { name: "前払費用", type: "資産" },
  { name: "未収入金", type: "資産" },
  { name: "未収収益", type: "資産" },
  { name: "立替金", type: "資産" },
  { name: "仮払金", type: "資産" },
  { name: "仮払法人税等", type: "資産" },
  { name: "仮払消費税", type: "資産" },
  { name: "貸付金", type: "資産" },
  { name: "手形貸付金", type: "資産" },
  { name: "役員貸付金", type: "資産" },
  { name: "建物", type: "資産" },
  { name: "備品", type: "資産" },
  { name: "車両運搬具", type: "資産" },
  { name: "土地", type: "資産" },
  { name: "差入保証金", type: "資産" },
  { name: "貸倒引当金", type: "資産" },
  { name: "減価償却累計額", type: "資産" },

  { name: "支払手形", type: "負債" },
  { name: "買掛金", type: "負債" },
  { name: "電子記録債務", type: "負債" },
  { name: "借入金", type: "負債" },
  { name: "手形借入金", type: "負債" },
  { name: "未払金", type: "負債" },
  { name: "未払費用", type: "負債" },
  { name: "未払法人税等", type: "負債" },
  { name: "未払消費税", type: "負債" },
  { name: "未払配当金", type: "負債" },
  { name: "前受金", type: "負債" },
  { name: "前受収益", type: "負債" },
  { name: "預り金", type: "負債" },
  { name: "社会保険料預り金", type: "負債" },
  { name: "所得税預り金", type: "負債" },
  { name: "仮受金", type: "負債" },
  { name: "仮受消費税", type: "負債" },

  { name: "資本金", type: "純資産" },
  { name: "利益準備金", type: "純資産" },
  { name: "繰越利益剰余金", type: "純資産" },

  { name: "仕入", type: "費用" },
  { name: "給料", type: "費用" },
  { name: "法定福利費", type: "費用" },
  { name: "広告宣伝費", type: "費用" },
  { name: "発送費", type: "費用" },
  { name: "旅費交通費", type: "費用" },
  { name: "通信費", type: "費用" },
  { name: "消耗品費", type: "費用" },
  { name: "水道光熱費", type: "費用" },
  { name: "支払家賃", type: "費用" },
  { name: "支払地代", type: "費用" },
  { name: "保険料", type: "費用" },
  { name: "租税公課", type: "費用" },
  { name: "支払手数料", type: "費用" },
  { name: "支払利息", type: "費用" },
  { name: "貸倒引当金繰入", type: "費用" },
  { name: "貸倒損失", type: "費用" },
  { name: "減価償却費", type: "費用" },
  { name: "固定資産売却損", type: "費用" },
  { name: "雑損", type: "費用" },
  { name: "法人税、住民税及び事業税", type: "費用" },

  { name: "売上", type: "収益" },
  { name: "受取手数料", type: "収益" },
  { name: "受取利息", type: "収益" },
  { name: "受取家賃", type: "収益" },
  { name: "償却債権取立益", type: "収益" },
  { name: "固定資産売却益", type: "収益" },
  { name: "雑益", type: "収益" },

  { name: "損益", type: "その他" },
  { name: "現金過不足", type: "その他" },
];

const MAX_STREAK = 50;
const FLOWERS_PER_ROW = 10;

function getRandomIndex(exclude?: number) {
  if (accounts.length <= 1) return 0;

  let next = Math.floor(Math.random() * accounts.length);

  while (next === exclude) {
    next = Math.floor(Math.random() * accounts.length);
  }

  return next;
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ElementType | null>(null);

  // 連続正解数。保存しないため再読み込みすると0に戻る
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setIndex(getRandomIndex());
  }, []);

  const current = useMemo(() => accounts[index], [index]);
  const isCorrect = selected === current.type;

  const answer = (choice: ElementType) => {
    if (selected) return;

    setSelected(choice);

    if (choice === current.type) {
      // 50問を上限に桜を増やす
      setStreak((previous) => Math.min(previous + 1, MAX_STREAK));
    } else {
      // 1問でも間違えたら桜を全消去
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setIndex((currentIndex) => getRandomIndex(currentIndex));
  };

  // 桜を10個ずつの段に分ける
  const flowerRows = Array.from(
    { length: Math.ceil(streak / FLOWERS_PER_ROW) },
    (_, rowIndex) => {
      const remaining = streak - rowIndex * FLOWERS_PER_ROW;
      return Math.min(remaining, FLOWERS_PER_ROW);
    }
  );

  return (
    <main className="page-shell">
      <section
        className="app-card"
        aria-label="簿記3級 5要素トレーニング"
      >
        {/* 連続正解の桜。1段目を下側に表示 */}
        <div className="flower-area" aria-label={`連続正解数 ${streak}`}>
          {flowerRows.map((flowerCount, rowIndex) => (
            <div className="flower-row" key={rowIndex}>
              {Array.from({ length: flowerCount }, (_, flowerIndex) => (
                <span
                  key={flowerIndex}
                  className={`flower ${
                    flowerIndex === 5 ? "flower-second-half" : ""
                  }`}
                  aria-hidden="true"
                >
                  🌸
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="account-panel">{current.name}</div>

        <div className="choice-sections">
          <section
            className="choice-section"
            aria-label="貸借対照表の要素"
          >
            <div className="section-label">B/S</div>

            <div className="choice-row choice-row-bs">
              {["資産", "負債", "純資産"].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={`choice-button choice-${choice} ${
                    selected === choice ? "selected" : ""
                  }`}
                  onClick={() => answer(choice as ElementType)}
                  disabled={selected !== null}
                >
                  {choice}
                </button>
              ))}
            </div>
          </section>

          <section
            className="choice-section"
            aria-label="損益計算書の要素"
          >
            <div className="section-label">P/L</div>

            <div className="choice-row choice-row-pl">
              {["費用", "収益"].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={`choice-button choice-${choice} ${
                    selected === choice ? "selected" : ""
                  }`}
                  onClick={() => answer(choice as ElementType)}
                  disabled={selected !== null}
                >
                  {choice}
                </button>
              ))}
            </div>
          </section>

          <section className="choice-section" aria-label="その他">
            <div className="section-label">その他</div>

            <div className="choice-row choice-row-other">
              <button
                type="button"
                className={`choice-button choice-その他 ${
                  selected === "その他" ? "selected" : ""
                }`}
                onClick={() => answer("その他")}
                disabled={selected !== null}
              >
                その他
              </button>
            </div>
          </section>
        </div>

        <div
          className={`result-panel ${
            selected ? (isCorrect ? "correct" : "wrong") : "idle"
          }`}
        >
          <span className="result-label">判定：</span>

          <span className="result-mark">
            {selected ? (isCorrect ? "○" : "×") : "—"}
          </span>

          {selected && (
            <span className="result-answer">
              {isCorrect ? current.type : `正解：${current.type}`}
            </span>
          )}
        </div>

        <button
          type="button"
          className="next-button"
          onClick={nextQuestion}
          disabled={!selected}
        >
          次の問題
        </button>
        <div className="app-version">Ver.1.1.1</div>
      </section>
    </main>
  );
}
