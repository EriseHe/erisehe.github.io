---
bookCollapseSection: true
tags: 
title: 热方程
weight: "1"
---
The general form of *heat equation* (diffusion equation) is represented as

$$
u_t-k\Delta u=0 
$$

where $x\in U$ for $U \in \R^n$ (n-dimentional) *s.t* we have $u:\bar{U} \times [0,\infty) \to \R$.

- $k$ is the thermal diffusivity of the material.
- prototype of parabolic PDEs
- normalized heat equation where $k=1$ is specified for theoretical studies (focusing on mathematical analysis)

For  1-dimentional special case:

$$
u_t-ku_{xx}=0
$$

where $\{x,t\in(-\infty,\infty), [0, \infty)\}$.

---

# Lecture 10

> 下面的排序是按照推导热方程解析解的顺序来的。
> 

基本思路：

我们先通过[标度不变性](https://wiki.swarma.org/index.php/%E6%A0%87%E5%BA%A6%E4%B8%8D%E5%8F%98%E6%80%A7)（scale invariance）找到一个所有解通用的形式，并且嵌入原方程进行运算。

最终，我们得到一维的：

### 10.1 热传导方程的基本解

[The Fundamental Solution to Heat Equation](https://www.notion.so/The-Fundamental-Solution-to-Heat-Equation-c979713395ed4ebea34d1c706ee2d889?pvs=21)

$$
\Phi(x,t)=\frac{1}{\sqrt{4\pi k t}} e^{-\frac{x^2}{4kt}}
$$

### 10.1.1 正态分布函数的属性

以及与它作为一个正态分布函数的属性：

[Properties of The Fundamental Solution](https://www.notion.so/Properties-of-The-Fundamental-Solution-f2ba867d371f458db60bbd76310da768?pvs=21)

### 10.2 对于柯西问题的解

接着，我们再用过平移不变性 **（**translation invariance）和卷积来进一步确定柯西问题（$t=0$）的解。

[The Solution to Cauchy Problem](https://www.notion.so/The-Solution-to-Cauchy-Problem-a747750098f24befb46dfbd6a0ab9dc0?pvs=21)

$$
u(x,t) = \frac{1}{(4\pi k t)^{1/2}} \int^{+\infty}_{-\infty} e^{-\frac{(x-y)^2}{4kt}} g(y) \, dy
$$

并且可以用**误差函数**来表示这个解

$$
u(x, t) = \lim_{x \to \infty} \text{erf}(x\sqrt{4\pi kt})
$$

---

# Lecture 11

### 11.1 三种不同的边界条件

[Different Types of Boundary Conditions](https://www.notion.so/Different-Types-of-Boundary-Conditions-928ab79bba02404380990a0ea1b09a6a?pvs=21)

### 11.2 **分离变量法**

[Separation of Variables ](https://www.notion.so/Separation-of-Variables-fb4207f9b54f48fa908b8596ec740ea4?pvs=21)

# Lecture 12

### 12.1 傅里叶展开和变换

[The Fourier Series](https://www.notion.so/The-Fourier-Series-b827da146c26439faa7de6c5f02f3252?pvs=21)

# Lecture 13

### 13.1 热传导公式解

[The Fourier Expansion for Heat Equation Solution](https://www.notion.so/The-Fourier-Expansion-for-Heat-Equation-Solution-633f027381814d94808c5db5740a6290?pvs=21)

### 13.2 Dirichlet问题的解

[Non-Homogenous **Dirichlet problem**](https://www.notion.so/Non-Homogenous-Dirichlet-problem-cf184b1df9fe4bda959d43b0ab0c7539?pvs=21)

# Lecture 14

### 14.1 解的唯一性

[Uniqueness of Solution](https://www.notion.so/Uniqueness-of-Solution-f1a7276a11d44e599a73b439d594cba3?pvs=21)

### 14.2 电梯方程

[Lifting Function](https://www.notion.so/Lifting-Function-b6c28d3a69e54ffabbd44d2262ec987a?pvs=21)

<aside>
💡 the transformed coefficient is defined as

$$
\hat \mu =\dfrac{\mu}{(b-a)^2}
$$

</aside>

# Lecture 15

### 15.1 **施图姆-刘维尔理论**

[**Sturm Liouville Theory (SLE)**](https://www.notion.so/Sturm-Liouville-Theory-SLE-9b308a8f68014dc9ae22fcd5a0d6883a?pvs=21)

# Lecture 16

### 16.1 **极大值原理**

[The Principle of Maximum](https://www.notion.so/The-Principle-of-Maximum-5195d38f3d9d48a18f0ab8fb23c51b32?pvs=21)