---
title: 傅立叶级数
---

# 1. 傅立叶级数的基本形态

## 1.1 周期

在经历了周期$T$后，重新获得原值的函数为**周期函数：**

$$
\varphi(t+T)=\varphi
$$

## 1.2 正弦型量

正弦型量形如：

> $y(t)=Asin(\omega t+\alpha)$  where $\omega = \cfrac{2\pi}{T}$ is the **frequency.**
> 

Notice that for values $s.t.$:

$$
y_0 = A_0, \ y_1=A_1\sin(\omega t + \alpha_1), \  y_2=A_2\sin(2\omega t + \alpha_2), \ y_3=A_3\sin(3\omega t + \alpha_3) ...
$$

we have frequency as the multiple of the smallest frequency with their period:

$\omega$, $2\omega$, $3\omega$… 

$T$, $\frac{1}{2}T$, $\frac{1}{3}T$… 

![[Fourier Series.png]]

If we add them together, we get…

## 1.3.1 三角级数 - $\varphi(t)$函数

<aside>
💡 **It is possible to represent any periodic function with finite or infinite summations of sin functions:**

$$
\varphi(t)=A_0 + \sum_{n=1}^{\infty}A_n\sin(n\omega t+ \alpha_n)
$$

where $A_n, \alpha_n$ are constants

- $\varphi(t)$可以被分解成无数个**调和震动**
- 每一项称之为**调和素**
- 对$\varphi(t)$进行分解的手法被称之为**调和分析**
</aside>

## 1.3.2 三角级数 - 最终展开式

> 注意ppt里的公式是不一样的换元，$x=\frac{2Lt}{T}$，所以$\frac{\pi}{L}$被抽出来了。这里我们会用正常的逻辑换元推导，等到后面需要计算generic interval，才重新换一个$L$进去***
> 

当我们用$x=\omega t = \frac{2\pi t}{T}$ 来**换元** $s.t.$ $f(x)=\varphi(t) = \varphi(\frac{x}{\omega})$ ，我们用三角正弦公式展开：

$$
\begin{align}f(x)&= A_0 + \sum_{n=1}^{\infty}A_n\sin(nx+ \alpha_n)\\  &=A_0 + \sum_{n=1}^{\infty}A_n(\cos nx\sin \alpha_n+ \sin nx \cos \alpha_n) \\\end{align}
$$

> 正弦公式：$\sin(a+b)=\cos a\sin b + \sin a\cos b$ 展开
> 

$$
f(x)=A_0+\sum_{n=1}^{\infty}[(A_n\sin \alpha_n)\cos nx+ (A_n \cos \alpha_n)\sin nx )]
$$

并令 $A_0=a_0, \ A_n\sin\alpha_n = b_n, \  A_n\cos\alpha_n = b_n$

<aside>
💡 于是我们就有了会有三角级数的**最终展开形态**：

$$
f(x)=a_0 + \sum_{n=1}^{\infty}(a_n\cos nx+ b_n\sin nx)
$$

- **the period for $f$ is $2\pi$** due to our definition of new independent variable $x$
</aside>

# 2. 傅立叶级数的系数

## 2.1 欧拉-傅立叶公式（Euler-Fourier formula）

> 这个是一个18世纪初欧拉使用的系数确定法。后面我们还学了泛函分析的inner product算系数的方法。
> 

Assuming $f(x)$ under $[-\pi,\pi]$ is an integrable function, if we assume Fourier Expansion for $f(x)$ is **true**, then directly we have: 

$$
\begin{align}\int_{-\pi}^{\pi} f(x) \, dx = 2\pi a_0 + \sum_{n=1}^{\infty} \left[ a_n \int_{-\pi}^{\pi} \cos nx \, dx + b_n \int_{-\pi}^{\pi} \sin nx \, dx \right]\end{align}
$$

obviously, the integration for $\cos$  and $\sin$ for $[-\pi,\pi]$ is 0 regardless of the values, so we only left with: 

$$
a_0= \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x) \, dx 
$$

next, if to find the specific value for arbitrary $a_m$ ($m=1,2,3...$), we multiply $(3)$ by $\cos (ma)$ so that the terms we needed wouldn’t cancel out, eventually we reached at: 

$$
a_m= \frac{1}{\pi}\int_{-\pi}^{\pi} f(x) \cos(ma) \, dx 
$$

Similarly, multiply by $\sin(ma)$, we derive:

$$
b_m= \frac{1}{\pi}\int_{-\pi}^{\pi} f(x) \sin(ma) \, dx 
$$

这些公式被称之为**欧拉-傅立叶公式（Euler-Fourier formula），**而他们算出来的数值被称为已给函数的**傅立叶系数（Fourier Coefficient）。**

## 2.2* 狄利克雷积分（**Dirichlet integral**）

