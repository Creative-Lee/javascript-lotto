import LottoGame from '../src/domain/LottoGame.js';
import { LOTTO_CONDITION } from '../src/constants/condition.js';

test(`generateLottoNumbers 메서드는 로또 자릿수(${LOTTO_CONDITION.lottoDigits}) 만큼의 길이를 가진 배열을 반환해야한다.`, () => {
  const lottoGame = new LottoGame();
  const lottoDigits = LOTTO_CONDITION.lottoDigits;

  const lottoNumbers = lottoGame.generateLottoNumbers(lottoDigits);

  expect(lottoNumbers).toHaveLength(lottoDigits);
});

test('makeLotto메서드 1회 실행 시 1개의 로또가 생성되어야 한다.', () => {
  const lottoGame = new LottoGame();

  const lottoNumbersList = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
  ];

  lottoNumbersList.forEach((lottoNumbers) => lottoGame.makeLotto(lottoNumbers));

  const lottoQuantity = lottoGame.getLottoQuantity();
  const processCount = lottoNumbersList.length;

  expect(lottoQuantity).toBe(processCount);
});