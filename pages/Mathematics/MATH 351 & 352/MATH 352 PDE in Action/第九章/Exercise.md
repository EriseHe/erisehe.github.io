---
weight: 9.999
title: 习题
---

# Problem 1: Finite-Difference Solution

We wish to discretize and solve the boundary-value problem

$$-\mu\frac{d^2u}{dx^2} + \beta\frac{du}{dx} = f(x),\quad x\in(0,1),\quad u(0)=u(1)=0$$

Or equivalently:

$$\begin{cases}
-\mu u''(x) + \beta u'(x) = f(x), & 0<x<1,\\
u(0)=0,\; u(1)=0.
\end{cases}$$

Where $\mu>0$ and $\beta$ is a constant (possibly negative), and $f\in C^0(0,1)$.

## 1. Finite-Difference Discretization

Divide $[0,1]$ into $N$ equal subintervals so that $\Delta x = \frac{1}{N}$. Let

$$x_j = j\Delta x,\quad j=0,1,2,\dots,N,$$

so that $x_0=0$ and $x_N=1$. We approximate $u(x_j)\approx u_j$. The boundary conditions become $u_0=0$ and $u_N=0$.

### 1.1 Central Difference Scheme (for the interior points)

A standard **centered second-difference** for $u''(x)$ at $x_j$ is:

$$u''(x_j) \approx \frac{u_{j+1} - 2u_j + u_{j-1}}{(\Delta x)^2}.$$

A standard **centered first-difference** for $u'(x)$ at $x_j$ is:

$$u'(x_j) \approx \frac{u_{j+1} - u_{j-1}}{2\Delta x}.$$

Hence, the PDE $-\mu u''(x) + \beta u'(x)=f(x)$ becomes for $j=1,\dots,N-1$:

$$-\mu\frac{u_{j+1} - 2u_j + u_{j-1}}{(\Delta x)^2} + \beta\frac{u_{j+1} - u_{j-1}}{2\Delta x} = f(x_j).$$

We impose $u_0 = 0$ and $u_N=0$.

## 2. Local Truncation Error

- The second-order central difference for $u''$ is $O((\Delta x)^2)$ accurate.
- The central difference for $u'$ is also $O((\Delta x)^2)$ accurate.

Hence the **local truncation error** of the combined scheme is $O((\Delta x)^2)$.

## 3. Matrix Form

Collect unknowns $u_1,u_2,\dots,u_{N-1}$ into a vector $\mathbf{u}=(u_1,\dots,u_{N-1})^T$. The boundary values $u_0=0$ and $u_N=0$ are known.

Rewrite the finite-difference equation for an interior index $j$:

$$-\mu\frac{u_{j+1} - 2u_j + u_{j-1}}{(\Delta x)^2} + \beta\frac{u_{j+1} - u_{j-1}}{2\Delta x} = f(x_j).$$

We can factor out coefficients:
- Let $\alpha \equiv \frac{\mu}{(\Delta x)^2}$.
- Let $\gamma \equiv \frac{\beta}{2\Delta x}$.

Then the coefficient of $u_j$ is $2\alpha$, the coefficient of $u_{j+1}$ is $-\alpha + \gamma$, and the coefficient of $u_{j-1}$ is $-\alpha - \gamma$. Thus, in matrix form:

$$\begin{pmatrix}
2\alpha & -\alpha+\gamma & 0 & \cdots & 0\\
-\alpha-\gamma & 2\alpha & -\alpha+\gamma & \cdots & 0\\
0 & \ddots & \ddots & \ddots & \vdots\\
\vdots & & -\alpha-\gamma & 2\alpha & -\alpha+\gamma\\
0 & \cdots & 0 & -\alpha-\gamma & 2\alpha
\end{pmatrix}
\begin{pmatrix}
u_1\\ u_2\\ \vdots \\ u_{N-2}\\ u_{N-1}
\end{pmatrix}
=
\begin{pmatrix}
f(x_1)\\ f(x_2)\\ \vdots \\ f(x_{N-2})\\ f(x_{N-1})
\end{pmatrix}.$$

This is a tridiagonal linear system, solvable by standard methods (e.g., Thomas algorithm).

## 4. Quality of the Solution vs. $\beta/\mu$

