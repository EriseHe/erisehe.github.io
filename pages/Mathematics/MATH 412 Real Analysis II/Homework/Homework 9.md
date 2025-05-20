8.5: 1, [2, 3], 4, [5]; Chapter 8: [21, 22].

**Problem 8.5.2** Establish formula $\mathbf{c}$ of Example 8.5.7 as follows. Prove that $e^{-x} x^{p+2} \rightarrow 0$ as $x \rightarrow \infty$, and then compare the integral with $\int_1^{\infty}\left(1 / x^2\right) d x$.

> [!definition|*]
> 
 Let $\epsilon > 0$ be arbitrary. We want to show that $\exists N > 0$ such that for all $x > N$,  
$$\left|e^{-x}x^{p+2} - 0\right| = e^{-x}x^{p+2} < \epsilon.$$
Since $e^{-x}x^{p+2} = \exp\Bigl(-x + (p+2)\ln x\Bigr)$, and $\displaystyle\lim_{x\to\infty}\frac{(p+2)\ln x}{x} = 0,$ there exists a number $N_1>0$ such that for all $x > N_1$ we have  
$$\frac{(p+2)\ln x}{x} < \frac{1}{2}\Longrightarrow (p+2)\ln x < \frac{x}{2}$$
It follows that for all $x > N_1$,  
$$-x + (p+2)\ln x < -\frac{x}{2}.$$
Taking exponentials to get:  
$$e^{-x}x^{p+2} = \exp\Bigl(-x + (p+2)\ln x\Bigr) < \exp\Bigl(-\frac{x}{2}\Bigr) = e^{-x/2}.$$
For $e^{-x/2} < \epsilon,$ we simply need $-\frac{x}{2}  < \ln \epsilon$, which is $x  > -2\ln \epsilon$. We define $N_2 = -2\ln \epsilon$. Let $N = \max\{N_1, N_2\}$. Then, $\forall x > N$ we have both  
$$e^{-x}x^{p+2} < e^{-x/2} \quad \text{and} \quad e^{-x/2} < \epsilon,$$
so that $e^{-x}x^{p+2} < \epsilon$. By the definition of the limit we have:
$$\lim_{x\to\infty} e^{-x}x^{p+2} = 0.$$
Next, we use this to compare the integral $\int_1^\infty e^{-x}x^p\,dx$ with the convergent integral $\int_1^\infty \frac{1}{x^2}\,dx$. Note that for $x \ge 1$ and a fixed $p$, it is always true that
$$x^{p} \le x^{p+2}\Longrightarrow e^{-x}x^p \le e^{-x}x^{p+2}$$
As already demonstrated above, for sufficiently large $x$ , we can have
$$0 \leq e^{-x} x^p \leq e^{-x} x^{p+2}<\frac{1}{x^2}$$
Hence, there exists some $M$ such that for all $x > M$,
$$0 \le e^{-x}x^p \le \frac{1}{x^2}.$$
Given that the tail integral
$$\int_1^{\infty} e^{-x} x^p d x=\int_1^M e^{-x} x^p d x+\int_M^{\infty} e^{-x} x^p d x$$
converges, so $\int_M^{\infty} e^{-x} x^p d x$ converges. By the Comparison Test, the integral
$$\int_{M}^\infty e^{-x}x^p\,dx$$
must also converges. Finally, note that integral over any finite interval $[1,M]$ is finite, so the entire integral 
$$\int_{1}^\infty e^{-x}x^p\,dx$$
converges.

