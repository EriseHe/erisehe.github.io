8.6: [1, 3]; Chapter 8: [24, 36, 39]

**Problem 8.6.1** Show that Theorem 8.6.1 can be proved using the methods of Chapter 5 if the $g_n$ are continuous.

Theorem 8.6.1 (Lebesgue's Monotone Convergence Theorem) Let $g_n : [0, 1] \to \mathbb{R}$ be a sequence of nonnegative functions such that each improper integral $\int_0^1 g_n(x) dx$ exists and is finite. Suppose that $0 \leq g_{n+1}(x) \leq g_n(x)$
and that $g_n(x) \to 0$ for each $x \in [0, 1]$. Then $$\lim_{n\to\infty} \int_0^1 g_n(x) dx = 0.$$

> [!definition|*]
> Proof. Let $g_n : [0, 1] \to \mathbb{R}$ be a sequence of nonnegative functions such that each improper integral $\int_0^1 g_n(x) dx$ exists and is finite. Suppose that $0 \leq g_{n+1}(x) \leq g_n(x)$. Since each $g_n$ is continuou within the compact interval $[0,1]$, so it is bounded by a maximum vlaue. We define:
>    $$      M_n := \max g_n(x)
>$$
>The monotonicity condition $g_{n+1}(x) \le g_n(x)$ for all $x$ means that $M_{n+1} \le M_n$. Therefore, the sequence $\{M_n\}$ is nonincreasing and bounded below by 0.
> for each fixed , we have  
>    $$\lim_{n\to\infty} g_n(x) = 0$$
>    Suppose, for the sake of contradiction, that $\lim_{n\to\infty} M_n \neq 0$. Then there exists an $\epsilon_0 > 0$ and a subsequence $\{n_k\}$ such that  
>    $$M_{n_k} \ge \epsilon_0 \quad \forall k\
>$$
>    For each $k$, choose $x_{n_k} \in [0,1]$ such that  
>    $$ g_{n_k}(x_{n_k}) = M_{n_k} \ge \epsilon_0$$
>    This contradicts the fact that $g_{n_k}(x_{n_k}) \to 0$ as $n_k \to \infty$. Hence, it must be true that $\lim_{n\to\infty} M_n = 0$. This means for every $\epsilon > 0$ there exists $N \in \mathbb{N}$ such that for all $n \ge N$,  
>    $$ M_n < \epsilon$$
>    Since $0 \le g_n(x) \le M_n$ for all $x \in [0,1]$, it follows that for all $x$ and for $n\ge N$,  
>    $$|g_n(x) - 0| \le M_n < \epsilon $$
>    Thus, $g_n \to 0$ uniformly on $[0,1]$.
> By the Uniform Convergence Theorem , if a sequence of integrable functions $\{f_n\}$ converges uniformly to a function $f$ on $[a,b]$, then  
>    $$\lim_{n\to\infty} \int_a^b f_n(x)\,dx = \int_a^b \lim_{n\to\infty} f_n(x)\,dx.
>$$
>    apply this to $\{g_n\}$, which converges uniformly to $f(x) = 0$ on $[0,1]$, we hence conclude that  
>    $$\lim_{n\to\infty} \int_0^1 g_n(x)\,dx = \int_0^1 0\,dx = 0$$

**Problem 8.6.3** Evaluate $$\lim_{n\to\infty} \int_0^1 \frac{1 - e^{-nx}}{\sqrt{x}} dx.$$

> [!definition|*]
> Proof. We define  
>$$f_n(x) = \frac{1-e^{-nx}}{\sqrt{x}},$$  
Notice that for every fixed $x>0$, as $n\to\infty$ we have $e^{-nx}\to 0$ and hence  
>$$\lim_{n\to\infty} f_n(x) = \frac{1}{\sqrt{x}}$$  
which means, every $x>0$ the function $1-e^{-nx}$ is increasing in $n$, so that the sequence $\{f_n(x)\}$ is nonnegative and monotonically increasing. Thus, by Corollary 8.6.2:  
>$$\lim_{n\to\infty}\int_0^1 f_n(x)\,dx = \int_0^1\lim_{n\to\infty} f_n(x)\,dx = \int_0^1 \frac{1}{\sqrt{x}}\,dx.$$  
>The remaining integral is just computed normally as an improper integral near $x=0$, which is:
>$$\int_0^1 \frac{1}{\sqrt{x}}\,dx = \lim_{\epsilon\to0^{+}} \int_{\epsilon}^1 x^{-\frac{1}{2}}\,dx 
= \lim_{\epsilon\to0^{+}} \left[ 2\sqrt{x} \,\right]_{\epsilon}^{1} 
= \lim_{\epsilon\to0^{+}} \bigl(2 - 2\sqrt{\epsilon}\bigr) 
= 2.$$  
>Therefore,  
>$$\lim_{n\to\infty}\int_{0}^{1} \frac{1-e^{-nx}}{\sqrt{x}}\,dx = 2.$$


**Chatper 8.24** Give an example to show that the following is not equivalent to the integrability of $f$:

For any $\varepsilon > 0$, there is a $\delta > 0$ such that if $P$ is any partition into rectangles $S_1, \ldots, S_N$ with sides less than $\delta$, there exist $x_1 \in S_1, \ldots, x_N \in S_N$ such that
$$\left|\sum_{i=1}^N f(x_i)v(S_i) - I\right| < \varepsilon.$$


> [!definition|*]
> Proof. For a counterexample, consider the function $f : [0, 1] \to \mathbb{R}$ such that:
>
> $$f(x) = \begin{cases}
1 & \text{if } x \in \mathbb{Q} \cap [0, 1],\\
0 & \text{if } x \in \mathbb{R} \setminus \mathbb{Q}.
 \end{cases}$$
> This function $f(x)$ is not integrable due to the set of discontinuity $D = [0, 1]$ because these set of discontinuities have positive measure. 
> Since the irrationals are dense in $\mathbb{R}$, every subinterval $S_i$ (no matter how small) contains at least one irrational number. Thus, for any partition $P$ of $[0,1]$ with subinterval lengths $x_i \in S_i$ with $x_i\in \mathbb{R} \setminus \mathbb{Q}$, we have $f\left(x_i\right)=0$ $\forall i$ such that:
> $$
\sum_{i=1}^N f\left(x_i\right) v\left(S_i\right)=0
>$$
> Therefore,
> $$
\left|\sum_{i=1}^N f\left(x_i\right) v\left(S_i\right)-0\right|=0<\varepsilon
> $$
> So, the property is satisfied. This shows that the condition holds for the function $f$, even though $f$ is not Riemann integrable on $[0,1]$.

**Problem 8.36** Prove that
$$\lim_{n\to\infty}\frac{(n!)^{1/n}}{n} = e^{-1}$$
by considering Riemann sums for
$$\int_0^1 \log x \, dx$$
based on the partition
$$\frac{1}{n} < \frac{2}{n} < \cdots < 1$$

> [!definition]
>  Proof. We first take the natural logarithm: $$\frac{(n!)^{\frac{1}{n}}} {n} \Longrightarrow\log \left(\frac{(n!)^{1 / n}}{n}\right)=\frac{1}{n} \log (n!)-\log (n)$$  
>  now, we want to first show that this expression converges to $-1$. Notice that: 
>  $$\begin{align}\log(n!)  & = \sum_{k=1}^n \log(k) = \sum_{k=1}^n \bigl[\log(k/n) + \log(n)\bigr]= \sum_{k=1}^n \log\bigl(\tfrac{k}{n}\bigr) + n\,\log(n) \\\frac{1}{n}\log(n!) & = \frac{1}{n}\sum_{k=1}^n \log\Bigl(\frac{k}{n}\Bigr) \;+\; \log(n) \\\frac{1}{n}\log(n!) - \log(n)& = \frac{1}{n}\sum_{k=1}^n \log\Bigl(\tfrac{k}{n}\Bigr)\end{align}
> $$ 
> So we have: 
> $$\log\!\Bigl(\tfrac{(n!)^{1/n}}{n}\Bigr)\;=\; \frac{1}{n}\sum_{k=1}^n \log\Bigl(\tfrac{k}{n}\Bigr).$$
> Notice that  
> $$\frac{1}{n}\sum_{k=1}^n \log\bigl(\tfrac{k}{n}\bigr)$$  
   is Riemann sum for the integral $\int_0^1 \log x \,dx$, using the partition  
> $$0 < \tfrac{1}{n} < \tfrac{2}{n} < \cdots < \tfrac{n}{n}=1$$  
> Therefore,  
> $$\frac{1}{n}\sum_{k=1}^n \log\Bigl(\tfrac{k}{n}\Bigr)\;\longrightarrow\; \int_0^1 \log x\,dx\quad\text{as }n\to\infty
> $$
> Now we proceed to compute $\int_0^1 \log x \, dx$. We have  
> $$\int_0^1 \log x \, dx \;=\; \left[x\log x - x\right]_{0}^{1}= (0) - (-1) = -1
> $$  
> By the definition of a Riemann sum, we know that,  
> $$\lim_{n\to\infty} \frac{1}{n}\sum_{k=1}^n \log\Bigl(\tfrac{k}{n}\Bigr)\;=\; \int_0^1 \log x\,dx\;=\; -1
> $$  
> so 
> $$\lim_{n\to\infty}\log\Bigl(\tfrac{(n!)^{1/n}}{n}\Bigr)\;=\;-1
> $$  
> which is: $$\lim_{n\to\infty}\frac{(n!)^{1/n}}{n} \;=\; e^{-1}.$$




**Problem 8.39** Prove that $$\log 2 = \lim_{n\to\infty} \left[\frac{1}{n+1} + \frac{1}{n+2} + \cdots + \frac{1}{2n}\right]$$


> [!definition|*]
> Proof. Define, for each $n\in\mathbb{N}$,  $$S_n = \frac{1}{n+1} + \frac{1}{n+2} + \cdots + \frac{1}{2n} = \sum_{k=n+1}^{2n} \frac{1}{k}.$$
We let $i=k-n$, so that $k=n+i$ and $i$ runs from 1 to $n$, then we obtain  
$$S_n = \sum_{i=1}^{n} \frac{1}{n+i} = \sum_{i=1}^{n} \frac{1}{n\left(1+\frac{i}{n}\right)} = \frac{1}{n}\sum_{i=1}^{n} \frac{1}{1+\frac{i}{n}}.$$
Now, consider the function $f(x)=\frac{1}{1+x}$ defined on $[0,1]$. Since $f$ is continuous on $[0,1]$, it is Riemann integrable. Consider partition $P$ over the interval $[0,1]$ for $n$ equal subintervals $\Delta x = \frac{1}{n}$:
$$0 = x_0 < x_1 < x_2 < \cdots < x_n = 1$$
where $x_i = \frac{i}{n}$ for $i=0,1,\dots,n$. Then the Riemann sum for $f$ is  
$$R_n = \sum_{i=1}^{n} f(x_i) \Delta x = \frac{1}{n}\sum_{i=1}^{n} \frac{1}{1+\frac{i}{n}}$$
By construction, $R_n=S_n$. Thus, by the definition of the Riemann integral,  
$$\lim_{n\to\infty} S_n = \lim_{n\to\infty} R_n = \int_0^1 \frac{1}{1+x}\,dx$$
That is:
$$\int_0^1 \frac{1}{1+x}\,dx = \Bigl[\log(1+x)\Bigr]_0^1 = \log(2) - \log(1) = \log2$$
Therefore,  
$$\lim_{n\to\infty} \left[\frac{1}{n+1} + \frac{1}{n+2} + \cdots + \frac{1}{2n}\right] = \log2$$