The ratio $\frac{\beta}{\mu}$ often plays the role of a **Péclet-type number** in advection-diffusion problems.

- If $\frac{\beta}{\mu}$ is small (diffusion-dominated), the solution is usually smooth and well-behaved under central differencing.
- If $\frac{\beta}{\mu}$ is large (advection-dominated), pure central differences may produce **spurious oscillations** unless $\Delta x$ is refined or **upwinding** techniques are used to stabilize the discrete solution.

## 5. Upwind Method (First Order) for $\beta<0$

When $\beta<0$, the "flow" is from right to left, so an **upwind difference** for the first derivative $\beta u'(x)$ uses values on the "right" side at each $j$. Concretely, for $\beta<0$, we replace:

$$u'(x_j) \approx \frac{u_{j+1} - u_j}{\Delta x} \quad \text{(a "backward" upwind if flow is leftward)}.$$

Hence, the difference equation becomes:

$$-\mu\frac{u_{j+1} - 2u_j + u_{j-1}}{(\Delta x)^2} + \beta\frac{u_{j+1} - u_j}{\Delta x} = f(x_j), \quad j=1,\dots,N-1.$$

(This replaces the central difference in the advective term by a one-sided upwind difference.)

### 5.1 No Spurious Oscillations

The first-order upwind scheme for linear advection-diffusion is known to be **monotone** for any $\Delta x>0$ when $\beta<0$ (or, more generally, for any sign of $\beta$ if we choose the correct upwind direction). Monotonicity prevents nonphysical oscillations. In short:

- Central difference can oscillate if $|\beta|$ is large relative to $\mu$.
- Upwind difference sacrifices some accuracy (only first order in $\Delta x$ for the advective term) but **remains stable** and **nonoscillatory** for any step size $\Delta x$.

Thus, with $\beta<0$, the upwind approach $u'(x_j)\approx (u_{j+1}-u_j)/\Delta x$ ensures a stable, physically plausible solution without oscillations.

## 6. Summary

1. **Equation & Discretization**  
   $$-\mu u'' + \beta u' = f(x), \quad u(0)=u(1)=0 \longrightarrow \begin{cases}
   -\mu\frac{u_{j+1}-2u_j+u_{j-1}}{(\Delta x)^2} +\beta\frac{u_{j+1}-u_{j-1}}{2\Delta x} = f(x_j),\\
   u_0=0,\;u_N=0.
   \end{cases}$$

2. **Local Truncation Error** is $O((\Delta x)^2)$ for the centered scheme.

3. **Matrix Form**: A standard tridiagonal system with bands $-\alpha\mp \gamma$, $2\alpha$, $-\alpha\pm \gamma$.

4. **Effect of $\beta/\mu$**: If $|\beta|$ is large relative to $\mu$, central differences can produce oscillatory solutions; upwind methods help.

5. **Upwind Method** (for $\beta<0$):
   $$-\mu\frac{u_{j+1}-2u_j+u_{j-1}}{(\Delta x)^2} + \beta\frac{u_{j+1}-u_j}{\Delta x} = f(x_j)$$
   prevents oscillations for any $\Delta x$.



# Problem 2 

**Solution Outline**

We have the linear advection equation

$$\frac{\partial u}{\partial t} \;+\; a\,\frac{\partial u}{\partial x} \;=\; 0,\quad x\in \mathbb{R},\;t>0,$$
with initial condition $u(x,0) = u_0(x)$. We wish to:

1. **Derive the Lax–Wendroff scheme** for this PDE.
2. **Determine the CFL condition** for stability, i.e.\ find the condition on 
   $\displaystyle \frac{|a|\Delta t}{\Delta x}$.

---

## 1) Derivation of the Lax–Wendroff Scheme

A succinct way to derive Lax–Wendroff is via a **second-order Taylor expansion** in time about $t^n$:

$$u^{n+1}_i \;\approx\; u(x_i,\,t_n + \Delta t)
\;=\;
u(x_i,t_n)
\;+\;\Delta t\,\frac{\partial u}{\partial t}
\;+\;\tfrac{(\Delta t)^2}{2}\,\frac{\partial^2 u}{\partial t^2}\;\bigg|_{(x_i,t_n)}.$$

