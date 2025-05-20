---
title: 常微分方程的数值解
weight: "03"
---


## Introduction

The subject of this Chapter is the numerical approximation of the Cauchy problem:

$$(1) \quad \frac{dy}{dt} = f(t,y) \quad \text{in } t > 0 \quad (I.C.)$$

with 
$$y(0) = y_0 \text{ given}.$$

or, more in general, a system:

$$(2) \quad \frac{d\mathbf{y}}{dt} = \mathbf{f}(t,\mathbf{y}) \quad \text{in } t > 0$$

with 
$$\mathbf{y}(0) = \mathbf{y}_0.$$

Let's recall some basic results on the function $f$. It is said to be Lipschitz continuous in an interval $I$ if there exists a positive $L > 0$ s.t.

$$|f(t,y_1) - f(t,y_2)| < L |y_1 - y_2|.$$

Clearly, if $f$ is differentiable with continuity in $I$, it is also Lipschitz continuous with $L \leq \max_I \left|\frac{\partial f}{\partial y}\right|$.

### Local Theorem

If $f$ is Lipschitz continuous in a range $t \in I_1$ and $y \in I \subseteq \mathbb{R}$, then $\exists$ an interval $\hat{I} \subseteq I$ where the solution to $(1)$ exists and is unique.

### Global Theorem

If the $f$ is Lipschitz continuous $\forall t \in I$ and $y \in \mathbb{R}$, then the solution $\exists$ uniquely in $I$.

## Stability Definitions

From the practical point of view, it is important to consider also the perturbed case:

$$(1_\epsilon): \quad \frac{dy_\epsilon}{dt} = f(t, y_\epsilon) + \delta(t) \quad t \geq 0$$

$$y^\epsilon(0) = y_0 + \epsilon$$

with $|\delta(t)| \leq \epsilon \quad \forall t \geq 0$

If there exists a finite constant $C$ such that

$$|y - y_\epsilon| < C\epsilon \quad (*)$$

then we say that the solution is Lyapunov stable.

In general, $C$ may depend on $t$, so that $(*)$ may hold on finite intervals (and not over the entire $[0,\infty)$ axis).

To have a stronger concept, we advocate the ASYMPTOTIC STABILITY:

$$\lim_{t \to \infty} |y(t) - y_\epsilon(t)| = 0.$$

From the engineering point of view, this is a central concept, as the theory of control (Automatical Control, Feedback control) relies on this definition.

## Remark

The Cauchy problem has a formal (quite useless) solution:

$$y(t) = y_0 + \int_0^t f(\tau, y(\tau))d\tau$$

connecting the solution in $t$ with its past.

This is basically an alternative formulation of the problem and, in fact, will be used to formulate possible numerical approximation alternative to the ones based on $(1)$.

## Some Simple Examples

To begin with, we can split the time interval in subintervals, for instance with a uniform reticulation with step $\Delta t$.

![Time discretization with points at 0, Δt, 2Δt, 3Δt...]

Then, we can use the formula:

$$\frac{dy}{dt}(t_i) \simeq \frac{y(t_{i+1}) - y(t_i)}{\Delta t}$$

that we know is accurate with an error scaling with $\Delta t$. In this way, we have:

[From now on, the approximation of the solution $y(t)$ in $t_i$ will be denoted with $u_i$]

$$\frac{u_{i+1} - u_i}{\Delta t} = f(t_i, u_i)$$

In practice, starting at $t = 0$:
$$\begin{align}
u_1 &= u_0 + \Delta t \, f(t_0, u_0) \quad \rightsquigarrow \quad (u_0 = y_0) \\
u_2 &= u_1 + \Delta t \, f(t_1, u_1)
\end{align}$$

We can easily compute the approximation $u_i$ of $y(t_i)$.

On the other hand, we could do:

$$\frac{u_i - u_{i-1}}{\Delta t} = f(t_i, u_i)$$

leading to:

$$u_1 = u_0 + \Delta t \, f(t_1, u_1) \quad (u_0 = y_0)$$

This is not as easy as before: it's a NONLINEAR (ALGEBRAIC) EQUATION; we know how to solve it (first Chapter), but it is a computational additional cost. Then, similarly, we have:

$$u_2 = u_1 + \Delta t \, f(t_2, u_2)$$

We have also another option:

$$\frac{dy}{dt}(t_i) \simeq \frac{u_{i+1} - u_{i-1}}{2\Delta t}$$

In this case, the error scales with $O(\Delta t^2)$. So, in practice we have:

$$u_{i+1} = 2\Delta t \, f(t_i, u_i) + u_{i-1}$$

or specifically: $u_2 = 2\Delta t \, f(t_1, u_1) + u_0 \quad (u_0 = y_0)$

I need to know $u_1$, not just $u_0$, then we can use the method.

With these three examples, we have already found many possible types of methods:

**Implicit vs Explicit**
- **Implicit**: Solve a non-linear equation
- **Explicit**: No need of solving equations

**One Step vs Multistep**
- **One Step**: $u_{i+1} = g(\Delta t, u_i)$
- **Multistep**: $u_{i+1} = g(\Delta t, u_i, u_{i-1}, u_{i-2}...)$

At the top of this, we have the problem of the accuracy and - even most importantly- of the CONVERGENCE.

In fact, the basic requirement we need is that the method is convergent:

$$\lim_{\Delta t \to 0} |y(t_i) - u_i| = 0$$

Then, if we find that $|y(t_i) - u_i| \sim O(\Delta t^p)$ then the accuracy or the order of the method is $p$.

Nature (implicit/explicit), Number of steps and most important CONVERGENCE and accuracy (order) are the categories for analyzing and ranking different methods.

Before we embark ourselves in a general analysis, however, let's focus on a specific case, where important concepts will be highlighted.

## Analysis of Forward Euler

The method:

$$\frac{u_{i+1} - u_i}{\Delta t} = f(t_i, u_i)$$

is called Forward Euler.

Let's consider it in detail.

To start with, let's introduce the distinction of "consistency" and truncation error.

If we have the exact solution $y_{ex}(t)$ it is easily realized that

