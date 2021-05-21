# 所有权

## 什么是所有权？

Rust 的核心功能之一是 **所有权**（ownership）系统。所有权系统是在编译时对程序进行分析的一组规则，其不会带来运行时的开销。

一些早期的语言中（例如C），程序员必须亲自分配和释放内存；一些语言（例如Java、Python）具有垃圾回收机制，垃圾回收器（garbage collector）会在程序运行时不断地寻找不再使用的内存并释放。Rust使用了第三种方式：通过所有权（ownership）系统管理内存，通过编译时对程序的分析，在适当的位置插入释放内存的代码，来自动地回收内存。

## 所有权规则

所有权规则包括以下三点：

1. Rust 中的每一个值都有一个被称为其 **所有者**（owner）的变量。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃（`drop`）。

## 变量作用域

当一个变量被定义后，其仅在特定的作用域（scope）内有效。

大括号`{}`包裹的代码块会打开一个新的作用域，例如：

```rust
{
    // s 在这里及之前都无效, 它尚未被声明
    let s = "Valid or not?"; // 从此处起，s有效
    // 使用s
} // 此作用域结束，s不再有效
```

从声明该变量的点开始，到该作用域的末尾，变量都是有效的。

## 变量的丢弃

在Rust中，只要变量超出其作用域范围，它就会被丢弃（`drop`）。丢弃变量意味着释放与其关联的所有资源。对于文件变量，这意味着关闭文件；对于套接字（socket）变量，这意味着断开连接；对于已分配与其关联的内存的变量，这意味着释放该内存。

`String`类型在堆上分配内存并存储字符串，下面的例子中，当`mascot`超出作用域，其绑定的`String`被丢弃，`String`拥有的内存也会被释放：

```rust
{
    let mascot = String::from("ferris");
    // 变量mascot在这里被丢弃，String的内存也会被释放
}
```

## 所有权的转移

有时候，我们需要将某个值的所有权从一个变量转移到另一个变量，例如：

```rust
{
    let mascot = String::from("ferris");
    // 将mascot对String的所有权转移到ferris
    let ferris = mascot;
    // ferris在这里被丢弃，Sting的内存也被释放
}
```

在Rust中，所有权的转移被称为**移动**（`move`）。在上面的示例中，`String`值从`mascot`转移到了`ferris`。

需要注意的是，所有权一旦转移，旧的变量将不再有效。在上面的示例中，当`mascor`**移动**到`ferris`之后，就无法再使用`mascot`变量了：

```rust,ignore,does_not_compile
{
    let mascot = String::from("ferris");
    let ferris = mascot;

    // 在此处尝试使用mascot，会导致编译错误
    println!("{}", mascot)
}
```

编译器输出错误信息：

```shell
error[E0382]: borrow of moved value: `mascot`
 --> memory_management/ownership.md:69:20
  |
4 |     let mascot = String::from("ferris");
  |         ------ move occurs because `mascot` has type `String`, which does not implement the `Copy` trait
5 |     let ferris = mascot;
  |                  ------ value moved here
...
8 |     println!("{}", mascot)
  |                    ^^^^^^ value borrowed here after move

```

**移动**语义有些类似于其它语言中的**浅拷贝**（shallow copy），只有指向数据的*指针*被拷贝了，数据没有发生拷贝。不同的是，**移动**之后，原来的指针不再有效，这保证了所有权规则的第二条：值在任一时刻有且只有一个所有者。

## 数据的克隆

如果确实需要拷贝变量绑定的数据，这类似于其它语言中的**深拷贝**（deep copy），我们可以使用通用的方法`.clone()`。

例如：

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2);
```

这段代码能正常运行，在调用`.clone()`时，`String`在堆上的数据被拷贝了一份，并绑定到了`s2`。

由于对数据的拷贝可能会消耗大量的时间，所以Rust被设计为不会隐式创建数据的“**深拷贝**”。

## `Copy` trait：拷贝而非移动

在前面的例子中，我们需要使用`.clone()`方法显式地拷贝`String`，但是如果换成`i32`类型，例如：

```rust
let x = 5;
let y = x;

println!("x = {}, y = {}", x, y);
```

在这段代码中，我们没有调用`.clone()`，但是`x`依然有效且没有被**移动**到`y`中。

原因是像整型这样的在编译时已知大小的类型被整个存储在栈上，所以可以快速地拷贝其值，Rust没有理由在创建变量 `y` 后使 `x` 无效。换句话说，这里没有深浅拷贝的区别。

如果一个类型拥有`Copy`trait，绑定到该类型值的变量在将其值赋给其他变量后仍然可用。Rust 不允许自身或其任何部分实现了`Drop`trait的类型使用`Copy`trait。

任何简单标量值的组合具有`Copy`trait，不需要分配内存或某种形式资源的类型具有`Copy`trait。以下是一些具有`Copy`trait的类型：

- 所有整数类型，比如 `u32`。
- 布尔类型，`bool`，它的值是 `true` 和 `false`。
- 所有浮点数类型，比如 `f64`。
- 字符类型，`char`。
- 元组，当且仅当其包含的类型也都是 `Copy` 的时候。比如，`(i32, i32)` 是 `Copy` 的，但 `(i32, String)` 就不是。

## 所有权与函数

将值传递给函数时，该值也会发生**移动**或**拷贝**。

例如：

```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域

    takes_ownership(s);             // s 的值移动到函数里，所以到这里不再有效

    let x = 5;                      // x 进入作用域

    makes_copy(x);                  // x 应该移动函数里，但i32具有Copy trait，所以在后面可继续使用x
} // 这里，x先移出了作用域，然后是s
  // 但因为s的值已被移走，所以不会有特殊操作

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string移出作用域并调用`drop`方法，占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer移出作用域，但i32是一个简单标量，所以不会有特殊操作
```

在调用 `takes_ownership` 时`s`发生了**移动**，如果之后再次使用 `s` ，Rust 会抛出一个编译时错误。

在`makes_copy`之后可以继续使用`x`，因为`x`具有`Copy`trait。

## 返回值与作用域

将返回值绑定到变量也会发生**移动**，并且遵循作用域规则。

例如：

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership将返回值绑定到s1，返回值被移动

    let s2 = String::from("hello");     // s2进入作用域

    let s3 = takes_and_gives_back(s2);  // s2被移动到takes_and_gives_back中，该函数返回值移给s3
} // 这里，s3移出作用域并被丢弃
  // s2也移出作用域，但由于已被移走，所以什么也不会发生
  // s1移出作用域并被丢弃

fn gives_ownership() -> String {             // gives_ownership将返回值移动给调用它的函数
    let some_string = String::from("hello"); // some_string进入作用域

    some_string                              // 返回some_string并移出给调用的函数
}

// takes_and_gives_back将传入的符串返回
fn takes_and_gives_back(a_string: String) -> String { // a_string进入作用域
    a_string  // 返回 a_string 并移出给调用的函数
}
```

在`main`函数的结尾，在`gives_ownership`函数中被定义，然后绑定到`s1`的`String`被丢弃；先**移动**到`s2`，最终经由`takes_and_gives_back`函数调用**移动**到`s3`的`String`也被丢弃。
