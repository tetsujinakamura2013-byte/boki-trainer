"use client";

import { useEffect, useMemo, useState } from "react";

type ElementType = "資産" | "負債" | "純資産" | "費用" | "収益" | "その他";

type Account = {
  name: string;
  type: ElementType;
  description: string;
};

const accounts: Account[] = [
  { name: "現金", type: "資産", description: "紙幣や硬貨のほか、すぐに現金として使える通貨代用証券を処理する勘定科目です。" },
  { name: "当座預金", type: "資産", description: "小切手や手形の支払いに使う、利息の付かない事業用預金です。" },
  { name: "普通預金", type: "資産", description: "必要なときに預け入れや引き出しができる一般的な預金です。" },
  { name: "定期預金", type: "資産", description: "一定期間引き出さない約束で預け、普通預金より高い利息を受け取る預金です。" },
  { name: "小口現金", type: "資産", description: "交通費や消耗品費など、日常の少額支払いに備えて手元に置く現金です。" },
  { name: "受取手形", type: "資産", description: "商品販売などの代金として受け取った手形で、将来その金額を受け取る権利です。" },
  { name: "売掛金", type: "資産", description: "商品を掛けで販売し、後日その代金を受け取る権利です。" },
  { name: "電子記録債権", type: "資産", description: "電子記録によって発生・譲渡される、将来代金を受け取る権利です。" },
  { name: "商品", type: "資産", description: "販売する目的で仕入れ、まだ販売されずに手元に残っている物品です。" },
  { name: "繰越商品", type: "資産", description: "決算時に、翌期へ繰り越す期末商品の在庫額を表す勘定科目です。" },
  { name: "貯蔵品", type: "資産", description: "未使用の切手・収入印紙・消耗品など、次期以降に使用する物品です。" },
  { name: "前払金", type: "資産", description: "商品などを受け取る前に、代金の一部または全部を先に支払ったものです。" },
  { name: "前払費用", type: "資産", description: "家賃や保険料など、翌期分の費用を当期中に先払いしたものです。" },
  { name: "未収入金", type: "資産", description: "商品販売以外の取引で発生した、まだ受け取っていない代金です。" },
  { name: "未収収益", type: "資産", description: "当期に発生した収益のうち、まだ受け取っていない金額です。" },
  { name: "立替金", type: "資産", description: "本来は他人が負担する金額を、一時的に代わって支払ったものです。" },
  { name: "仮払金", type: "資産", description: "支払った目的や金額がまだ確定していないため、一時的に処理する勘定科目です。" },
  { name: "仮払法人税等", type: "資産", description: "法人税等の中間申告などで、確定前にあらかじめ支払った金額です。" },
  { name: "仮払消費税", type: "資産", description: "商品やサービスの購入時に支払った消費税を、税抜方式で一時的に記録する勘定科目です。" },
  { name: "貸付金", type: "資産", description: "取引先などへ貸した金銭で、将来返してもらう権利です。" },
  { name: "手形貸付金", type: "資産", description: "金銭を貸し付け、その証拠として約束手形を受け取った場合の債権です。" },
  { name: "役員貸付金", type: "資産", description: "会社が役員に貸し付けた金銭で、将来返してもらう権利です。" },
  { name: "建物", type: "資産", description: "事業に使用する店舗・事務所・工場などの建物本体です。" },
  { name: "備品", type: "資産", description: "机・椅子・パソコンなど、長期間使用する事業用の器具や設備です。" },
  { name: "車両運搬具", type: "資産", description: "営業車やトラックなど、事業に使用する車両です。" },
  { name: "土地", type: "資産", description: "店舗・事務所・工場などに使用する土地です。通常は減価償却しません。" },
  { name: "差入保証金", type: "資産", description: "賃貸契約などで相手に預け、契約終了時に返還される保証金です。" },
  { name: "貸倒引当金", type: "資産", description: "売掛金などが将来回収できなくなる見込額です。資産から差し引く評価勘定です。" },
  { name: "減価償却累計額", type: "資産", description: "固定資産について、これまで計上した減価償却費の累計額です。資産から差し引きます。" },

  { name: "支払手形", type: "負債", description: "商品仕入れなどの代金として振り出した手形で、将来支払う義務です。" },
  { name: "買掛金", type: "負債", description: "商品を掛けで仕入れ、後日その代金を支払う義務です。" },
  { name: "電子記録債務", type: "負債", description: "電子記録によって発生・譲渡される、将来代金を支払う義務です。" },
  { name: "借入金", type: "負債", description: "銀行などから借りた金銭で、将来返済する義務です。" },
  { name: "手形借入金", type: "負債", description: "金銭を借り、その証拠として約束手形を振り出した場合の債務です。" },
  { name: "未払金", type: "負債", description: "商品仕入れ以外の取引で発生した、まだ支払っていない代金です。" },
  { name: "未払費用", type: "負債", description: "当期に発生した費用のうち、まだ支払っていない金額です。" },
  { name: "未払法人税等", type: "負債", description: "決算で確定した法人税等のうち、まだ納付していない金額です。" },
  { name: "未払消費税", type: "負債", description: "受け取った消費税から支払った消費税を差し引いた、納付すべき消費税です。" },
  { name: "未払配当金", type: "負債", description: "株主総会などで配当が決まったものの、まだ株主へ支払っていない金額です。" },
  { name: "前受金", type: "負債", description: "商品などを引き渡す前に、代金の一部または全部を先に受け取ったものです。" },
  { name: "前受収益", type: "負債", description: "翌期分の家賃や利息などを、当期中に先に受け取ったものです。" },
  { name: "預り金", type: "負債", description: "従業員や取引先などから一時的に預かり、後で本人や第三者へ支払う金額です。" },
  { name: "社会保険料預り金", type: "負債", description: "従業員の給料から差し引き、会社が後で納付する社会保険料です。" },
  { name: "所得税預り金", type: "負債", description: "従業員の給料などから源泉徴収し、会社が後で国へ納付する所得税です。" },
  { name: "仮受金", type: "負債", description: "入金の理由や相手がまだ確定していないため、一時的に処理する勘定科目です。" },
  { name: "仮受消費税", type: "負債", description: "商品やサービスの販売時に受け取った消費税を、税抜方式で一時的に記録する勘定科目です。" },

  { name: "資本金", type: "純資産", description: "株主などが会社へ出資した金額のうち、資本金として計上したものです。" },
  { name: "利益準備金", type: "純資産", description: "会社法の定めにより、配当時などに利益の一部を積み立てたものです。" },
  { name: "繰越利益剰余金", type: "純資産", description: "会社がこれまでに得た利益のうち、配当などに使わず翌期へ繰り越した金額です。" },

  { name: "仕入", type: "費用", description: "販売する商品を購入したときの金額を、三分法で記録する勘定科目です。" },
  { name: "給料", type: "費用", description: "従業員へ労働の対価として支払う給与や賃金です。" },
  { name: "法定福利費", type: "費用", description: "健康保険料や厚生年金保険料など、会社が負担する社会保険料です。" },
  { name: "広告宣伝費", type: "費用", description: "商品や会社を広く知らせるための広告・宣伝にかかった費用です。" },
  { name: "発送費", type: "費用", description: "商品を顧客へ送るために負担した運送料や梱包費などです。" },
  { name: "旅費交通費", type: "費用", description: "出張や業務上の移動にかかった電車代・宿泊費などです。" },
  { name: "通信費", type: "費用", description: "電話・郵便・インターネットなど、通信にかかった費用です。" },
  { name: "消耗品費", type: "費用", description: "文房具など、短期間で使い切る物品の購入にかかった費用です。" },
  { name: "水道光熱費", type: "費用", description: "事業で使用した電気・ガス・水道などの料金です。" },
  { name: "支払家賃", type: "費用", description: "店舗・事務所・建物などを借りるために支払う賃借料です。" },
  { name: "支払地代", type: "費用", description: "事業用の土地を借りるために支払う賃借料です。" },
  { name: "保険料", type: "費用", description: "火災保険や損害保険など、事業に必要な保険の料金です。" },
  { name: "租税公課", type: "費用", description: "固定資産税・印紙税など、法人税等以外の税金や公的負担です。" },
  { name: "支払手数料", type: "費用", description: "振込手数料や専門家への報酬など、サービスの対価として支払う手数料です。" },
  { name: "支払利息", type: "費用", description: "借入金などに対して支払う利息です。" },
  { name: "貸倒引当金繰入", type: "費用", description: "決算時に、売掛金などの将来の貸倒見込額を貸倒引当金へ追加する費用です。" },
  { name: "貸倒損失", type: "費用", description: "売掛金などが回収不能となり、損失として処理する金額です。" },
  { name: "減価償却費", type: "費用", description: "固定資産の取得原価を、使用する期間に分けて費用配分した当期分です。" },
  { name: "固定資産売却損", type: "費用", description: "固定資産を帳簿価額より安く売却したときに生じる損失です。" },
  { name: "雑損", type: "費用", description: "現金過不足など、少額で他の勘定科目に当てはまらない損失です。" },
  { name: "法人税、住民税及び事業税", type: "費用", description: "当期の所得などに対して会社が負担する法人税・住民税・事業税です。" },

  { name: "売上", type: "収益", description: "商品を販売したことによって得た代金です。" },
  { name: "受取手数料", type: "収益", description: "仲介やサービスの提供などにより受け取る手数料です。" },
  { name: "受取利息", type: "収益", description: "預金や貸付金などから受け取る利息です。" },
  { name: "受取家賃", type: "収益", description: "建物や部屋などを貸すことによって受け取る賃貸料です。" },
  { name: "償却債権取立益", type: "収益", description: "以前に貸倒れとして処理した売掛金などを、後になって回収できたときの収益です。" },
  { name: "固定資産売却益", type: "収益", description: "固定資産を帳簿価額より高く売却したときに生じる利益です。" },
  { name: "雑益", type: "収益", description: "現金過不足など、少額で他の勘定科目に当てはまらない利益です。" },

  { name: "損益", type: "その他", description: "決算時に収益と費用を集め、当期純利益または当期純損失を計算するための勘定科目です。" },
  { name: "現金過不足", type: "その他", description: "実際の現金残高と帳簿残高が一致しないとき、原因が判明するまで一時的に処理する勘定科目です。" },
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
  const [showExplanation, setShowExplanation] = useState(false);

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
    setShowExplanation(false);
    setSelected(null);
    setIndex((currentIndex) => getRandomIndex(currentIndex));
  };

  const openExplanation = () => {
    if (!selected) return;
    setShowExplanation(true);
  };

  const handleResultKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!selected) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setShowExplanation(true);
    }
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
          } ${selected ? "result-panel-clickable" : ""}`}
          onClick={openExplanation}
          onKeyDown={handleResultKeyDown}
          role={selected ? "button" : undefined}
          tabIndex={selected ? 0 : -1}
          aria-label={
            selected
              ? `判定結果。${current.name}の解説を表示`
              : "判定結果"
          }
        >
          <span className="result-label">判定：</span>

          <span className="result-mark">
            {selected ? (isCorrect ? "○" : "×") : "—"}
          </span>

          {selected && (
            <>
              <span className="result-answer">
                {isCorrect ? current.type : `正解：${current.type}`}
              </span>
              <span className="result-hint">タップで解説</span>
            </>
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
        <div className="app-version">Ver.1.2.0</div>
      </section>

      {showExplanation && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setShowExplanation(false)}
        >
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="explanation-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="explanation-title" className="modal-title">
              {current.name}
            </h2>

            <p className="modal-description">{current.description}</p>

            <button
              type="button"
              className="modal-close-button"
              onClick={() => setShowExplanation(false)}
            >
              閉じる
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
