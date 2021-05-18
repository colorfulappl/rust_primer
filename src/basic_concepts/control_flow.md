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

`loop` 表达式表示无限循环。 此表达式会连续不断地重复执行其主体：

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

