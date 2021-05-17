# Rust Primer

![](https://travis-ci.com/colorfulappl/rust_primer.svg)

Rust入门教程。

---

本书使用 [mdbook]([rust-lang/mdBook: Create book from markdown files. Like Gitbook but implemented in Rust (github.com)](https://github.com/rust-lang/mdBook)) 编写。主要参考了微软的 [Take your first steps with Rust](https://docs.microsoft.com/zh-cn/learn/paths/rust-first-steps/)、Rust官方提供的 [The Rust Programming Language](https://doc.rust-lang.org/book/)、以及张汉东老师的《Rust编程之道》。

## 在线查看

[Github Pages](https://colorfulappl.github.io/rust_primer/)

## 本地编译

### 安装Rust

参考[rustup.rs - The Rust toolchain installer](https://rustup.rs/)

#### Windows

下载并运行[rustup‑init.exe](https://win.rustup.rs/x86_64)。

#### WSL | LInux | macOS

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 安装mdbook

参考[rust-lang/mdBook: Create book from markdown files.](https://github.com/rust-lang/mdBook)

```shell
cargo install mdbook
```

### 下载&编译本书

```shell
git clone https://github.com/colorfulappl/rust_primer.git
cd rust_primer
mdbook serve
```

浏览器打开`http://[::1]:3000`即可查看本书。