$$\frac{y_{ex}(t_{i+1}) - y_{ex}(t_i)}{\Delta t} \neq f(t_i, y_{ex}(t_i))$$

For instance,

$$\frac{dy}{dt} = \lambda y \quad y(0) = 1 \implies y_{ex} = e^{\lambda t}$$

then

$$\frac{e^{\lambda(t_i+\Delta t)} - e^{\lambda t_i}}{\Delta t} = e^{\lambda t_i} \frac{e^{\lambda \Delta t} - 1}{\Delta t} \neq \lambda e^{\lambda t_i} \quad (\lambda y(t_i))$$

We can be more specific:

$$y_{ex}(t_{i+1}) = y_{ex}(t_i) + \frac{dy_{ex}}{dt}(t_i)\Delta t + \frac{1}{2}\frac{d^2y_{ex}}{dt^2}(t_i)\Delta t^2 + ...$$

Now:

$$\frac{y_{ex}(t_{i+1}) - y_{ex}(t_i)}{\Delta t} = \frac{dy_{ex}(t_i)}{dt} + \frac{1}{2}\frac{d^2y_{ex}(t_i)}{dt^2}\Delta t + ...$$

This gives us:

$$\frac{y_{ex}(t_{i+1}) - y_{ex}(t_i)}{\Delta t} = f(t_i, y_{ex}(t_i)) + \left[\frac{\Delta t}{2}\frac{d^2y_{ex}}{dt^2}\right]$$

Forward Euler $\quad \quad \quad$ Local Truncation Error (LTE)

In some sense, the truncation error is the residual we get when we pretend the exact solution to solve the numerical scheme.

Now, to investigate how the error of Forward Euler works, let's consider the following picture:

![Error propagation diagram showing exact solution trajectory and numerical approximation]

From the picture it is evident that the error:

$$e_{i+1} = y_{ex}(t_{i+1}) - u_{i+1}$$

is the result of two contributions:

$$e_{i+1} = \underbrace{y_{ex}(t_{i+1}) - u^*_{i+1}}_{\text{generated at the local step}} + \underbrace{u^*_{i+1} - u_{i+1}}_{\text{propagated from previous steps}}$$

From the previous definition:

$$y_{ex}(t_{i+1}) = y_{ex}(t_i) + \Delta t \, f(t_i, y_{ex}(t_i)) + \Delta t \, \tau_{i+1}$$

where $\tau_{i+1} = \frac{\Delta t}{2}\frac{d^2y_{ex}(t_i)}{dt^2}$ is the local TE.

$$u^*_{i+1} = y_{ex}(t_i) + \Delta t \, f(t_i, y_{ex}(t_i))$$

$$y_{ex}(t_{i+1}) - u^*_{i+1} = \Delta t \, \tau_i$$

Now, let's focus on the other part.

This second component $u^*_{i+1} - u_{i+1}$ is inherited from the previous errors.

$$u^*_{i+1} = y_{ex}(t_i) + \Delta t \, f(t_i, y_{ex}(t_i))$$
$$u_{i+1} = u_i + \Delta t \, f(t_i, u_i)$$

Using the Lipschitz assumption $|f(t,y) - f(t,u)| \leq L |y-u|$ we have:

$$|u^*_{i+1} - u_{i+1}| \leq |e_i| + \Delta t \, L |e_i| = (1 + \Delta t \, L)|e_i|$$

where $e_i = y_{ex}(t_i) - u_i$

All together, we have:

$$|e_{i+1}| \leq \Delta t |\tau_i| + (1 + \Delta t \, L)|e_i|$$

Now, take $|\tau^*| = \max_i |\tau_i| = \text{GLOBAL TRUNCATION ERROR}$.

Then:

$$|e_{i+1}| \leq \underbrace{\Delta t |\tau^*|}_{\text{local}} + \underbrace{(1 + \Delta t \, L)}_{\text{propagated}}|e_i|$$

Assume that $e_0 = 0$ (no errors on the initial conditions). Then we have:

$$|e_1| \leq \Delta t |\tau^*|$$
$$|e_2| \leq \Delta t |\tau^*| + (1 + \Delta t \, L)|e_1| \leq \Delta t |\tau^*|(1 + (1+\Delta t \, L))$$
$$|e_3| \leq \Delta t |\tau^*| + (1+\Delta t \, L)|e_2| \leq \Delta t |\tau^*|(1 + (1+\Delta t \, L) + (1+\Delta t \, L)^2)$$

We infer:

$$|e_K| \leq \Delta t |\tau^*| \sum_{j=0}^{K-1}(1+\Delta t \, L)^j = \Delta t |\tau^*|\frac{(1+\Delta t \, L)^K - 1}{1 - 1 - \Delta t \, L} = \frac{|\tau^*|}{L}((1+\Delta t \, L)^K - 1)$$

Notice that:

$$(1 + x)^K \leq \exp(xK)$$

So:

$$|e_K| \leq \frac{|\tau^*|}{L}(\exp(LKh) - 1) = \frac{|\tau^*|}{L}(\exp(Lt_K) - 1)$$

where $K\Delta t = t_K$

Now, if we want to have a bound on the error in the interval $[0,T]$, we have:

$$|e| \leq \frac{|\tau^*|}{L}(\exp(LT) - 1)$$

We have proved the following Theorem:

## Convergence of Forward Euler

If the initial data are exact, and $f$ is Lipschitz continuous with respect to the $y$-argument, with a solution $\in C^2(0,T)$, then FE converges.

In fact:

$$|\tau^*| = \frac{1}{2}\Delta t \max_i |y^{''}| \xrightarrow{\Delta t \to 0} 0$$

and $|e| \leq |\tau^*|\frac{\exp(LT) - 1}{L} \xrightarrow{\Delta t \to 0} 0$ is bounded.

**FE is convergent with order 1.**

Beyond the Theorem per se (we will generalize it to other methods), it is important to notice that the convergence is the consequences of two peculiarities:

**(1)** $\tau^* \xrightarrow{\Delta t \to 0} 0$ the LTE/GTE vanishes as $\Delta t \to 0$, so locally the error is under control.

This property is called **CONSISTENCY**.

