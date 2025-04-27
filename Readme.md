# 📚 Testing with Mocha, Chai, Supertest, and Sinon

## 1. What is Mocha?

- **Mocha** is a **test runner**.
- It runs your test files and shows whether your code passed or failed.
- You don't need to manually import Mocha — when you run `npx mocha` or `mocha`, it automatically provides functions like `describe`, `it`, `before`, `after`, etc., globally.

---

## 2. What is Chai?

- **Chai** is an **assertion library**.
- It provides easy ways to check if your code's output is correct ("I expect this to be true").

### Chai Assertion Styles:

| Style      | Description                                                         | Example                  |
| :--------- | :------------------------------------------------------------------ | :----------------------- |
| **Assert** | Traditional style (similar to Node's built-in assert)               | `assert.equal(a, b);`    |
| **Expect** | Natural English style, very popular                                 | `expect(a).to.equal(b);` |
| **Should** | Extends all objects with `.should` (not recommended for TypeScript) | `a.should.equal(b);`     |

✅ **Expect** style is the most commonly used because it’s clean, readable, and works well with most setups.

---

## 3. Mocha Hooks

Mocha provides **hooks** to manage setup and teardown in your tests:

| Hook           | When it runs                                      | Purpose                                     |
| :------------- | :------------------------------------------------ | :------------------------------------------ |
| `before()`     | Once before all tests in a `describe` block       | Setup resources/configurations              |
| `beforeEach()` | Before each individual test in a `describe` block | Reset state/setup fresh instances           |
| `after()`      | Once after all tests in a `describe` block        | Cleanup resources (e.g., close connections) |
| `afterEach()`  | After each individual test in a `describe` block  | Cleanup/reset state after each test         |

> ⚡ Hooks must be placed **inside** the `describe()` block to be executed properly.

---

## 4. Mocha Structure

| Function     | Purpose                        |
| :----------- | :----------------------------- |
| `describe()` | Groups related tests together. |
| `it()`       | Defines a single test case.    |

---

## 5. What is Supertest?

- **Supertest** is a **library to test HTTP APIs**.
- It lets you send HTTP requests (`GET`, `POST`, etc.) to your server and check the responses.

> 🛑 You **don’t need to start** the actual server (`app.listen()`) when using Supertest.  
> 🛠️ You only need the Express app object (`const app = express()`), and Supertest simulates HTTP requests **directly in memory**.

---

## 6. What is Mocking? (with Sinon)

- A **mock** is a **fake version** of a function, database, API, etc., used to simulate behavior without relying on real external systems.
- **Sinon** is a library that helps create **spies**, **stubs**, and **mocks** easily.

### Sinon Tools:

| Tool     | What it does                                                           | Tracks                                     | Modifies Behavior | Use When                                                                                                |
| :------- | :--------------------------------------------------------------------- | :----------------------------------------- | :---------------- | :------------------------------------------------------------------------------------------------------ |
| **Spy**  | Observes function calls without altering behavior                      | ✅ Calls, arguments, return values, errors | ❌ No             | You want to monitor if a function was called and how                                                    |
| **Stub** | Replaces the function’s behavior (simulate returns/errors)             | ✅ (but focus is on replacing behavior)    | ✅ Yes            | You need to control how a function behaves (e.g., simulate an API response)                             |
| **Mock** | Sets expectations for function behavior (call count, arguments, order) | ✅ Tracks and verifies expectations        | ✅ Yes            | You want to assert that a function was called with specific arguments, a specific number of times, etc. |

---

# ✅ Conclusion

- **Mocha** runs the tests.
- **Chai** asserts the expected results.
- **Supertest** tests HTTP APIs without running a real server.
- **Sinon** mocks, stubs, and spies to fake behaviors and interactions.

---