From the PDE $\partial_t u = -\,a\,\partial_x u$, we can replace time-derivatives by spatial derivatives:

- First derivative in time:
  $$\frac{\partial u}{\partial t} 
  \;=\;
  -\,a\,\frac{\partial u}{\partial x}.$$

- Second derivative in time:
  $$\frac{\partial^2 u}{\partial t^2}
  \;=\;
  \frac{\partial}{\partial t}\Bigl(-\,a\,\frac{\partial u}{\partial x}\Bigr)
  \;=\;
  -\,a\,\frac{\partial}{\partial x}\Bigl(\frac{\partial u}{\partial t}\Bigr)
  \;=\;
  -\,a\,\frac{\partial}{\partial x}\Bigl(-\,a\,\frac{\partial u}{\partial x}\Bigr)
  \;=\;
  a^2\,\frac{\partial^2 u}{\partial x^2}.$$

Hence,

$$u^{n+1}_i
\;\approx\;
u^{n}_i
\;-\;
a\,\Delta t \,\frac{\partial u}{\partial x}
\;+\;
\frac{a^2(\Delta t)^2}{2}\,\frac{\partial^2 u}{\partial x^2}
\;\Bigg|_{(x_i,t_n)}.$$

### Discretizing the spatial derivatives

We replace the first and second spatial derivatives by standard centered finite differences:

$$\frac{\partial u}{\partial x}\bigg|_{x_i}
\approx 
\frac{u_{i+1}^n - u_{i-1}^n}{2\,\Delta x},
\qquad
\frac{\partial^2 u}{\partial x^2}\bigg|_{x_i}
\approx 
\frac{u_{i+1}^n - 2\,u_i^n + u_{i-1}^n}{(\Delta x)^2}.$$

Putting this all together:

$$u_{i}^{n+1}
\;=\;
u_{i}^{n}
\;-\;
a\,\Delta t \,\frac{u_{i+1}^{n} - u_{i-1}^{n}}{2\,\Delta x}
\;+\;
\frac{a^2\,(\Delta t)^2}{2}\,
\frac{u_{i+1}^{n} - 2\,u_{i}^{n} + u_{i-1}^{n}}{(\Delta x)^2}.$$

It is common to set 
$\displaystyle \nu \;=\;\frac{a\,\Delta t}{\Delta x}$. Then the scheme reads

$$\boxed{
u_{i}^{n+1}
\;=\;
u_{i}^{n}
\;-\;\frac{\nu}{2}\,\bigl(u_{i+1}^{n} - u_{i-1}^{n}\bigr)
\;+\;\frac{\nu^{2}}{2}\,
\bigl(u_{i+1}^{n} \;-\;2\,u_{i}^{n} \;+\;u_{i-1}^{n}\bigr).
}$$

This is the **Lax–Wendroff scheme** for the linear advection equation.

---

## 2) The CFL Stability Condition

A standard von Neumann (Fourier) stability analysis, or the usual Lax–Richtmyer theory for hyperbolic PDEs, shows that **Lax–Wendroff is stable if and only if** the Courant number satisfies

$$\bigl|\,\nu\,\bigr|
\;=\;
\biggl|\frac{a\,\Delta t}{\Delta x}\biggr|
\;\le\;
1.$$

Therefore among the multiple-choice options, the correct condition is

$$\boxed{\;\; \bigl|\tfrac{a\,\Delta t}{\Delta x}\bigr| \;\le\; 1.}$$

---

## 3) Motivation

- **Domain of dependence argument.** For the PDE 
  $\partial_t u + a\,\partial_x u = 0,$
  characteristics travel with speed $a$. Numerically, we must ensure that information from these characteristics is captured on the grid from one time step to the next; that is the essence of the CFL condition. If $|a|\Delta t > \Delta x$, the method “jumps over” grid cells and fails to remain stable.

- **Von Neumann analysis.** Substituting $u_i^n = \lambda^n e^{ikx_i}$ into the scheme shows that the amplification factor $|\lambda|$ is $\le 1$ if and only if $\bigl|\frac{a\Delta t}{\Delta x}\bigr|\le 1.$

