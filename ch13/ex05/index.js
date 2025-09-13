/* eslint-disable @typescript-eslint/no-unused-vars */
function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

function g1() {
  // then チェーンに変更。
  return wait(1000).then(() => {
    console.log("A");
    return wait(2000);
  })
  .then(() => {
    console.log("B");
    return wait(3000);
  })
  .then(() => {
    console.log("C");
  });
}

function g2() {
  // チェーン自体がPromiseなのでnew Promiseは不要。
  return wait(1000)
      .then(() => console.log("A"))
      .then(() => wait(2000))
      .then(() => console.log("B"))
      .then(() => wait(3000))
      .then(() => console.log("C"))
}

function g3() {
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  // 中間結果をチェーンの引数で引き継ぐ。
  return fetchUser().then((user) =>
    fetchUserFriends(user).then((friends) => {
      console.log(`${user.name} has ${friends.length} friends!`);
    })
  );
}

function g4() {
  function someFunction() {
    return 42;
  }

  // 値をPromise.resolveでラップして返す
  return Promise.resolve(someFunction());
}