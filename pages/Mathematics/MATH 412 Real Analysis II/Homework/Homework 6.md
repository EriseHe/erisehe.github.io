7.2: 1, 2, [3,4]; Chapter 7: [4], 5, [6], 9, [12].

**<font color="#c00000">Problem 7.2.3</font>** In the system
 $$\begin{array}{r}
3 x+2 y+z^2+u+v^2=0 \\
4 x+3 y+z+u^2+v+w+2=0 \\
x+z+w+u^2+2=0
\end{array}
 $$
 discuss the solvability for $u, v, w$ in terms of $x, y, z$ near $x=y=z=0, u=$ $v=0, w=-2$.

> [!theorem|*]
> We first define three functions:
> $$
\begin{aligned}
F_1(x,y,z,u,v,w) \;&=\; 3x + 2y + z^2 + u + v^2,\\
F_2(x,y,z,u,v,w) \;&=\; 4x + 3y + z + u^2 + v + w + 2,\\
F_3(x,y,z,u,v,w) \;&=\; x + z + w + u^2 + 2.
\end{aligned}
> $$
>
> Substitute $x=0,y=0,z=0,u=0,v=0,w=-2$ into each equation:
> - $F_{1}(0,0,0,0,0,-2) = 3\cdot 0 + 2\cdot 0 + 0^2 + 0 + 0^2 = 0.$  
> - $F_{2}(0,0,0,0,0,-2) = 4\cdot 0 + 3\cdot 0 + 0 + (0)^2 + 0 + (-2) + 2 = 0.$  
> - $F_{3}(0,0,0,0,0,-2) = 0 + 0 + (-2) + (0)^2 + 2 = 0.$  
> 
> Hence $\bigl(0,0,0,0,0,-2\bigr)$ satisfies all three equations. By the Implicit Function Theorem, we want to solve for $(u,v,w)$ if the Jacobian of $D_{(u,v,w)} (F_1, F_2, F_3) \;$ is invertible at that point. 
> 
> We then compute partial derivatives, and evaluate them at $\bigl(0,0,0,0,0,-2\bigr)$:
> $$
> D_{(u,v,w)} (F_1, F_2, F_3)=\begin{bmatrix}
F_{1u} & F_{1v}&F_{1w} \\
F_{2u} & F_{2v}&F_{2w} \\
F_{3u} & F_{3v}&F_{3w} 
\end{bmatrix}=\begin{bmatrix}
1 & 2v & 0 \\
2u & 1 & 1 \\
2u & 0 & 1
\end{bmatrix}
>$$
>At that point, $u=0$ and $v=0$, the determinant of this $3\times 3$ matrix is
>$$\det \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 1 \\
0 & 0 & 1
\end{pmatrix}
\;=\; 1 \;\neq\; 0.
> $$
> So the matrix is invertible. Therefore, since $F_1=F_2=F_3=0$ is at our point of interest, and the invertibility of Jacobian ensures that the mapping is locally bijective, the Implicit FT guarantees that in a neighborhood of $\bigl(x,y,z\bigr)=(0,0,0)$, there exist unique smooth functions
>$$u = u(x,y,z), \quad v = v(x,y,z), \quad w = w(x,y,z), $$
>satisfying the system. And since, $\bigl(u(0,0,0),\,v(0,0,0),\,w(0,0,0)\bigr)=(0,0,-2)$, the system is locally solvable for $\,(u,v,w)\,$ as functions of $\,(x,y,z)\,$ near $\,(0,0,0)\,$.

---

**<font color="#c00000">Problem 7.2.4</font>** Does the map

$$
(x, y) \mapsto\left(\frac{x^2-y^2}{x^2+y^2}, \frac{x y}{x^2+y^2}\right)
$$

have a local inverse near $(0,1)$ ?

> [!definition|*]
> Define 
>$$F(x,y)\;=\;\Bigl(F_1(x,y),\,F_2(x,y)\Bigr)\;=\;\biggl(\,\frac{x^2 - y^2}{x^2 + y^2},\;\frac{x\,y}{x^2 + y^2}\biggr)$$
> We substitute $\bigl(x,y\bigr)=(0,1)$ into $F$:
> $$F(0,1) 
\;=\;\Bigl(\tfrac{0^2 - 1^2}{0^2 + 1^2},\;\tfrac{0\cdot1}{0^2 + 1^2}\Bigr)
\;=\;(-1,\,0)$$
> We check if the Jacobian of $F$ at $(0,1)$ is invertible. The partial of 
$\,(F_1,F_2)$ are  
> $$F_1(x,y)=\tfrac{x^2 - y^2}{x^2 + y^2}, 
\quad
F_2(x,y)=\tfrac{x\,y}{x^2 + y^2}
>$$
>
>For $F_1$:
   > $$\begin{align}
