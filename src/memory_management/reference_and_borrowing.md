# 引用与借用

引用符号（`&`）允许我们在使用值的时候不获取其所有权。

因此我们可以将如下代码：

```rust
fn main() {
    let s1 = String::from("hello");

    let (s1, len) = calculate_length(s1);
    
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: String) -> (String, usize) { // String的所有权被传入，再传出函数
    let length = s.len();
    
    (s, length)
}
```

简化成：

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize { // 函数只获取了String的引用
    s.len()
} // 这里，s离开了作用域，但因为它并不拥有引用值的所有权，所以什么也不会发生
```

`&s1`语法让我们创建一个指向值`s1`的引用，但是并不拥有它。因为不拥有这个值，当引用离开作用域时其指向的值也不会被丢弃。

这种获取引用作为函数参数的行为被称为**借用**（borrowing）。

由于**借用**不获取值的所有权，所以我们可以对同一个值进行多次**借用**，例如：

```rust
fn print_greeting(message: &String) {
  println!("Greeting: {}", message);
}

fn main() {
  let greeting = String::from("Hello");
  print_greeting(&greeting); // print_greeting的参数类型是&String，并不获取String的所有权，所以我们在此借用greeting
  print_greeting(&greeting); // greeting没有发生移动，我们可以再次使用它
}
```

## 引用的可变性

引用默认是不可变的。如果要改变引用的值，需要在传递引用的时候使用`mut`关键字，例如：

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

首先，`s`在绑定的时候要声明为`mut`，在作为引用传递的时候，也要使用可变引用`&mut s`。

不过，可变引用有一个限制：一个引用的作用域从声明的地方开始一直持续到最后一次使用为止，在同一作用域内的同一值只能有一个可变引用。例如下列的代码将无法编译：

```rust,ignore,does_not_compile
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{}, {}", r1, r2);
```

错误信息如下：

```shell
error[E0499]: cannot borrow `s` as mutable more than once at a time
 --> memory_management/reference_and_borrowing.md:81:10
  |
5 | let r1 = &mut s;
  |          ------ first mutable borrow occurs here
6 | let r2 = &mut s;
  |          ^^^^^^ second mutable borrow occurs here
7 |
8 | println!("{}, {}", r1, r2);
  |                    -- first borrow later used here
```

Rust引入这样的限制的原因是防止数据竞争。

**数据竞争**（data race）类似于竞态条件，它可由这三个行为造成：

- 两个或更多指针同时访问同一数据。
- 至少有一个指针被用来写入数据。
- 没有同步数据访问的机制。

数据竞争会导致未定义行为，难以在运行时追踪，并且难以诊断和修复。Rust 避免了这种情况的发生，因为存在数据竞争的代码无法通过编译检查。

只要不出现在同一作用域内，一个值可能有多个可变引用：

```rust
let mut s = String::from("hello");

{
    let r1 = &mut s;

} // r1在这里离开了作用域，所以我们可以创建一个新的可变引用

let r2 = &mut s;
```

在同一作用域内，对同一个值的可变引用和不可变引用不能同时存在：

```rust,ignore,does_not_compile
let mut s = String::from("hello");

let r1 = &s; // 没问题
let r2 = &s; // 没问题
let r3 = &mut s; // 无法编译

println!("{}, {}, and {}", r1, r2, r3);
```

错误如下：

```shell
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> memory_management/reference_and_borrowing.md:131:10
  |
5 | let r1 = &s; // 没问题
  |          -- immutable borrow occurs here
6 | let r2 = &s; // 没问题
7 | let r3 = &mut s; // 无法编译
  |          ^^^^^^ mutable borrow occurs here
8 |
9 | println!("{}, {}, and {}", r1, r2, r3);
  |                            -- immutable borrow later used here
```

## 引用的规则

在任意时刻，对于特定类型的数据`T`，其可以使用以下的任意一种引用，但是不能同时使用两种：

- 一个或多个不可变引用（`&T`）
- 恰好一个可变引用（`&mut T`）

## 悬挂引用

在有指针的语言中，在释放内存时保留指向它的指针将会产生一个**悬挂指针**（dangling pointer），进而引发安全问题。在 Rust 中，编译器确保引用永远也不会变成悬垂状态：当你拥有一些数据的引用，编译器确保数据不会在其引用之前离开作用域。

我们尝试创建一个悬挂引用：

```rust,ignore,does_not_compile
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // dangle 返回一个字符串的引用
    let s = String::from("hello"); // 创建新字符串s

    &s // 返回字符串s的引用
} // s离开作用域并被丢弃，其内存被释放
  // 再次使用s的引用将会产生悬挂引用
```

 `s` 在 `dangle` 函数内被创建，当 `dangle` 的代码执行完毕后，`s` 将离开作用域并被丢弃。我们尝试返回`s`的引用，这意味着这个引用会指向一个无效的 `String`。

Rust不会编译上述代码，错误如下：

```shell
error[E0106]: missing lifetime specifier
 --> memory_management/reference_and_borrowing.md:170:16
  |
6 | fn dangle() -> &String {
  |                ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
help: consider using the `'static` lifetime
  |
6 | fn dangle() -> &'static String {
  |                ^^^^^^^^
```

