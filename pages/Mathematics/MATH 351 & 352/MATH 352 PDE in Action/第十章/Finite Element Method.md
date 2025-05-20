## Order of Convergence in Finite Elements

The order of convergence of finite element:

- Denote $p$ as the number of points we use to do Lagrange interpolation
- Denote $s$ as the order of space we search for solution: $u \in H^s(\Omega)$

The relation is denoted as follows:

| $q$ \ $s$ | 1 | 2 | 3 |
|-----------|---|---|---|
| 1         | 1 | 1 | 1 |
| 2         | 1 | 2 | 2 |
| 3         | 1 | 2 | 3 |

*optimal*

## Error Estimation

We have:

$$||u_{ex} - u_h|| \leq h^{\min(s,p)}$$

How to determine which space $u_h$ is in:
- If $u_h$, $u'_h$, $u''_h$ $\in L^2(\Omega)$ but $u'''_h \not\in L^2(\Omega)$ 
- We can say the function $u_h \in H^2(\Omega)$

## Finite Element for 2D Poisson Equation

$$\begin{cases}
-\Delta u = f \quad \text{in } \Omega \\
u = 0 \quad \text{on } \partial\Omega
\end{cases}$$

### Weak Formulation

Let $v \in H^1_0(\Omega)$, then:

$$a(u,v) = F(v) \quad \forall v \in V$$

where:

$$a(u,v) = \int_\Omega \nabla u \cdot \nabla v \, dx \quad \text{and} \quad F(v) = \int_\Omega f v \, dx$$

## Step 2: Triangulation

Conforming triangulation of $\Omega$ is a finite family: $T_h = \{K\}$

Remind: $\Omega = \cup_{K \in T_h} K$ and $K \cap K' = \emptyset$ if $K \neq K'$

Should have no overlap and share vertex and edge.
- No hanging node.

For each element:
$$h_K = \text{diameter}(K) = \sup_{x,y \in K} ||x-y||_2$$

## Step 3: Interpolation

For different polynomial orders:
- $p=1 \Rightarrow$ use 3 nodes (corners)
- $p=2 \Rightarrow$ use 6 nodes
- $p=3 \Rightarrow$ use 10 nodes

Then we have basis functions:
- $\phi_{(2,0,0)} = 2\lambda_1^2$
- $\phi_{(1,1,0)} = 2\lambda_1\lambda_2$

## Step 4: Map Basis Function to Physical Triangle

Define $\hat{K} = \{(\hat{x}_1, \hat{x}_2) \in \mathbb{R}^2 | \hat{x}_1, \hat{x}_2 \geq 0, \hat{x}_1+\hat{x}_2 \leq 1\}$

$\hat{\lambda}_1 = \hat{x}_1$, $\hat{\lambda}_2 = \hat{x}_2$, $\hat{\lambda}_3 = 1-\hat{x}_1-\hat{x}_2$

Then we have:

Define $v_1, v_2, v_3 \in \mathbb{R}^2$ that be triangle $K$

$x = F_K(\hat{x}) = A_K\hat{x} + b_K$ for

$A_K = (v_1-v_3, v_2-v_3) \in \mathbb{R}^{2\times 2}$, $b_K = v_3$

Then we have: $\phi^K_\alpha(x) = A_K^{-T} \hat{\phi}_\alpha(F_K^{-1}(x))$

And $\nabla x = A_K^T \nabla_{\hat{x}}$

$F_K$ can be viewed as:

$(\lambda_1, \lambda_2, \lambda_3) = (\hat{x}_1, \hat{x}_2, 1-\hat{x}_1-\hat{x}_2)$ define a triangle in canonical coordinate.

Let $v_1 = (x_1, y_1)$, $v_2 = (x_2, y_2)$, $v_3 = (x_3, y_3)$

$\lambda_1, \lambda_2, \lambda_3$ is the solution of:

$x = \lambda_1 v_1 + \lambda_2 v_2 + \lambda_3 v_3$, $\lambda_1 + \lambda_2 + \lambda_3 = 1$

Then $\lambda_1 = \frac{(x_2-x_3)(y-y_3)-(y_2-y_3)(x-x_3)}{det}$

$\lambda_2 = $ same idea

$\lambda_3 = 1-\lambda_2-\lambda_1$

### Basis Function Properties

$\phi_{i,j,k}(\lambda_1, \lambda_2, \lambda_3) = \frac{p!}{i!j!k!} \lambda_1^i \lambda_2^j \lambda_3^k$

$\phi_{i,j,k}^K$ (at node) = 1 and $\phi_{i,j,k}^K$ (other node) = 0

$\phi_{i,j,k}^K$ (other node) = 0

The after the map we have:

$F_K(\hat{x}) = A_K\hat{x} + b_K = x$ ... change of variable

Then $F(v) = \sum_{a=1}^{node} a_i \phi_i^K(x) \phi_j^K(x) \cdot u$

For which:

$$a(\phi_i^K(x), \phi_j^K(x)) = \int \nabla \phi_j^K \nabla \phi_i^K \, dx_1dx_2$$

$$= \int A^{-T} \nabla \phi_i \cdot A^{-T} \nabla \phi_j \cdot |det(A)| \, d\hat{x}_1d\hat{x}_2$$

## Convection-Diffusion in 1D Finite Element

$$\frac{\mu}{2} \frac{\partial^2 u}{\partial x^2} + v \frac{\partial u}{\partial x} = f(x,t) \quad \text{for } u(0) = u(L) = 0$$

Choose test function and make weak formulation: $H_0^1(0,L)$