\frac{\partial F_1}{\partial x}(x,y)
 & =\frac{(x^2+y^2)(2x) - (x^2-y^2)(2x)}{(x^2+y^2)^2}\\
 & =\frac{2x\Bigl[(x^2+y^2)-(x^2-y^2)\Bigr]}{(x^2+y^2)^2}=\frac{4xy^2}{(x^2+y^2)^2}
\end{align}
   > $$
>And
   > $$\begin{align}
\frac{\partial F_1}{\partial y}(x,y)
& =\frac{(x^2+y^2)(-2y) - (x^2-y^2)(2y)}{(x^2+y^2)^2} \\
& =\frac{-2y\Bigl[(x^2+y^2)+(x^2-y^2)\Bigr]}{(x^2+y^2)^2}=-\frac{4x^2y}{(x^2+y^2)^2}
\end{align}
   > $$
> For $F_2$:
> $$\begin{align}
\frac{\partial F_2}{\partial x}(x,y)
 &   =\frac{(x^2+y^2)(y) - (xy)(2x)}{(x^2+y^2)^2} \\
 &   =\frac{y\Bigl[(x^2+y^2)-2x^2\Bigr]}{(x^2+y^2)^2}
   =\frac{y(y^2-x^2)}{(x^2+y^2)^2}
\end{align}
> $$
> And 
> $$\begin{align}
\frac{\partial F_2}{\partial y}(x,y)   & =\frac{(x^2+y^2)(x) - (xy)(2y)}{(x^2+y^2)^2} \\
 & =\frac{x\Bigl[(x^2+y^2)-2y^2\Bigr]}{(x^2+y^2)^2}
=\frac{x(x^2-y^2)}{(x^2+y^2)^2}
\end{align}
> $$
> Since $x^2+y^2=0^2+1^2=1$, the evaluation at $(0,1)$ are:
> - $\displaystyle \frac{\partial F_1}{\partial x}(0,1)=\frac{4\cdot 0\cdot1^2}{1^2}=0$
> - $\displaystyle \frac{\partial F_1}{\partial y}(0,1)=-\frac{4\cdot0^2\cdot1}{1^2}=0$
> - $\displaystyle \frac{\partial F_2}{\partial x}(0,1)=\frac{1\,(1^2-0^2)}{1^2}=1$
> - $\displaystyle \frac{\partial F_2}{\partial y}(0,1)=\frac{0\,(0^2-1^2)}{1^2}=0$
>
>Hence the Jacobian matrix of $F$ at $\,(0,1)$ is
> $$D F(0,1) 
\;=\;
\begin{pmatrix}
0 & 0 \\
1 & 0
\end{pmatrix}
> $$
> The determinant of $D F(0,1)$ is
> $$\det\begin{pmatrix}
0 & 0\\
1 & 0
\end{pmatrix}
\;=\;0
>$$
>Because this determinant is zero, the matrix is **not** invertible. This means we cannot apply the IFT to conclude that $F$ is invertible near $(0,1)$; there is no diffeomorphic local inverse of $F$ around $(0,1)$.  
>
>Therefore, we conclude that the map $F$ does not have a local inverse near $(0,1)$.


**<font color="#c00000">Problem [7.4]</font>** 4. Show that the equations

$$
\begin{array}{r}
x^2-y^2-u^3+v^2+4=0 \\
2 x y+y^2-2 u^2+3 v^4+8=0
\end{array}
$$

determine functions $u(x, y), v(x, y)$ near $x=2, y=-1$ such that $u(2,-1)=$ $2, v(2,-1)=1$. Compute $\partial u / \partial x$.

> [!definition|*]
> Let 
> $$
F(x,y,u,v)=\begin{cases}
x^2 - y^2 -u^3 +v^2 +4 =0\\
2xy+y^2 -2u^2 +v^4 +8=0
\end{cases}
> $$
> 
> We first verify $\,(x,y,u,v)=(2,-1,2,1)$ is a solution:
> $$\begin{cases}\;4 - 1 - 8 + 1 + 4 
  \;=\;0 \\
-4 +1 -8 +3 +8 
  \;=\;0\end{cases}
