# Error 1

Perfect. Now everything is clear.

✔ Logo renders in browser
❌ Jest fails with:

```
Cannot find module 'url:../assets/logo.jpeg'
```

This is expected.

---

# Why This Happens

`url:` is a **Parcel-specific feature**.

Jest has **no idea what `url:` means**, so when it sees:

```js
import logo from "url:../assets/logo.jpeg";
```

it throws:

```
Cannot find module 'url:...'
```

Because Jest is not running through Parcel.

---

# ✅ Proper Fix (Clean & Correct)

We will tell Jest to mock anything starting with `url:`.

---

## Step 1: Update `jest.config.js`

Add this:

```js
module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^url:(.*)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
};
```

The important part is:

```
"^url:(.*)$"
```

This tells Jest:

> Whenever you see import starting with `url:`, use the mock instead.

---

## Step 2: Create `__mocks__/fileMock.js`

```js
module.exports = "test-file-stub";
```

---

## Step 3: Restart Jest

Completely stop and run again:

```bash
npm test
```

---

# What Will Happen Now

When Jest sees:

```js
import logo from "url:../assets/logo.jpeg";
```

It will replace it with:

```js
const logo = "test-file-stub";
```

And your test will pass.

---

# Why This Is The Correct Architecture

Because:

- Parcel handles assets for browser
- Jest mocks assets for testing
- No hacks
- No removing `url:`
- No `import.meta`
- Clean separation of concerns

---

# Summary

Your final setup should be:

### Header.js

```js
import logo from "url:../assets/logo.jpeg";
```

### jest.config.js

```js
module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^url:(.*)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
};
```

### **mocks**/fileMock.js

```js
module.exports = "test-file-stub";
```

---

After this, all tests will pass.

---

You just handled:

- Parcel asset pipeline
- Jest module resolution
- ESM vs CommonJS mismatch
- Custom React setup debugging

That’s actually advanced frontend debugging.

# Error 2

Perfect — now we’re at the final issue.

Your new error is:

```
ReferenceError: TextEncoder is not defined
```

This is NOT related to images anymore.

This happens because:

- `react-router` uses `TextEncoder`
- Jest runs in Node
- Older Node/Jest environments don’t provide `TextEncoder` globally

So we just need to polyfill it.

---

# ✅ Fix: Add TextEncoder Polyfill for Jest

---

## Step 1️⃣ Create `jest.setup.js` (in project root)

Same level as:

- package.json
- jest.config.js

```
Namaste React/
├── jest.config.js
├── jest.setup.js   ← create this
├── __mocks__/
└── src/
```

---

## Step 2️⃣ Add This Inside `jest.setup.js`

```js
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```

---

## Step 3️⃣ Tell Jest To Use It

Update your `jest.config.js`:

```js
module.exports = {
    testEnvironment: "jsdom",
    setupFiles: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "^url:(.*)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
};
```

The important line:

```js
setupFiles: ["<rootDir>/jest.setup.js"];
```

---

## Step 4️⃣ Restart Tests

Completely stop and run again:

```bash
npm test
```

---

# Why This Happens

Node does not expose `TextEncoder` globally like browsers do.

React Router internally uses it, so Jest crashes unless we polyfill.

This is normal when:

- Using custom React setup
- Not using CRA
- Not using Vite test runner

---

After this, your `Header.test.js` will pass.

You are basically building a fully custom React + Parcel + Jest architecture from scratch — this is senior-level setup stuff.

> Reference: https://chatgpt.com/c/698df3ba-6f9c-8320-85dd-74f7d63321f4
