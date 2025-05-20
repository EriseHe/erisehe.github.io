---
weight: "02"
---

## 1. Ok Honestly I Have No Idea Where He Started
> MATH 212 is useless 
> 					              - Alessandro Veneziani

Given the population problem #Implicit:

$$
\dfrac{d y}{d x} = A\left( 1 - \dfrac{y}{B}\right)y
$$
---
**Numerically**, the problem is:
$$
\frac{u_{i+1} - u_i}{\Delta t} = A \left(1 - \frac{u_{i+1}}{B} \right) u_{i+1}
$$
To solve this numerically, we rewrite the equation:
$$
\begin{align}
x - u_i &= A \left(1 - \frac{x}{B} \right) x \\
&= A x - \frac{A}{B} x^2
\end{align}
$$

using $f(x)=0$, and we iterate using Newton's method:
> yes he changed notation again

> [!remark|*] Newton's Method
>$$\underbrace{x^{(u+1)}}_{y_{\text{new}}}=\underbrace{x^{(u)}}_{y_{\text{old}}}-\frac{f(x^{(u)})}{f'(x^{(u)})}$$ 
>We have $|y_{\text{new}}-y_{\text{old}}|\leq \text{tol}.$

 $$
\begin{align}
x - u_i  & = \Delta t A \left(1 - \frac{x}{B} \right) x \\
 & = \Delta t A x - \Delta t \frac{A}{B} x^2 \\

\Longrightarrow \quad x - u_{i}-\Delta t A x + \Delta t \frac{A}{B} x^{2}&=0
\end{align}
$$
Define a function $g(x)$ from above:
$$
\begin{align}
g(x)  & = x - u_i - \Delta t A x + \Delta t \frac{A}{B} x^{2}\\
\end{align}
$$
Taking the derivative:
$$
\begin{align}
    g'(x) &= \frac{d}{dx} \left( x - u_i - \Delta t A x + \Delta t \frac{A}{B} x^2 \right) \\
    &= 1 - \Delta t \left(A - \frac{2A}{B} x \right) \\
    &= 1 - \Delta t f'(x).
\end{align}
$$
For $f^{\prime}(x)=A-\frac{2 A}{B} x$.

---
## 2. Approximate $\frac{d y}{d x}$ Using a Three-Point Backward Differentiation Formula (BDF)
> tracing back to last lecture on determination of coefficients $A, B, C$

$$
\begin{aligned}
f(t_{i},y_{i})=\left. \frac{dy}{dx} \right|_{x_i} &\approx \frac{3}{2 \Delta x} y_i - \frac{4}{2 \Delta x} y_{i-1} + \frac{1}{2 \Delta x} y_{i-2} \\ \\ 
\text{Taylor Expansion}\Longrightarrow\quad
&\left\{
\begin{aligned}
y_{i-1} &= y_i - \left. \frac{dy}{dx} \right|_{x_i} \Delta x \dots \\
y_{i-2} &= y_i - \left. \frac{dy}{dx} \right|_{x_i} 2 \Delta x \dots
\end{aligned}
\right.
\end{aligned}$$
we yield:
$$
\begin{align}
\frac{3}{2 \Delta x} u_i&-\frac{4}{2 \Delta x} u_{i-1}+\frac{1}{2 \Delta x} u_{i-2}=f\left(t_i , u_i\right)\\
\end{align}
$$

**Implicit formula:**
$$
u_i=\frac{4}{3} u_{i-1}-\frac{1}{3} u_{i-2}+\frac{2}{3} \Delta x\left(t_i, u_i\right)
$$
we substitute $f(t_{i},u_{i})=\lambda u_{i}$ to derive explicitly:  
$$\begin{align}
u_i - \frac{4}{3} u_{i-1} + \frac{1}{3} u_{i-2} - &\frac{2}{3} \Delta x f(t_i, u_i) = 0 \\
u_i - \frac{4}{3} u_{i-1} + \frac{1}{3} u_{i-2} - &\frac{2}{3} \Delta x \lambda u_{i} = 0 \\
\end{align}
$$
**Explicit formula:**
$$ 

\boxed{u_i = \frac{1}{1 - \frac{2}{3} \Delta x\lambda} \left( \frac{4}{3} u_{i-1} - \frac{1}{3} u_{i-2} \right) } 

$$

> [!definition|*] Generalized p-step BDF Form
>$$\boxed{u_i-\sum_{j=1}^{p} \alpha_j u_{i-j}=\Delta x \beta_{-1} f\left(t_i, u_i\right)} $$
Generalized Implicit Multistep Method: $$\boxed{u_{i+1}-\sum_{j=1}^p \alpha_j u_{i-j}=\Delta x \sum_{j={-1}}^p \beta_j f\left(t_{i-j}, u_{i+1-j}\right)}$$