Hence the short answer is:
1. Lax–Wendroff has the form 
   $$u_{i}^{n+1}
   =
   u_{i}^{n}
   -
   \frac{\nu}{2}\,(u_{i+1}^{n} - u_{i-1}^{n})
   +
   \frac{\nu^{2}}{2}\,(u_{i+1}^{n}-2u_{i}^{n}+u_{i-1}^{n}),$$
2. The method is stable **if and only if** $\displaystyle \bigl|\frac{a\Delta t}{\Delta x}\bigr|\le 1.$
3. This condition is exactly the usual CFL requirement ensuring the numerical domain of dependence covers the PDE’s domain of dependence.

# Problem 3

Below is a fairly detailed derivation and discussion of the Crank–Nicolson (CN) method (the $\theta$-method with $\theta = \tfrac12$) for the heat equation

$$\frac{\partial u}{\partial t}\;-\;\frac{\partial^2 u}{\partial x^2}\;=\;f,
\quad x\in(0,1),\;t>0,
\quad
u(0,t) \;=\;u(1,t)\;=\;0,
\quad
u(x,0)\;=\;u_0(x).$$

Since the PDE can be written as 
$$u_t \;=\; u_{xx} + f,$$
we will discretize in both space and time.

---

## 1. The Crank–Nicolson Discretization

Let $\Delta x = \frac{1}{M}$ partition $[0,1]$ into $M+1$ grid points $x_i = i\,\Delta x$, $i=0,\dots,M$, and let $\Delta t$ be a time step, so $t^n = n\,\Delta t$. We write $u_i^n\approx u(x_i,t^n)$. The standard second‐order central difference for $u_{xx}$ is

$$u_{xx}(x_i,t^n)
\;\approx\;
\frac{u_{i+1}^n - 2\,u_i^n + u_{i-1}^n}{(\Delta x)^2}.$$

A $\theta$‐method (also called the $\theta$-scheme) for $u_t = u_{xx} + f$ in time is:

$$\frac{u_i^{n+1} - u_i^n}{\Delta t}
\;=\;
\theta\Bigl[\underbrace{\tfrac{u_{i+1}^{n+1} - 2u_i^{n+1} + u_{i-1}^{n+1}}{(\Delta x)^2} \;+\; f_i^{n+1}}_{\text{“implicit” part}}\Bigr]
\;+\;
\bigl(1-\theta\bigr)\Bigl[\underbrace{\tfrac{u_{i+1}^{n} - 2u_i^{n} + u_{i-1}^{n}}{(\Delta x)^2}\;+\; f_i^{n}}_{\text{“explicit” part}}\Bigr].$$

**Crank–Nicolson** is the special case $\theta = \tfrac12$.  Substituting $\theta=\tfrac12$, we get

$$\frac{u_i^{n+1} - u_i^n}{\Delta t}
\;=\;
\tfrac12\Bigl[\tfrac{u_{i+1}^{n+1} - 2u_i^{n+1} + u_{i-1}^{n+1}}{(\Delta x)^2} + f_i^{n+1}\Bigr]
\;+\;
\tfrac12\Bigl[\tfrac{u_{i+1}^{n} - 2u_i^{n} + u_{i-1}^{n}}{(\Delta x)^2} + f_i^n\Bigr].$$

Rearranging terms gives
$$u_i^{n+1} 
\;-\;
\frac{\Delta t}{2\,(\Delta x)^2}\,\bigl(u_{i+1}^{n+1} - 2u_i^{n+1} + u_{i-1}^{n+1}\bigr)
\;=\;
u_i^{n}
\;+\;
\frac{\Delta t}{2\,(\Delta x)^2}\,\bigl(u_{i+1}^{n} - 2u_i^n + u_{i-1}^{n}\bigr)
\;+\;
\frac{\Delta t}{2}\,\bigl(f_i^{n+1} + f_i^n\bigr).$$
One may think of this as the linear system
$$\bigl[I + \tfrac{\Delta t}{2\,(\Delta x)^2}\,A\bigr]\,\mathbf{u}^{n+1}
\;=\;
\bigl[I - \tfrac{\Delta t}{2\,(\Delta x)^2}\,A\bigr]\,\mathbf{u}^{n}
\;+\;\frac{\Delta t}{2}\,\bigl(\mathbf{f}^{n+1} + \mathbf{f}^n\bigr),$$
where $A$ is the usual tridiagonal matrix corresponding to the second‐difference operator (and where $\mathbf{u}^n$ is the vector of $u_i^n$). After applying boundary conditions $u_0^n = u_M^n = 0$, one solves this tridiagonal system at each time step.