>$$
> Therefore $\bigl(2,-1,2,1\bigr)$ is indeed a solution of the system. Then, we compute the Jobcobian:
> $$\begin{align}
D_{(u,v)} (F_1, F_2)   & =\begin{pmatrix}
F_{1u} & F_{1v}\\
F_{2u} & F_{2v} 
\end{pmatrix}
\Bigg|_{(2,-1,2,1)} \\[3pt]
 & =\begin{pmatrix}
-3u^{2}& 2v\\
-4u & 12v^3
\end{pmatrix}\Bigg|_{(2,-1,2,1)} \\[5pt]
 & =
\begin{pmatrix}
-12 & 2\\
-8 & 12
\end{pmatrix}\end{align}
> $$
> Its determinant is $\Delta=(-12)(12) - 2(-8)= -144 +16= -128\neq 0$. Therefore, the matrix is invertible, so by the IFT we know that we can solve for $u$ and $v$ as functions of $x,y$ near $\,(2,-1)$.
> Now we compute $u_x(2,-1)$. For $F_1=0$: 
> $$\frac{\partial}{\partial x}(x^2-y^2 -u^3 +v^2 +4)
   \;=\;2x \;-\;3u^2 u_x \;+\;2v v_x
   \;=\;0
> $$
> At $(x,y,u,v)=(2,-1,2,1)$, this is $4 -12u_x + 2v_x=0$. For $F_2=0$: 
> $$\frac{\partial}{\partial x}(2xy +y^2 -2u^2 +3v^4 +8)
   =2y \;-\;4u u_x \;+\;12v^3 v_x
   =0
> $$
> At $(2,-1,2,1)$, this is $-2 \;-\;8 u_x +12 v_x=0$. So we obtain:
> $$\begin{cases}
4 \;-\;12u_x +2v_x = 0\\
-2 \;-\;8u_x +12v_x = 0
\end{cases}
> $$
> To solve this system of equations, we have
> $$
v_x = \frac{8u_x + 2}{12}
> $$
> So,
> $$
\begin{align*}
4 - 12u_x + 2v_x &= 4 - 12u_x + 2\left(\frac{8u_x + 2}{12} \right) \\
&= 4 - 12u_x + \frac{4}{3}u_x + \frac{1}{3} \\
&= -\frac{32}{3} u_x + \frac{13}{3} = 0
\end{align*}
> $$
> $$
\Longrightarrow u_x = \frac{13}{32}
> $$
> Hence, we have $$u_x(2,-1) = \frac{13}{32}$$



**<font color="#c00000">Problem [7.6]</font>** Determine whether the "curve" described by the equation $x^2+y+\sin (x y)$ $=0$ can be written in the form $y=f(x)$ in a neighborhood of $(0,0)$. Does the implicit function theorem allow you to say whether the equation can be written in the form $x=h(y)$ in a neighborhood of $(0,0)$ ?

> [!definition|*]
> Let
> $$F(x,y)=x^2 + y +\sin\!\bigl(x\,y\bigr)=0$$
> We want to show that $F\colon \mathbb{R}^2 \to \mathbb{R}$ is $C^1$, and $F(x_0,y_0)=0$. We first substitute $x=0,y=0$ into $F$:
> $$F(0,0)=0^2+0+\sin(0\cdot 0)=0$$
> Hence $(0,0)$ lies on the curve $F(x,y)=0$. We then compute the partial at $(0,0)$:
> $$\begin{align}
  F_{y}  =1 +\cos\!\bigl(xy\bigr)\bigl(x\bigr) \Longrightarrow   F_{y}(0,0)
  =1 +0
  =1\neq 0
\end{align}
> $$
> And
> $$
\begin{align}
  F_{x}
  =2x +\cos\!\bigl(xy\bigr)\bigl(y\bigr)   
\Longrightarrow  F_{y}(0,0)
  = 2\cdot 0 + 0 = 0
\end{align}
> $$
>
> Because $F_{y}(0,0)=1\neq 0$, the **Implicit Function Theorem** ensures that there exists neighborhood of $(0,0)$ in which we can uniquely solve the equation for $y$ as a function of $x$. Therefore, there exists $y =f(x)$ for $(x,y)$ near $(0,0)$ for all $x$ in the neighborhood of $0$. 
>
> However, on the other hand, since $F_{x}(0,0)=0$, Implicit FT **does not** apply, so the test is conclusive. This means the usual IFT statement fails to guarantee a local solution of the form $x=h(y)$.



**<font color="#c00000">Problem [7.12]</font>** Show that the implicit function theorem implies the inverse function theorem.