**(2)** The factor $\frac{\exp(LT) - 1}{L}$ is independent of $\Delta t$ (or, in general, doesn't blow up for $\Delta t \to 0$). This is related to the way the error propagates so it is a "global" property through the constant $L$.

The control of the error in time is called **STABILITY**.

In some sense, we can say that:

**CONVERGENCE = CONSISTENCY + STABILITY**

In spite of the intuitive arguments we used here, we will see that this is a good representation of general results (Lax-Richtmyer equivalence Theorem) holding for method using linear combinations of the function $f$ evaluated in the points $(t_i, u_i)$.

# Other One-Step Methods

So far, we have two one-step methods (forward and backward Euler). Let's see other two. It is instructive to see how they are devised.

## Crank-Nicolson

From $y(t) = y_0 + \int_0^t f(\tau, y(\tau))d\tau$ we can organize the following method:

![Timeline showing points $t_0, t_1, t_2, t_3, t_4, t_5, t_6, t_7$]

Localize: $y(t_{n+1}) = y(t_n) + \int_{t_n}^{t_{n+1}} f(\tau, y(\tau)) d\tau$

Discretize: approximate the integral with the trapezoidal rule:

$$u_{n+1} = u_n + \frac{f(t_{n+1}, u_{n+1}) + f(t_n, u_n)}{2} \Delta t$$

This is a Second Order (EXERCISE) one-step implicit method.

## Heun

Let's start from Crank-Nicolson and make it "explicit".

On the right hand side of CN we set:

$$u_{n+1} \simeq u_n + \Delta t \, f(t_n, u_n) \quad \text{(Explicit Euler)}$$

We obtain the scheme:

$$u_{n+1} = u_n + \Delta t \frac{f(t_{n+1}, u_n+\Delta t f(t_n, u_n)) + f(t_n, u_n)}{2}$$

This is called Heun. It is One-step, still 2nd order (EXERCISE).

## The Concept of Zero-Stability

Let's start applying the concept to one-step methods in the form:

$$u_{n+1} = u_n + \Delta t \, \Phi(u_n, t_n, f_n; \Delta t)$$

Let's consider the perturbed scheme:

$$\begin{cases}
w_{n+1} = w_n + \Delta t (\Phi(z_n, t_n, f(t_n, z_n); \Delta t) + \delta_n) \\
w_0 = y_0 + \delta_0 & \text{with } |\delta_i| \leq \varepsilon
\end{cases}$$

We say that the method is zero-stable if for $\Delta t < \Delta t_0$, there exists a constant $C > 0$ such that

$$|u_n - z_n| \leq C\varepsilon$$

for $\varepsilon > 0$ sufficiently small.
($C$ and $\Delta t_0$ depend on problem data, $T_{fin}$, $f$).

It is possible to prove the following theorem:

**Theorem:** If $\Phi$ is Lipschitz continuous with respect to the dependence on $u_n$ ($\exists \Delta > 0$: $|\Phi(u_n) - \Phi(z_n)| \leq \Delta |u_n - z_n|$), then the One-step method is zero-stable.

Lipschitz continuity in this case is enough for zero-stability (and it is generally a consequence of Lipschitz continuity of $f$).

Then, we have another theorem. It generalizes the theorem for the explicit Euler.

**Theorem:** If $\Phi$ is like in the previous theorem, then:

$$|y(t_n) - u_n| \leq \left(|y_0 - u_0| + t_n \, \tau(\Delta t)\right) e^{L t_n}.$$

Therefore, if:
- $\tau(\Delta t) \to 0$ with $\Delta t$
- $y_0 - u_0 \to 0$ with $\Delta t$

the method is convergent

(and the order is $\Delta t^p$, with $p = \min(p_1, p_2)$ where:
- $\tau(\Delta t) \sim O(\Delta t^{p_1})$
- $y_0 - u_0 \sim O(\Delta t^{p_2})$ (generally $p = p_1$).

In other terms:

For one-step method (not true for multi-step):

$$\Phi \text{ Lipschitz continuous } \Rightarrow \text{ Method zero-stable} + \text{Consistency} \Rightarrow \text{CONVERGENCE}$$

$\Rightarrow$ If $\Phi$ is Lipschitz continuous, consistency $\Rightarrow$ convergence.

## The Concept of Absolute Stability

The zero-stability is a property of the numerical scheme, required by the presence of roundoff errors and other possible perturbations.

However, there is another (maybe more engineering) concept of stability related to the nature of the problem to solve.

In simple words, we want that, if a problem is asymptotically stable, the numerical approximation is asymptotically stable too.

Is this happening? Let's consider the prototype of asymptotically stable problem (Model Problem).

Let's consider the Cauchy problem:

$$\begin{cases}
\frac{dy}{dt} = \lambda y & t > 0 \\
y(0) = y_0
\end{cases}$$

We know that the solution is asymptotically stable for $\lambda < 0$ $(y_{ex} = y_0 e^{\lambda t} \xrightarrow{t \to \infty} 0 \text{ for } \lambda < 0)$

In fact: $\frac{dz}{dt} = \lambda z$ with $z(0) = y_0 + \varepsilon \Rightarrow z - y = \varepsilon e^{\lambda t} \xrightarrow{t\to\infty} 0$ for $\lambda < 0$.

### Remark

For a system: $\begin{cases} \frac{d\mathbf{y}}{dt} = A\mathbf{y} & \mathbf{y} \in \mathbb{R}^n \\ \mathbf{y}(0) = \mathbf{y}_0 & A \in \mathbb{R}^{n \times n} \end{cases}$

the asymptotic stability is guaranteed if THE REAL PART OF ALL THE EIGENVALUES is negative.

To be general, from now on we will consider $\lambda \in \mathbb{C}$ also for the scalar case. In particular, the left-plane $\text{Real}(\lambda) < 0$ is the region of the complex plane where the original problem is asymptotically stable.

#### Question: is the solution of the model problem with Explicit Euler asymptotically vanishing as the exact solution?

Notice that the question is not related to the behavior of the solution for $\Delta t \to 0$, but for $\Delta t$ given and $t \to +\infty$.

Let's see:
$$\frac{dy}{dt} = \lambda y \quad \text{EE}: \frac{u_{i+1} - u_i}{\Delta t} = \lambda u_i$$

$$u_{i+1} = (1 + \lambda \Delta t) u_i \quad (\text{Re}(\lambda) < 0)$$

$$|u_{i+1}| = |1 + \lambda \Delta t| |u_i| \Rightarrow |u_{i+1}| = |1 + \lambda \Delta t|^{i+1} |u_0|$$

The solution asymptotically vanishes if $|1 + \lambda \Delta t| < 1$

Intuitively, if $\lambda$ is Real and negative:

$$|1 + \lambda \Delta t| < 1$$
$$\Downarrow$$
$$-1 < 1 + \lambda \Delta t < 1$$
$$\Downarrow$$
$$-2 < \lambda \Delta t < 0$$
$$\Downarrow$$
$$\Delta t < \frac{2}{|\lambda|}$$

So, if $\Delta t > \frac{2}{|\lambda|}$ the numerical solution is not stable.

For $\lambda$ complex, we can draw the region of the plane $\lambda \Delta t$ where the solution is stable.

![Complex plane diagram showing unit circle with center at (-1,0)]

Unit circle with center in $(-1, 0)$

(In magenta the region of stability of the problem).

So, the method is reproducing the asymptotic behavior of the exact solution ONLY UNDER THE CONDITION THAT:

$$\lambda \Delta t \in \text{Unit Circle centered in } (-1, 0).$$

#### What happens with Implicit Euler?

$$\frac{1}{|1 - \lambda \Delta t|} < 1 \quad \forall \Delta t,$$

so $u^{n+1} \xrightarrow{n \to \infty} 0 \quad \forall \Delta t$

There is a big difference between the two Eulers: one is stable under some conditions, the other is unconditionally stable.

#### What about Crank-Nicolson?

$$u^{n+1} = u^n + \Delta t \frac{\lambda u^{n+1} + \lambda u^n}{2} \Rightarrow u^{n+1} = \frac{1 + \frac{\Delta t}{2}\lambda}{1 - \frac{\Delta t}{2}\lambda} u^n$$

Again, for $\lambda \in \mathbb{C}$ we have:

$$\left|\frac{1 + \frac{\Delta t}{2}\lambda}{1 - \frac{\Delta t}{2}\lambda}\right| < 1 \quad \forall \Delta t$$

so also CN is stable with no condition.

## DEFINITION

A method is said to be ABSOLUTELY STABLE if the solution of the model problem $\frac{dy}{dt} = \lambda y$ vanishes asymptotically when $t \to +\infty$.

We say that the method is UNCONDITIONALLY ABSOLUTELY STABLE if this happens $\forall \Delta t > 0$. On the contrary, it is said to be CONDITIONALLY STABLE if we have limitations on $\Delta t$.

## Another Example: Heun

$$u^{n+1} = u^n + \frac{\Delta t}{2}(\lambda(u^n + \Delta t \lambda u^n) + \lambda u^n) = \left(1 + \Delta t \lambda + \frac{\Delta t^2 \lambda^2}{2}\right) u^n$$

Now, consider the curve $\frac{\Delta t^2 \lambda^2}{2} + \Delta t \lambda + 1$ for $\lambda < 0$

We see that we need:

$$0 < \Delta t < \frac{2}{|\lambda|}$$

(as for Explicit Euler).

In the complex plane, the region is slightly larger than for Explicit Euler.

## REMARK: We found that the explicit methods are conditionally stable, while the implicit ones are unconditionally stable.

In general, we do not have unconditionally stable explicit methods, but we do have implicit methods that are only conditionally stable.

The region of absolute stability is the portion of $\mathbb{C}^-$ for $\lambda \Delta t$ to belong to such that the method is absolutely stable. Unconditional absolute stability (a.k.a A-stability) is when this region is the entire left plane $\mathbb{C}^-$.

The concept of absolute stability somehow clarifies what are the criteria to select a method for a problem.

In fact, let's first consider the general case(s):

1. $\frac{dy}{dt} = f(t,y) \simeq f(t,y_0) + \frac{\partial f}{\partial t}(t-t_0) + \frac{\partial f}{\partial y}(t,y_0)(y-y_0)$

   so we can locally take $\lambda \simeq \frac{\partial f}{\partial y}(t,y_0)$

2. For a system: $\frac{d\mathbf{y}}{dt} = A \mathbf{y} \Rightarrow \lambda = eig(A)$

3. $\frac{d\mathbf{y}}{dt} = \mathbf{F}(t,\mathbf{y})$ (nonlinear system)

   $\Rightarrow \lambda = eig\left(\frac{\partial \mathbf{F}}{\partial \mathbf{y}}(t_0, y_0) \right)$ - Jacobian

Now, for a general problem, we have:

| Method | Nature | Accuracy | Limitations on $\Delta t$ |
|--------|--------|----------|--------------------------|
| FE     | Explicit | 1      | $\Delta t < \frac{2}{|\lambda|}$ |
| BE     | Implicit | 1      | NO |
| CN     | Implicit | 2      | NO |
| H      | Explicit | 2      | $\Delta t < \frac{2}{|\lambda|}$ |

Implicit Methods are more computationally expensive.

In an extreme synthesis:

![Comparison of FE and BE with timeline]

With FE each step is low-cost (Explicit) but we may need to do many for the conditional stability.

With BE each step is more expensive, but we need to do (generally) fewer steps.

$\Rightarrow$ The optimal choice is largely problem dependent.

# Multistep Methods

The mid-point method is just an example of multi-step methods:

$$u_{n+1} = u_{n-1} + 2\Delta t \, f(t_n, u_n)$$

In general, a multistep method with $p$ steps take the form:

$$u_{n+1} - \sum_0^p a_j u_{n-j} = \Delta t \sum_{j=-1}^p b_j f(t_{n-j}, u_{n-j})$$

The method is IMPLICIT when $b_{-1} \neq 0$.

## Example:

$$y(t_{n+1}) = y(t_{n-1}) + \int_{t_{n-1}}^{t_{n+1}} f(\tau, y(\tau)) d\tau$$

$$\Downarrow \text{ SIMPSON}$$

$$u_{n+1} = u_{n-1} + 2\Delta t \frac{f(t_{n+1}, u_{n+1}) + 4f(t_n, u_n) + f(t_{n-1}, u_{n-1})}{6} =$$

$$= u_{n-1} + \frac{\Delta t}{3}(f(t_{n+1}, u_{n+1}) + 4f(t_n, u_n) + f(t_{n-1}, u_{n-1}))$$

$$\mathbf{a} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} a_0, a_1 \quad \mathbf{b} = \begin{bmatrix} \frac{1}{3} \\ \frac{4}{3} \\ \frac{1}{3} \end{bmatrix} b_{-1}, b_0, b_1$$

In general, we have two approaches for deriving a Multi-step methods:

## BDF (Backward Difference Formulas)

$$\frac{dy}{dt}(t_{n+1}) = f(t_{n+1}, u_{n+1})$$
$$\downarrow$$
approximate this with a backward finite difference, e.g.,

$$\frac{dy}{dt}(t_{n+1}) \simeq \frac{\frac{3}{2}u_{n+1} - 2u_n + \frac{1}{2}u_{n-1}}{\Delta t}$$

$$\Rightarrow u_{n+1} = \frac{4}{3}u_n - \frac{1}{3}u_{n-1} + \Delta t f(t_{n+1}, u_{n+1})$$

They are all in the form:

$$\mathbf{b} = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$$

## Adams

In this case, we start from:

$$y(t_{n+1}) = y(t_n) + \int_{t_n}^{t_{n+1}} f(\tau, y(\tau)) d\tau$$

Now, we replace $f$ with an interpolation:

1. We interpolate $f$ over the nodes: $n-p, n-p+1, ... n$ so to have an explicit method (Adams-Bashforth)
2. We interpolate $f$ over the nodes: $n-p, n-p+1, ... n, n+1$

Adams methods have always:

$$\mathbf{a} = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$$

## A Rapid Recall of Difference Equations Theory

A linear difference equation is an equation in the form:

$$u_{n+p} + a_{n+p-1}u_{n+p-1} + a_{n+p-2}u_{n+p-2} + \ldots + a_0u_n = \varphi_{n+p}$$

where the solution is the set $\{u_j\}$ and initial conditions $u_0, u_1, \ldots u_{p-1}$ are given.

The theory on difference equations has several similarities with the theory on differential equations. In particular, the general solution of a linear difference equation is the linear combination of a particular solution of the equation and the general solution of the homogeneous one.

The general solution of the homogeneous takes the form:

$$u_n = \sum_{j=0}^{N}\left(\sum_{s=0}^{m_j-1} V_{js}n^s \right)r_j^n$$

where $r_j$ are the roots of:

$$r^p + a_{p-1}r^{p-1} + a_{p-2}r^{p-2} + \ldots + a_0 = 0$$

and
- $N$ is the number of distinct roots
- $m_j$ is the multiplicity of $r_j$

We will see a strong connection between this theory and the analysis of the linear multi-step methods.

In fact, a LMM reads like:

$$u_{n+1} - \sum_{j=0}^p a_j u_{n-j} = \Delta t \sum_{j=-1}^p b_j f_{n-j}$$

If we consider the model problem, we are lead to the linear difference equation:

$$u_{n+1} - \sum_{j=0}^p a_j u_{n-j} - \Delta t \lambda \sum_{j=-1}^p b_j u_{n-j} = 0$$

so we need to solve exactly a linear difference equation.

More precisely, we still define the LTE as the residual of the exact solution in the numerical scheme:

$$\Delta t \, \tau_{n+1} = y_{ex}(t_{n+1}) - \sum_{j=0}^p a_j y_{ex}(t_{n-j}) - \Delta t \sum_{j=-1}^p b_j \frac{dy_{ex}}{dt}(t_{n-j})$$

The method is CONSISTENT when $\tau_{n+1} \xrightarrow{\Delta t \to 0} 0 \quad \forall n$

## Zero-Stability Definition

The definition of zero-stability is similar to the one for One-step Methods.

Also, we define:

First characteristic polynomial:

$$\rho(z) = z^{p+1} - \sum_{j=0}^p a_j z^{p-j}$$

Second characteristic polynomial:

$$\sigma(z) = b_{-1}z^{p+1} - \sum_{j=0}^p b_j z^{p-j}$$

and the polynomial: $\Pi(z) = \rho(z) - \Delta t \lambda \sigma(z)$
(this is the polynomial found for the model problem)

Based on this we define:

**Root Condition**: Call $r_i$ the roots of $\rho(z)$. The polynomial (or the associated LMM) fulfills the root condition when:

(1) $|r_i| \leq 1 \quad \forall i$
(2) The roots with $|r| = 1$ have multiplicity 1.

**Strong Root Condition**:
In addition to the R.C., only $r_0$ is s.t. $|r_0| = 1$, all the other roots $|r_j| < 1$ $(j > 1, \ldots, p)$.

**Absolute R.C.**: $\exists \Delta t \leq \overline{\Delta t}$ s.t. all the roots $r_j(\Delta t)$ of $\Pi_{\Delta t}(z)$ are s.t. $|r_j(\Delta t)| < 1$, $j = 0, \ldots, p$, $\Delta t \leq \overline{\Delta t}$.

## Analysis of Multistep Methods

We have a sequence of theorems (no proofs):

1. A LMM is consistent if and only if:
   
   $$\sum_{j=0}^p a_j = 1 \quad -\sum_{j=0}^p j a_j + \sum_{j=-1}^p b_j = 1$$
   
   Also, the method is at least of order $p$ if the solution is $\in C^{p+1}(I)$ and
   
   $$(*)\ \sum_{j=0}^p (j)^k a_j + k \sum_{j=-1}^p (j)^{k-1} b_j = 1 \quad k = 1, 2, \ldots q$$

   **Remark**: The condition $\sum_{j=0}^p a_j = 1$ means that the first characteristic polynomial $\rho(z)$ has at least one root in 1.

2. A consistent method is zero-stable if and only if it fulfills the root condition.

With Theorems (1) + (2) we have the convergence and order analysis.

(1) + (2): If the LMM method falls into (1) and (2) with condition (*) (not true for q+1) and the initial conditions ($u_i \to y_{ex}(t_i)$ $i = 0, \ldots, p$) converge to the exact ones with order $q$, the resulting method is convergent with order $q$.

**Remark (First Dahlquist Barrier)**: There is no zero-stable $p$-LMM with order
- $> p+1$ for $p$ odd
- $> p+2$ for $p$ even

Let's turn now to the Absolute stability.

3. The absolute root condition is necessary and sufficient for the absolute stability. In fact, if $\overline{\Delta t} = +\infty$, the absolute stability is unconditional.

The analysis of a LMM is completed by analyzing the coefficients of the method and the roots of the two polynomials $\rho$ and $\Pi$.

The roots of $\Pi$ can be analyzed numerically (and are tabulated for most of the methods) by Matlab/Python subroutines.

SEE EXAMPLES
(NODEPY library in Python, QSS in Matlab)

**Remark (Second Dahlquist Barrier)**: There are no explicit LMM absolutely unconditionally stable. There are no LMM absolutely unconditionally stable with order $q > 2$.

## A Clarification on Stability Concepts

To clarify the different stability concepts:

1. Zero-stability:
   
   $$|u_j| \leq C_{T_{fin}} (|u_0| + \ldots |u_p|)$$
   
   where the $C$ may depend on $T_{fin}$

2. Absolute stability:
   
   $$C_{T_{fin}} \xrightarrow{T_{fin} \to \infty} 0$$

3. $C$ is bounded independently of $T_{fin}$
   
   We call this "relative stability"

$$\text{for a consistent scheme} \quad \text{R.C.} \Leftarrow \text{Strong R.C.} \Leftarrow\text{A.R.C.}$$
$$\text{CONVERGENCE} \Leftarrow \text{Zero-Stability} \Leftarrow \text{Relative Stability} \Leftarrow \text{Absolute Stability}$$

## Example (Extreme)

Mid-point:

$$u_{n+1} = u_{n-1} + 2\Delta t \, f(t_n, u_n)$$

$$a_0 = 0 \quad a_1 = 1 \quad \Rightarrow \rho(z) = z^2 - 1 = 0 \quad \Rightarrow \rho = \pm 1$$

R.C.: OK

$$\Pi_{\Delta t}(z) = z^2 - 2\lambda z - 1$$

The product of the two roots is always -1, if one root is < 1 in magnitude, the other is > 1.

Unconditionally Absolutely UNSTABLE

## Predictor-Corrector Methods

A clear message from the previous examples is that, in general, explicit methods are less absolutely stable, they are never unconditionally stable and have smaller regions of stability.

However, let's reconsider implicit methods too.

For instance, let's consider a generic LMM:

$$u_{n+1} - \sum_{j=0}^p a_j u_{n-j} = b_{-1} \Delta t \, f(t_{n+1}, u_{n+1}) + \Delta t \sum_{j=0}^p b_j f(t_{n-j}, u_{n-j})$$

To solve this nonlinear equation, we could use a Newton method but also a fixed-point method and a natural candidate is the following:

$$u_{n+1}^{(m)} = \sum_{j=0}^p a_j u_{n-j} + \Delta t \sum_{j=0}^p b_j f_{n-j} + \Delta t b_{-1} f(t_{n+1}, u_{n+1}^{(m-1)})$$

Notice that this method converges if:

$$\left|\Delta t \, b_{-1} \, f'(t_{n+1}, u_{n+1}) \right| < 1$$

So we have the condition:

$$\Delta t < \frac{1}{|b_{-1}||f'|}$$

Even if the method is unconditionally stable, we may have a condition on $\Delta t$ for the convergence of the fixed-point.

In any case, a good initial condition is required, because with a good $u^{(0)}$ the number of iterations can be reduced: an explicit method can be used to this.

These considerations lead to the design of a new class of methods, Heun being one of the possible examples.

Predictor [P] is an explicit method of order $q_P$

Corrector [C] is an implicit method of order $q_C$

Predictor Corrector method:

P: do one step of P $\Rightarrow u_{n+1}^{(0)}$

E: evaluate $f(t_{n+1}, u_{n+1}^{(0)})$

C: compute $m$ fixed-point iterations of C

Optional: E: compute $f_{n+1} = f(t_{n+1}, u_{n+1}^{(m)})$

These methods go under the name of $\text{PEC}^m$ or $\text{PEC}^m\text{E}$ if the last step is taken.

## Examples:

P = Adams-Bashforth of order 2
C = Adams-Moulton of order 3
$m = 1$

PEC:
$$\begin{cases}
u_{n+1}^{(0)} = u_n^{(1)} + \frac{\Delta t}{2}(3f_n^{(0)} - f_{n-1}^{(0)}) \\
f_{n+1}^{(0)} = f(t_{n+1}, u_{n+1}^{(0)}) \\
u_{n+1}^{(1)} = u_n^{(1)} + \frac{\Delta t}{12}(5f_{n+1}^{(0)} + 8f_n^{(0)} - f_{n-1}^{(0)})
\end{cases}$$

PECE:
$$\begin{cases}
u_{n+1}^{(0)} = u_n^{(1)} + \frac{\Delta t}{2}(3f_n^{(1)} - f_{n-1}^{(1)}) \\
f_{n+1}^{(0)} = f(t_{n+1}, u_{n+1}^{(0)}) \\
u_{n+1}^{(1)} = u_n^{(1)} + \frac{\Delta t}{12}(5f_{n+1}^{(0)} + 8f_n^{(1)} - f_{n-1}^{(1)}) \\
f_{n+1}^{(1)} = f(t_{n+1}, u_{n+1}^{(1)})
\end{cases}$$

A natural question is: what is the accuracy of $\text{PEC}^m$ or $\text{PECE}^m$? What is the region of absolute stability?

**Theorem (Accuracy)**: $\text{PECE}$ methods have (under regularity assumptions on the solution) order of accuracy:

$$q_{PC} = min(q_P + m, q_C)$$

For the region of absolute stability, in general:

$$\text{Region}(P) \subseteq \text{Region}(\text{PECE}) \subseteq \text{Region}(C)$$

and $\text{Region}(\text{PECE}) \xrightarrow{m \to +\infty} \text{Region}(C)$

## Runge-Kutta Methods

Heun is also an RK method:

$$u_{n+1} = u_n + \Delta t\left(f_n + f(t_{n+1}, u_n + \Delta t f_n)\right)$$

This is a 2nd order method but the accuracy is not obtained using more steps, but giving up the linearity of the method.

In general, RK are in the form:

$$u_{n+1} = u_n + \Delta t \, \mathbf{K} \cdot \mathbf{b}$$

where $\mathbf{K}, \mathbf{b} \in \mathbb{R}^s$

and $[\mathbf{K}]_i = f(t_n + c_i \Delta t, u_n + \Delta t[A\mathbf{K}]_i)$

where $[\mathbf{A}\mathbf{K}]_i$ is the $i^{th}$ entry of the vector $\mathbf{A}\mathbf{K}$

The method is characterized by:
$s$ (stages), $\mathbf{b}$, $\mathbf{c}$ and $\mathbf{A} \in \mathbb{R}^{s \times s}$

In particular, the three "ingredients" are generally written as:

$$\frac{\mathbf{c} | \mathbf{A}}{\mathbf{b}^T} \quad \text{(Butcher array)}$$

It is assumed that $c_i = \sum_{j=1}^s a_{ij} \quad \forall i = 1, \ldots s$

If $\mathbf{A}$ is such that $a_{ij} = 0 \quad \forall j \geq i$ then:

$$K_i = [\mathbf{K}]_i = f(t_n + \Delta t c_i, u_n + \Delta t \sum_{j < i} a_{ij} K_j)$$

so the computation of $K_i$ is immediate. We call this case an explicit RK scheme.

If $a_{ij} = 0 \quad \forall j > i$, then:

$$K_i = [\mathbf{K}]_i = f(t_n + \Delta t c_i, u_n + \Delta t \sum_{j < i} a_{ij} K_j + \Delta t a_{ii} K_i)$$

so we need to solve a non-linear equation to obtain $K_i$. We call this a semi-implicit method.

In general, computing $\mathbf{K}$ requires the solution of a non-linear system (implicit method).

Clearly, the computational cost increases in the three cases.

## Derivation of an Explicit RK Method

A possible strategy to devise an explicit method is to maximize the order of the LTE with Taylor expansion analysis.

For instance, for $s = 2$:

$$\begin{pmatrix} 0 & 0 & 0 \\ c_2 & a_{21} & 0 \\ \hline & b_1 & b_2 \end{pmatrix}$$

We have three parameters, but we set $a_{21} = c_2$.

$$u_{n+1} = u_n + \Delta t(b_1 f(t_n, u_n) + b_2 f(t_n + c_2 \Delta t, u_n + \Delta t c_2 f(t_n, u_n)))$$

$$y_{ex}(t_n) = y_{ex}(t_n) + \Delta t \frac{dy_{ex}}{dt}(t_n) + \frac{\Delta t^2}{2}\frac{d^2y_{ex}}{dt^2}(t_n) + \frac{\Delta t^3}{3!}\frac{d^3y_{ex}}{dt^3}(t_n) + H.O.T.$$

$$f(t_n + c_2 \Delta t, u_n + \Delta t c_2 f(t_n, u_n)) =$$

$$= f(t_n, u_n) + \frac{\partial f}{\partial t}(t_n, y_n)c_2 \Delta t + \frac{\partial f}{\partial y}(t_n, y_n)c_2 \Delta t f(t_n, u_n) =$$

Notice that:
$$\frac{d^2y}{dt^2} = \frac{df}{dt} = \frac{\partial f}{\partial t} + \frac{\partial f}{dy}\frac{dy}{dt} = \frac{\partial f}{\partial t} + \frac{\partial f}{\partial y}f$$

$$\Rightarrow f(t_n, u_n) + c_2 \Delta t \frac{d^2y}{dt^2}(t_n)$$

The Taylor expansion applied to the scheme reads:

$$u_{n+1} = u_n + \Delta t(b_1 + b_2)f + c_2 b_2 \Delta t^2 \frac{d^2y}{dt^2}$$

We match therefore the first terms of the Taylor expansion for:

$$\begin{align}
b_1 + b_2 &= 1 \\
b_2 c_2 &= \frac{1}{2}
\end{align}$$

For $b_2 = \frac{1}{2}$ we obtain the Heun method.

The L.T.E is $\Delta t \, \tau \sim O(\Delta t^3)$

so the method is 2nd order.

Implicit methods can be devised from Gaussian quadratures.

## Analysis of RK

**CONSISTENCY**: As the previous example shows, we need $\sum b_i = 1$. This is necessary and sufficient for the consistency.

**ZERO-STABILITY**: RK are One-Step methods, if $f$ is Lipschitz-Continuous, they are zero-stable.

**ORDER**: In general, the order we can obtain depends on the number of stages in a (non-trivial) way:

| Explicit RK: | ORDER | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|--------------|-------|---|---|---|---|---|---|---|---|
| $s_{min}$    |       | 1 | 2 | 3 | 4 | 6 | 7 | 9 | 11|

$s_{min}$ = minimum number of stages to obtain the corresponding order.

## ABSOLUTE STABILITY

If we write the method for the model problem, we can write:

$$u_{n+1} = \mathcal{R}(\Delta t \lambda) u_n$$

The region of absolute stability is, in general, the non-trivial region where $|\mathcal{R}(\Delta t \lambda)| < 1$ (in $\mathbb{C}$).

## Why are RK so popular?

RK are extremely popular, because they can be high order with "only" one-step.

One-step means that:
- we do not need high-order approximation of the initial data needed by LMM (the initial condition is enough)
- we can easily perform the time-step ADAPTIVITY (much more difficult with LMM).

For the adaptivity, there are smart combinations of RK that obtain the adaptivity (i.e. an error estimate to adapt the step) in an efficient way.

One of the most popular is:
RK45 Fehlberg: smart combination of an explicit method of order 4 and an explicit of order 5 to adapt the step.

## A Final Note on Stiff problems

Many of the concepts used here can be extended to systems of ODEs:

$$\begin{cases}
\frac{d\mathbf{y}}{dt} = \mathbf{F}(t, \mathbf{y}) \\
\mathbf{y}(0) = \mathbf{y}_0
\end{cases}$$

In the case of a linear ODE system:

$$\mathbf{F} = A \, \mathbf{y} \quad \downarrow \quad \text{matrix}$$

There is, however, an important concept to clarify.

Consider a simple 2×2 problem:

$$\frac{d\mathbf{y}}{dt} = A\mathbf{y}$$

where $A$ has the two eigenvalues: $\begin{cases} \lambda_1 = -10^6 \\ \lambda_2 = -1 \end{cases}$

If we use Explicit Euler:

$$\mathbf{y}^{n+1} = \mathbf{y}^n + \Delta t \, A \mathbf{y}^n$$

the region of absolute stability is:

$$\Delta t \leq \min\left(\frac{2}{10^6}, \frac{2}{1}\right) = 2 \cdot 10^{-6}$$

The solution, on the other hand, is the linear combination of the two functions:

$$e^{-10^6 t}, e^{-t}$$

[Graph showing rapid decay of $e^{-10^6 t}$ vs slower decay of $e^{-t}$]

To capture the fast dynamics ($\lambda = 10^{-6}$), that fades away immediately, we need to take $\Delta t \sim 10^{-6}$!!!

An explicit method is certainly not a good choice here.

In general, we say that a problem is "stiff" when it may require very stringent time-step in a non-efficient way. The name "stiff" originates from the coupling of springs with different stiffness:

[Simple diagram of a mass connected to two springs with different spring constants]

to study the dynamics of the two real balls, one can write an ODE system.

If $K_1 << K_2$ this is a stiff problem.

## EXERCISE on LMM

Consider the following family of methods (LMM):

$$u_{n+1} = \alpha u_n + (1-\alpha)u_{n-1} + \Delta t \, \gamma f_{n+1}$$

1. Investigate the convergence properties of the method as function of $\alpha$ and $\gamma$.

**Sol**: For $\alpha \neq 1$, the method is 2-step.
For $\gamma \neq 0$, the method is implicit.

It's a LMM with: $\mathbf{a} = \begin{bmatrix} \alpha \\ 1-\alpha \\ 0 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$, $\mathbf{b} = \begin{bmatrix} \gamma \\ 0 \\ 0 \end{bmatrix} \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}$

Consistency:
$\sum a_j = 1$: $\alpha + (1-\alpha) = 1$ ✓OK
$-\sum j a_j + \sum b_j = 1$: $0 \cdot \alpha - 1 \cdot (1-\alpha) + \gamma = 1$
$\Rightarrow \gamma = 2 - \alpha$

The methods:
$u_{n+1} = \alpha u_n + (1-\alpha)u_{n-1} + \Delta t (2-\alpha)f_{n+1}$
are consistent.

Order: $\sum (j)^2 a_j + 2\sum (-j)^1 b_j = 1$ ?
$\Rightarrow (1-\alpha) + 2(2-\alpha) = 1 \Rightarrow \alpha = \frac{4}{3}, \gamma = \frac{2}{3}$

2. Investigate the absolute stability of the method with order 2.

The method:
$u_{n+1} = \frac{4}{3}u_n - \frac{1}{3}u_{n-1} + \Delta t \frac{2}{3}f_{n+1}$

is of order 2 (it is, in fact, a BDF of order 2).

$\rho(z) = z^2 - \frac{4}{3}z + \frac{1}{3} = 0 \quad r_{1,2} = \frac{\frac{4}{3} \pm \sqrt{\frac{16}{9} - \frac{4}{3}}}{2} = \frac{4 \pm 2}{6} = \frac{2 \pm 1}{3}$

R.C. ✓

$\Pi_{\Delta t}(z) = z^2 - \frac{4}{3}z + \frac{1}{3} - \Delta t \lambda \frac{2}{3}z^2 = 0$

Let's consider $\lambda \in \mathbb{R}^-$:

$(3 - \Delta t \lambda 2)z^2 - 4z + 1 = 0$

$z^2 - \frac{4z}{3 + 2\Delta t|\lambda|} + \frac{1}{3 + 2\Delta t|\lambda|} = 0$

$r_1 \cdot r_2 = \frac{1}{3 + 2\Delta t|\lambda|}$

$r_1 = \frac{2 + \sqrt{1 - 2\Delta t|\lambda|}}{3 + 2\Delta t|\lambda|} \xrightarrow{\Delta t \to 0} 1$

$|r_1(\Delta t)| < 1 \quad \forall \Delta t > 0$

$r_2 = \frac{2 - \sqrt{1 - 2\Delta t|\lambda|}}{3 + 2\Delta t|\lambda|} \xrightarrow{\Delta t \to 0} \frac{1}{3}$

$|r_2(\Delta t)| < \frac{1}{3}$

Method unconditionally stable (Verify with Python/Matlab).

3. Solve
$$\begin{cases}
\frac{dy}{dt} = -(1 + t_g(t))y & t \in [0, 1] \\
y(0) = 1
\end{cases}$$

with the BDF2 method found and verify your results, knowing that the exact solution is $y_{ex} = e^{-x}\cos(x)$.

Using MATLAB, the problem is easily solved with the QSS subroutines:

qssstab.m    (draws the region of absolute stability)
qssmulti.m   (solves with a generic LMM)

With Python there are many libraries: `SciPy`, `odeint` that uses RK, ode, and allows the selection of BDF methods, but generally with adaptive time step.

`NODEPY`  is potentially an excellent library but buggy.

It's excellent for drawing the stability region (see hmm.py on Canvas)

I have written a simple LMM solver with fixed-point iterations for implicit methods.

Using my-hmm.py you can verify that our method is 2nd order:

| max error | $3 \cdot 10^{-4}$ | $8 \cdot 10^{-5}$ | $2 \cdot 10^{-5}$ |
|-----------|-------------------|-------------------|-------------------|
| $\Delta t$| 0.05              | 0.025             | 0.0125            |

[Graph showing exact vs numerical solution]

[Stability region diagram showing a circle in the complex plane]
Red = Region of Stability

