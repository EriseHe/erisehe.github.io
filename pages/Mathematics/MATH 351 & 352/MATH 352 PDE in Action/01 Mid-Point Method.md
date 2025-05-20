---
weight: "01"
---

## Formula Derivation

<center>The derivative approximation:</center>

$$
\begin{aligned}
f(t_i, u_i) &= \frac{dy}{dt} \Big|_{t_i} \approx \frac{y(t_{i+1}) - y(t_{i-1})}{2\Delta t} + \mathcal{O}(\Delta t^2)
\end{aligned}
$$

Update formula:

$$
\begin{aligned}
u_{i+1} &= u_{i-1} + 2\Delta t f(t_i, u_i)
\end{aligned}
$$

---

### Initial Conditions

1. **Initial Condition Calculation**:
Given $y_0$
   $$
   \begin{aligned}
   u_2 &= y_0 + 2\Delta t f(t_1, u_1)
   \end{aligned}
   $$

2. **Predictor-Corrector Steps**:

   $$
   \begin{aligned}
   u_1^* &= y_0 + \Delta t f(t_0, y_0), \\
   u_1 &= y_0 + \frac{\Delta t}{2} (f(t_0, y_0) + f(t_1, u_1^*))
   \end{aligned}
   $$

---
### Two-Step Method

- **Higher-order method** that improves accuracy using information from two previous time steps.
- The method achieves **second-order accuracy** due to the central difference approximation.
---
# Absolute Stability

We consider the test equation:

$$
\begin{aligned}
\frac{dy}{dt} &= -\lambda y, \quad y(0) = y_0
\end{aligned}
$$

where $\lambda > 0$.

## Discretization

The numerical update formula is:

$$
\begin{aligned}
u_{n+1} &= u_{n-1} - 2\Delta t \lambda u_n
\end{aligned}
$$

Rearranging:

$$
\begin{aligned}
u_{n+1} + 2\Delta t \lambda u_n - u_{n-1} &= 0
\end{aligned}
$$

### Iterative Computation

Starting with initial conditions \($y_0$, $y_1$\):

$$
\begin{aligned}
   u_2 &= y_0 - 2\Delta t \lambda y_1, \\
   u_3 &= y_1 - 2\Delta t \lambda u_2, \\
   u_4 &= u_2 - 2\Delta t \lambda u_3, \\
   u_5 &= u_3 - 2\Delta t \lambda u_4
\end{aligned}
$$

This formulation helps analyze the stability of the numerical scheme by checking whether the sequence $u_n$ grows or decays as $n \to \infty$.

---
## Stability Analysis of the Numerical Scheme

We assume a solution of the form:

$$
\begin{aligned}
u_i &= C \beta^i
\end{aligned}
$$

### Substituting into the Recurrence Relation
$$
\begin{aligned}

\end{aligned}
$$
$$
\begin{aligned}
C \beta^{i+1} + C 2\Delta t \lambda \beta^i - C \beta^{i-1} &= 0\\
\beta^2 + 2\Delta t \lambda \beta - 1 &= 0 \quad \text{devided by $C \beta^{i-1}$.}
\end{aligned}
$$
This is a **characteristic equation** for the recurrence relation. And solving for $\beta$,

$$
\begin{aligned}
\beta &= \frac{-2\Delta t \lambda \pm \sqrt{(2\Delta t \lambda)^2 + 4}}{2}
\end{aligned}
$$
To ensure stability, we require:

$$
\begin{aligned}
|\beta_0|, |\beta_1| &\leq 1.
\end{aligned}
$$

---
### General Solution
Since the recurrence relation is second-order, the general solution is:
$$
\begin{aligned}
u_i &= C_0 \beta_0^i + C_1 \beta_1^i.
\end{aligned}
$$
From the initial conditions:

$$
\begin{aligned}
u_0 &= C_0 + C_1 = y_0, \\




   \nu_1 &= C_0 \beta_0 + C_1 \beta_1 = y_1
\end{aligned}
$$
which can be solved for $C_0$ and $C_1$.

---

## Stability Condition

For stability, the roots $\beta_0, \beta_1$ must satisfy:

$$
\begin{aligned}|\beta_0 \beta_1| &= 1.\end{aligned}
$$

From the characteristic equation:

$$
\begin{aligned}\beta_0 \beta_1 &= -\frac{1}{\beta_1}.
\end{aligned}
$$

Ensuring $|\beta| \leq 1$ determines the absolute stability region.

---
# Finite Difference Approximation and Stability Analysis

## Finite Difference Approximation

$$
\begin{aligned}
\alpha u_{i+1} + \beta u_i + \sigma u_{i-1} + \delta u_{i-2} &= (\alpha + \beta + \sigma + \delta) u_i + \mathcal{O}(\Delta t^5)
\end{aligned}
$$

## Time Discretization

$$
\begin{aligned}
\frac{du}{dt} \Big|_{t_i} &= \frac{u_i - u_{i-1}}{\Delta t} + \mathcal{O}(\Delta t^2)
\end{aligned}
$$

## Stability Analysis

$$
\begin{aligned}
\alpha + 4\beta &= 0, \\
\alpha &= -4\beta, \\
4\beta - 2\beta &= 1 \Rightarrow \beta = \frac{1}{2}, \quad \alpha = -2.
\end{aligned}
$$

These constraints ensure numerical stability and proper convergence of the finite difference scheme.
### Taylor Expansions
Applying Taylor expansions to express the function values at different time steps:
$$
\begin{aligned}
& \alpha\left[u_{i+1}=u_i-\left.\frac{d u}{d t}\right|_{t_i} \Delta t+\ldots\right] \\
& \beta\left[u_{i+2}=u_i-\left.\frac{d u}{d t}\right|_{t_i} 2 \Delta t+\ldots\right] \\
& \gamma\left[u_{i+3}=u_i-\left.\frac{d u}{d t}\right|_{t_i} 3 \Delta t+\ldots\right] \\
& \delta\left[u_{i+4}=u_i-\left.\frac{d u}{d t}\right|_{t_i} 4 \Delta t+\ldots\right]
\end{aligned}
$$
Summing these expansions, we obtain the system of equations,

$$
\left\{\begin{aligned}
-\alpha-2 \beta-3 \gamma-4 \delta & =1 \\
\alpha+4 \beta+8 \gamma+16 \delta & =0
\end{aligned}\right.
$$
