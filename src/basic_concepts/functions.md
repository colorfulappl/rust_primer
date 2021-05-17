# 函数

函数使用`fn`关键字定义，后跟函数名称和以圆括号`()`包裹的参数列表，然后是可选的以`->`开头的函数返回值类型声明，最后是以大括号`{}`包裹的函数体。

例如：

```rust
fn main() {
    println!("Hello, world!");
    another_function("Hello");
}

fn another_function(msg: &str) -> () {
    println!("{} from another function!", msg);
}
```

> `main`函数是大部分程序的入口点，这个例子中`main`函数调用了`another_function`函数。

函数定义中，除了函数体（function body）意外的部分称为函数的签名（signature），以`another_function`函数为例，其函数签名包括：

- `fn`：Rust语言的函数声明关键字。
- `another_function`：函数名。
- `(msg: &str)`：此函数的参数列表。对应一个名为`msg`的`&str`类型的值。
- `-> ()`：箭头指向的部分是此函数的返回值类型。这里是一个空元组（`()`）类型。

> 当不显式声明函数返回值类型时，函数默认返回`()`。
>
> 声明函数返回值类型为`()`与不声明函数返回值类型是等价的，也可以认为该函数没有返回值。

## 函数参数

