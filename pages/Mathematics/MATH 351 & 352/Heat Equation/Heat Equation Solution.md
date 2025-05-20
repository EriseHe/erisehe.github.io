# Heat Equation Solution
## **Scale Invariance Property**

> [!Theorem]
> Since we know that $u_t=ku_{xx}$ , then we know if $u \in U$ for $U \subset \mathbb{R}^n$ solves the equation, so does $u(\lambda x, \lambda^2 t)$ for $\lambda \in \mathbb{R}$ according to the **scale invariance property.**

Let’s set that $\bar{x}=\lambda x, \bar{t}=\lambda^2 t$, then it is easy to see:

$$ \begin{align} u_{\bar{t}}= \frac{\partial u}{\partial \bar{t}}\cdot\frac{\partial \bar{t}}{\partial t} = \frac{\partial u}{\partial t} \cdot (\lambda^2) \\ u_{\bar{x}\bar{x}} &=\frac{\partial}{\partial x} \cdot \frac{\partial u}{\partial \bar{x} } = (\frac{\partial}{\partial \bar{x}} \cdot \frac{\partial \bar{x}}{\partial x})(\frac{\partial u}{\partial \bar{x} } \cdot \frac{\partial \bar{x}}{\partial x})\\ &= \frac{\partial^2 u}{\partial x^2} \cdot (\lambda^2) \end{align} $$

where the equation still holds regardless the choice of $\lambda$ $(\lambda \neq 0)$

---

The scaling $\frac{x^2}{t}$ or $\frac{x}{\sqrt{t}}$ that is invariant to the equation suggests the solution is in the form of $u(x,t)=v(\frac{x^2}{t})$ _f.s._ function $v$. That is,

$$ \begin{align} u(x,t)=t^\alpha v(\frac{x}{t^\beta}) \end{align} $$

where constants $\alpha, \beta$ and functions $v:\mathbb{R}^n\to \mathbb{R}$ must be found. This means the solution must be invariant under the _dilation scaling $\forall \lambda >0, x= \mathbb{R}^n, t>0$ :_

$$ u(x,t) = \lambda^\alpha u(\lambda^\beta x,\lambda t) $$

Setting $\lambda=t^{-1}$, in which $v(y):= u(y,1)$. We insert (1) into the original heat equation to solve for $v$ with our new variable $y=\cfrac{x}{t^\beta}$. We then take $\beta = \frac{1}{2}$ so that the terms involved $t$ are cancelled out - we hence derived an equation that is only in terms of $y$:

$$ \alpha v + \frac{1}{2}\cdot Dv + \Delta v = 0 \ \ (k=1) $$

Different textbook takes different methods to find the constant $\alpha=-\frac{1}{2}$ here:

- Using conservation of heat energy in physics
- Guessing $v$ to be radial and introduce $v(y)=w(|y|)$

---

Eventually, we reached at $v(y)=Ae^{-\frac{y^2}{4k}}$ _such that_

$$ u(x,t)=A\frac{1}{ t^{n/2}}e^{-\frac{|x|^2}{4kt}} $$

The particular choice of normalizing constant $A=\frac{1}{(4\pi k)^{n/2}}$ is derived from $\int_{\mathbb{R}^n} \Phi(x,t) dx=1$. _(See p. 46 Lemma, Evans)_ Hence, the general solution to the heat equation for $n$ dimension is

$$ \Phi(x,t)=\frac{1}{(4\pi k t)^{n/2}} e^{-\frac{|x|^2}{4kt}} $$

where $x\in \mathbb{R}^n, t>0$. For situation $t<0$, the solution is $\Phi=0$.

**For dimension $n=1$, we yield**
$$ \Phi(x,t)=\frac{1}{\sqrt{4\pi k t}} e^{-\frac{x^2}{4kt}} $$
$$
$$
