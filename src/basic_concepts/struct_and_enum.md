# 结构体和枚举量

## 结构体

结构体（`struct`）是一个自定义数据类型，该类型可以命名和包装多个相关的值，从而形成一个有意义的组合。

### 结构体的定义

Rust具有三类结构体：经典结构体（structs）、元组结构体（tuple structs）和类单元结构体（unit-like structs）。

```rust
// 经典结构体
struct Person {
    name: String,
    age: u8,
    active: bool
}

// 元组结构体
struct Point(u32, u32);

// 类单元结构体
struct Unit;
```

- **经典结构体**的每个字段都具有名称和类型。定义后，可以使用字段名访问字段内容，如`struct_n.field1`、`struct_n.field2`等。
- **元组结构体**的字段没有名称。访问字段内容的语法和元组相同，即`struct_n.0`、`struct_n.1`等。

- **类单元结构体**没有字段，类似于`()`，即单元（`unit`）类型。该结构体常常被用于在某个不需要存储数据的类型上实现trait。

### 结构体的实例化

定义一个结构体仅仅声明了结构体的名称和字段，并没有为结构体分配空间。如果要使用结构体存储数据，创建结构体的实例（instance）。

实例化一个结构体时，使用`key: value`键-值对的方式对结构体的**所有**字段赋值，例如：

```rust
# // 经典结构体
# struct Person {
#     name: String,
#     age: u8,
#     active: bool
# }
#
// 实例化经典结构体，为每个字段赋值，字段顺序可以更改
let person1 = Person {
    active: true,
    name: String::from("Bob"),
    age: 22,
};

# // 元组结构体，以定义时指定的顺序为每个字段赋值
# struct Point(u32, u32);
#
// 实例化元组结构体，以定义时指定的顺序为每个字段赋值
let origin = Point(0, 0);

# // 类单元结构体
# struct Unit;
#
// 实例化类单元结构体
let unit = Unit;
```

#### 变量与字段同名时的简写

当遇到变量与字段同名的情况，如下：

```rust
# // 经典结构体
# struct Person {
#     name: String,
#     age: u8,
#     active: bool
# }
#
fn build_person(name: String, age: u8) -> Person {
	Person {
    	active: true,
    	name: name,
	    age: age,
	}
}
```

可以简写为：

```rust
# // 经典结构体
# struct Person {
#     name: String,
#     age: u8,
#     active: bool
# }
#
fn build_person(name: String, age: u8) -> Person {
	Person {
    	active: true,
    	// 此处重复的name和age可以省略
        name,
	    age,
	}
}
```

#### 从其它实例创建新实例

有时我们需要使用旧的实例的大部分值来创建一个新的实例，如下：

```rust
# // 经典结构体
# struct Person {
#     name: String,
#     age: u8,
#     active: bool
# }
#
# // 实例化经典结构体，为每个字段赋值，字段顺序可以更改
# let person1 = Person {
#     active: true,
#     name: String::from("Bob"),
#     age: 22,
# };
#
let inacrive_person = Person {
    active: false,
    name: person1.name,
    age: person1.age,
};
```

可以简写为：

```rust
# // 经典结构体
# struct Person {
#     name: String,
#     age: u8,
#     active: bool
# }
#
# // 实例化经典结构体，为每个字段赋值，字段顺序可以更改
# let person1 = Person {
#     active: true,
#     name: String::from("Bob"),
#     age: 22,
# };
#
let inacrive_person = Person {
    active: false,
	..person1
};
```

`..` 语法指定了剩余未显式设置值的字段应与给定实例对应字段具有相同的值。

## 枚举量

枚举量（`enum`）是一个可以枚举其包含的多个成员（variants）的类型。

同一枚举量中可以内嵌多个不同类型的成员，例如：

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

这个枚举有四个含有不同类型的成员：

- `Quit` 没有关联任何数据。
- `Move` 包含一个匿名结构体。
- `Write` 包含一个 `String`。
- `ChangeColor` 包含三个 `i32`。

我们可以使用`struct`定义与这些枚举量成员相似的数据：

```rust
struct QuitMessage; // 类单元结构体
struct MoveMessage { // 经典结构体
    x: i32,
    y: i32,
}
struct WriteMessage(String); // 元组结构体
struct ChangeColorMessage(i32, i32, i32); // 元组结构体
```

但是，由于枚举量是单独的一个类型，所以我们可以定义形如

```rust
# enum Message {
#     Quit,
#     Move { x: i32, y: i32 },
#     Write(String),
#     ChangeColor(i32, i32, i32),
# }
#
fn process_message(msg: Message) {
    // 处理message的逻辑
}
```

的函数，对枚举量进行处理；而如果我们使用结构体则不能做到这一点，因为结构体都有不同的类型。

<!-- TODO: 考虑是否将Option写在这一节 -->
<!-- https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html -->
<!-- https://kaisery.github.io/trpl-zh-cn/ch06-01-defining-an-enum.html -->

<!-- TODO: 添加练习 -->
<!-- https://docs.microsoft.com/zh-cn/learn/modules/rust-understand-common-concepts/5-exercise-structs-enums -->

