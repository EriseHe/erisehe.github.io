# Solutions for Quiz 4

## Question 1
**For a given problem, we know that the solution belongs to $H^2(\Omega)$. We use finite elements of order 2. What is the expected order of convergence in the norm of $H^1(\Omega)$. Is this an "optimal" choice? Motivate your answer.**

### Solution:
Based on approximation theory for finite elements, we can analyze this using the relationship between the solution regularity, the polynomial order, and the expected convergence rate.

For a solution $u \in H^2(\Omega)$ and using order $k$ Lagrange interpolation (where $k=2$ in this case), we can refer to the following relationship for error estimates:

If we construct a table of convergence rates based on solution regularity $q$ and polynomial order $k$:

| $q$ \ $k$ | 1 | 2 | 3 |
|-----------|---|---|---|
| 1         | 1 | 1 | 1 |
| 2         | 1 | 2 | 2 |
| 3         | 1 | 2 | 3 |

Here we're looking at the case where $q=2$ (solution in $H^2$) and $k=2$ (quadratic elements).

For this combination, we expect order of convergence $O(h^1)$ in the $H^1(\Omega)$ norm.

This is not optimal. The optimal convergence rate would be $O(h^2)$ in the $H^1(\Omega)$ norm, which would require the solution to be in $H^3(\Omega)$ when using quadratic elements.

For a solution in $H^2(\Omega)$, we only achieve first-order convergence in the $H^1$ norm with quadratic elements, which is the same rate we would get with linear elements. Therefore, using quadratic elements is not computationally efficient for this problem.

## Question 2
**Explain why in advection-dominated problems in 2+ D, adding artificial viscosity to stabilize the solution is not optimal.**

### Solution:
In advection-dominated problems where the convection term significantly outweighs the diffusion term, we often encounter numerical instabilities. Consider the extreme case where the velocity field is highly anisotropic, such as:

$$\beta = \begin{bmatrix} 1000 \\ 0 \end{bmatrix}$$

In this scenario, using the upwind method with artificial viscosity is not optimal because:

The advection-diffusion equation takes the form:
$$-\mu^* \frac{\partial^2 u}{\partial x^2} - \mu^* \frac{\partial^2 u}{\partial y^2} + \beta_0 \cdot \frac{\partial u}{\partial x} = f$$

The key issue is that $\mu^*$ (artificial viscosity) doesn't help stabilize the problem in the $y$-direction. The only thing we need to do is to regularize the $x$-direction, which can be written as:

$$-\mu^* \frac{\partial^2 u}{\partial x^2} - \mu \frac{\partial^2 u}{\partial y^2} + \beta_0 \frac{\partial u}{\partial x}$$

More generally, we can write:
$$\mu \int_\Omega \nabla v \cdot \nabla u + \int_\Omega \beta \nabla u \cdot v + \frac{\mu}{2} \int_\Omega (\beta \cdot \nabla u)(\beta \cdot \nabla v) \frac{1}{|\beta|^2} = \int_\Omega f v$$

This shows that artificial viscosity adds diffusion isotropically (in all directions), whereas the instability primarily occurs in the direction of the flow. This makes the method unnecessarily diffusive in directions perpendicular to the flow, degrading solution accuracy where stabilization isn't needed.

## Question 3
**True or False?**

### a) If we solve an advection-diffusion problem with the condition that the convection dominates the diffusion (||β|| >> μ) with the finite element method, the solution does not oscillate: T ___ F ___

**Answer: F**

When convection dominates diffusion, standard finite element methods will produce oscillatory solutions unless stabilization techniques are applied.

### b) If we solve a reaction-diffusion problem with the condition that the reaction dominates the diffusion (σ >> μ) with the finite element method, the solution does not oscillate: T ___ F ___

**Answer: F (ATO-1), u = f**

This is stable. Unlike advection-dominated problems, reaction-dominated problems may not show oscillations but can exhibit sharp boundary layers. The finite element solution doesn't typically oscillate in the same way as advection-dominated problems.

### c) When we do Mass Lumping, the matrix with entries $\int_0^1 \varphi_i \varphi_j dx$ we obtain is diagonal: T ___ F ___

**Answer: T**

In mass lumping, all terms become one term in the diagonal. The mass matrix, which normally has entries from the integral of basis function products, is approximated by a diagonal matrix through the lumping process.