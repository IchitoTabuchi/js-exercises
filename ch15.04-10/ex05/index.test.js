import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from '@jest/globals';

describe('<inline-circle> attributeChangedCallback', () => {
  let dom;
  let originalGlobals;

  // テスト用に JSDOM を用いてブラウザ互換の環境を構築
  beforeAll(async () => {
    const { JSDOM } = await import('jsdom');
    dom = new JSDOM('<!doctype html><html><body></body></html>', {
      url: 'http://localhost',
    });

    // オリジナルのグローバルオブジェクトを保存
    originalGlobals = {
      window: global.window,
      document: global.document,
      HTMLElement: global.HTMLElement,
      customElements: global.customElements,
    };

    // グローバルオブジェクトを JSDOM のものに差し替え
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.customElements = dom.window.customElements;

    // テスト対象のカスタム要素を読み込む
    await import('./index.js');
  });

  // テスト完了後は元のグローバルオブジェクトを復元
  afterAll(() => {
    dom?.window.close();
    if (originalGlobals.window === undefined) delete global.window;
    else global.window = originalGlobals.window;
    if (originalGlobals.document === undefined) delete global.document;
    else global.document = originalGlobals.document;
    if (originalGlobals.HTMLElement === undefined) delete global.HTMLElement;
    else global.HTMLElement = originalGlobals.HTMLElement;
    if (originalGlobals.customElements === undefined)
      delete global.customElements;
    else global.customElements = originalGlobals.customElements;
  });

  // 各テストケース間で初期化
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // inline-circle を生成して DOM に追加するためのヘルパー
  function createCircle() {
    const element = document.createElement('inline-circle');
    document.body.appendChild(element);
    return element;
  }

  it('接続時にデフォルトスタイルが適用されること', () => {
    // 属性を何も指定せずに要素を生成し、DOM に接続する
    const element = createCircle();

    // connectedCallback が設定するデフォルトスタイルが反映されていること
    expect(element.style.display).toBe('inline-block');
    expect(element.style.borderStyle).toBe('solid');
    expect(element.style.borderWidth).toBe('1px');
    expect(element.style.borderColor).toBe('black');
    expect(element.style.borderRadius).toBe('50%');
    expect(element.style.width).toBe('0.8em');
    expect(element.style.height).toBe('0.8em');
  });

  it('diameter 属性の変更で幅・高さが連動して更新されること', () => {
    // diameter 属性を変更
    const element = createCircle();
    element.setAttribute('diameter', '24px');

    // width / height が新しい値で上書きされていること
    expect(element.style.width).toBe('24px');
    expect(element.style.height).toBe('24px');
  });

  it('color 属性の変更で背景色が更新されること', () => {
    // color 属性を変更
    const element = createCircle();
    element.setAttribute('color', 'rgb(0, 0, 255)');

    // backgroundColor が新しい値で上書きされていること
    expect(element.style.backgroundColor).toBe('rgb(0, 0, 255)');
  });

  it('border 系属性の変更で境界線スタイルが更新されること', () => {
    // 各種 border 系属性を変更
    const element = createCircle();
    element.setAttribute('border-color', 'blue');
    element.setAttribute('border-width', '3px');
    element.setAttribute('border-style', 'dashed');

    // 境界線の style が新しい値で変更されていること
    expect(element.style.borderColor).toBe('blue');
    expect(element.style.borderWidth).toBe('3px');
    expect(element.style.borderStyle).toBe('dashed');
  });

  it('プロパティ setter が属性変更と同等に機能する', () => {
    // JavaScript のプロパティ経由で値を設定する
    const element = createCircle();
    element.diameter = '40px';
    element.color = 'green';
    element.borderColor = 'orange';
    element.borderWidth = '5px';
    element.borderStyle = 'double';

    // setter が内部で setAttribute を呼び出し、 style が更新されていること
    expect(element.style.width).toBe('40px');
    expect(element.style.height).toBe('40px');
    expect(element.style.backgroundColor).toBe('green');
    expect(element.style.borderColor).toBe('orange');
    expect(element.style.borderWidth).toBe('5px');
    expect(element.style.borderStyle).toBe('double');
  });

  it('プロパティ getter が現在の属性値を返すこと', () => {
    // 属性を適当な値に変更
    const element = createCircle();
    element.setAttribute('diameter', '60px');
    element.setAttribute('color', 'purple');
    element.setAttribute('border-color', 'cyan');
    element.setAttribute('border-width', '6px');
    element.setAttribute('border-style', 'groove');

    // getter が DOM 上の属性値をそのまま返すこと
    expect(element.diameter).toBe('60px');
    expect(element.color).toBe('purple');
    expect(element.borderColor).toBe('cyan');
    expect(element.borderWidth).toBe('6px');
    expect(element.borderStyle).toBe('groove');
  });

  it('observedAttributes が監視対象の属性一覧を正しく返すこと', () => {
    // customElements から inline-circle クラスを取得
    const InlineCircle = customElements.get('inline-circle');

    // static getter observedAttributes の戻り値が正しいこと
    expect(InlineCircle.observedAttributes).toEqual([
      'diameter',
      'color',
      'border-color',
      'border-width',
      'border-style',
    ]);
  });
});