### Boundary Conditions
Because $u(0,t)=u(1,t)=0$, we set $u_0^n=0$ and $u_M^n=0$ for all $n$.  The updates are applied only for $i=1,\dots,M-1$.  

### Summary of the CN Update
In “index form,” the Crank–Nicolson scheme is:
$$\boxed{
\begin{aligned}
&\text{For }i=1,\dots,M-1:\quad
u_i^{n+1} 
\;-\;
\tfrac{\Delta t}{2\,(\Delta x)^2}\,\bigl(u_{i+1}^{n+1} - 2u_i^{n+1} + u_{i-1}^{n+1}\bigr)
\\
&\qquad\quad\;=\;
u_i^{n}
\;+\;
\tfrac{\Delta t}{2\,(\Delta x)^2}\,\bigl(u_{i+1}^{n} - 2u_i^n + u_{i-1}^{n}\bigr)
\;+\;\frac{\Delta t}{2}\,\bigl(f_i^{n+1} + f_i^n\bigr).
\end{aligned}
}$$
This is solved simultaneously for all $i$, respecting $u_0^{n+1}=u_M^{n+1}=0$.

---

## 2. Properties: Stability & Accuracy

1. **Stability**:  
   - **Unconditional stability** for the heat equation.  In other words, there is no restriction on $\Delta t$ relative to $\Delta x$ needed *solely* for stability (unlike the explicit forward‐Euler method, which requires $\Delta t \le \tfrac12 (\Delta x)^2$).  
   - More precisely, CN is **A‐stable** as an ODE solver applied to the linear diffusion operator.  One can show by a von Neumann analysis or standard Lax–Richtmyer theory that errors do not grow unboundedly for any $\Delta t>0$.

2. **Accuracy**:  
   - In **time**, Crank–Nicolson is **second‐order accurate**, because it is essentially the trapezoidal rule in time (it uses $\frac12$ of the “new” time‐level’s spatial derivative plus $\frac12$ of the “old” time‐level’s spatial derivative).  
   - In **space**, if we use the standard second‐difference approximation, the scheme is also **second‐order** in $\Delta x$.  
   - Overall, we often say “CN is second‐order in both space and time (for sufficiently smooth solutions).”

---

## 3. BONUS: Discontinuous Initial Condition

Even if $u_0(x)$ is not continuous, the **heat equation** itself is *smoothing*: for $t>0$, the exact solution becomes infinitely differentiable in $x$.  Numerically:

- The scheme remains stable and convergent.  
- Because it is a diffusion‐type PDE, any jump discontinuity in the initial data gets smoothed out instantly as $t$ increases.  
- Crank–Nicolson will faithfully capture that smoothing.  You may see large gradients at early time steps near the discontinuity, but the method will not become unstable.

Hence **having a discontinuous initial condition does not cause instability** for the heat equation with Crank–Nicolson.  The scheme still converges (second‐order in both space and time) to the *unique smooth* solution that the parabolic PDE defines for $t>0$.


# Problem 4 求解二维拉普拉斯方程的五点差分格式

我们考虑如下的椭圆方程（Poisson 型）：
$$-\,\Delta u \;=\; f, 
\quad (x,y)\in [0,1] \times [0,1].$$

其中
$$\Delta \;=\;\frac{\partial^2}{\partial x^2} \;+\;\frac{\partial^2}{\partial y^2}$$
是二维拉普拉斯算子，$f$ 是已知的函数。


## 1. 建立网格

令 $N_x$ 和 $N_y$ 分别表示在 $x$ 和 $y$ 方向上的网格划分数目（仅指内部节点数，不含边界），则步长为
$$\delta x \;=\;\frac{1}{N_x+1}, 
\quad
\delta y \;=\;\frac{1}{N_y+1}.$$
我们在区间 $[0,1]\times[0,1]$ 内取离散网格点
$$x_i \;=\; i\,\delta x, 
\quad
y_j \;=\; j\,\delta y,$$
其中 $i=0,1,2,\dots,N_x+1$, $j=0,1,2,\dots,N_y+1$。