**Problem 8.5.3** Let $f:[a, \infty[\rightarrow \mathbb{R}$ be Riemann integrable on bounded intervals. Show that $\int_a^{\infty} f$ (conditional convergence) exists iff for every $\varepsilon>0$, there is a $T$ such that $t_1, t_2 \geq T$ implies

$$
\left|\int_{t_1}^{t_2} f(x) d x\right|<\varepsilon
$$

> [!definition|*]
> 
Let $f : [a,\infty) \to \mathbb{R}$ be a such function, we say the improper integral 
$$\int_a^\infty f(x)\,dx$$
exists (or converges) if the limit
$$\lim_{t \to \infty} \int_a^t f(x)\,dx$$
exists for some number $L$. We want to show that this is equivalent to this Cauchy condition: For every $\varepsilon > 0$, there exists $T \ge a$ such that for all $t_1, t_2 \ge T,$ we have $\left|\int_{t_1}^{t_2} f(x)\,dx\right| < \varepsilon$. 
>
**($\implies$)** First, by assumption, the improper integral $\int_a^\infty f(x)\,dx$ converges a $L\in \mathbb{R}$ s.t:
$$\lim_{t \to \infty} \int_a^t f(x)\,dx = L$$
By definition of the limit, this means for any given $\varepsilon>0$, there exists $T$ s.t. for all $t \ge T,$ we can have $$\left|\int_a^t f(x)\,dx - L\right| < \frac{\varepsilon}{2}.$$Let $t_1, t_2 \ge T$. Without loss of generality, assume $t_1 < t_2$, then we can write:
>$$
\int_{t_1}^{t_2} f(x) d x=\left(\int_a^{t_2} f(x) d x-L\right)-\left(\int_a^{t_1} f(x) d x-L\right)
>$$
By the triangle inequality:
>$$
\left|\int_{t_1}^{t_2} f(x) d x\right| \leq\left|\int_a^{t_2} f(x) d x-L\right|+\left|\int_a^{t_1} f(x) d x-L\right|
>$$
By our choice of $T$, for both $t_1, t_2 \ge T$, $$\left|\int_a^{t_i} f(x)\,dx - L\right| < \frac{\varepsilon}{2}\quad $$ Hence,
>$$
\left|\int_{t_1}^{t_2} f(x) d x\right| \leq \frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon
>$$
>Thus, for every $\varepsilon>0$, we always have a $T$ such that the integral is less than $\varepsilon$ whenever $t_1,t_2 \ge T$.
>
>**($\Longleftarrow$)** Conversely, suppose that for every $\varepsilon > 0$, there is a $T$ such that for all $t_1,t_2 \ge T$, $$\left|\int_{t_1}^{t_2} f(x)\,dx\right| < \varepsilon$$We want to prove that limit $\lim_{t\to\infty}\int_a^t f(x)\,dx$ exists as a real number. For convenience, we set
>$$I(t)=\int_a^t f(x)\,dx$$
>Then, by the given standard Cauchy condition, $\forall\varepsilon>0$, $\exists \,T\ge a$ s.t. whenever $t_1,t_2\ge T$, we have
>$$|I(t_2)-I(t_1)|<\varepsilon.$$
>Fix any $t \geq T$. Then, for every $t_{0} \geq T$, we always have $|I(t_{0})-I(t)|<\varepsilon$, so this mean that implies that $I(t_{0})\in (I(t)-\varepsilon, I(t)+\varepsilon)$ for any $t_{0} \geq T$. We set upper and lower limits of the function $I(t)$ as $t\to\infty$:
>$$L_{\text {sup }}=\lim _{T \rightarrow \infty} \sup \{I(t_{0}): t_{0}\geq T\}\quad \text{and} \quad L_{\mathrm{inf}}=\lim _{T \rightarrow \infty} \inf \{I(t_{0}): t_{0} \geq T\}$$
>This, by definition, gives us:
>$$I(t)-\varepsilon \leq L_{\inf}\leq L_{\sup}\leq I(t)+\varepsilon.$$
>In particular, choosing any $t\ge T$ and writing these two inequalities together, we get:
>$$ L_{\sup}-L_{\inf}\leq  (I(t)+\varepsilon) - (I(t)-\varepsilon)=2\varepsilon.$$
>Because $\varepsilon>0$ is arbitrary, it shows it is indeed in fact
>$$L_{\sup}-L_{\inf}=0\,\Longrightarrow L_{\sup}=L_{\inf}=L$$
>Now, by the definitions of $\limsup$ and $\liminf$, it follows that for every $\epsilon_{1}>0$ there exists some $T_{1}\ge a$ such that for all $t\ge T_{1}$,
>$$L-\epsilon < I(t) < L+\epsilon$$
>which is the definition of the limit. We have shown that $\epsilon_{1}>0$ there exists $T_{1}$ s.t for all $t\ge T_{1}$,
>$$|I(t)-L|<\epsilon.$$
>Thus, we conclude that
>$$\lim_{t\to\infty} I(t)=L,$$
>which, by definition, means that the improper integral
>$$\int_a^\infty f(x)\,dx = \lim_{t\to\infty}\int_a^t f(x)\,dx$$exists.

**Problem 8.5.5** For what $\alpha$ is $\int_0^{\infty} \frac{x^\alpha}{1+x^\alpha} d x$ convergent?

> [!definition|*]
> To fine $\alpha$, notice that
$$\int_0^{\infty} \frac{x^\alpha}{1+x^\alpha} d x=\int_0^1 \frac{x^\alpha}{1+x^\alpha} d x+\int_1^{\infty} \frac{x^\alpha}{1+x^\alpha} d x$$
can be split into two regions separately: interval $(0,1]$) and $[1,\infty)$. So, first, we examine the behavior near $x=0$. We consider
$$\int_{0}^{1} \frac{x^{\alpha}}{1 + x^{\alpha}}\,dx.$$
We must check whether the integrand create any problems as $x\to0$.
>1. $\alpha > 0$: As $x \to 0$, $x^{\alpha}$ becomes very small, so $$\frac{x^{\alpha}}{1 + x^{\alpha}} \;\approx\; x^{\alpha}$$Since $x^{\alpha}$ near $0$ is integrable if $\alpha > -1$, and here $\alpha > 0$ definitely satisfies $\alpha > -1$, there is no divergence issue at $0$ in this case.
>2. $\alpha = 0$: Since $x^{\alpha} = x^0 = 1$, and the integrand becomes $\tfrac12$, which is a constant.
>3. $\alpha < 0$: As $x \to 0$, $x^{\alpha}  =\frac{1}{x^{|\alpha|}}\to \infty$. Thus, $$\frac{x^{\alpha}}{1 + x^{\alpha}} \approx1$$which is integrable. Therefore, near $x=0$, the integrand is always integrable for every real $\alpha$.
>
> Next, we check behavior near $x=\infty$. We examine the behavior for $\int_1^{\infty} \frac{x^\alpha}{1+x^\alpha} d x$ as $x\to\infty$:
> 
> 4. $\alpha > 0$: As $x \to \infty$, $x^{\alpha}$ is very large, so $\frac{x^{\alpha}}{1 + x^{\alpha}} \;\approx\; 1$. This means that $\int_{1}^{\infty} 1\,dx$ diverges for all $\alpha > 0$.
> 5.  $\alpha = 0$: similarly, $x^{\alpha} = x^{0} = 1$ implies that the integrand is $\frac{1}{2}$, and $\int_{1}^{\infty} \tfrac12 \,dx$ also diverges. So it fails to converge for $\alpha=0$.
> 6. $\alpha < 0$: As $x\to\infty$, $x^\alpha$ tends to $0$. So $$\frac{x^{\alpha}}{1 + x^{\alpha}} \;\approx\; x^{\alpha}.$$
By example 8.5.7(a), we know $\int_{1}^{\infty} x^{p}\,dx$ converges if and only if $p < -1$. Therefore, if $\alpha < -1$, then $\int_{1}^{\infty} x^{\alpha}\,dx$ converges, and consequently $$\int_{1}^{\infty} \frac{x^{\alpha}}{1 + x^{\alpha}}\,dx\;\text{converges}$$ by comparison test. Hence, the only way to have convergence at $x = \infty$ is to require alpha to be less that $-1$. We have shown that the integral is finite if and only if $\alpha < -1$.


**Chatper 8.21** Show that $\int_1^{\infty} x^{-p} \sin x d x$ converges if $p>1$. Show that if $0<p \leq 1$, then the convergence is conditional.

> [!definition|*]
> **Absolute Convergence for $p>1$**
> To show that the integral converges absolutely when $p>1$, we consider the absolute value of the integrand:
$$\int_{1}^{\infty} \bigl| x^{-p}\sin x \bigr|\,dx.$$
Since $| \sin x| \le 1,$ for all $x\ge 1$ we have
$$\bigl| x^{-p}\sin x \bigr| \le x^{-p}.$$
Thus, by the Comparison Test we know:
$$\int_{1}^{\infty} \bigl| x^{-p}\sin x \bigr|\,dx \le \int_{1}^{\infty} x^{-p}\,dx.$$
We now compute or recall the convergence of this integral.
> 1. For $p\neq 1$,
>$$\int_{1}^{a} x^{-p}\,dx = \left[\frac{x^{1-p}}{1-p}\right]_{x=1}^{x=a} 
=\frac{a^{1-p}-1}{1-p}$$
> 2. For $p>1$, then $1-p<0$ and therefore $$\lim_{a\to\infty} a^{1-p} = 0$$ which means: $$\int_{1}^{\infty} x^{-p}\,dx = \frac{0-1}{1-p}=\frac{1}{p-1}<\infty$$ and we further conclude that: $$\int_{1}^{\infty} \bigl| x^{-p}\sin x \bigr|\,dx < \infty$$ and hence the integral $I(p)$ converges absolutely when $p>1$.
> 
> **Conditional Convergence for $0 < p\le 1$**
> To show that the integral converges conditionally, we use integration by parts to show that it converges conditionally.
> Let
> $$I(b)=\int_{1}^{b} x^{-p}\sin x\,dx$$
> By the integration by parts formula, we obtain:
> $$I(b) = \left[-x^{-p}\cos x\right]_{1}^{b} -\left( -\int_{1}^{b} (-\cos x)(p\,x^{-p-1})\,dx\right)$$
> Then, evaluate the boundary term, we have $$\left[-x^{-p}\cos x\right]_{1}^{b} = -b^{-p}\cos b + 1^{-p}\cos 1 = -b^{-p}\cos b + \cos 1$$Since $p>0$, as $b\to\infty$ we have $b^{-p}\to 0$, and so $\lim_{b\to\infty} \left(-b^{-p}\cos b\right)=0$. Hence, the boundary contribution tends to $\cos 1$. Then, the remaining term becomes $$I(b) = \cos 1 + p\int_1^b x^{-p-1}\cos x\,dx=\cos 1 + pI_{1}(b)$$where we define $I_{1}(b)=\int_{1}^{b} x^{-p-1}\cos x\,dx$. Note that, again we have: $$\bigl|x^{-p-1}\cos x\bigr|\le x^{-p-1}$$since $p>0$ by the assumption, we know $-p-1<-1$. Therefore, $I_{1}(b)$ converges absolutely as $b\to\infty$. Let's denote it as $\lim_{b\to\infty} I_{1}(b)=L$. Then, as $b\to\infty$, we obtain: $$\lim_{b\to\infty} I(b)= \cos 1 + p\,L.$$ Here the integral $I(b)$ converges to the finite value $\cos 1 + p\,L$ while the absolute integral diverges for $0<p\le1$. Hence, the original integral
$$\int_{1}^{\infty} x^{-p}\sin x\,dx$$
converges conditionally for $0<p\leq1$

**Chapter 8.22** The gamma function is defined to be the function given by the improper integral $\Gamma(p)=\int_1^{\infty} e^{-x} x^{p-1} d x$. Show that the integral is convergent for $p>0$.

> [!definition|*]
> We want to show that the improper integral $$\Gamma(p)=\int_1^{\infty} e^{-x}x^{p-1}\,dx$$ converges for $p>0$. Observe that
$$e^{-x}x^{p-1} \Longrightarrow \lim_{x\to\infty} \frac{x^{p-1}}{e^x} =\lim_{x\to\infty} \frac{x^q}{e^x}= 0.$$
where $q=p-1$ (with $p>0$). And since we know that for $n\ge1$ and $x>0$, we always have
$$e^x \ge \frac{x^n}{n!}$$
so, for any integer $n$ s.t. $n>p$, $\forall x\ge1$, we can have
$$e^{-x} = \frac{1}{e^{x}} \le \frac{n!}{x^{n}}\Longrightarrow e^{-x}x^{p-1} \le n! \, x^{p-1-n}$$
Then, we verify the convergence of the this integral:
$$I=\int_1^\infty x^{p-1-n}\,dx=\int_1^\infty x^{r}\,dx$$
where $r=p-1-n$. We know such integral converges if and only if $r<-1$. Since we have chosen $n>p$, it follows that
$$p-1-n < -1 \quad $$
Thus, the exponent $r$ satisfies the convergence criterion. Consequently,
$$I= \int_1^\infty x^{p-1-n}\,dx < \infty.$$
Next, since for all $x\ge1$ we have
$$0 \le e^{-x}x^{p-1} \le n!\,x^{p-1-n},$$
and integral $I$ converges, so the Comparison Test implies that
$$\int_1^{\infty} e^{-x}x^{p-1}\,dx \;\;\text{ also converges}$$
Thus, we have shown that the gamma function integral
$$\Gamma(p)=\int_1^\infty e^{-x} x^{p-1}\,dx$$
converges for every $p>0$.