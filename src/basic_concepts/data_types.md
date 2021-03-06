# 基础数据类型

Rust是**静态类型**的语言，编译器需要在编译阶段知道所有变量的类型。

大多数情况下，编译器都可推断出某个变量的类型，无需用户在代码中显式指出。 有时会存在多种数据类型，此时用户便须使用“类型注释（type annotation）”告知编译器必须要使用何种数据类型。

例如，我们编写一个程序，使用字符串的`.parse()`方法将字符串转换为数字。

```rust
let number: u32 = "42".parse().expect("Not a number!");
```

在此示例中，我们直接在变量名后注释了类型`u32`，告诉编译器`number`的类型是无符号32位整数。

如果我们删除该类型注释，编译器无法推断出`parse`结果的类型，会抛出编译错误。

```rust,ignore,does_not_compile
let number = "42".parse().expect("Not a number!");
```

错误：

```shell
error[E0282]: type annotations needed
 --> rust_primer/basic_concepts/data_types.md:18:5
  |
3 | let number = "42".parse().expect("Not a number!");
  |     ^^^^^^ consider giving `number` a type
```

## 标量类型

一个**标量**（scalar）类型代表一个单独的值。

Rust 有四种基本的标量类型：整型（integers）、浮点型（float-point numbers）、布尔类型（Booleans）和字符（characters）类型。

### 整型

**整数** 是一个没有小数部分的数字。有符号整数类型以`i`开头，无符号整数类型以`u`开头。

下表列举了Rust 中内建的整数类型：

| 长度    | 有符号  | 无符号  |
| ------- | ------- | ------- |
| 8-bit   | `i8`    | `u8`    |
| 16-bit  | `i16`   | `u16`   |
| 32-bit  | `i32`   | `u32`   |
| 64-bit  | `i64`   | `u64`   |
| 128-bit | `i128`  | `u128`  |
| arch    | `isize` | `usize` |

`isize` 和 `usize` 类型取决于运行程序的计算机类型：如果使用 64 位体系结构，则为 64 位；如果使用 32 位体系结构，则为 32 位。

可以使用下表中的任何一种形式编写整数字面值（literals）。注意除 Byte 以外的所有数字字面值都允许使用类型后缀，例如 `57u8`，同时也允许使用 `_` 做为分隔符以方便读数，例如`1_000`。

| 数字字面值                   | 例子          |
| ---------------------------- | ------------- |
| Decimal（十进制）            | `98_222`      |
| Hex（十六进制）              | `0xff`        |
| Octal（八进制）              | `0o77`        |
| Binary（二进制）             | `0b1111_0000` |
| Byte（单字节字符）(仅限`u8`) | `b'A'`        |

### 浮点型

Rust有两个原生的浮点类型：`f32`和`f64`。

浮点数采用 IEEE-754 标准表示。`f32` 是单精度浮点数，`f64` 是双精度浮点数。

现代的CPU处理32位和64位浮点数的速度几乎一致，但64位浮点数精度更高，因此Rust中默认的浮点类型为`f64`。

例如：

```rust
let x = 2.0; // f64

let y: f32 = 3.0; // f32
```

### 数值运算

Rust 中的所有数字类型都支持基本数学运算：加法、减法、乘法、除法和取余等。

例如：

```rust
// 加法
println!("1 + 2 = {}", 1u32 + 2);

// 减法
println!("1 - 2 = {}", 1i32 - 2);
// ^ 尝试将`1i32`改为`1u32`，观察类型声明为何重要

// 整数除法
println!("9 / 2 = {}", 9u32 / 2);

// 浮点数除法
println!("9 / 2 = {}", 9.0 / 2.0);

// 乘法
println!("3 * 6 = {}", 3 * 6)
```

> 我们对文本数字使用后缀来告诉 Rust 这些数字是哪种数据类型（例如，`1u32` 是作为无符号的 32 位整数的数字 1）。 如果我们不提供这些类型注释，Rust 会尝试从上下文中推断类型，当类型不明确时，默认为 `i32`。

### 布尔型

布尔类型使用`bool`表示，其只有两个可能的值：`true`和`false`。

```rust
let t = true;

let f: bool = false; // 显式指定类型
```

使用布尔值的主要场景是条件表达式，例如 `if` 表达式。

### 字符型

`char` 类型是Rust中原生的字母类型，并由单引号指定。

例如：

```rust
let c = 'z';
let z = 'ℤ';
let heart_eyed_cat = '😻';
```

`char` 类型的大小为4个字节，代表了一个 Unicode 标量值，这意味着它可以比 ASCII 表示更大的字符集。在 Rust 中，注音字母（accented letters）、中文、日文、韩文、emoji以及零长度的空白字符等都是有效的 `char` 值。Unicode 标量值包含从 `U+0000` 到 `U+D7FF` 和 `U+E000` 到 `U+10FFFF` 在内的值。

## 复合类型

**复合类型**（compound types）可以将多个值组合成一个类型。Rust 有两个原生的复合类型：元组（tuple）和数组（array）。

### 元组

元组可以将多个不同类型的值组合成一个复合类型。**元组的长度固定**：一旦声明，其长度不能增大或减小。

我们使用包含在圆括号中的逗号分隔的值列表来创建元组。元组中的每一个位置都有一个类型，这些类型可以不同。

下面的例子使用了可选的类型注释：

```rust
let tup: (i32, f64, char) = (100, 6.4, 'c');
```

#### 访问元组元素

`tup`变量绑定到整个元组，如果要访问元组的某个值，可以使用点号（`.`）加上值的索引。

例如：

```rust
let tup: (i32, f64, char) = (100, 6.4, 'c');

println!("1st element: {}", tup.0);

println!("2nd element: {}", tup.1);

println!("3rd element: {}", tup.2);
```

也可以使用模式匹配（pattern matching）来解构（destructure）一个元组，例如：

```rust
let tup: (i32, f64, char) = (100, 6.4, 'c');

let (x, y, z) = tup; // 解构元组tup

println!("1st element: {}", x);

println!("2nd element: {}", y);

println!("3rd element: {}", z);
```

### 数组

数组也可以包含多个值，但是与元组不同，数组中的每个元素的类型必须相同。**数组的长度也是固定的**。

我们使用包含在中括号中的逗号分隔的值列表来创建元组。

```rust
let arr = [1, 2, 3, 4, 5];
```

数组通常用于在栈（stack）而不是堆（heap）上为数据分配空间，或者保有固定数量的元素。

标准库`std`还提供了一个相似的，**可变长**的集合类型`Vec`。

#### 数组的类型

数组的类型声明格式为`[type; length]`，例如：

```rust
let arr: [i32; 5] = [1, 2, 3, 4, 5];
```

#### 数组的初始化

除了直接给定一个序列，数组也可以用`[init_value; length]`的表达式进行初始化，声明一个长度为`length`，每个元素的值为`init_value`的数组，例如：

```rust
let arr = [0; 5];

println!("{:?}", arr);
// #[0, 0, 0, 0, 0]
```

#### 访问数组元素

数组是一整块分配在栈上的内存，可以使用索引来访问数组的元素。

```rust
let arr = [1, 2, 3, 4, 5];

println!("1st element: {}", arr[0]);

println!("2nd element: {}", arr[1]);
```

