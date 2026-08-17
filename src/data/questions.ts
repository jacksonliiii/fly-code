import type { Company, Question, QuestionKind } from '../types';

function q(
  topicId: string,
  n: number,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  company?: Company,
): Question {
  return { id: `${topicId}-${n}`, topicId, prompt, options, correctIndex, explanation, company };
}

/** Code-based question: output prediction, bug-spotting, or fill-in-the-blank. */
function qc(
  topicId: string,
  n: number,
  kind: QuestionKind,
  prompt: string,
  code: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  company?: Company,
): Question {
  return { id: `${topicId}-c${n}`, topicId, prompt, code, kind, options, correctIndex, explanation, company };
}

export const QUESTIONS: Question[] = [
  // ---------- Two Pointers & Sliding Window ----------
  q('two-pointers', 1, 'Which technique finds the max-sum contiguous subarray of a fixed size k in O(n) time and O(1) extra space?', ['Sliding window', 'Sorting then scanning', 'Divide and conquer', 'Dynamic programming with an O(k) table'], 0, 'A fixed-size window adds the new element and subtracts the one leaving, giving O(n) total work.'),
  q('two-pointers', 2, 'For "two sum" on a SORTED array where you must use O(1) extra space, what\'s the right approach?', ['Two pointers from both ends', 'Hash map of value to index', 'Binary search for each element', 'Brute-force nested loop'], 0, 'Hashing also solves it in O(n), but uses O(n) space; sorted order lets two pointers do it with O(1) extra space.'),
  q('two-pointers', 3, 'Sliding window techniques require the input to be sorted first.', ['True', 'False'], 1, "Sliding window exploits contiguity in the array/string, not sortedness — it works fine on unsorted input."),
  q('two-pointers', 4, 'What is the amortized time complexity of a variable-size sliding window over an array of length n, where both pointers only move forward?', ['O(n)', 'O(n^2)', 'O(n log n)', 'O(1)'], 0, 'Each pointer advances at most n times total, so total work across the whole scan is linear.'),
  q('two-pointers', 5, 'Which problem is a poor fit for the two-pointer/sliding-window pattern?', ['Finding the median of two sorted arrays', 'Longest substring without repeating characters', 'Minimum window substring', 'Max sum subarray of size k'], 0, 'That problem is solved with a binary-search-on-partitions approach, not a contiguous window.'),
  q('two-pointers', 6, 'In "longest substring with at most K distinct characters," when the window has more than K distinct characters, what should happen?', ['Shrink from the left until the constraint is satisfied again', 'Reset the window to empty and restart', 'Discard the string and stop', 'Sort the characters in the window'], 0, "Advancing the left pointer removes characters until you're back under the K-distinct limit."),
  q('two-pointers', 7, 'What\'s the main advantage of two pointers over a brute-force nested loop for "container with most water"?', ['It reduces O(n^2) comparisons to O(n) by never re-examining a pair twice', 'It guarantees a sorted output', 'It uses less memory than any hashmap', 'It works on unsorted, unindexed data only'], 0, 'Moving the pointer bounding the shorter side eliminates a whole class of pairs from consideration in one step.'),
  q('two-pointers', 8, 'When merging two sorted arrays in-place with two pointers, why do you typically iterate from the back (largest elements) rather than the front?', ["To avoid overwriting elements in the first array that haven't been compared yet", 'Arrays can only be traversed backward in most languages', 'To make the algorithm recursive', 'It improves time complexity from O(n) to O(log n)'], 0, "Writing from the back into the tail (unused) space of the first array avoids clobbering values you still need to compare."),

  qc('two-pointers', 1, 'output', 'Trace this two-pointer solution. What does it return for nums = [1, 3, 4, 6, 9], target = 13?', `function twoSumSorted(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const sum = nums[lo] + nums[hi];
    if (sum === target) return [lo, hi];
    if (sum < target) lo++;
    else hi--;
  }
  return [-1, -1];
}`, ['[2, 4]', '[0, 4]', '[1, 3]', '[-1, -1]'], 0, 'lo=0,hi=4 sums to 10 (too low, lo++). lo=1,hi=4 sums to 12 (too low, lo++). lo=2,hi=4 sums to 4+9=13 — match, return [2, 4].', 'Amazon'),
  qc('two-pointers', 2, 'bug', "This should return the length of the longest substring without repeating characters, but it undercounts every answer by one. What's wrong?", `function lengthOfLongestSubstring(s) {
  let left = 0, maxLen = 0;
  const seen = new Set();
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left);
  }
  return maxLen;
}`, ['maxLen should use right - left + 1, since the window is inclusive of both ends', 'The while loop condition should check seen.size instead of seen.has(s[right])', 'seen.add(s[right]) should happen before the while loop', 'left should be reset to 0 instead of incremented'], 0, 'The window spans indices left..right inclusive, so its length is right - left + 1, not right - left.', 'Stripe'),
  qc('two-pointers', 3, 'fill-blank', 'Fill in the blank to complete this "container with most water" solution:', `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let best = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, h * (right - left));
    ____________________
  }
  return best;
}`, ['if (height[left] < height[right]) left++; else right--;', 'left++; right--;', 'if (height[left] > height[right]) left++; else right--;', 'right--;'], 0, 'Moving the shorter side is the only move that could increase the area, since the width always shrinks by one either way.', 'Microsoft'),

  // ---------- Fast & Slow Pointers ----------
  q('fast-slow', 1, "Floyd's cycle detection algorithm (\"tortoise and hare\") determines whether a linked list has a cycle using what space complexity?", ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'It only needs two pointer variables, no matter the list length.'),
  q('fast-slow', 2, 'In Floyd\'s algorithm, how much faster does the "fast" pointer move relative to the "slow" pointer?', ['2x', '3x', 'Same speed', 'Fast pointer moves backward'], 0, 'The fast pointer advances two nodes per step while slow advances one; if a cycle exists they must eventually meet.'),
  q('fast-slow', 3, "After detecting a cycle with fast/slow pointers, how do you find the cycle's starting node?", ['Reset one pointer to the head and move both one step at a time until they meet', 'Keep moving the fast pointer until it laps the slow pointer twice', 'Restart the traversal from scratch with a hash set', "It's impossible without extra memory"], 0, "This is the second phase of Floyd's algorithm; the meeting point is provably the cycle's entry node."),
  q('fast-slow', 4, 'The fast/slow pointer technique finds the middle node of a linked list in a single pass. How?', ['When fast reaches the end, slow is at the midpoint', 'Sort the list then take the middle index', 'Count nodes first, then traverse again', 'It requires converting the list to an array'], 0, 'Since fast moves twice as fast, it covers the list in half the steps slow needs, leaving slow at the midpoint.'),
  q('fast-slow', 5, 'Which of these is NOT a typical use case for fast/slow pointers?', ['Finding the k-th smallest element in an unsorted array', 'Detecting a cycle in a linked list', 'Finding the middle of a linked list', 'Determining if a linked list is a palindrome'], 0, "That's better solved with quickselect or a heap; fast/slow pointers are specific to sequential/linked traversal."),
  q('fast-slow', 6, 'As an alternative to Floyd\'s algorithm, how could you detect a cycle using O(n) extra space instead of O(1)?', ['Store visited nodes in a hash set and check membership while traversing', 'Reverse the list and check if you return to the head', 'Use recursion with no base case', 'Sort the node values'], 0, "If you revisit a node already in the set, a cycle exists — trading space for a simpler mental model."),
  q('fast-slow', 7, 'To check if a singly linked list is a palindrome in O(1) extra space, what\'s a common fast/slow-pointer approach?', ['Find the middle with fast/slow, reverse the second half, then compare both halves', 'Convert to a doubly linked list first', 'Use a stack to store all values', 'Binary search the list'], 0, 'This avoids the O(n) space of a stack/array by reversing in place, though it briefly mutates the list.'),
  q('fast-slow', 8, 'If a cycle exists, what is guaranteed about where fast and slow pointers first meet?', ["Somewhere inside the cycle, not necessarily at its start", "Always exactly at the cycle's starting node", 'Always at the tail of the list', 'They never actually meet'], 0, "That's precisely why a second phase (resetting one pointer to head) is needed to locate the cycle's start."),

  qc('fast-slow', 1, 'output', 'This finds the middle of a linked list 1 -> 2 -> 3 -> 4 -> 5. What value does it return?', `function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.val;
}`, ['3', '2', '4', '5'], 0, 'fast advances two nodes per step: after two iterations fast reaches node 5 (the end), leaving slow at node 3, the middle.', 'Microsoft'),
  qc('fast-slow', 2, 'bug', "This is supposed to detect a cycle, but it returns true even for a list with no cycle at all. What's wrong?", `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
    if (slow === fast) return true;
  }
  return false;
}`, ["fast should advance by fast.next.next (two steps) — as written it moves at the same speed as slow, so they're trivially equal after one step", 'The while condition should be `while (fast)` only', 'slow should start at head.next, not head', 'The comparison should use `slow.val === fast.val` instead of `===`'], 0, 'With both pointers moving one step at a time, slow and fast point at the exact same node after the very first iteration — a false positive with no real cycle.', 'Amazon'),
  qc('fast-slow', 3, 'fill-blank', 'Fill in the blank to complete this palindrome check for a linked list:', `function isPalindrome(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let secondHalf = reverse(slow);
  let firstHalf = head;
  while (secondHalf) {
    ____________________
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }
  return true;
}`, ['if (firstHalf.val !== secondHalf.val) return false;', 'if (firstHalf.val === secondHalf.val) return false;', 'if (firstHalf !== secondHalf) return false;', 'firstHalf.val = secondHalf.val;'], 0, 'Any mismatch between the mirrored halves means the list is not a palindrome.', 'Stripe'),

  // ---------- Binary Search Variants ----------
  q('binary-search', 1, 'Binary search requires what precondition on the search space?', ['The space must be monotonic (partitionable into two consistent halves)', 'The space must contain unique elements', 'The space must be an array, not a range of numbers', 'The space must have an even number of elements'], 0, "You need a predicate that's false-then-true across the space — arrays, answer ranges, and float domains all qualify."),
  q('binary-search', 2, '"Binary search on the answer" (e.g., "minimum days to ship packages within a weight capacity") searches over what?', ['The range of possible answer values, not array indices', 'The array of package weights directly', 'A hash map of package IDs', 'The recursion call stack'], 0, 'You binary search over candidate answers (e.g., capacities), checking feasibility with a helper function.'),
  q('binary-search', 3, 'What is the time complexity of binary search on a sorted array of n elements?', ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'], 0, 'Each comparison eliminates half of the remaining search space.'),
  q('binary-search', 4, 'When searching for the leftmost occurrence of a target in a sorted array with duplicates, what should you do when arr[mid] == target?', ['Record it as a candidate and continue searching the left half', 'Return immediately', 'Continue searching the right half only', 'Restart the search from index 0'], 0, 'There might be an earlier occurrence, so you narrow the search leftward instead of stopping.'),
  q('binary-search', 5, 'Which bug is a classic source of infinite loops in binary search implementations?', ['Updating low/high in a way that never actually shrinks the range', 'Using integer division instead of floating point', 'Initializing low to 0 instead of 1', 'Returning -1 when the target is not found'], 0, 'For example, setting high = mid instead of high = mid - 1 when mid should be excluded can loop forever.'),
  q('binary-search', 6, 'Why compute mid as low + (high - low) / 2 instead of (low + high) / 2?', ['It avoids integer overflow when low and high are both large', "It's faster at runtime", 'It handles negative numbers better', 'It changes the complexity from O(log n) to O(1)'], 0, 'low + high can overflow a fixed-width integer type before the division happens; this form avoids that.'),
  q('binary-search', 7, "Why can't you use plain binary search directly on \"search in rotated sorted array\"?", ["The array isn't globally sorted, but at least one half of any subrange still is", 'You must sort it first, defeating the point', 'Rotated arrays can have duplicate values', 'Binary search only works on ascending arrays'], 0, "The trick is detecting which half is properly sorted at each step and deciding whether the target could be in it."),
  q('binary-search', 8, 'Binary search on a real-valued domain (e.g., finding a square root to some precision) typically stops based on what?', ['The search interval shrinking below a chosen epsilon/tolerance', 'A fixed number of array elements being empty', 'The midpoint becoming negative', 'The values converting to integers'], 0, "Continuous domains don't have a discrete \"no elements left\" state, so you stop once precision is good enough."),

  qc('binary-search', 1, 'bug', "This can loop forever on some inputs. What's the bug?", `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return -1;
}`, ["hi should be set to mid - 1, not mid — since arr[mid] is already ruled out, leaving it in range can loop forever", 'mid should be computed as (lo + hi) / 2', 'The loop condition should be lo < hi', 'lo should be set to mid, not mid + 1'], 0, "When arr[mid] > target, mid can't be the answer, so hi must exclude it (mid - 1). Leaving hi = mid can stall lo and hi at the same index forever.", 'Amazon'),
  qc('binary-search', 2, 'fill-blank', 'Fill in the blank to complete "search in rotated sorted array":', `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      ____________________
    }
  }
  return -1;
}`, ['if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; else hi = mid - 1;', 'if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; else lo = mid + 1;', 'lo = mid + 1;', 'hi = mid - 1;'], 0, 'When the right half is the sorted one, check whether target falls within nums[mid+1..hi] before deciding which way to move.', 'Microsoft'),
  qc('binary-search', 3, 'output', 'This is a "binary search on the answer" pattern (first version >= 4 is "bad"). For n = 6, what does it return?', `function firstBadVersion(n, isBad) {
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (isBad(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
// isBad(v) is true whenever v >= 4`, ['4', '3', '5', '6'], 0, 'lo=1,hi=6,mid=3 (not bad) -> lo=4. lo=4,hi=6,mid=5 (bad) -> hi=5. lo=4,hi=5,mid=4 (bad) -> hi=4. lo === hi === 4.', 'Amazon'),

  // ---------- Backtracking ----------
  q('backtracking', 1, 'Backtracking differs from plain brute-force recursion mainly because it:', ["Prunes branches early once they can't lead to a valid solution", 'Always runs in polynomial time', 'Avoids recursion entirely', 'Only works on sorted input'], 0, 'Pruning is what keeps backtracking from being pure exhaustive search.'),
  q('backtracking', 2, 'In the N-Queens problem, what is typically checked before placing a queen at a cell?', ['Whether the cell is attacked by any previously placed queen', 'Whether the cell index is even', 'Whether the board size is a power of two', 'Whether the row has been visited by BFS'], 0, 'Rows are handled one at a time, so you only need to check column and diagonal conflicts against placed queens.'),
  q('backtracking', 3, 'For generating all permutations of n distinct elements via backtracking, what is the time complexity?', ['O(n!)', 'O(n^2)', 'O(2^n)', 'O(n log n)'], 0, 'There are n! distinct permutations, and the algorithm walks through that many leaf paths.'),
  q('backtracking', 4, 'When generating combinations via backtracking, what avoids producing duplicate combinations like [1,2] and [2,1]?', ['Only recursing forward from the current index', 'Sorting the output at the end and deduplicating', 'Using a hash set to store every combination seen', 'Randomizing the input order'], 0, 'Enforcing a strictly increasing index order means each subset of indices is only ever built once.'),
  q('backtracking', 5, 'With duplicate input values (e.g., "subsets II"), what is the standard trick to avoid duplicate output subsets?', ['Sort first, then skip a value at the same depth if it equals the previous sibling already explored', 'Remove all duplicates from the input before starting', "Use a different algorithm, since backtracking can't handle duplicates", 'Only allow the first occurrence of each value to be used'], 0, 'Sorting groups equal values together, so skipping repeats at the same branching level prevents duplicate subsets.'),
  q('backtracking', 6, 'What does "state space tree" refer to in backtracking?', ['The tree of all partial and complete decisions the algorithm could explore', 'A balanced BST used to store results', 'The call stack of a non-recursive solution', 'A precomputed lookup table of answers'], 0, "Each node represents a partial solution; backtracking does a DFS over this tree, pruning dead branches."),
  q('backtracking', 7, 'Which problem below is a classic backtracking problem rather than DP or greedy?', ['Solving a Sudoku puzzle', 'Finding the shortest path in a weighted graph', 'Computing the nth Fibonacci number', 'Finding the maximum subarray sum'], 0, "Sudoku requires trying candidate digits and undoing choices that lead to contradictions — the hallmark of backtracking."),
  q('backtracking', 8, "Why is backtracking's worst-case time complexity often exponential even with pruning?", ['Pruning helps on average, but adversarial inputs can still force near-exhaustive exploration', 'Backtracking always visits every node regardless of pruning', 'Recursion itself is inherently exponential', "It's a misconception — backtracking is always polynomial"], 0, 'Pruning reduces the explored space in practice, but the theoretical worst case remains exponential.'),

  qc('backtracking', 1, 'bug', "This should generate unique subsets of [1, 2, 2] with no duplicates, but it produces duplicates like [2] and [1, 2] twice. What's missing?", `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}`, ['A check to skip nums[i] when i > start and nums[i] === nums[i - 1]', 'The sort() call at the top should be removed', 'backtrack should be called with i instead of i + 1', 'result.push should happen after the for loop, not before'], 0, 'Sorting groups equal values together; skipping a repeated value at the same branching depth (i > start) avoids generating the same subset twice.', 'Microsoft'),
  qc('backtracking', 2, 'fill-blank', 'Fill in the blank to complete this permutations solution:', `function permute(nums) {
  const result = [];
  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      ____________________
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([], new Array(nums.length).fill(false));
  return result;
}`, ['path.push(nums[i]); used[i] = true;', 'path.push(i); used[i] = true;', 'path.push(nums[i]);', 'used[i] = true;'], 0, 'Both the chosen value must be added to the path and the index marked used, so the matching pop()/used[i] = false afterward correctly undoes the choice.', 'Amazon'),
  qc('backtracking', 3, 'output', 'How many subsets (including the empty one) does this produce for nums = [1, 2, 3]?', `function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result.length;
}
subsets([1, 2, 3]);`, ['8', '6', '9', '7'], 0, 'Every element is independently either included or excluded, giving 2^3 = 8 subsets total.', 'Amazon'),

  // ---------- Monotonic Stack & Queue ----------
  q('monotonic-stack', 1, 'A monotonic stack is typically used to efficiently solve which kind of problem?', ['"Next greater/smaller element" for every item in an array', 'Finding the shortest path between two nodes', 'Sorting an array in O(n) time', 'Checking if a string is a palindrome'], 0, 'Maintaining a stack in increasing or decreasing order resolves every element\'s next-greater/smaller in one pass.'),
  q('monotonic-stack', 2, 'What is the amortized time complexity of processing n elements with a monotonic stack, despite the nested-looking while loop?', ['O(n)', 'O(n^2)', 'O(n log n)', 'O(2^n)'], 0, 'Each element is pushed and popped from the stack at most once across the whole run, so total work is linear.'),
  q('monotonic-stack', 3, 'In "daily temperatures" (days until a warmer temperature), what does the stack hold?', ["Indices of days whose warmer day hasn't been found yet", 'The temperatures sorted in ascending order', 'A running sum of all temperatures', 'Pairs of (day, warmer day) already resolved'], 0, "When a warmer temperature is seen, you pop and resolve all cooler indices still on the stack."),
  q('monotonic-stack', 4, 'A monotonic deque is the standard tool for which problem?', ['Sliding window maximum', 'Detecting a cycle in a linked list', 'Merging k sorted lists', 'Finding the LCA of two tree nodes'], 0, 'The deque keeps candidates in decreasing order and evicts out-of-window indices, giving O(n) total time.'),
  q('monotonic-stack', 5, 'In "largest rectangle in histogram," why is a monotonic increasing stack of bar indices useful?', ['It finds, for each bar, the nearest shorter bar to the left and right in O(n) total', 'It sorts the histogram bars by height', 'It computes total area under all bars directly', 'It reduces the problem to binary search'], 0, "Those boundaries define the widest rectangle that bar's height can span."),
  q('monotonic-stack', 6, 'What typically triggers a "pop" from a monotonic increasing stack while scanning left to right?', ['The current element is smaller than the element at the top of the stack', 'The current element is larger than the top of the stack', 'The stack has more than n/2 elements', 'A fixed number of iterations has passed'], 0, 'A smaller incoming value breaks the increasing order, so larger elements on top must be resolved first.'),
  q('monotonic-stack', 7, 'Which of these is NOT a good fit for a monotonic stack approach?', ['Computing the maximum depth of a binary tree', 'Next greater element', 'Trapping rain water (one valid approach)', 'Largest rectangle in histogram'], 0, 'Tree depth is a straightforward DFS/BFS problem with no "next greater/smaller in a sequence" structure to exploit.'),
  q('monotonic-stack', 8, 'Why do monotonic stack solutions often store indices rather than values?', ['Indices let you compute distances/widths once a match is found', 'Values take more memory than indices always', "Indices are required by the language's stack API", "It's purely a style convention"], 0, 'Once you pop a match, you often need currentIndex - poppedIndex, which requires the index, not just the value.'),

  qc('monotonic-stack', 1, 'output', 'What does this return for temps = [73, 74, 75, 71, 69, 72]?', `function dailyTemperatures(temps) {
  const res = new Array(temps.length).fill(0);
  const stack = [];
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
dailyTemperatures([73, 74, 75, 71, 69, 72]);`, ['[1, 1, 0, 2, 1, 0]', '[1, 1, 1, 2, 1, 0]', '[1, 1, 0, 1, 1, 0]', '[0, 1, 0, 2, 1, 0]'], 0, 'Index 0 resolves at index 1 (gap 1), index 1 resolves at index 2 (gap 1), index 2 never finds a warmer day (0), and indices 3 and 4 both resolve when index 5 (72) is reached.', 'Amazon'),
  qc('monotonic-stack', 2, 'bug', "This is meant to find, for each element, the next greater element to its right. What's wrong with the comparison?", `function nextGreaterElements(nums) {
  const res = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
      const j = stack.pop();
      res[j] = nums[i];
    }
    stack.push(i);
  }
  return res;
}`, ['The comparison is inverted — it should pop while nums[stack top] < nums[i], not >', 'The stack should store values instead of indices', 'res should be initialized to 0, not -1', 'stack.push(i) should happen inside the while loop'], 0, "You want to pop (and resolve) stack entries that are smaller than the current element, since the current element is their 'next greater.' The flipped comparison never does that.", 'Stripe'),
  qc('monotonic-stack', 3, 'fill-blank', 'Fill in the blank to complete "sliding window maximum":', `function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] <= i - k) deque.shift();
    ____________________
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`, ['while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();', 'while (deque.length && nums[deque[deque.length - 1]] > nums[i]) deque.pop();', 'deque.sort((a, b) => nums[b] - nums[a]);', 'if (nums[deque[deque.length - 1]] < nums[i]) deque.pop();'], 0, 'Popping every smaller trailing element keeps the deque in decreasing order, so its front is always the max of the current window.', 'Microsoft'),

  // ---------- Heaps & Top-K ----------
  q('heaps-topk', 1, 'A min-heap of size k is the standard tool for finding what?', ['The k largest elements in a stream, in O(n log k) time', 'The k smallest elements, in O(n log n) time', 'The median in O(1) time', 'The mode of a dataset'], 0, "Keep the heap at size k; if a new element beats the heap's minimum, swap it in — bounding operations to O(log k)."),
  q('heaps-topk', 2, 'To find the running median of a stream of numbers efficiently, the standard approach uses:', ['A max-heap for the smaller half and a min-heap for the larger half', 'A single sorted array rebuilt on every insert', 'A single min-heap containing every number seen so far', 'An unbalanced binary search tree'], 0, 'The two heaps stay balanced in size, so the median is always at or near their tops in O(log n) per insertion.'),
  q('heaps-topk', 3, 'What is the time complexity of building a heap from an unsorted array of n elements via "heapify"?', ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], 0, 'A tighter amortized analysis over all n sift-downs during heapify yields O(n) overall, not O(n log n).'),
  q('heaps-topk', 4, 'Merging k sorted linked lists efficiently is commonly solved with:', ['A min-heap holding at most one node from each list at a time', 'A single concatenation followed by a full sort', 'Nested loops comparing every pair of lists', 'A monotonic stack'], 0, 'Repeatedly popping the smallest and pushing its successor gives O(n log k) total time for n total nodes.'),
  q('heaps-topk', 5, 'Why use a min-heap of size k instead of a max-heap of size n to find the k largest elements in a large stream?', ['It keeps memory usage bounded to O(k) instead of O(n)', 'It is the only data structure capable of holding numbers', 'It guarantees O(1) time per insertion', 'It automatically removes duplicates'], 0, 'You never need to store more than k candidates at once, which matters for large or unbounded streams.'),
  q('heaps-topk', 6, 'What is the time complexity of extracting the minimum from a binary min-heap of n elements?', ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'], 0, 'Removing the root requires moving the last element up and sifting it down, which takes O(log n).'),
  q('heaps-topk', 7, 'In "top K frequent elements," after counting frequencies with a hash map, which approach avoids a full O(n log n) sort?', ['Bucket sort by frequency, or a heap of size k', 'Sorting the hash map entries alphabetically by key', 'A monotonic stack on the frequency counts', 'Recomputing frequencies with nested loops'], 0, 'Bucket sort by frequency achieves O(n); a size-k heap achieves O(n log k) — both beat a full sort when k is small.'),
  q('heaps-topk', 8, 'What is a key tradeoff of using a heap instead of a fully sorted structure for top-K problems?', ['A heap gives fast access to just the min/max, not a fully ordered view of all elements', 'Heaps use less memory than arrays in every case', 'Heaps guarantee O(1) search for arbitrary elements', 'Heaps can only store integers'], 0, "That's exactly the tradeoff that makes it fast for \"give me the top K\" — you pay less because order isn't fully maintained."),

  qc('heaps-topk', 1, 'bug', 'This is meant to return the 2nd largest element. For nums = [3, 2, 1, 5, 6, 4], k = 2, it returns 6 instead of the correct answer, 5. What\'s wrong?', `function findKthLargest(nums, k) {
  let top = []; // kept sorted ascending, size <= k
  for (const num of nums) {
    top.push(num);
    top.sort((a, b) => a - b);
    if (top.length > k) top.shift();
  }
  return top[top.length - 1];
}`, ["It should return top[0] (the smallest of the k largest seen), not top[top.length - 1] — that's just the overall largest", 'top.sort should sort descending instead of ascending', 'The shift() should be a pop() instead', 'k should be compared with >= instead of >'], 0, 'top ends up holding the k largest values, smallest-first. The kth largest is the smallest one in that set — top[0] — not the biggest.', 'Amazon'),
  qc('heaps-topk', 2, 'fill-blank', 'Fill in the blank to complete "top K frequent elements" via bucket sort:', `function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  const buckets = new Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, freq] of count) {
    ____________________
  }
  const result = [];
  for (let f = buckets.length - 1; f >= 0 && result.length < k; f--) {
    for (const num of buckets[f]) {
      if (result.length < k) result.push(num);
    }
  }
  return result;
}`, ['buckets[freq].push(num);', 'buckets[num].push(freq);', 'buckets.push([num, freq]);', 'buckets[freq] = num;'], 0, 'Indexing buckets by frequency lets you sweep from the highest frequency down, collecting the top k in O(n) with no sort.', 'Microsoft'),
  qc('heaps-topk', 3, 'output', 'This keeps a running window of the 3 largest values seen. What does it return for nums = [4, 1, 7, 3, 9, 2]?', `function kLargest(nums, k) {
  let top = [];
  for (const num of nums) {
    top.push(num);
    top.sort((a, b) => a - b);
    if (top.length > k) top.shift();
  }
  return top;
}
kLargest([4, 1, 7, 3, 9, 2], 3);`, ['[4, 7, 9]', '[7, 9, 2]', '[2, 4, 7]', '[3, 4, 7]'], 0, 'Sorted descending, the input is 9, 7, 4, 3, 2, 1 — the top 3 are 9, 7, 4, kept ascending as [4, 7, 9].', 'Amazon'),

  // ---------- Hashing Deep Dive ----------
  q('hashing', 1, "What is the average-case time complexity of insert/lookup/delete in a well-implemented hash map?", ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 0, 'With a good hash function and load factor management, operations are constant time on average.'),
  q('hashing', 2, 'What causes hash map operations to degrade to O(n) in the worst case?', ['Many keys colliding into the same bucket', 'Using too few keys', 'Storing values larger than 64 bits', 'Using string keys instead of integer keys'], 0, 'If collisions pile into one bucket, that bucket degenerates into a linked list (or tree) scan of size O(n).'),
  q('hashing', 3, 'Which collision strategy stores multiple colliding entries in a linked list (or tree) at each bucket index?', ['Separate chaining', 'Open addressing with linear probing', 'Robin Hood hashing exclusively', 'Perfect hashing'], 0, 'Each bucket holds a chain of entries; open addressing instead finds another slot within the table itself.'),
  q('hashing', 4, 'In open addressing with linear probing, what happens when the target slot is already occupied?', ['The algorithm checks the next slot(s) in sequence until it finds an empty one', 'The insert silently fails', 'A new hash table is created immediately', 'The existing entry is overwritten regardless of key'], 0, 'This keeps all entries within the array itself, trading chain-following for probe sequences.'),
  q('hashing', 5, 'Why do many hash maps automatically resize once the load factor crosses a threshold (e.g., 0.75)?', ['To keep average bucket occupancy low and preserve O(1) amortized operations', 'To save memory at all costs regardless of speed', 'Because most languages require a fixed table size', 'To force keys to be re-sorted alphabetically'], 0, 'As more keys pack into the same number of buckets, collision chains grow; resizing spreads entries back out.'),
  q('hashing', 6, 'What is the amortized cost of a single insert into a hash map, accounting for occasional full-table resizes?', ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'Resizes are expensive (O(n)) but infrequent enough that their cost, spread across all inserts, averages to O(1).'),
  q('hashing', 7, 'Why is a good hash function expected to distribute keys uniformly across buckets?', ['To minimize collisions and keep expected chain/probe length short', 'To make the hash function reversible', 'To guarantee keys are stored in sorted order', 'To reduce total memory used by the table'], 0, "Uniform distribution is what keeps the average-case O(1) guarantee realistic in practice."),
  q('hashing', 8, '"Design a hash map from scratch" interview questions often expect you to discuss:', ['Bucket array sizing, collision handling, and resizing strategy', "Only the syntax of a specific language's built-in map", 'Sorting algorithms exclusively', 'Recursive tree balancing'], 0, "These are the core engineering decisions that determine a hash map's real-world performance."),

  qc('hashing', 1, 'bug', "For nums = [3, 5], target = 6, this returns [0, 0] — but nums[0] can't pair with itself. What's the bug?", `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
  }
  return [];
}
twoSum([3, 5], 6);`, ['It inserts nums[i] into the map before checking for the complement, so a value can match itself', 'The map should use values as keys mapped to counts, not indices', 'target - nums[i] should be nums[i] - target', 'The loop should start at i = 1, not i = 0'], 0, "3's complement is 3, and 3 was just inserted into the map on this same iteration. Checking the complement before inserting the current value avoids self-matches.", 'Amazon'),
  qc('hashing', 2, 'fill-blank', 'Fill in the blank to complete "group anagrams":', `function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = ____________________;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}`, ["s.split('').sort().join('')", 's.length.toString()', 's[0]', "s.split('').reverse().join('')"], 0, "Anagrams share the same letters, so sorting each string's characters produces an identical key for every anagram in the group.", 'Microsoft'),
  qc('hashing', 3, 'output', 'Trace this LRU cache (capacity 2). What does the final get(2) call return?', `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
    this.map.set(key, val);
  }
}
const c = new LRUCache(2);
c.put(1, 'a'); c.put(2, 'b');
c.get(1);
c.put(3, 'c');
c.get(2);`, ['-1', "'b'", '2', "'c'"], 0, "get(1) makes key 2 the least-recent. put(3, 'c') then evicts key 2 to make room, so get(2) finds nothing and returns -1.", 'Microsoft'),

  // ---------- Trees & BSTs ----------
  q('trees-bst', 1, 'What is the time complexity of search, insert, and delete in a balanced binary search tree?', ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], 0, "A balanced BST's height is O(log n), and these operations traverse at most one root-to-leaf path."),
  q('trees-bst', 2, 'What can happen to a BST if elements are inserted in already-sorted order without rebalancing?', ['It degenerates into a linked list with O(n) operations', 'It automatically self-balances', 'It becomes a complete binary tree', 'It throws an error'], 0, 'Every new node becomes the rightmost (or leftmost) child, producing a skewed tree with height O(n).'),
  q('trees-bst', 3, 'Which traversal visits nodes in ascending sorted order for a valid BST?', ['In-order (left, root, right)', 'Pre-order (root, left, right)', 'Post-order (left, right, root)', 'Level-order (breadth-first)'], 0, 'This follows from the BST property: everything in the left subtree is smaller, everything in the right is larger.'),
  q('trees-bst', 4, 'Self-balancing trees like AVL and Red-Black trees maintain O(log n) height by:', ['Performing rotations after insert/delete to restore balance invariants', 'Periodically rebuilding the whole tree from scratch', 'Only allowing insertions, never deletions', 'Converting to a hash map internally'], 0, 'Rotations locally restructure a small part of the tree in O(log n) time to restore the balance property.'),
  q('trees-bst', 5, 'To find the Lowest Common Ancestor (LCA) of two nodes in a plain binary tree, a common approach is:', ['Recursive DFS that returns up once both targets are found in different subtrees', 'Sorting all node values first', 'Only usable if the tree is a BST', 'BFS from both nodes simultaneously with no recursion'], 0, 'The first node where the two searches "meet" (one target found in each subtree) is the LCA.'),
  q('trees-bst', 6, 'In a BST specifically, how can you find the LCA of two nodes more efficiently than the general binary tree approach?', ['Use the BST ordering property to decide whether to go left, right, or stop', 'You cannot do better than the general tree algorithm', 'Convert it to an array first', 'Use a hash map of parent pointers only'], 0, 'If both targets are less than the current node, go left; if both greater, go right; otherwise you found the split point.'),
  q('trees-bst', 7, 'What is a standard approach to serialize and deserialize a binary tree?', ['Pre-order traversal with explicit markers for null children', 'Only storing the leaf values', 'Converting the tree to a BST first', "Storing just the tree's height and node count"], 0, 'Recording nulls explicitly lets deserialization reconstruct the exact tree shape unambiguously.'),
  q('trees-bst', 8, 'Why validate a BST using min/max bounds passed down recursively, instead of only checking each node against its immediate children?', ['A node can violate the BST property relative to an ancestor even if fine relative to its parent', 'It is asymptotically faster than a bounds-free check', 'In-order traversal cannot be used for validation', 'Recursion is required by definition for trees'], 0, "A right child's left grandchild, for instance, must still be greater than the original root — a local check misses that."),

  qc('trees-bst', 1, 'bug', 'This is supposed to validate a BST but wrongly accepts some invalid trees. What\'s missing?', `function isValidBST(node) {
  if (!node) return true;
  if (node.left && node.left.val >= node.val) return false;
  if (node.right && node.right.val <= node.val) return false;
  return isValidBST(node.left) && isValidBST(node.right);
}`, ['It only compares each node to its direct children, not to all ancestors — min/max bounds must be threaded through the recursion', 'The base case should return false when node is null', 'It should use <= and >= instead of < and >', 'isValidBST should not be called recursively'], 0, "A node can be locally fine relative to its parent yet still violate the BST property relative to a grandparent — e.g., a right subtree's left grandchild that's smaller than the root.", 'Microsoft'),
  qc('trees-bst', 2, 'output', 'What does an in-order traversal produce for this tree?', `function inorder(node, out = []) {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.val);
  inorder(node.right, out);
  return out;
}
//        5
//      /   \\
//     3     8
//      \\
//       4`, ['[3, 4, 5, 8]', '[5, 3, 8, 4]', '[3, 5, 4, 8]', '[5, 3, 4, 8]'], 0, 'In-order visits left, root, right — for a valid BST that always yields ascending sorted order: 3, 4, 5, 8.', 'Amazon'),
  qc('trees-bst', 3, 'fill-blank', 'Fill in the blank to complete this BST lowest-common-ancestor solution:', `function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) {
      node = node.left;
    } else if (p.val > node.val && q.val > node.val) {
      node = node.right;
    } else {
      ____________________
    }
  }
}`, ['return node;', 'node = node.left;', 'return null;', 'node = node.right;'], 0, 'Once p and q are no longer both on the same side, node is the split point — the lowest common ancestor.', 'Amazon'),

  // ---------- Tries ----------
  q('tries', 1, 'A trie (prefix tree) is optimized for which kind of query?', ['Prefix matching and autocomplete over a set of strings', 'Random access by numeric index', 'Finding the median of a set of numbers', 'Detecting cycles in a graph'], 0, "Each path from the root spells out a prefix, so words sharing a prefix share a path — ideal for prefix queries."),
  q('tries', 2, 'What is the time complexity of inserting a word of length L into a trie?', ['O(L)', 'O(L^2)', 'O(n), where n is the number of words already stored', 'O(log n)'], 0, 'You walk (or create) exactly one node per character in the word, independent of other stored words.'),
  q('tries', 3, 'Compared to a hash set of strings, what key advantage does a trie offer?', ['Efficient prefix-based queries (e.g., all words starting with "pre")', 'Faster exact-match lookup than a hash set', 'Lower memory usage in all cases', 'Guaranteed alphabetical iteration with no extra work'], 0, "A hash set gives O(1) exact lookups but can't efficiently enumerate by prefix; a trie's structure makes that natural."),
  q('tries', 4, 'In "word search II" (finding dictionary words in a grid), why is a trie often used alongside DFS/backtracking?', ['It lets the search abandon a path early once no dictionary word matches the prefix so far', 'It removes the need for backtracking entirely', 'It converts the grid search into a sorting problem', 'It reduces the grid to O(1) size'], 0, "If the current path's letters don't correspond to any trie node, you can prune immediately."),
  q('tries', 5, 'What is typically stored at (or marked on) the trie node where a word ends?', ['An "end of word" flag (and optionally the word itself)', "The word's frequency only", "Nothing — tries can't mark word boundaries", 'A pointer back to the root'], 0, 'Without this marker, you could not distinguish "cat" as a complete word from just being a prefix of "cats".'),
  q('tries', 6, 'What is the space complexity concern with tries compared to hash sets?', ['Tries can use more memory due to per-character node overhead, especially with sparse alphabets', 'Tries always use less memory than any other structure', 'Tries cannot store more than 26 words', 'Space usage is identical to a hash set in all cases'], 0, 'Each node often holds an array/map of children even when only one path is used, adding overhead versus a flat set.'),
  q('tries', 7, 'Which problem is a strong fit for a trie-based solution?', ['Implementing autocomplete suggestions as a user types', 'Finding the shortest path in a weighted graph', 'Detecting a cycle in a linked list', 'Balancing a binary search tree'], 0, 'Autocomplete is fundamentally a "find all words with this prefix" query, which is the trie\'s core strength.'),
  q('tries', 8, 'A "compressed trie" (radix tree) improves on a standard trie mainly by:', ['Merging chains of single-child nodes into one edge labeled with a substring', 'Removing the need for an "end of word" marker', 'Making all operations O(1)', 'Only supporting numeric keys'], 0, 'This reduces node count (and memory) when many words share long unbranching prefixes.'),

  qc('tries', 1, 'fill-blank', 'Fill in the blank to complete trie insertion:', `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

function insert(root, word) {
  let node = root;
  for (const ch of word) {
    if (!node.children[ch]) {
      ____________________
    }
    node = node.children[ch];
  }
  node.isEnd = true;
}`, ['node.children[ch] = new TrieNode();', 'node.children[ch] = true;', 'node = new TrieNode();', 'node.isEnd = true;'], 0, 'Each missing character needs a fresh TrieNode created before you can descend into it.', 'Amazon'),
  qc('tries', 2, 'bug', 'This trie only has the word "cats" inserted, but search("cat") wrongly returns true. What\'s the bug?', `function search(root, word) {
  let node = root;
  for (const ch of word) {
    if (!node.children[ch]) return false;
    node = node.children[ch];
  }
  return true;
}`, ['It should return node.isEnd, not true — otherwise any inserted prefix counts as a full match', 'The for loop should iterate word.length - 1 times', 'node.children[ch] should be checked with ==, not !', 'It should start node at root.children, not root'], 0, '"cat" is a valid path in the trie (as a prefix of "cats"), but it was never marked as a complete word — only node.isEnd tells you that.', 'Microsoft'),
  qc('tries', 3, 'output', 'This counts the nodes created (excluding the root). How many nodes exist after inserting "at" and "an"?', `function countNodes(root) {
  let count = 0;
  function dfs(node) {
    for (const ch in node.children) {
      count++;
      dfs(node.children[ch]);
    }
  }
  dfs(root);
  return count;
}
// words inserted: "at", "an"`, ['3', '2', '4', '5'], 0, "Both words share the 'a' node, then branch into separate 't' and 'n' nodes — 3 nodes total, not 4.", 'Microsoft'),

  // ---------- Union-Find ----------
  q('union-find', 1, 'What are the two primary operations of a Union-Find (Disjoint Set Union) data structure?', ['find (which set does this element belong to) and union (merge two sets)', 'insert and delete', 'push and pop', 'search and sort'], 0, 'These two operations are all that is needed to track and merge dynamic connectivity groups.'),
  q('union-find', 2, 'With both "union by rank/size" and "path compression," what is the amortized time complexity per operation?', ['Nearly O(1) — technically O(alpha(n)), the inverse Ackermann function', 'O(log n)', 'O(n)', 'O(n log n)'], 0, 'alpha(n) grows so slowly it is effectively constant for any n you would encounter in practice.'),
  q('union-find', 3, 'What does "path compression" do during a find operation?', ['Makes every node on the path point directly to the root', 'Deletes nodes that are no longer connected', 'Sorts the elements within a set', 'Merges all sets into one regardless of connectivity'], 0, 'This is a key optimization — once you have walked up to find the root, you can shortcut future traversals.'),
  q('union-find', 4, 'Union-Find is the standard tool for which classic problem?', ["Detecting cycles in an undirected graph / building an MST with Kruskal's algorithm", 'Finding the shortest path between two nodes', 'Balancing a binary tree', 'Sorting an array of intervals'], 0, "Kruskal's algorithm adds edges in weight order and uses union-find to skip any edge that would create a cycle."),
  q('union-find', 5, 'What does "union by rank" (or by size) prevent?', ['The resulting tree from becoming tall and unbalanced', 'Cycles from forming in the underlying graph', 'Duplicate elements from being inserted', 'Memory leaks from unused nodes'], 0, 'Without it, repeated unions in a bad order could produce a tall, linked-list-like structure, hurting find performance.'),
  q('union-find', 6, 'In "number of connected components in an undirected graph," how is union-find applied?', ['Union the endpoints of every edge, then count the number of distinct roots remaining', 'Sort all edges by weight first', 'Run BFS from every single node', 'Union-find cannot be used for this problem'], 0, 'Every union merges two components into one; the distinct roots remaining correspond to the connected components.'),
  q('union-find', 7, 'Compared to BFS/DFS for connectivity, when is union-find particularly advantageous?', ['When edges/connections arrive incrementally and you need dynamic connectivity queries', 'When the graph is a simple binary tree', 'Only when the graph has fewer than 10 nodes', 'Never — BFS/DFS is always strictly better'], 0, 'Union-find handles online, incremental unions efficiently, whereas BFS/DFS typically assumes a static graph per query.'),
  q('union-find', 8, 'What does it mean if find(a) == find(b) in a union-find structure?', ['a and b belong to the same connected component/set', 'a and b are adjacent nodes in the graph', 'a equals b', 'a and b have the same rank'], 0, 'find returns each element\'s set representative (root); matching roots mean they have been unioned into the same group.'),

  qc('union-find', 1, 'fill-blank', 'Fill in the blank to complete path-compressed find():', `function find(parent, x) {
  if (parent[x] !== x) {
    ____________________
  }
  return parent[x];
}`, ['parent[x] = find(parent, parent[x]);', 'parent[x] = x;', 'return find(parent, parent[x]);', 'parent[x] = parent[parent[x]];'], 0, 'Recursing to the true root and caching it directly on x flattens the tree, so future find(x) calls are O(1).', 'Amazon'),
  qc('union-find', 2, 'bug', 'This union() function corrupts the structure. What\'s wrong?', `function union(parent, rank, a, b) {
  parent[a] = b;
}`, ['It should union the roots of a and b (via find), not a and b directly', 'parent[a] should be set to a, not b', 'rank should be checked before parent, not after', 'The function should return a boolean'], 0, "If a or b aren't already roots, this creates a shortcut that breaks the invariant that every chain of parent pointers ends at a root — future find() calls can return wrong or inconsistent roots.", 'Microsoft'),

  // ---------- Graph Traversal & Topo Sort ----------
  q('graph-traversal', 1, 'What data structure underlies a standard BFS traversal?', ['A queue (FIFO)', 'A stack (LIFO)', 'A min-heap', 'A union-find structure'], 0, 'BFS explores level by level, and a queue naturally processes nodes in the order they were discovered.'),
  q('graph-traversal', 2, 'What data structure (explicitly or via the call stack) underlies a standard DFS traversal?', ['A stack (LIFO)', 'A queue (FIFO)', 'A priority queue', 'A doubly linked list'], 0, 'Whether recursive (call stack) or iterative (explicit stack), DFS dives deep before backtracking.'),
  q('graph-traversal', 3, 'BFS is the natural choice for which kind of problem?', ['Finding the shortest path in an unweighted graph', 'Finding a topological order', 'Detecting a cycle in a directed graph', 'Computing connected components only'], 0, "Because BFS explores nodes in increasing distance order, the first time it reaches a node is via a shortest path."),
  q('graph-traversal', 4, 'What does a topological sort produce, and under what condition is it possible?', ['A linear ordering where every edge goes earlier-to-later; possible only if the graph is a DAG', 'A random ordering of all nodes; always possible', 'The shortest path tree; possible only on weighted graphs', 'A sorted list of edge weights; possible on any graph'], 0, 'A cycle would force some node to come both before and after another, which is contradictory.'),
  q('graph-traversal', 5, "Kahn's algorithm computes a topological sort using which technique?", ['Repeatedly removing nodes with in-degree zero, BFS-style', 'Repeatedly removing nodes with the highest out-degree', 'Sorting nodes alphabetically by label', 'Running Dijkstra on unweighted edges'], 0, 'A node with no remaining incoming edges has no unresolved dependencies, so it is safe to place next.'),
  q('graph-traversal', 6, 'How can DFS be used to detect a cycle in a directed graph?', ['Track nodes currently "on the recursion stack"; revisiting one indicates a cycle', 'Just check if any node has more than one incoming edge', 'Count total edges and compare to total nodes', "Cycles can't be detected with DFS, only BFS"], 0, "A visited-but-not-yet-finished node reached again means there's a back edge, the signature of a cycle."),
  q('graph-traversal', 7, 'What is the time complexity of BFS or DFS on a graph with V vertices and E edges, using an adjacency list?', ['O(V + E)', 'O(V * E)', 'O(V^2)', 'O(E log V)'], 0, 'Each vertex is visited once and each edge is examined once (or twice for undirected), a constant factor.'),
  q('graph-traversal', 8, 'In a grid problem like "number of islands," why is DFS or BFS the right tool?', ['The grid is an implicit graph, and you need to explore connected land cells from a start cell', 'You need to sort the grid cells by value first', 'The problem requires finding a global minimum spanning tree', 'Union-find can never be used as an alternative'], 0, 'Adjacent grid cells act as graph edges; DFS/BFS floods outward marking all cells in one connected island.'),

  qc('graph-traversal', 1, 'bug', "This graph is a DAG (0->1, 0->2, 1->3, 2->3, no actual cycle), but hasCycle still returns true. What's wrong?", `function hasCycle(graph, n) {
  const visited = new Set();
  function dfs(node) {
    if (visited.has(node)) return true;
    visited.add(node);
    for (const next of graph[node]) {
      if (dfs(next)) return true;
    }
    return false;
  }
  for (let i = 0; i < n; i++) {
    if (dfs(i)) return true;
  }
  return false;
}`, ['It never distinguishes nodes still on the current DFS path from ones already fully explored, so revisiting any previously-seen node looks like a cycle', 'The for loop over graph[node] should use a while loop instead', 'visited.add(node) should happen after the for loop, not before', 'dfs should be called with graph[node] instead of node'], 0, "Node 3 is reached from both branch 1 and branch 2 of this diamond-shaped DAG. The second time it's seen, visited.has(3) is true even though it isn't a back edge — a true cycle check needs to track only nodes on the current recursion stack.", 'Amazon'),
  qc('graph-traversal', 2, 'fill-blank', "Fill in the blank to complete Kahn's algorithm for topological sort:", `function topoSort(n, edges) {
  const indegree = new Array(n).fill(0);
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    indegree[v]++;
  }
  const queue = ____________________;
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of adj[node]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return order.length === n ? order : [];
}`, ['[...Array(n).keys()].filter((i) => indegree[i] === 0)', '[...Array(n).keys()]', 'adj.filter((list) => list.length === 0)', '[]'], 0, 'Only nodes with no remaining dependencies (in-degree 0) are safe to place first.', 'Microsoft'),
  qc('graph-traversal', 3, 'output', "What does this return for shortestPath(adj, 'A', 'D') on adj = { A: ['B','C'], B: ['D'], C: ['D'], D: [] }?", `function shortestPath(adj, start, end) {
  const dist = { [start]: 0 };
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    for (const next of adj[node]) {
      if (!(next in dist)) {
        dist[next] = dist[node] + 1;
        queue.push(next);
      }
    }
  }
  return dist[end];
}`, ['2', '1', '3', 'undefined'], 0, 'BFS reaches B and C at distance 1, then D via either one at distance 2 — the first time D is discovered fixes its shortest distance.', 'Amazon'),

  // ---------- Shortest Paths ----------
  q('shortest-paths', 1, "Dijkstra's algorithm finds shortest paths from a single source, but has what key limitation?", ["It doesn't work correctly with negative edge weights", 'It only works on undirected graphs', 'It requires the graph to be acyclic', 'It can only find paths of length 1'], 0, "Dijkstra's greedy approach assumes a finalized node's distance can't improve later — negative weights break that."),
  q('shortest-paths', 2, "What data structure makes Dijkstra's algorithm efficient in practice, at O((V+E) log V)?", ['A min-heap (priority queue) to expand the closest unvisited node next', 'A stack, since it is fundamentally a DFS', 'A hash set with no ordering', 'A doubly linked list'], 0, 'Greedily picking the nearest unfinalized node each time is exactly what a priority queue is optimized for.'),
  q('shortest-paths', 3, "Bellman-Ford's key advantage over Dijkstra is that it:", ['Correctly handles negative edge weights (and can detect negative cycles)', 'Runs faster than Dijkstra on all graphs', 'Requires no edge weights at all', 'Works only on trees'], 0, 'It relaxes all edges up to V-1 times, correctly propagating negative-weight improvements Dijkstra would miss.'),
  q('shortest-paths', 4, 'What is the time complexity of Bellman-Ford on a graph with V vertices and E edges?', ['O(V * E)', 'O(V + E)', 'O(E log V)', 'O(V^2 * E)'], 0, 'It performs up to V-1 rounds of relaxing all E edges.'),
  q('shortest-paths', 5, 'For an unweighted graph, what is the simplest and most efficient way to find shortest paths from a source?', ['Plain BFS, treating every edge as weight 1', "Dijkstra's algorithm with a priority queue", 'Bellman-Ford', 'Floyd-Warshall'], 0, 'BFS already explores nodes in strict order of hop-distance, exactly matching "shortest path" when all edges are equal weight.'),
  q('shortest-paths', 6, 'What does the Floyd-Warshall algorithm compute, and what is its time complexity?', ['All-pairs shortest paths in O(V^3)', 'Single-source shortest path in O(V log V)', 'Minimum spanning tree in O(E log V)', 'Topological order in O(V + E)'], 0, 'Its triple-nested loop over intermediate, source, and destination vertices gives cubic complexity, and it handles negative edges (not negative cycles).'),
  q('shortest-paths', 7, 'A common interview question is "cheapest flights within K stops." Why does plain Dijkstra need modification here?', ['Dijkstra normally ignores the number of edges used to reach a node, but this problem constrains that count', 'Dijkstra cannot handle weighted graphs at all', 'The problem requires negative weights', 'It does not need modification'], 0, 'You typically track (node, stops-used) as the state, since a costlier path with fewer stops might still be the answer.'),
  q('shortest-paths', 8, 'When would you choose Bellman-Ford over Dijkstra despite it being slower?', ['When the graph might contain negative edge weights', 'When the graph is guaranteed to have only positive weights and speed matters most', 'When you only need shortest paths in an unweighted graph', 'When memory is more constrained than time'], 0, "Correctness comes first — Dijkstra's speed advantage doesn't matter if it gives the wrong answer."),

  qc('shortest-paths', 1, 'fill-blank', 'Fill in the blank to complete this Dijkstra relaxation step:', `function dijkstra(n, adj, src) {
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  const pq = new MinPriorityQueue(); // pops [dist, node] with smallest dist
  pq.push([0, src]);
  while (!pq.isEmpty()) {
    const [d, node] = pq.pop();
    if (d > dist[node]) continue;
    for (const [next, weight] of adj[node]) {
      ____________________
    }
  }
  return dist;
}`, ['if (d + weight < dist[next]) { dist[next] = d + weight; pq.push([dist[next], next]); }', 'if (d + weight < dist[next]) dist[next] = d + weight;', 'dist[next] = Math.min(dist[next], weight);', 'pq.push([d + weight, next]);'], 0, 'A relaxed distance must both be recorded in dist and pushed back into the queue so the algorithm actually explores from that improved value.', 'Microsoft'),
  qc('shortest-paths', 2, 'output', 'What does this return for dijkstra(4, graph, 0), where graph is the adjacency matrix shown?', `function dijkstra(n, adjMatrix, src) {
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  dist[src] = 0;
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && (u === -1 || dist[v] < dist[u])) u = v;
    }
    visited[u] = true;
    for (let v = 0; v < n; v++) {
      if (adjMatrix[u][v] > 0 && dist[u] + adjMatrix[u][v] < dist[v]) {
        dist[v] = dist[u] + adjMatrix[u][v];
      }
    }
  }
  return dist;
}
const graph = [
  [0, 4, 1, 0],
  [4, 0, 1, 1],
  [1, 1, 0, 5],
  [0, 1, 5, 0],
];
dijkstra(4, graph, 0);`, ['[0, 2, 1, 3]', '[0, 4, 1, 3]', '[0, 2, 1, 6]', '[0, 4, 1, 5]'], 0, 'From 0, node 2 is closest (1). Through 2, node 1 improves to 2 and node 3 to 6. Through 1 (dist 2), node 3 improves further to 3.', 'Amazon'),

  // ---------- DP Foundations ----------
  q('dp-foundations', 1, 'Dynamic programming is applicable when a problem exhibits which two properties?', ['Optimal substructure and overlapping subproblems', 'Sortedness and symmetry', 'Optimal substructure only, without needing repeated subproblems', 'Randomized inputs and greedy choices'], 0, 'Optimal substructure means the optimal solution builds from optimal sub-solutions; overlapping subproblems means those repeat, which memoization exploits.'),
  q('dp-foundations', 2, 'What is the key difference between memoization (top-down) and tabulation (bottom-up) DP?', ['Memoization recurses and caches as needed; tabulation iteratively fills a table from base cases up', 'Memoization is always faster than tabulation', 'Tabulation cannot be used for 2D problems', 'Memoization never uses extra memory'], 0, 'They compute the same values, but memoization only computes subproblems actually needed.'),
  q('dp-foundations', 3, 'Why does naive recursive Fibonacci run in O(2^n) time, while a DP version runs in O(n)?', ['Naive recursion recomputes the same subproblems exponentially many times', 'Naive recursion uses a different mathematical formula', 'DP always uses less memory regardless of the algorithm', 'O(2^n) is incorrect; naive recursion is O(n) too'], 0, 'fib(n) calls fib(n-1) and fib(n-2), which independently recompute overlapping subproblems all the way down without caching.'),
  q('dp-foundations', 4, 'For "house robber" (can\'t rob two adjacent houses), what is a typical DP state?', ['dp[i] = max money obtainable considering houses 0..i', 'dp[i] = the value of house i only', 'dp[i] = whether house i was robbed, with no accumulated value', 'dp[i] = the sorted list of house values'], 0, 'The recurrence dp[i] = max(dp[i-1], dp[i-2] + nums[i]) captures the choice to skip or rob house i.'),
  q('dp-foundations', 5, 'What is the main benefit of reducing a DP solution\'s space from O(n) to O(1)?', ['When each state depends on a fixed small number of previous states, you avoid storing the whole table', 'It always makes the algorithm asymptotically faster in time too', 'It is required for the DP approach to be correct', 'It only works for 2D DP problems'], 0, 'E.g., Fibonacci-style recurrences only need the last one or two values, so a few rolling variables suffice.'),
  q('dp-foundations', 6, 'In "coin change" (minimum coins to make amount X), what does dp[i] typically represent?', ['The minimum number of coins needed to make amount i', 'The number of distinct ways to make amount i', 'Whether amount i is achievable, as a boolean only', 'The largest coin denomination less than i'], 0, 'dp[i] = min(dp[i - coin] + 1) over all coins <= i, starting from dp[0] = 0.'),
  q('dp-foundations', 7, 'What is a common mistake when transitioning from a brute-force recursive solution to memoized DP?', ['Defining the state imprecisely, so the cache conflates genuinely different subproblems', 'Adding a memo table always slows the algorithm down', 'Memoization requires switching to an iterative approach first', 'Memoization cannot be combined with recursion'], 0, "If two calls that should give different answers map to the same cache key, memoization returns wrong cached results."),
  q('dp-foundations', 8, 'Longest Increasing Subsequence has an O(n^2) DP solution — what is the best known complexity using patience sorting / binary search?', ['O(n log n)', 'O(n)', 'O(log n)', 'O(n^2 log n)'], 0, 'Maintaining a "tails" array of smallest tail values per subsequence length, updated via binary search, gets you to n log n.'),

  qc('dp-foundations', 1, 'bug', 'This House Robber solution always returns max(nums[0], nums[1]) no matter how long the array is. What\'s the bug?', `function rob(nums) {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2]);
  }
  return dp[nums.length - 1];
}`, ['The second term should be dp[i - 2] + nums[i] — it never adds the value of robbing house i', 'dp[0] should be initialized to 0, not nums[0]', 'The loop should start at i = 1, not i = 2', 'It should use Math.min instead of Math.max'], 0, "As written, dp[i] just keeps comparing earlier values without ever including nums[i], so it can never grow past the first two houses.", 'Amazon'),
  qc('dp-foundations', 2, 'fill-blank', 'Fill in the blank to complete "climbing stairs":', `function climbStairs(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = ____________________;
  }
  return dp[n];
}`, ['dp[i - 1] + dp[i - 2]', 'dp[i - 1] * dp[i - 2]', 'dp[i - 1] + 1', 'Math.max(dp[i - 1], dp[i - 2])'], 0, 'You reach step i either from step i - 1 (one step) or step i - 2 (two steps), so the number of ways is the sum of both.', 'Microsoft'),
  qc('dp-foundations', 3, 'output', 'What does this return for coinChange([1, 2, 5], 11)?', `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
coinChange([1, 2, 5], 11);`, ['3', '2', '4', '-1'], 0, '11 = 5 + 5 + 1, the minimum possible combination — 3 coins.', 'Microsoft'),

  // ---------- DP on Grids, Intervals & Trees ----------
  q('dp-advanced', 1, 'In the classic 0/1 knapsack problem, what does dp[i][w] represent?', ['The max value achievable using the first i items with total weight capacity w', 'The total weight of all items up to index i', 'Whether item i fits in capacity w, as a boolean', 'The number of distinct subsets with weight exactly w'], 0, 'The recurrence considers, for each item, whether including it (if it fits) beats excluding it.'),
  q('dp-advanced', 2, 'What is the key difference between 0/1 knapsack and the "unbounded knapsack" variant?', ['Unbounded knapsack allows using the same item multiple times', '0/1 knapsack allows unlimited item reuse', 'There is no difference; they are the same problem', 'Unbounded knapsack has no weight capacity'], 0, "This changes the recurrence's structure since you can reuse the current item's own updated value."),
  q('dp-advanced', 3, 'For "longest common subsequence" between strings of length m and n, what is the typical DP state and complexity?', ['dp[i][j] = LCS length of the first i and j characters, O(m*n) time and space', 'dp[i] = LCS length using only 1D state, O(m+n) time', 'A single recursive formula with O(1) time', 'There is no known polynomial solution'], 0, 'The recurrence matches characters (dp[i][j] = dp[i-1][j-1]+1) or takes the best of skipping a character.'),
  q('dp-advanced', 4, 'Interval DP problems (like "burst balloons" or matrix chain multiplication) typically define dp[i][j] over what?', ['The best result for the subrange/interval from index i to j', 'A single index i only', 'The entire array regardless of subranges', 'Pairs of unrelated array indices'], 0, "These problems require trying every possible split point within a subrange, naturally indexed by interval boundaries."),
  q('dp-advanced', 5, 'Why is iteration order important in interval DP (e.g., iterating by increasing subrange length)?', ['dp[i][j] typically depends on smaller subranges (i,k) and (k,j) that must already be computed', 'It improves cache locality only, with no correctness impact', 'Order never matters in DP, only the final values', 'It reduces space complexity to O(1)'], 0, 'If shorter intervals are not computed first, the recurrence would reference not-yet-computed entries.'),
  q('dp-advanced', 6, 'For "edit distance" (min operations to convert one string to another), which three operations does the classic DP consider at each step?', ['Insert, delete, and replace a character', 'Sort, reverse, and rotate the string', 'Only insertions and deletions', 'Compress, expand, and shift'], 0, 'dp[i][j] takes the minimum of these three options (plus a no-op when characters already match).'),
  q('dp-advanced', 7, 'DP on trees (e.g., "house robber III" on a binary tree) typically computes what at each node?', ['A pair of values: the best result including this node, and excluding it', 'A single scalar value with no include/exclude distinction', "The node's depth only", 'The full path from root to this node'], 0, "Post-order traversal computes children's (include, exclude) pairs first, then combines them for the current node."),
  q('dp-advanced', 8, 'What is the time complexity of the standard 2D DP solution for 0/1 knapsack with n items and capacity W?', ['O(n * W)', 'O(n + W)', 'O(n^2)', 'O(2^n)'], 0, 'The DP table has n*W cells, each computed in O(1) — this is pseudo-polynomial since it depends on W\'s magnitude.'),

  qc('dp-advanced', 1, 'bug', 'This 0/1 knapsack (space-optimized to 1D) lets items be reused, which shouldn\'t be allowed. What\'s wrong?', `function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let w = weights[i]; w <= capacity; w++) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}`, ['The inner loop should go from capacity down to weights[i] — iterating forward lets item i be reused multiple times', 'dp should be initialized to Infinity, not 0', 'Math.max should be Math.min', 'The outer loop should iterate over capacity, not weights'], 0, 'Iterating w forward means dp[w - weights[i]] may already reflect item i being used earlier in this same pass — effectively unbounded knapsack. Iterating backward guarantees each item is only considered once per pass.', 'Stripe'),
  qc('dp-advanced', 2, 'fill-blank', 'Fill in the blank to complete "edit distance":', `function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = ____________________;
    }
  }
  return dp[a.length][b.length];
}`, ['1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])', '1 + Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])', 'dp[i - 1][j - 1]', 'Math.min(dp[i - 1][j], dp[i][j - 1])'], 0, 'Those three cells represent delete, insert, and replace — take whichever costs least, plus 1 for the operation itself.', 'Amazon'),

  // ---------- Big-O & Amortized Analysis ----------
  q('big-o', 1, 'What does "amortized O(1)" mean for appending to a dynamic array (e.g., ArrayList/Vector)?', ['Occasional expensive resizes, averaged over many appends, still yield constant time per append on average', 'Every single append is guaranteed exactly O(1) with no exceptions', 'The operation is O(1) best case but O(n) on average', 'The array never needs to resize'], 0, 'Doubling capacity when full makes resizes exponentially rarer, so their total cost spread across n appends is O(n), i.e. O(1) each.'),
  q('big-o', 2, 'Why does doubling (rather than a fixed increment) the capacity of a dynamic array matter for amortized complexity?', ['Doubling ensures the total cost of all resizes stays O(n) rather than O(n^2)', 'It uses less memory than fixed-size growth', 'It guarantees no resizing is ever needed again', 'It has no effect on complexity, only memory'], 0, 'With fixed-increment growth you would resize O(n) times, each copying O(n) elements, giving O(n^2) total.'),
  q('big-o', 3, 'What is the difference between time complexity and space complexity in Big-O analysis?', ['Time measures how runtime scales with input size; space measures how memory usage scales', 'They measure the same thing using different notation', 'Space complexity always equals time complexity', 'Time complexity only applies to recursive algorithms'], 0, 'An algorithm can be fast but memory-hungry (e.g., memoized DP) or slow but memory-light.'),
  q('big-o', 4, "For a recursive algorithm, what must typically be included when analyzing its space complexity?", ['The call stack depth, in addition to any explicit data structures used', 'Only explicit arrays or hash maps allocated', 'Recursive algorithms have no space cost since functions return', 'Only the size of the input array'], 0, 'Deep recursion (e.g., unbalanced tree traversal) can itself use O(n) stack space.'),
  q('big-o', 5, 'When comparing algorithms with O(n log n) and O(n^2) complexity, which statement is most accurate?', ['O(n log n) eventually outperforms O(n^2) as n grows, but small n could go either way in practice', 'O(n^2) is always faster because of a smaller constant factor', 'Big-O guarantees O(n log n) is faster for every input size', 'They are equivalent since both are polynomial'], 0, "Big-O describes asymptotic (large-n) growth; constant factors and small-n behavior aren't captured by the notation."),
  q('big-o', 6, "Why is quicksort's average-case time complexity O(n log n) but its worst case O(n^2)?", ['A poorly chosen pivot can produce maximally unbalanced partitions repeatedly', 'Quicksort is always exactly O(n log n) with no exceptions', 'The worst case only happens with duplicate elements', "Big-O doesn't apply to comparison-based sorts"], 0, 'Consistently bad pivots turn the recursion tree from balanced (log n depth) into linear depth.'),
  q('big-o', 7, 'Why does space complexity matter even when time complexity is already optimal?', ['A solution can be asymptotically fast but impractical due to excessive memory use at scale', 'Space complexity is purely academic and rarely matters in real systems', 'Only time complexity is ever evaluated in real interviews', 'Space and time complexity are always identical'], 0, 'An O(n) time, O(n) space solution might be rejected in favor of an O(n) time, O(1) space one when memory is constrained.'),
  qc('big-o', 1, 'output', 'What is the time complexity of this function, in terms of n?', `function mystery(n) {
  let count = 0;
  for (let i = 1; i < n; i *= 2) {
    for (let j = 0; j < n; j++) {
      count++;
    }
  }
  return count;
}`, ['O(n log n)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'The outer loop doubles i each time, so it runs about log2(n) times; the inner loop is O(n) each time — O(n log n) total.', 'Amazon'),
  qc('big-o', 2, 'bug', "This builds a list of n elements but runs far slower than expected for large n. What's the performance bug?", `function buildList(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result = result.concat([i]);
  }
  return result;
}`, ["result.concat([i]) copies the whole array every call, making this O(n^2) — result.push(i) would be O(n) total", 'The loop should start at i = 1, not i = 0', "concat is fine — the real bug is that result isn't initialized to new Array(n)", 'It should use a for...of loop instead of a for loop'], 0, 'concat allocates and copies a brand-new array on every call. Doing that n times, with the array growing each time, costs O(n^2) total instead of the O(n) that push() (amortized O(1) per call) would give.', 'Stripe'),

  // ---------- Scalability Fundamentals ----------
  q('scalability', 1, 'What is the key difference between vertical scaling and horizontal scaling?', ['Vertical adds power (CPU/RAM) to a single machine; horizontal adds more machines', 'Vertical adds more machines; horizontal upgrades a single machine', 'They are two names for the same technique', 'Vertical scaling only applies to databases'], 0, 'Horizontal scaling generally offers better fault tolerance and near-unlimited growth, at the cost of distributed coordination.'),
  q('scalability', 2, "What is a load balancer's primary job in a scalable system?", ['Distributing incoming requests across multiple backend servers', 'Compressing data before it is sent to the client', 'Storing frequently accessed data closer to users', 'Encrypting traffic between services'], 0, 'It also enables horizontal scaling, since you can add/remove backend servers behind it without clients noticing.'),
  q('scalability', 3, "What is a common downside of horizontal scaling that vertical scaling doesn't have?", ['It introduces distributed systems complexity, like data consistency across machines', 'It is always more expensive per unit of capacity', 'It caps out at a much lower total capacity than vertical scaling', 'It cannot be automated'], 0, 'A single powerful machine avoids network partitions and cross-node consistency issues, at the cost of a hard scaling ceiling.'),
  q('scalability', 4, 'What does "statelessness" in application servers enable for scalability?', ['Any server instance can handle any request, simplifying horizontal scaling and load balancing', 'Servers can store more data locally without limits', 'It removes the need for a database entirely', 'It guarantees zero latency'], 0, 'If state lived on one server, a load balancer would need sticky sessions, complicating scaling and failover.'),
  q('scalability', 5, "What is a common strategy to identify a system's bottleneck before scaling further?", ['Profiling/monitoring to find the slowest or most saturated component, then scaling that layer', 'Randomly adding more servers everywhere', 'Always scaling the database first regardless of measurements', 'Ignoring bottlenecks since horizontal scaling fixes everything automatically'], 0, "Scaling a layer that isn't the real bottleneck wastes resources without improving overall throughput."),
  q('scalability', 6, 'What is the difference between throughput and latency in a system design discussion?', ['Throughput is work done per unit time; latency is how long a single request takes', 'They are interchangeable terms', 'Latency only applies to databases', 'Throughput only matters for batch jobs'], 0, 'A system can have high throughput but high per-request latency (e.g., batching), or the reverse.'),
  q('scalability', 7, 'Why might a system use asynchronous processing (e.g., a message queue) instead of handling everything synchronously?', ['To let the client get a fast response while slower work happens in the background', 'To guarantee the task completes instantly', 'Synchronous processing is always incorrect', 'To avoid needing a database'], 0, "Things like sending emails or generating reports don't need to block the user-facing request/response cycle."),
  q('scalability', 8, 'What is a "single point of failure," and why do scalable designs try to eliminate them?', ['A component whose failure brings down the whole system; redundancy removes this risk', 'A server that has been scaled horizontally', 'A load balancer, which is always a SPOF by design', 'A cache, which can never fail'], 0, 'High-availability designs replicate critical components (including load balancers) so no single failure is catastrophic.'),

  // ---------- Caching & CDNs ----------
  q('caching', 1, 'What is the difference between cache-aside (lazy loading) and write-through caching?', ['Cache-aside loads into cache only on a read miss; write-through updates cache synchronously on every write', 'Write-through only works with read operations', 'Cache-aside requires no database at all', 'They are identical strategies'], 0, 'Cache-aside keeps the cache simple but can serve stale data briefly; write-through keeps cache and DB in sync at the cost of slower writes.'),
  q('caching', 2, 'What does the LRU (Least Recently Used) eviction policy do when the cache is full and a new item needs to be added?', ['Evicts the item that hasn\'t been accessed for the longest time', 'Evicts a random item', 'Evicts the item that was added first regardless of access', 'Refuses to add new items until manually cleared'], 0, 'The assumption is that recently accessed items are more likely to be accessed again soon.'),
  q('caching', 3, 'An LRU cache is commonly implemented with which combination of data structures to achieve O(1) get/put?', ['A hash map plus a doubly linked list', 'An array only', 'A binary search tree only', 'A min-heap only'], 0, 'The hash map gives O(1) lookup; the linked list lets you move a node to the front or evict from the back in O(1).', 'Microsoft'),
  q('caching', 4, 'What is "cache invalidation," and why is it considered a hard problem?', ['Removing/updating stale cached data when the source changes; hard because tracking exactly what is stale is error-prone at scale', 'Deleting the entire cache on a fixed schedule', 'Encrypting cached data', 'Something only relevant to CDNs, not application caches'], 0, 'This is one of the classic "two hard things in computer science" — getting timing and scope right is tricky.'),
  q('caching', 5, 'What is a CDN (Content Delivery Network) primarily used for?', ['Caching and serving static content from servers geographically closer to users', "Storing a database's primary copy of data", 'Load balancing between application servers only', 'Encrypting data at rest'], 0, 'By replicating content to edge locations worldwide, a CDN cuts the physical distance data has to travel, reducing latency.'),
  q('caching', 6, 'What is a potential downside of caching data that changes frequently?', ['Users may see stale/outdated data until the cache is invalidated or expires', 'Frequently changing data can never be cached at all', 'Caching always makes writes faster', 'There is no downside; caching is always beneficial'], 0, 'This is the classic consistency-vs-performance tradeoff of caching.'),
  q('caching', 7, 'What does TTL (Time To Live) mean for a cached item?', ['The duration after which the item is automatically considered stale and removed or refreshed', 'The total number of times an item can be read from cache', 'The time it took to write the item to cache', 'The priority level of the cached item'], 0, 'TTLs give a simple, time-based way to bound staleness without needing explicit invalidation logic for every write.'),
  q('caching', 8, 'When would you recommend adding a caching layer (like Redis) in front of a database?', ['When read traffic is much higher than write traffic and the same data is requested repeatedly', 'When the workload is almost entirely unique writes with few repeated reads', 'Only when the database is already down', 'Caching should always be avoided in favor of scaling the database directly'], 0, 'Caching shines when there is read locality (hot data requested often); it offers little benefit for write-heavy workloads.'),

  qc('caching', 1, 'bug', 'This LRU cache evicts the wrong entry when full. What\'s the bug?', `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) {
      const newestKey = [...this.map.keys()].pop();
      this.map.delete(newestKey);
    }
    this.map.set(key, val);
  }
}`, ['It evicts the most recently used key (.pop() grabs the last-inserted key) instead of the least recently used one (the first key)', 'get() should not move the key to the end of the map', 'capacity should be compared with >, not >=', "put() should check this.map.size after inserting, not before"], 0, "Since a JS Map preserves insertion order and get()/put() move accessed keys to the end, the first key in iteration order is always the least recently used one — that's what should be evicted, via .keys().next().value.", 'Microsoft'),
  qc('caching', 2, 'fill-blank', 'Fill in the blank so get() marks a key as most-recently-used:', `get(key) {
  if (!this.map.has(key)) return -1;
  const val = this.map.get(key);
  ____________________
  return val;
}`, ['this.map.delete(key); this.map.set(key, val);', 'this.map.set(key, val);', 'this.map.delete(key);', 'this.map.get(key);'], 0, 'A Map re-inserts a key at the end of its iteration order, so deleting then re-setting it moves it to the most-recently-used position.', 'Amazon'),

  // ---------- Databases & Indexing ----------
  q('databases', 1, 'What is the primary benefit of adding an index to a frequently queried column?', ['It speeds up lookups on that column, typically from O(n) to O(log n), at the cost of extra storage and slower writes', 'It makes all queries on the table faster with no tradeoffs', 'It reduces the total storage used by the table', 'It removes the need for primary keys'], 0, 'Indexes (often B-trees) let the database avoid full table scans, but every write must also update the index.'),
  q('databases', 2, 'What is a key tradeoff of adding many indexes to a table?', ['Writes become slower since every index must also be updated', 'More indexes always make reads slower too', 'Indexes eliminate the need for a primary key', 'Indexes only affect memory, never disk usage'], 0, 'Every index is another structure that must stay in sync with the data, so each write does proportionally more work.'),
  q('databases', 3, 'What is the difference between horizontal partitioning (sharding) and vertical partitioning?', ['Sharding splits rows across multiple databases/servers; vertical partitioning splits columns into separate tables/stores', 'Sharding splits columns; vertical partitioning splits rows', 'They are the same technique', 'Sharding only applies to NoSQL databases'], 0, 'Sharding is about distributing data volume/load; vertical partitioning separates logically distinct or differently-accessed columns.'),
  q('databases', 4, 'What is a common strategy for choosing a shard key, and why does the choice matter so much?', ['Pick a key that distributes data and query load evenly; a poor choice creates "hot" shards that bottleneck the system', 'Always use an auto-incrementing ID, since it is simplest', 'The shard key does not affect performance, only storage', 'Shard keys must always be strings'], 0, 'E.g., sharding by timestamp can concentrate all recent writes onto one shard, defeating the purpose.', 'Amazon'),
  q('databases', 5, 'What is the core tradeoff between SQL and NoSQL databases in most system design discussions?', ['SQL offers strong consistency and structured joins; NoSQL often trades some consistency/structure for horizontal scalability and flexible schemas', 'SQL databases can never scale horizontally', 'NoSQL databases never support any consistency guarantees', 'There is no real difference beyond query syntax'], 0, 'This is a generalization — modern systems in both camps have blurred the lines — but it captures the classic tradeoff.'),
  q('databases', 6, 'What is database replication, and what is one major benefit it provides?', ['Maintaining copies of the same data on multiple servers, improving read scalability and fault tolerance', "Splitting a table's rows across multiple servers", 'Compressing data to save storage', 'Automatically indexing all columns'], 0, 'Read replicas let you spread read traffic across copies, and multiple copies protect against a single server failing.'),
  q('databases', 7, 'In a primary-replica setup, what is a typical consistency tradeoff with asynchronous replication?', ['Replicas may briefly serve stale data since updates take time to propagate from the primary', 'Replicas are always perfectly in sync in real time', 'Asynchronous replication guarantees zero data loss under all failures', 'There is no consistency tradeoff'], 0, 'This is "eventual consistency" — the replica will catch up, but there is a window where reads from it can be stale.'),
  q('databases', 8, 'Why might a system design interview push you to justify SQL vs. NoSQL for a specific feature (e.g., a social feed vs. a financial ledger)?', ['The right choice depends on the access patterns, consistency needs, and scale of that specific feature', 'NoSQL is always the correct modern choice', 'Relational databases are always the correct choice for reliability', 'The choice does not actually matter in practice'], 0, 'A financial ledger typically demands strong consistency (favoring relational/ACID); a high-volume feed might favor a flexible NoSQL store.'),
  q('databases', 9, 'A common intermediate-level system design prompt is "design a URL shortener." What is the core storage design decision being tested?', ['Choosing a key scheme (e.g., base62 counter or hash) and an indexed lookup table mapping short codes to long URLs', 'Choosing which programming language to implement it in', 'Deciding how many servers to buy upfront', 'Picking a font for the shortened link display'], 0, 'Interviewers care about the ID-generation strategy, collision handling, and indexed reads/writes — the storage and lookup design, not the UI.', 'Amazon'),
  q('databases', 10, 'Why do interviewers often ask you to estimate read/write ratios and data volume ("back of the envelope" numbers) before designing a schema?', ['Those numbers directly drive decisions like indexing, caching, sharding, and SQL vs. NoSQL — designing without them is guesswork', 'It is only a formality with no bearing on the design', 'The numbers are used to check your mental math speed', 'Estimation is only relevant for machine learning system design'], 0, 'A feature with heavy reads and light writes suggests aggressive caching and read replicas; a write-heavy ledger suggests the opposite tradeoffs.', 'Stripe'),

  // ---------- Distributed Systems ----------
  q('distributed-systems', 1, 'What does the CAP theorem state about distributed systems?', ['During a network partition, a system must choose between consistency and availability', 'You can always achieve consistency, availability, and partition tolerance simultaneously', 'CAP theorem only applies to single-machine systems', 'Partition tolerance is optional and can be designed away'], 0, 'Since network partitions are a fact of life, the real-world choice is essentially CP vs. AP.', 'Amazon'),
  q('distributed-systems', 2, 'A system that returns an error/timeout rather than possibly-stale data during a partition is prioritizing:', ['Consistency over availability (CP)', 'Availability over consistency (AP)', 'Neither consistency nor availability', 'Partition tolerance is being sacrificed instead'], 0, 'Refusing to answer rather than risk inconsistent data is the hallmark of a CP-oriented system during a partition.'),
  q('distributed-systems', 3, 'What problem does consistent hashing solve in distributed caching/storage systems?', ['It minimizes the number of keys that need to be remapped when a server is added or removed', 'It guarantees perfectly even distribution with zero variance', 'It eliminates the need for any hashing at all', 'It only works for exactly 2 servers'], 0, 'With naive modulo hashing, adding/removing a server reshuffles nearly all keys; consistent hashing remaps only a small fraction.'),
  q('distributed-systems', 4, 'What is "eventual consistency"?', ['A guarantee that, given no new updates, all replicas eventually converge to the same value', 'A guarantee that all reads always return the most recent write immediately', 'A property that only applies to single-node systems', 'Another name for strong/strict consistency'], 0, 'Many large-scale systems accept this weaker guarantee in exchange for higher availability and lower latency.'),
  q('distributed-systems', 5, 'What problem do consensus algorithms like Paxos and Raft solve?', ['Getting a cluster of distributed nodes to agree on a single value/state despite failures', 'Compressing data for network transfer', 'Load balancing incoming HTTP requests', 'Encrypting data between nodes'], 0, 'This underlies leader election and replicated logs, where nodes must agree despite delayed or lost messages and crashes.'),
  q('distributed-systems', 6, 'Why is Raft often preferred over Paxos in real-world implementations, practically speaking?', ['Raft was explicitly designed to be easier to understand and implement correctly, while remaining formally equivalent', 'Raft is asymptotically faster than Paxos', 'Paxos cannot handle leader failures at all', 'Raft does not require a majority/quorum of nodes to agree'], 0, 'Paxos is notoriously difficult to reason about; Raft breaks consensus into more understandable sub-problems.'),
  q('distributed-systems', 7, 'What is a "quorum" in the context of distributed systems (e.g., for reads/writes in a replicated database)?', ['The minimum number of nodes that must agree/respond for an operation to succeed, typically a majority', 'The total number of nodes in the cluster', 'A node reserved specifically for backups', 'A synonym for the primary/leader node'], 0, 'Requiring a majority for both reads and writes, with overlapping quorums, is a common way to guarantee strong consistency.'),
  q('distributed-systems', 8, 'Why do distributed systems need idempotency for operations like "process payment," especially with retries?', ['Network failures can cause a client to retry a request that actually succeeded, so repeating it must not cause duplicate effects', 'Idempotency makes operations run faster', 'Idempotency is only relevant for read operations', 'Retries never happen in well-designed distributed systems'], 0, 'You often cannot distinguish "request lost" from "response lost" after a timeout, so operations must be safely repeatable.', 'Stripe'),
  q('distributed-systems', 9, 'For an intermediate-level "design a chat app" or "design a notification system" question, why do interviewers often ask about message queues (e.g., SQS, Kafka)?', ['They decouple producers from consumers and absorb bursts of load, so a slow or failing downstream service doesn\'t take down the whole system', 'Message queues are required for any HTTP request to work at all', 'They replace the need for a database entirely', 'They are only relevant for machine learning pipelines'], 0, 'Introducing a queue between services is a common way to demonstrate you understand decoupling, backpressure, and failure isolation.', 'Amazon'),
  q('distributed-systems', 10, 'What does "graceful degradation" mean in the context of a distributed system design interview answer?', ['Designing the system so that when a dependency fails, it serves a reduced or cached experience instead of failing completely', 'Deliberately slowing down all requests during high load', 'Shutting the entire system down safely during a deploy', 'Returning a generic 500 error whenever any part of the system is unhealthy'], 0, 'A strong answer identifies non-critical dependencies (e.g., a recommendations service) and shows what the user still gets if that dependency is down.', 'Microsoft'),

  // ---------- API Design & Rate Limiting ----------
  q('api-design', 1, 'What does it mean for an API endpoint to be "idempotent"?', ['Calling it multiple times with the same input produces the same result/effect as calling it once', 'It can only be called a single time ever', 'It always returns the same response body regardless of input', 'It requires no authentication'], 0, 'GET, PUT, and DELETE are typically idempotent by design; POST typically is not unless engineered to be.'),
  q('api-design', 2, 'In REST conventions, which HTTP method is typically NOT idempotent by default?', ['POST', 'GET', 'PUT', 'DELETE'], 0, 'A POST to "create a resource" called twice usually creates two resources, unlike PUT or DELETE.'),
  q('api-design', 3, 'What is the token bucket algorithm commonly used for in API design?', ['Rate limiting requests while still allowing short bursts of traffic', 'Compressing API responses', 'Encrypting API payloads', 'Caching API responses on the client'], 0, 'Tokens refill at a steady rate into a bucket of fixed capacity; a request needs an available token to proceed, letting bursts through.', 'Stripe'),
  q('api-design', 4, 'How does the "leaky bucket" rate limiting algorithm differ from token bucket in behavior?', ['Leaky bucket processes requests at a strictly constant rate, smoothing out bursts', 'Leaky bucket allows unlimited bursts with no smoothing', 'They are mathematically identical algorithms', 'Leaky bucket requires no state tracking'], 0, 'Incoming requests fill the bucket, which "leaks" (processes) at a fixed rate, producing steady output rather than bursty allowance.'),
  q('api-design', 5, 'Why is an "idempotency key" useful for a payment API?', ['It lets the server recognize and safely ignore a retried request instead of processing the payment twice', 'It replaces the need for authentication', 'It speeds up the network request itself', 'It is used only for logging with no functional effect'], 0, 'If a client retries after a timeout using the same key, the server can detect the duplicate and avoid a double charge.', 'Stripe'),
  q('api-design', 6, 'What is a key design tradeoff between REST and GraphQL APIs?', ['REST has fixed endpoint responses (risking over/under-fetching); GraphQL lets clients request exact fields but adds server-side query complexity', 'GraphQL cannot support mutations, only queries', 'REST APIs cannot use JSON', 'GraphQL is always faster than REST in every scenario'], 0, "GraphQL's flexibility shifts complexity (and potential abuse, like deeply nested queries) onto the server."),
  q('api-design', 7, 'What HTTP status code range generally indicates a client error?', ['4xx', '5xx', '3xx', '2xx'], 0, '4xx (like 400, 404, 429) signals the client should fix something; 5xx signals a server-side failure.'),
  q('api-design', 8, 'Why might an API return HTTP 429 along with a "Retry-After" header?', ['To tell the client it is being rate-limited and how long to wait before retrying', 'To indicate the requested resource was permanently deleted', 'To indicate a successful request with a delayed response', 'To signal an authentication failure'], 0, 'This lets well-behaved clients back off gracefully instead of hammering the server with immediate retries.'),

  qc('api-design', 1, 'fill-blank', 'Fill in the blank to complete this token bucket rate limiter:', `class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens per second
    this.lastRefill = Date.now();
  }
  allowRequest() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
    ____________________
  }
}`, ['if (this.tokens >= 1) { this.tokens -= 1; return true; } return false;', 'this.tokens -= 1; return true;', 'return this.tokens > 0;', 'if (this.tokens >= this.capacity) return true; return false;'], 0, 'A request should only be allowed (and only then consume a token) when at least one token is actually available.', 'Stripe'),
  qc('api-design', 2, 'bug', "This charges a card exactly once per idempotency key — except under concurrent retries, where it can double-charge. What's the race condition?", `async function chargeCard(idempotencyKey, amount) {
  const existing = await db.find(idempotencyKey);
  if (existing) return existing.result;

  const result = await paymentGateway.charge(amount);
  await db.save(idempotencyKey, result);
  return result;
}`, ["The idempotency key isn't reserved atomically before the charge — two concurrent requests can both pass the db.find check and double-charge the card", 'db.save should happen before paymentGateway.charge, not after', 'idempotencyKey should be derived from amount instead of passed in', 'The function should not be async'], 0, 'If a client retries before the first request finishes, both calls can see \'no existing record\' at the db.find check and both proceed to charge. The key needs to be atomically reserved (e.g. a unique-constraint insert) before the charge happens.', 'Stripe'),

  // ---------- STAR Method & Leadership Principles ----------
  q('star-method', 1, 'What does the STAR method stand for in structuring behavioral interview answers?', ['Situation, Task, Action, Result', 'Story, Topic, Analysis, Response', 'Strategy, Target, Approach, Review', 'Setup, Trigger, Attempt, Reflection'], 0, 'This structure keeps answers concise: set context, define your responsibility, describe your specific actions, then share the measurable outcome.'),
  q('star-method', 2, 'In the "Result" part of a STAR answer, what makes an answer significantly stronger?', ['Quantifiable impact (e.g., "reduced latency by 40%") rather than a vague outcome', 'Describing what your entire team did without mentioning your role', 'Focusing only on what you would do differently next time', 'Keeping it as brief as possible with no detail at all'], 0, 'Specific, measurable results are far more memorable and credible than generic statements like "it went well."'),
  q('star-method', 3, "Amazon's interview process is well known for evaluating candidates against a specific set of criteria. What are these commonly called?", ['Leadership Principles', 'Core Values Checklist', 'Behavioral Pillars', 'Culture Fit Scores'], 0, 'Amazon uses 16 Leadership Principles (e.g., "Customer Obsession," "Bias for Action," "Ownership") and expects STAR-format stories demonstrating them.', 'Amazon'),
  q('star-method', 4, 'Why do interviewers often ask follow-ups like "What would you do differently?" after a STAR answer?', ['To probe for genuine self-reflection and learning rather than a rehearsed, one-dimensional story', 'To catch candidates in a lie', 'Because the STAR format is considered incomplete without it', 'It is purely a formality with no real evaluative purpose'], 0, 'This tests whether you can critically evaluate your own actions, a signal of growth mindset and maturity.'),
  q('star-method', 5, 'Why is it recommended to prepare a diverse "bank" of STAR stories rather than one all-purpose story?', ['Different questions probe different competencies, and reusing one story for everything often stretches to fit poorly', 'One story is always sufficient for any interview', 'Interviewers only ever ask one behavioral question total', 'Diverse stories are only useful for management-track interviews'], 0, 'Having several flexible stories covering different themes lets you match the right story to the actual question asked.'),
  q('star-method', 6, 'What is a common mistake candidates make in the "Action" part of a STAR answer?', ['Describing what "the team" did in vague terms instead of their own specific contribution', 'Being too specific about their own individual actions', 'Including too much technical detail about their actions', 'Explaining the actions in first person'], 0, 'Interviewers are evaluating you specifically, so vague "we" language makes it hard to assess your individual impact.'),
  q('star-method', 7, 'Why might an interviewer specifically ask about a time you failed or received difficult feedback?', ['To assess self-awareness, accountability, and how you respond to setbacks', 'To disqualify any candidate who admits to a failure', 'Because it is a mandatory question with no real evaluative purpose', 'To test your knowledge of a specific technology'], 0, 'How you handle and grow from failure is often a stronger signal than a flawless track record.'),
  q('star-method', 8, 'For the "Situation" and "Task" setup in STAR, what is the ideal balance compared to "Action" and "Result"?', ['Situation/Task should be brief context-setting; the bulk of the answer should focus on Action and Result', 'Situation/Task should take up the majority of the time', 'All four parts should always be given exactly equal time', 'Situation and Task can be skipped entirely if time is limited'], 0, 'Interviewers want to hear what you did and what happened — over-explaining background eats into that valuable time.'),
  q('star-method', 9, 'Amazon interviewers frequently probe "Ownership" with prompts like "Tell me about a time you fixed a problem that wasn\'t technically your job." What best demonstrates this Leadership Principle?', ['Taking responsibility for the outcome and acting beyond your formal role, without waiting to be asked', 'Escalating immediately so someone with the right title handles it', 'Documenting the problem for whoever owns it next', 'Declining since it fell outside your team\'s charter'], 0, '"Ownership" is explicitly about thinking long-term and acting on behalf of the whole company, not just your own scope.', 'Amazon'),
  q('star-method', 10, "Microsoft's interviews are known for weighing \"growth mindset\" heavily — how a candidate talks about a skill gap or failure. What answer pattern best signals this?", ['Naming the specific gap, what you did to close it, and how your thinking changed as a result', 'Insisting you rarely have skill gaps because you prepare thoroughly', 'Describing the gap without discussing any concrete steps taken since', 'Attributing the gap entirely to a lack of training provided by the company'], 0, 'Growth mindset is about visible learning and adaptation, not about denying weaknesses or explaining them away.', 'Microsoft'),
  q('star-method', 11, "Stripe's interviews often ask candidates to describe a time they went deep on a user's problem instead of shipping a surface-level fix. What does this evaluate?", ['Genuine user-focus: understanding root causes and downstream impact rather than just closing a ticket', 'Whether you can write code quickly under pressure', "Your familiarity with Stripe's specific API endpoints", 'Whether you prefer working alone or in a team'], 0, "This maps to Stripe's emphasis on users — going deep on their actual problem, not just the reported symptom.", 'Stripe'),

  // ---------- Common Behavioral Scenarios ----------
  q('behavioral-scenarios', 1, 'When asked "Tell me about a time you disagreed with a teammate," what does a strong answer typically emphasize?', ['How you communicated your perspective respectfully, sought to understand theirs, and reached a resolution', 'Why the other person was clearly wrong and you were right', 'Avoiding the conflict entirely and letting someone else decide', 'Escalating immediately to a manager without attempting resolution'], 0, 'Interviewers are evaluating collaboration and communication skills, not who "won" the disagreement.'),
  q('behavioral-scenarios', 2, 'For "describe a time you had to work with ambiguous or incomplete requirements," what is the interviewer primarily probing for?', ['Your ability to seek clarification, make reasonable assumptions, and move forward productively despite uncertainty', 'Your willingness to refuse work until requirements are perfectly specified', 'Purely your technical coding speed', 'Whether you can work entirely without communicating with stakeholders'], 0, 'Real-world engineering rarely comes with perfectly specified requirements, so comfort with ambiguity is a key signal.'),
  q('behavioral-scenarios', 3, 'When asked about "a time you influenced someone without direct authority," what core competency is being assessed?', ['Persuasion and stakeholder management through data, relationship-building, and clear communication', 'Your formal job title and reporting structure', 'Your ability to escalate to someone with more authority', 'Whether you have management experience'], 0, 'Getting buy-in from peers or other teams without formal authority is a critical, transferable skill, especially at senior levels.'),
  q('behavioral-scenarios', 4, 'What is typically the best way to handle a behavioral question about "a time you missed a deadline"?', ['Own the miss honestly, explain the root cause and what you learned, and describe concrete changes made afterward', 'Blame external factors entirely and avoid discussing your own role', 'Claim you have never missed a deadline', 'Focus only on the deadline itself without discussing follow-up'], 0, 'Accountability plus demonstrated learning reads as far more mature than deflecting blame or pretending it never happened.'),
  q('behavioral-scenarios', 5, 'Why do interviewers ask "why do you want to work here" as part of a behavioral round?', ['To gauge genuine motivation and whether you have researched how your goals connect to the company\'s mission/products', "To test whether you have memorized the company's current stock price", 'Simply to fill time between technical questions', 'It is a purely procedural, non-evaluative question'], 0, 'A generic, could-apply-anywhere answer signals low genuine interest compared to one referencing specific products or challenges.'),
  q('behavioral-scenarios', 6, 'When describing "a time you received critical feedback," what does a weak answer often look like?', ['Being defensive about the feedback or minimizing its validity instead of showing genuine reflection', 'Clearly explaining what the feedback was and how you acted on it', 'Acknowledging the feedback was fair and describing specific changes made', 'Connecting the feedback to a measurable improvement afterward'], 0, 'Defensiveness signals low self-awareness and coachability, both red flags to interviewers.'),
  q('behavioral-scenarios', 7, "What is a good strategy if you genuinely can't think of a real example for a specific behavioral question during the interview?", ['Briefly ask for a moment to think, or offer the closest relevant example while being honest that it is an adaptation', 'Make up a fabricated story on the spot', 'Say "I don\'t have an example" and immediately move on with no elaboration', 'Change the subject to a technical topic instead'], 0, 'Interviewers generally respect a brief, honest pause far more than a fabricated or evasive answer.'),
  q('behavioral-scenarios', 8, 'Why do many companies increasingly weight behavioral interviews as heavily as technical ones for senior roles?', ['Senior roles require strong collaboration, judgment, and communication skills that technical rounds alone do not assess', 'Behavioral rounds are easier to grade objectively than technical ones', 'Technical skill becomes irrelevant at senior levels', 'It is purely a legal compliance requirement'], 0, 'As scope grows, the ability to influence, mentor, and navigate ambiguity often matters as much as raw technical execution.'),
  q('behavioral-scenarios', 9, 'At Amazon, a question like "Tell me about a time you had to make a decision with incomplete data" is designed to probe which Leadership Principle?', ['Bias for Action — moving forward thoughtfully under uncertainty instead of waiting for perfect information', 'Frugality — doing more with less', 'Hire and Develop the Best — growing others', 'Insist on the Highest Standards — refusing to ship anything imperfect'], 0, 'Bias for Action explicitly values calculated risk-taking and speed over waiting for complete certainty.', 'Amazon'),
  q('behavioral-scenarios', 10, 'At Microsoft, "Tell me about a time you collaborated across teams with different priorities" is commonly used to assess what?', ['Cross-team collaboration and a shared-outcome mindset over siloed wins', 'Whether you can code in multiple languages', 'Your seniority relative to the other teams involved', 'Your ability to work entirely independently'], 0, 'Microsoft places strong weight on collaborative, cross-boundary teamwork rather than solo heroics.', 'Microsoft'),
  q('behavioral-scenarios', 11, 'Stripe often asks "Tell me about a time you had to move quickly on something with real user impact." What is this testing?', ['Whether you can act with urgency on things that matter to users, while still being careful about correctness', 'How fast you can type code during the interview', "Your opinion on Stripe's pricing model", 'Whether you have prior fintech experience'], 0, "This reflects Stripe's emphasis on moving with urgency on high-leverage, user-impacting work.", 'Stripe'),
];