> 通过傅立叶展开的一个定点$x=x_0$的性质，获得的重要积分：
> 

$$
s_n(x_0) = \frac{1}{\pi} \int_{0}^{\pi} \left[ f(x_0 + t) + f(x_0 - t) \right] \frac{\sin (n + \frac{1}{2})t }{2 \sin\frac{t}{2}} \, dt

$$

e.x. [https://www.bilibili.com/video/BV1XE411p7ZN/](https://www.bilibili.com/video/BV1XE411p7ZN/)

# 3*. 广义形态的傅立叶级数和系数公式

## 3.1 任意区间的情况

<aside>
💡 We can separate out a $\frac{1}{2}$ from the original $a_0$ coefficient, so the first term becomes a special case for $n=0$.

</aside>

在任意$2L$大小的区间  $(-L,L]$ 上，我们可以使用变换：$x=\frac{Ly}{\pi} (-\pi<y\leq\pi)$ 使得$f(x)\rightarrow f(\frac{Ly}{\pi})$ 。于是，我们根据公式获得：

$$
f\left( \frac{Ly}{\pi} \right) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left( a_n \cos ny + b_n \sin ny \right)
$$

以及其系数：

$$
a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f\left( \frac{y}{\pi} \right) \cos ny \, dy \quad (n = 0, 1, 2, \ldots)
$$

$$

b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f\left( \frac{y}{\pi} \right) \sin ny \, dy \quad (n = 1, 2, \ldots)
$$

当我们重新变换回去，即使得$y = \cfrac{\pi x}{L}$，那么我们就会获得一个广义上的傅立叶展开！

<aside>
💡 The general form of **Fourier Expansion**:

$$
\begin{align}f(x)=\frac{A_0}{2} + \sum_{n=1}^{\infty} \left( A_n \cos \frac{n\pi x}{L} + B_n \sin \frac{n\pi x}{L} \right) \end{align} 
$$

Here, $x$ is no longer the angle, but the integer multiples of $\frac{\pi x}{L}$, such that the **Fourier Coefficient** for generic interval $[-L,L]$ are:

$$
\begin{align} A_n \equiv \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx, \quad n = 0, 1, 2, \ldots 
\\
B_n \equiv \frac{1}{L} \int_{-L}^{L} f(x) \sin\left(\frac{n\pi x}{L}\right) dx, \quad n = 1, 2, 3, \ldots \end{align}

$$

</aside>

## 3.2 菜就多练，给爷展

1. $f(x)=e^{ax}$, $a\neq0$ on the interval of $(-\pi,\pi)$
    
    [答案](https://www.notion.so/2988450b6855433fb47610ada51a5416?pvs=21)
    
2. $f(x)=\frac{\pi-x}{2}$ on the interval of $(0,2\pi)$
    
    [答案](https://www.notion.so/a8c1447c44eb4ae8aab63f06f5f1740d?pvs=21)
    
3. $f(x)=x^2$ on the interval of $[-\pi,\pi]$, expand as cosine series.
    
    [答案](https://www.notion.so/e29abaeb6f4c46068da6808500da7285?pvs=21)
    
4. Two functions ($a$ is assumed to be non-integers):
    1. $f_1(x)=\cos(ax)$ on the interval of $[-\pi,\pi]$, expand as cosine series.
        
        [答案](https://www.notion.so/c043984df343431387116d06e0cafb93?pvs=21)
        
    2. $f_2(x)=\sin(ax)$ on the interval of $(-\pi,\pi)$, expand as sine series.
        
        [答案](https://www.notion.so/8d0eb06f0b394286b1156568923bc95b?pvs=21)
        
5. $f(x)=e^{ax}$, $a\neq0$ on the interval of $(0,\pi)$:
    1. expand as cosine series
    2. expand as sine series
    
    [答案](https://www.notion.so/4b81490b681f426cab8c726e7b93f8a3?pvs=21)
    

# 4. 傅里叶级数的拓扑空间

<aside>
💡 理解傅里叶级数变换的拓扑空间的逻辑是：

**三维空间—— $n$维空间——$\infty$维空间——希尔伯特空间（$L^2$空间）——傅立叶级数——傅立叶变换**

</aside>

## 4.1 $\infty$维欧式空间 - $\R^{\infty}$

### 4.1.1 $n$维空间的定义- $\R^{n}$

范数（Norm）:

$$
N_p(x) = \| x \|_p = \left( |x_1|^p + |x_2|^p + \cdots + |x_n|^p \right)^{\frac{1}{p}}
$$

单位正交向量基（standard orthogonal basis）:

$$
\left\{ \begin{aligned}\vec{e}_1 &= (1, 0, \ldots, 0), \\\vec{e}_2 &= (0, 1, \ldots, 0), \\& \vdots \\\vec{e}_n &= (0, 0, \ldots, 1)\end{aligned}\right.
$$

因此$n$维欧式空间的任何向量可以被直接表达成：

$$
\vec{a} = \sum_{i=1}^{n} a_i \vec{e}_i
$$

### 4.1.2 由此推出$\infty$维空间 - $\R^{\infty}$

同理，当我们有无数个标准基，$\{ \vec{e}_1 , \vec{e}_2 , \vec{e}_3 \ldots\}$，的时候，向量变成了

$$
\vec{a} = \sum_{i=1}^{\infty} a_i \vec{e}_i
$$

- 但是他们依然是**离散的元素**

## 4.2 Hilbert空间

我们需要把离散的元素过度到连续的函数，Hilbert空间：

1. 设定一个向量函数$\vec{f}(x)$
2. 并且存在一组基函数（standard orthogonal functions）
    
    $\{ \vec{\varphi}_1 , \vec{\varphi}_2 , \vec{\varphi}_3 \ldots\}$ $s.t.$ we have 
    
    $$
    \vec{f}(x) = \sum_{i=1}^{\infty} a_i \vec{\varphi_i}(x)
    $$
    

因此，我们在Hilbert空间就有了这样的性质：

<aside>
💡 1. 函数在区间$[a,b]$上的模（norm）：

$$
| f(x) | = \sqrt{\int_a^b f^2(x) \, dx} ;
$$

1. 如果两个函数的正交条件（orthogonality）为其内积（inner product）为零：

$$
\int_{a}^{b} f(x) g(x) \, dx = 0
$$

1. 两者的角的余弦为

$$
\cos(\theta) = \frac{\langle f(x), g(x) \rangle}{| f(x) | \cdot | g(x) |} = \frac{\int f(x)g(x) \, dx}{\sqrt{\int f^2(x) \, dx} \sqrt{\int g^2(x) \, dx}} ;
$$

</aside>

## 4.3 $L^p$ 空间（**Lebesgue Space**）

> 定义：Suppose $f(x)$ is measurable functions on $E\subset R^n$.
> 
> 
> For $0<p<\infty$, we denote:
> 
> $$
> ||f||_p=(\int_E|f(x)|^pdx)^{1/p}
> $$
> 

我们用$L^p(E)$来表示$||f||_p<\infty$的全体函数，称其为$L^p$空间。

其范数（norm）为：

$$
L_p = \| \varphi \|_p = \left( \sum_{i=1}^{n} |\varphi_i|^p \right)^{\frac{1}{p}}, \quad x = (x_1, x_2, \ldots, x_n)
$$

---

$L^p$空间的一些基础属性：

- $L$空间里的每一个函数都是**Lebesgue可积的**
- 空间维度是无穷而且不可数的度量空间（Metric Space）
- Banach空间，或者完备赋范向量空间 (complete normed vector space)
- **当$p=2$，$L^2$变成了一个Hilbert空间，**一个带有**内积**的Banach空间

> A *Hilbert space* is a real or complex inner product space that is also a complete metric space with respect to the distance function induced by the inner product. In every Hilbert Space, we have functions that
> 
> 
> $$
> \langle x, y \rangle = \sum_{k=1}^{n} \overline{x_k} y_k
> $$
> 

$L^2$空间的范数**（norm）**，根据之前的公式，我们可以得知：

$$
\| \varphi \|_2 = \sqrt{ \sum_{i=1}^{n} |\varphi_i|^2 }, \quad x = (x_1, x_2, \ldots, x_n)
$$

p.s. 以（p=2）为例，空间中到原点的欧氏距离为1的点构成了一个球面。

![[L-space-1.png]]
## 4.4 傅里叶级数的正交函数系与规范系

> 定义：if $\int_{a}^{b} \varphi(x) \psi(x) \, dx = 0$ for interval $[a,b]$, then $\varphi(x), \psi(x)$  are orthogonal.
> 

### 4.4.1 正交函数系  (orthogonal functions)

当每对双函数$\varphi_n(x), \ \varphi_m(x)$ 都符合定义以下，我们称这样的函数群体为**正交函数系 （orthogonal group）**： 

$$
\int_{a}^{b} \varphi_n(x) \varphi_m(x) \, dx = 0 \space \space\space\space\space\space\space\space \{n,m\in \N\ | \ n\neq m \}
$$

### 4.4.2 规范正交函数系 (orthonormal functions)

若函数的 $\lambda_n=1$  $(n=1,2,3...)$, 那么这便是**规范系（orthonormal group）：**

$$
\int_{a}^{b} \varphi_n^2(x) \, dx = \lambda_n 
$$

若不是orthogonal，则我们可以通过$\left\{ \cfrac{\varphi_n(x)}{\sqrt{\lambda_n}} \right\}$
来进行换取新的orthogonal functions。

## 4.5 傅里叶级数在$L^2$ 空间的基函数

Notice back to this set of functions inside the interval $[-\pi,\pi]$:

$$1, \cos(x), \sin(x), \cos(2x), \sin(2x),...\cos(nx), \sin(nx),...$$

These are **orthogonal basis functions** for their vector space because we see for any two functions in this set $\int_{-\pi}^{\pi} \cos(mx) \cdot \sin(nx) \, dx = 0.$

However, they are not standard, or normed, because $\lambda_n \neq1$. 

我们可以通过模（norm）的定义获得他们的normalizing coefficient：

$$\|1\| = \sqrt{\int_{-\pi}^{\pi} 1^2 \, dx} = \sqrt{2\pi}$$

$$\|\cos(nx)\| = \sqrt{\int_{-\pi}^{\pi} \cos^2(nx) \, dx} = \sqrt{\pi}$$

$$\|\sin(nx)\| = \sqrt{\int_{-\pi}^{\pi} \sin^2(nx) \, dx} = \sqrt{\pi}$$
Then, we would have a **standard orthonormal functions:**
$$\frac{1}{\sqrt{2\pi}}, \ldots, \, \frac{\cos nx}{\sqrt{\pi}}, \, \frac{\sin nx}{\sqrt{\pi}}, \, \ldots$$

Let’s define them:

$$\psi_0=\frac{1}{\sqrt{2\pi}}, \psi_j=\frac{1}{\sqrt{\pi}}\cos(jx),  \varphi_j=\frac{1}{\sqrt{\pi}}\sin(jx)$$

$$\psi_0\equiv\sqrt L\quad \psi_j\equiv\sqrt L\cos\left ( \frac{j\pi}{L}x
\right )\quad \varphi_j\equiv\sqrt L\sin\left ( \frac{j\pi}{L}x
\right) $$

such that, we obtain the coefficient for each standard basis functions needed:

$$\begin{align} a_0 &= \langle f,\psi_0\rangle=\frac{1}{\sqrt{2\pi}} \int_{-\pi}^{\pi} f(x) \, dx\\a_j &=\langle f,\psi_k\rangle=\frac{1}{\sqrt{\pi}} \int_{-\pi}^{\pi} f(x) \cos(jx) \, dx\\ b_j &=\langle f,\varphi_k\rangle =\frac{1}{\sqrt{\pi}} \int_{-\pi}^{\pi} f(x) \sin(kx) \, dx \end{align} $$

Then, for the function $\mathcal X$ and its coffecient $C_k$ defined as

$$
\mathcal X_k=(
\psi_k ,\varphi_k
), \quad C_k=(a_j,b_j)
$$

we have a function space:

$$
\mathcal F(f)=\sum_{k=0}^\infty C_k \cdot \mathcal X_k
$$

---

如同$\vec{a} = \sum_{i=1}^{n} a_i \vec{e}_i \quad$一样，我们有$f(x) = a_0 \frac{1}{\sqrt{2\pi}} + a_1 \frac{\cos x}{\sqrt{\pi}} + b_1 \frac{\sin x}{\sqrt{\pi}} + a_2 \frac{\cos 2x}{\sqrt{\pi}} + b_2 \frac{\sin 2x}{\sqrt{\pi}} + \cdots$，或者

$$

f(x) = a_0 \frac{1}{\sqrt{2\pi}} + \sum_{k=1}^{\infty} a_k \frac{\cos kx}{\sqrt{\pi}} + \sum_{k=1}^{\infty} b_k \frac{\sin kx}{\sqrt{\pi}}
$$

代入$a_0,a_k,b_k$到上式中，我们获得：

$$
f(x) =  \frac{1}{\sqrt{2\pi}} \int_{-\pi}^{\pi} f(x) \, dx  \frac{1}{\sqrt{2\pi}} + \sum_{k=1}^{\infty} \frac{\cos kx}{\sqrt{\pi}}\frac{1}{\sqrt{\pi}} \int_{-\pi}^{\pi} f(x) \cos kx \, dx + \sum_{k=1}^{\infty} \frac{\sin kx}{\sqrt{\pi}} \frac{1}{\sqrt{\pi}} \int_{-\pi}^{\pi} f(x) \sin kx \, dx
$$

当我们简化之后，并且将系数项更新，我们最终有了现在的傅里叶展开式：

$$
f(x)=A_0 + \sum_{n=1}^{\infty}(A_n\cos nx+ B_n\sin nx)
$$

$$
\begin{align} A_0 &= \frac{1}{2\pi} \int_{-\pi}^{\pi} f(x) \, dx\\A_n &= \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \cos(nx) \, dx\\ B_n &= \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \sin(nx) \, dx \end{align}
$$