$$\int_0^L (\frac{\mu}{2} u_{xx} + v u_x) w \, dx = \int_0^L f w \, dx$$

$$\frac{\mu}{2} \int_0^L u_{xx} \cdot w \, dx + v \int_0^L u_x \cdot w \, dx = \int_0^L f w \, dx$$

Finite element approximation:

$$u(x) \approx u_h(x) = \sum_{j=1}^{N-1} U_j \phi_j(x)$$

We can plug into weak form:

$$\sum_j \frac{\mu}{2} \int_0^L \phi_j' \phi_i' \, dx \, U_j + \sum_j v \int_0^L \phi_j' \phi_i \, dx \, U_j = \int_0^L \phi_i f \, dx$$

### Exploring the Integral

Suppose $\phi_i'(x) = \frac{1}{h}$, $\phi_{i+1}'(x) = \frac{1}{h}$, $\phi_{i-1}'(x) = -\frac{1}{h}$

1. For $i=j$:
   $$\int_{x_{i-1}}^{x_i} \phi_i'^2 = \frac{1}{h^2} \text{ on } [x_{i-1}, x_i]$$

2. For $i=j+1$:
   $$\int_{x_{i-1}}^{x_i} \phi_i' \phi_j' = -\frac{1}{h^2} \text{ on } [x_{i-1}, x_i]$$

3. For range $[x_i, x_{i+1}]$:
   $$\int_{x_i}^{x_{i+1}} \phi_i'^2 = \frac{1}{h^2} \text{ for } i=j$$
   $$\int_{x_i}^{x_{i+1}} \phi_i' \phi_j' = -\frac{1}{h^2} \text{ for } i=j+1$$

Combine together, we get:

$$\int_{x_{i-1}}^{x_{i+1}} \phi_i' \phi_j' = \frac{2}{h^2} [-1, 2, -1]$$

Same idea for $\int \phi_i' \phi_j$ but don't have $v$ because only have one $\phi_j'$.

Then the equation for FEM:

$$-\frac{\mu}{2} \frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + v \frac{u_{i+1} - u_{i-1}}{2} = 0$$

### Remind

$\frac{1}{\Delta x}$ (finite element) = finite difference

### Stability

We also require Peclet < 1:

$$\frac{|v| \Delta x}{2\mu} < 1$$

## Reaction-Diffusion Problems

We can also apply upwind method and we can achieve absolute stability.

### Reaction-Diffusion Problem

$$-\mu u'' + \sigma u = f \quad f \in L^2(\Omega)$$

Finite difference method:

$$-\mu \frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \sigma u_i = f(x_i)$$

$$(A\mu + \sigma I) \cdot u_i = f_i$$

This is absolutely stable.

### Finite Element Equation

$$A_{ij} = \frac{\mu}{2} \int_0^1 \phi_i' \phi_j' \, dx + \sigma \int_0^1 \phi_i \phi_j \, dx$$

$$F_i = \int_0^1 f \phi_i \, dx \quad \text{then we have } AU = F$$

We can write in this form:

$$-\mu \cdot \frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \frac{\sigma \Delta x}{6}(u_{i+1} + 4u_i + u_{i-1}) = \int f v$$

In this case the Peclet number is:

$$\frac{\sigma \Delta x^2}{6\mu} < 1 \quad \Delta x < \sqrt{\frac{6\mu}{\sigma}} \ldots \text{much more acceptable}$$

### Explore the Integral

$$\sigma \int_0^1 \phi_i \phi_j = \begin{cases}
\frac{\sigma}{6}\Delta x & \text{if } j = i \pm 1 \\
\frac{\sigma}{3}\Delta x & \text{if } j = i
\end{cases}$$

### Mass Lumping Technique

Idea: treat $x_i = x_{i-1} = x_{i+1}$ [trapezoid rule]

Then we have:

$$\frac{\sigma}{6}(u_{i+1} + 4u_i + u_{i-1}) = \sigma u_i$$

And equation becomes:

$$-\mu \frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \sigma u_i \Delta x = \int f v$$

This method is stable.

## Upwind Method and Strong Consistency

Before we have:

$$a(u-u_h, v_h) = 0 \quad \text{for } v_h \in V_h$$

However if we use upwind method, we lose the strong consistency for Galerkin method:

We have:

$$a_h(u_h, v_h) = a(u_h, v_h) + \frac{|B|h}{2\mu} \int_0^1 u_h' v_h'$$

$$B_h(u_h) = B(u_h)$$

WTF: $u_h \in V_h$ s.t. $a_h(u_h, v_h) = B_h(v_h)$

If we use mass lumping:

$$a_h(u_h, v_h) = a(u_h, v_h) + \int_0^1 - \int_0^1 \text{[trapezoid rule]}$$

Remind $a_h(u-u_h, v_h) \neq 0$ for not strong consistent.

We can use general Galerkin method:

### Strong Lemma

1. $||u-u_h||_{H^1} \leq C_1 \inf_{v_h \in V_h} ||u-v_h||_{H^1} + C_2 \inf_{v_h \in V_h} \sup_{v_h \in V_h} \frac{|a_h(u_h, v_h) - a(u_h, v_h)|}{||v_h||_{V_h}}$

2. $C_3 \sup_{v_h \in V_h, v_h \in V_h} \frac{|a_h(u_h, v_h) - a(u_h, v_h)|}{||v_h||_{V_h}} \neq 0$

3. $C_3 \sup_{v_h \in V} ||B_h(v_h) - B(v_h)|| \quad \text{for } v_h \to 0$

### Order of Convergence

Upwind: $O(h^p)$ for $p = \min(s,k)$