在内部节点 $(x_i,y_j)$ 上，我们用 $u_{i,j}$ 表示对真解 $u(x_i,y_j)$ 的数值近似。

----

## 2. 五点差分格式

方程 $-\Delta u = f$ 可写成
$$-\left(
\frac{\partial^2 u}{\partial x^2} 
\;+\;
\frac{\partial^2 u}{\partial y^2}
\right)
\;=\;
f,$$
即
$$\frac{\partial^2 u}{\partial x^2} 
\;+\;
\frac{\partial^2 u}{\partial y^2}
\;=\;
-\,f.$$

在网格上，二阶导数的**中心差分**近似分别为：

- 在 $x$ 方向：
  $$\frac{\partial^2 u}{\partial x^2}\bigg|_{(x_i,y_j)}
  \;\approx\;
  \frac{u_{i+1,j} - 2u_{i,j} + u_{i-1,j}}{(\delta x)^2},$$
- 在 $y$ 方向：
  $$\frac{\partial^2 u}{\partial y^2}\bigg|_{(x_i,y_j)}
  \;\approx\;
  \frac{u_{i,j+1} - 2u_{i,j} + u_{i,j-1}}{(\delta y)^2}.$$

因此，$\Delta u$ 在离散化后可写为
$$\Delta u_{i,j} 
\;=\;
\frac{u_{i+1,j} - 2u_{i,j} + u_{i-1,j}}{(\delta x)^2}
\;+\;
\frac{u_{i,j+1} - 2u_{i,j} + u_{i,j-1}}{(\delta y)^2}.$$

由于方程是 $-\Delta u = f$，则对应的五点差分格式为

$$-\left[\,
\frac{u_{i+1,j} - 2u_{i,j} + u_{i-1,j}}{(\delta x)^2}
\;+\;
\frac{u_{i,j+1} - 2u_{i,j} + u_{i,j-1}}{(\delta y)^2}
\right]
\;=\;
f_{i,j},$$
或等价地写成
$$\frac{u_{i+1,j} - 2u_{i,j} + u_{i-1,j}}{(\delta x)^2}
\;+\;
\frac{u_{i,j+1} - 2u_{i,j} + u_{i,j-1}}{(\delta y)^2}
\;=\;
-\,f_{i,j}.$$

这里 $f_{i,j} = f(x_i,y_j)$ 表示在网格点处的函数取值。

----

## 3. 精度阶次

上述中心差分格式对二阶导数在空间步长上具有 **二阶精度**。也就是说，如果我们将 $\delta x$ 和 $\delta y$ 同步缩小（假设网格等距），则离散解相对于真解的误差在 $\delta x, \delta y \to 0$ 时满足
$$\mathcal{O}\bigl((\delta x)^2 + (\delta y)^2\bigr).$$

简而言之，对拉普拉斯方程采用这种五点中心差分格式，**在均匀网格下是二阶精度**。

----

## 4. 最终形成的线性方程组

对所有内部节点 $(i,j)$（即 $1\le i\le N_x$, $1\le j\le N_y$）应用上述离散方程，我们便得到一个关于所有未知量 $\{u_{i,j}\}$ 的线性方程组。若再结合边界条件（例如已知边界上的 $u_{0,j},u_{N_x+1,j},u_{i,0},u_{i,N_y+1}$），即可完全求解。

在实际应用中，可以用各种**迭代法**（如 Jacobi、Gauss-Seidel、SOR 等）或**直接法**（如 LU 分解等）来求解这个离散方程组。

----

## 5. 总结

1. **五点差分格式**的离散方程（在二维情况下）是：
   $$\frac{u_{i+1,j} - 2u_{i,j} + u_{i-1,j}}{(\delta x)^2}
   \;+\;
   \frac{u_{i,j+1} - 2u_{i,j} + u_{i,j-1}}{(\delta y)^2}
   \;=\;
   -\,f_{i,j}.$$
2. 在标准的（均匀）网格下，该方法的**空间离散精度是二阶**。

----