> [!definition|*]
> 
> Let $f\colon A\subset\mathbb{R}^n \to \mathbb{R}^n$ be of class $C^1$.  Suppose $x_0\in A$ and  
> $$ J_f(x_0)\;=\;\det\bigl(Df(x_0)\bigr)\;\neq\;0.
>$$
> We want to show that, there exist neighborhoods $U$ of $x_0$ in $A$ and $V$ of $y_0=f(x_0)$ in $\mathbb{R}^n$ such that
> - (1) $f(U)=V$ and $f\colon U\to V$ has an inverse $f^{-1}:V\to U$.  
> - (2) $f^{-1}$ is of class $C^1$.
> - (3) $D f^{-1}(y)=\bigl[D f(x)\bigr]^{-1}$ for all $x\in U$ with $y=f(x)$.
> 
> Define a new function
> $$F\colon \mathbb{R}^n\times \mathbb{R}^n \longrightarrow \mathbb{R}^n,
\quad
F(x,y)=f(x)-y
> $$
> with $x=(x_1,\dots,x_n)$ and $y=(y_1,\dots,y_n)$. Then we know that $F$ is $C^1$ because $f$ is $C^1$ and subtraction is smooth. Note that $F(x_0,\,f(x_0))= f(x_0)- f(x_0)=0$. 
> We want to compute the Jacobian of $F$ w.r.t. $y$. So for each $i=1,\dots,n$, the $i$th component of $F$ is
> $$F_i(x,y)=f_i(x)-y_i.$$
> Since $f_i(x)$ does not depend on $y$, we have for each $j=1,\dots,n$
> $$\frac{\partial F_i}{\partial y_j}(x,y)=\frac{\partial}{\partial y_j}\bigl(f_i(x)-y_i\bigr)
=\frac{\partial f_i(x)}{\partial y_j}-\frac{\partial y_i}{\partial y_j}
=0-\delta_{ij}
> $$
> where $\delta_{ij}$ is
> $$\delta_{ij}=
\begin{cases}1 \quad i=j \\0 \quad i\neq j \\
\end{cases}
> $$
> Thus, the $(i,j)$-entry of the Jacobian is
> $$\left[\frac{\partial F}{\partial y}(x,y)\right]_{ij}=-\delta_{ij}
> $$
> In matrix form, we have:
> $$\frac{\partial F}{\partial y}(x,y)=-I
> $$
> where $I$ is the $n\times n$ identity matrix. Since the determinant $\det(-I)=(-1)^n\neq 0$, we know that $D_y F(x,y)=-I$ is invertible everywhere. This satisfy the condition for Implicit FT.
> Hence, by the Implicit Function Theorem, there is a neighborhood $U$ of $x_0\in \mathbb{R}^n$ and a neighborhood $V$ of $y_0=f(x_0)\in \mathbb{R}^n$ s.t. $\forall\, y\in V$, $\exists! \,x\in U$ satisfying: 
> $$F(x,y)=0
\;\;\Longleftrightarrow\;\;
f(x)-y=0
\;\;\Longleftrightarrow\;\;
y=f(x)
> $$
> and we have a map that is $C^1$
> $$\Phi:V \;\to\; U
\quad\text{such that}\quad
F\bigl(\Phi(y),\,y\bigr)=0
\quad\text{for all }y\in V
> $$
> which this demonstrates <font color="#c00000">(2)</font>. Since $F(\Phi(y),y) \Longrightarrow f(\Phi(y))=y$, it follows that $\Phi$ is the **local inverse** $f^{1}$ by definition. Because $f$ itself is $C^1$ and $\Phi=f^{-1}$ is also $C^1$, we conclude that $f^{-1}$ is a local **diffeomorphism** near $x_0$, which shows <font color="#c00000">(1)</font>. 
> Next, by Corollary 7.2.2 for each $y\in V$, we have
> $$\begin{align}
D\Phi(y) & =-\Bigl(D_yF(\Phi(y),y)\Bigr)^{-1}D_xF(\Phi(y),y) \\
 & =-(-I)^{-1}\,D f\bigl(\Phi(y)\bigr)  \\
 & =D f\bigl(\Phi(y)\bigr)^{-1}
\end{align}
> $$
> Since $\Phi(y)=x$, near $x_{0}$ this yields: 
> $$D f^{-1}(f(x))
   \;=\;
   \bigl(Df(x)\bigr)^{-1}
> $$
> which shows the <font color="#c00000">(3)</font> of theorem. Hence, we have shown that **Implicit Function Theorem** directly implies the **Inverse Function Theorem**.



