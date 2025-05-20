
> [!theorem|8.?.?]
> Let $f : A \subset \mathbb{R} \to \mathbb{R}$ be a bounded function on a bounded set $A$. Then $f$ is integrable on $A$ **if and only if** the set of discontinuities for the extended $f(x)$ has measure zero.

## Proof of the Theorem

### Step 1: Preparation

- Diagram: a set $A$ enclosed in set $B$.
#### (a): Set Up

- Fix rectangle $B$ with $\overline{A} \subset \text{int}(B)$ and let:
$$
g(x) = \begin{cases}  
   f(x) & \text{if } x \in A \\  
   0 & \text{if } x \notin A  
\end{cases}
$$
- Define:
$$
D = \{ x \in B \mid g \text{ is not continuous at } x \}
$$
- Need to show:
$$
f \text{ integrable } \Leftrightarrow m(D) = 0
$$
#### (b): How to Measure Discontinuity

- Oscillation of a function $h$ at a point $x_0$:
$$O(h, x_0) = \inf  \{ \sup \left\{ h(x) - h(y) : x, y \in U \} : U \text{ is a neighborhood of } x_0 \right\}$$
- **Fact:** $h$ is continuous at $x_0$ if and only if $O(h, x_0) = 0$.
### Step 2: Assume $m(D) = 0$. Prove $f$ integrable

- Will show $g$ satisfying Riemann's Condition.

**(a) Setup:**
- Fix $\epsilon > 0$. Let

$$D_{\epsilon} = \{ x \in B : O(g, x) \geq \epsilon \}$$

- Then $D_{\epsilon} \subset D \implies m(D_{\epsilon}) = 0$

- By definition, there exists a collection of **open rectangles** $\{ B_i \}$ such that:

$$D_{\epsilon} \subset \bigcup_i B_i \quad 	ext{and} \quad \sum v(B_i) < \epsilon$$

**Claim:** $D_{\epsilon}$ is **closed** (hence compact).

- Assume $x_n \in D_{\epsilon},  x \rightarrow x \implies x \in D_{\epsilon}$ (Assume that $x\ne D_{\epsilon}$)
$$O(g, x_n) \geq \epsilon \implies O(g, x) \geq \epsilon$$

---

**(b) Partition of $B$**

- Construct a partition $P$ from $\{ B_i \}_{i=1}^N$ such that each rectangle $S \in P$ is either:
  - Disjoint from $D_{\epsilon}$, or
  - Its interior is contained in one of the $B_i$

**Let:**
- $C_1 = \{ S \in P : 	\text{int}(S) 	\text{ is contained in one of the } B_i \}$
- $C_2 = \{ S \in P : S \cap D_{\epsilon} = \emptyset \}$

### (c) Refinement of $P$

- Fix $S \in C_2$  
  $S \cap D_{\epsilon} = \emptyset \implies O(g, x) < \epsilon \,\, \forall x \in S$

- Thus, $\forall x \in S, \exists$ a neighborhood $U_x$ such that:

$$\Longrightarrow\sup \{ |g(x_1) - g(x_2)| : x_1, x_2 \in U_x \} < O(g, x) + \delta,\quad \delta = \frac{1}{2} (\epsilon - O(g, x))$$

- Therefore:
$$\sup_{U_x} g - \inf_{U_x} g < O(g, x) + 2\delta = \epsilon$$

$i.e. \quad M_{U_x}(g) - m_{U_x}(g) < \epsilon.$

---

- Since $S$ is compact, $S \subset \bigcup_{x \in S} U_x \implies \exists$ **finite collection** of neighborhoods $\{ U_{x_i} \}$ that covers $S$.

- Position $S$ so that each rectangle is contained in some $U_{x_i}$.

- Do this for each $S \in C_2$

- We obtain a **refinement** of $P$, denoted by $P'$.
### (d) Verify Riemman condition for $P'$




