# 控制流

根据条件是否为真来决定是否执行某些代码，以及根据条件是否为真来重复运行一段代码是大部分编程语言的基本组成部分。这些控制流结构主要为分支语句和循环。

## `if`表达式

`if` 表达式的结构为：

- **`if`关键字**、**条件表达式**和该条件表达式为`true`时执行的**代码块**。

- 任意数量的 **`else if` 关键字**、**条件表达式**和该条件表达式为`true`时执行的**代码块**。

- 可选的 **`else`关键字**以及当前面所有条件表达式为`false`时执行的**代码块**。

> 条件表达式的类型必须为 `bool`。

```rust
#[derive(PartialEq)]
enum Week {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

fn work(day: Week) {
    if day == Week::Saturday {
        println!("Relax and have fun!");
    }
    else if day == Week::Sunday {
        println!("No need to work!");
    }
    else {
        println!("Work days.");
    }
}

fn main() {
    work(Week::Saturday);
    // #Relax and have fun!

    work(Week::Sunday);
    // #No need to work!

    work(Week::Monday);
    // #Work days.
}
```

### 在`let`语句中使用`if`

因为 `if` 是一个表达式，所以我们可以在 `let` 语句的右侧使用它，例如：

```rust
let condition = true;
let number = if condition {
    5
} else {
    6
};

println!("The value of number is: {}", number);
```

 需要注意的是，`if` 表达式所有分支的返回值类型必须相同。

## `loop`循环

`loop` 表达式表示无限循环。 此表达式会连续不断地重复执行其循环体：

```rust,ignore
loop {
    println!("This loops forever.");
}
```

`loop`是一个表达式，可以通过`break`返回值：

```rust
let mut i = 1;
let number = loop {
    i *= 2;
    if i > 1000 {
        break i;
    }
};

println!("The smallest power of 2 greater than 1000 is {}", number);
```

## `while`循环

`while`表达式会在每次循环时判断条件表达式的值。如果值为`true`，则执行循环体，然后进入下一次循环；如果值为`false`，循环体不会被执行，`while`表达式执行结束。

例如：

```rust
let mut num = 3;

while num > 0 {
    println!("{}!", num);
    
    num = num - 1;
}

println!("LIFTOFF!!!");
```

## `for`循环

`for` 表达式从迭代器中依次提取值。 此表达式会持续循环，直到迭代器变空为止。

我们可以调用数组的`.iter()`方法来生成迭代器，例如：

```rust
let a = [10, 20, 30, 40, 50];

for element in a.iter() {
    println!("the value is: {}", element);
}
```

这段代码循环访问数组中的每个元素，并将元素绑定到 `element` 变量。 然后，`println!` 宏按顺序输出每个值。

Rust提供了一个语法糖来快速地创建一连串数字的迭代器：范围（`Range`）表示法`a..b`。此表示法会生成 `a`（包含）到 `b`（不包含）的值，步长为1。

前面的`while`循环用`for`循环可以简化为：

```rust
for num in (1..4).rev() {
    println!("{}!", num);
}

println!("LIFTOFF!!!");
```

`rev()`方法用于将range逆序。这段代码依次循环访问数字3、2、1，并将这些数字绑定到此循环每个周期的`num`变量。
