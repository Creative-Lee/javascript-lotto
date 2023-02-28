import { $, $$, disableElements, enableElements } from '../utils/dom.js';
import { LOTTO_PRIZE_MONEY, PRIZE_MATCH_COUNT } from '../constants/condition.js';

export default class View {
  onSubmitPurchaseAmount(callback) {
    $('.purchase-amount-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const purchaseAmountInput = e.target.elements['purchase-amount'].value;

      callback(purchaseAmountInput);
    });
  }

  onSubmitWinningLotto(callback) {
    $('.winning-lotto-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const $$winningNumberInputNodeList = e.target.elements['winning-number'];
      const winningNumbersInput = Array.from($$winningNumberInputNodeList, (node) => {
        return node.value.trim();
      });

      const bonusNumberInput = e.target.elements['bonus-number'].value;

      callback({ winningNumbersInput, bonusNumberInput });
    });
  }

  onClickRestartButton(callback) {
    $('.restart-button').addEventListener('click', () => {
      callback();

      this.initLottoQuantity();
      this.initEachLottoNumbers();
      this.initStatistics();
      this.initYieldRatio();

      this.initPurchaseAmountInput();
      this.initWinningLottoInput();

      enableElements(
        $('.purchase-amount-input'),
        $('.purchase-amount-submit-button'),
        ...$$('.winning-number-input'),
        $('.bonus-number-input'),
        $('.winning-lotto-submit-button')
      );

      this.hideElements('.result-modal', '.winning-lotto-form');
    });
  }

  onClickModalCloseButton() {
    $('.modal-close-button').addEventListener('click', () => {
      this.initStatistics();
      enableElements($('.winning-lotto-submit-button'));
      this.hideElements('.result-modal');
    });
  }

  showPurchasedLottoResult(lottoQuantity, eachLottoNumbers) {
    this.printLottoQuantity(lottoQuantity);
    this.printEachLottoNumbers(eachLottoNumbers);

    disableElements($('.purchase-amount-input'), $('.purchase-amount-submit-button'));
    this.showElements('.winning-lotto-form');
  }

  showComparedLottoResult(statistics, yieldRatio) {
    this.printStatistics(statistics);
    this.printYieldRatio(yieldRatio);

    disableElements(
      ...$$('.winning-number-input'),
      $('.bonus-number-input'),
      $('.winning-lotto-submit-button')
    );
    this.showElements('.result-modal');
  }

  printLottoQuantity(quantity) {
    $('.lotto-quantity').innerText = `총 ${quantity}개를 구매하였습니다.`;
  }

  printEachLottoNumbers(eachLottoNumbers) {
    const $target = $('.lotto-numbers-list-wrap');
    const $ul = document.createElement('ul');
    $ul.className = 'lotto-numbers-list';

    eachLottoNumbers.forEach((lottoNumbers) => {
      const $li = document.createElement('li');
      const listContent = `🎟️ ${lottoNumbers.join(', ')}`;

      $li.textContent = listContent;
      $li.className = 'lotto-numbers-list-item';

      $ul.appendChild($li);
    });

    $target.appendChild($ul);
  }

  printStatistics(statistics) {
    const $target = $('.modal-statistics-container');
    const $fragment = document.createDocumentFragment();

    Object.entries(statistics).forEach(([prize, count]) => {
      const $container = document.createElement('div');
      $container.className = 'statistics-container';

      const matchCountDiv = `<div>${PRIZE_MATCH_COUNT[prize]}개</div>`;
      const prizeMoneyDiv = `<div>${LOTTO_PRIZE_MONEY[prize].toLocaleString('ko-KR')}</div>`;
      const prizeCountDiv = `<div>${count}개</div>`;

      if (prize === 'secondPrize') {
        const matchCountDivOfBonus = `<div>${PRIZE_MATCH_COUNT[prize]}개+보너스 볼</div>`;

        $container.innerHTML = `${matchCountDivOfBonus}${prizeMoneyDiv}${prizeCountDiv}`;

        $fragment.appendChild($container);
        return;
      }

      $container.innerHTML = `${matchCountDiv}${prizeMoneyDiv}${prizeCountDiv}`;

      $fragment.appendChild($container);
    });

    $target.appendChild($fragment);
  }

  printYieldRatio(yieldRatio) {
    const yieldRatioText =
      '당신의 총 수익률은 ' + `${yieldRatio.toLocaleString(new Intl.NumberFormat('KRW'))}%입니다.`;

    $('.modal-yield-ratio').innerText = yieldRatioText;
  }

  showElements(...elements) {
    elements.forEach((element) => {
      $(element).classList.remove('hide');
    });
  }

  hideElements(...elements) {
    elements.forEach((element) => {
      $(element).classList.add('hide');
    });
  }

  initLottoQuantity() {
    $('.lotto-quantity').innerText = '';
  }

  initEachLottoNumbers() {
    const $target = $('.lotto-numbers-list-wrap');

    $target.removeChild($target.firstChild);
  }

  initStatistics() {
    const $target = $('.modal-statistics-container');
    const $titleContainer = $target.firstChild;

    while ($target.hasChildNodes()) {
      $target.removeChild($target.firstChild);
    }

    $target.appendChild($titleContainer);
  }

  initYieldRatio() {
    $('.modal-yield-ratio').innerText = '';
  }

  initPurchaseAmountInput() {
    $('.purchase-amount-form').reset();
  }

  initWinningLottoInput() {
    $('.winning-lotto-form').reset();
  }

  showAlert(message) {
    alert(message);
  }
}
