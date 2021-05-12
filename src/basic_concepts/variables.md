# 创建和使用变量

## 变量的绑定

Rust使用`let`关键字创建变量，这个过程一般被称为绑定（Binding），即在标识符（Identifier）和值（Value）之间创建一个关联关系。

```rust
let num = 10;
println!("num: {}", num);
```

在创建变量时，编译器会自动推导变量类型，我们也可以显示声明变量类型。

```rust
let a = 1; // a的默认类型是i32
let b: u64 = 1; // 显示声明b的类型为u64
```

## 可变性

在Rust中，变量绑定默认**不可变**。

对不可变绑定进行修改会导致编译错误。Rust编译器的所有错误号可以在 [Rust Compiler Error Index](https://doc.rust-lang.org/error-index.html) 查看。

```rust
let num = 10;
num = 20; // error[E0384]: cannot assign twice to immutable variable `num`
println!("num: {}", num);
```

若要对值进行更改，需要用`mut`关键字对变量进行绑定。

```rust
let mut num = 10; // 用mut关键字进行可变绑定
num = 20;
println!("num: {}", num);
```

## 变量的覆盖

使用`let`关键字绑定一个新变量时，如果当前上下文中已经定义过相同的标识符，则旧的标识符会被覆盖（Shadowed）。

每次使用`let`都会创建一个新的变量并覆盖掉上一个变量，因此无需声明变量为`mut`。

```rust
let x = 5;
let x = x + 1;
let x = x * 2;
println!("The value of x is: {}", x);
// #The value of x is: 12
```

另外，我们可以用一个同名却**不同类型**的新变量覆盖旧变量。

```rust
let string = "This is a string."; // 这里string的类型是&str
println!("{:?}", string);
// #"This is a string."

let string = string.len(); // 这里string的类型是usize
println!("{:?}", string);
// #17
```

## 常量

常量使用`const`关键字定义，且在定义时必须声明其类型。

常量定义可以放在任何作用域，包括全局作用域（不在任何函数之内）。

常量值只能是一个常量表达式，不能是任何需要在运行时才能确定的值。

```rust
const PI: f32 = 3.1415926;
```

