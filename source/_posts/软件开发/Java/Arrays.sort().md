---
title: Arrays.sort()
date: 2023-05-02 19:37:36
summary: 本文深入解读Java内置的数组排序算法java.util.Arrays.sort()，以及该算法依赖的工具类java.util.DualPivotQuicksort、java.util.TimSort、java.util.ComparableTimSort。
tags:
- Java
categories:
- Java
---

# API定义

java.util.Arrays定义了18个重载的sort()，其中有14个需要基本类型元素的数组，有2个需要Object类型元素的数组，有2个需要参数化类型元素的数组。

- `public static void sort(byte[] a)`
- `public static void sort(byte[] a, int fromIndex, int toIndex)`
- `public static void sort(char[] a)`
- `public static void sort(char[] a, int fromIndex, int toIndex)`
- `public static void sort(double[] a)`
- `public static void sort(double[] a, int fromIndex, int toIndex)`
- `public static void sort(float[] a)`
- `public static void sort(float[] a, int fromIndex, int toIndex)`
- `public static void sort(int[] a)`
- `public static void sort(int[] a, int fromIndex, int toIndex)`
- `public static void sort(long[] a)`
- `public static void sort(long[] a, int fromIndex, int toIndex)`
- `public static void sort(short[] a)`
- `public static void sort(short[] a, int fromIndex, int toIndex)`
- `public static void sort(Object[] a)`
- `public static void sort(Object[] a, int fromIndex, int toIndex)`
- `public static <T> void sort(T[] a, int fromIndex, int toIndex, Comparator<? super T> c)`
- `public static <T> void sort(T[] a, Comparator<? super T> c)`

# [B、[S、[C、[I、[L、[F、[D

java.util.Arrays定义的sort()中，有14个需要基本类型元素的数组。这些基本类型分别是：byte、short、char、int、long、float、double。对应的数组类型分别是[B、[S、[C、[I、[L、[F、[D。对于每种数组，都有1参数的方法用于整个数组排序、3参数方法用于范围内数组排序。

- `public static void sort(byte[] a)`
- `public static void sort(byte[] a, int fromIndex, int toIndex)`
- `public static void sort(char[] a)`
- `public static void sort(char[] a, int fromIndex, int toIndex)`
- `public static void sort(double[] a)`
- `public static void sort(double[] a, int fromIndex, int toIndex)`
- `public static void sort(float[] a)`
- `public static void sort(float[] a, int fromIndex, int toIndex)`
- `public static void sort(int[] a)`
- `public static void sort(int[] a, int fromIndex, int toIndex)`
- `public static void sort(long[] a)`
- `public static void sort(long[] a, int fromIndex, int toIndex)`
- `public static void sort(short[] a)`
- `public static void sort(short[] a, int fromIndex, int toIndex)`

## [I、[L、[F、[D

[I、[L、[F、[D类型的sort()方法的基本逻辑是相似的。1参数sort()方法的逻辑是直接调用4参数的`java.util.DualPivotQuicksort.sort()`。

```java
public static void sort(int[] a) {
    DualPivotQuicksort.sort(a, 0, 0, a.length);
}
```

3参数sort()方法的逻辑是先做边界值合规检查再调用4参数的`java.util.DualPivotQuicksort.sort()`。

```java
public static void sort(int[] a, int fromIndex, int toIndex) {
    rangeCheck(a.length, fromIndex, toIndex);
    DualPivotQuicksort.sort(a, 0, fromIndex, toIndex);
}
```

其中，`java.util.Arrays.rangeCheck()`是一个静态方法，仅用于检查`fromIndex`和`toIndex`是否合规，当`fromIndex`大于`toIndex`时抛出`java.lang.IllegalArgumentException`，当越界时抛出`java.lang.ArrayIndexOutOfBoundsException`。

```java
static void rangeCheck(int arrayLength, int fromIndex, int toIndex) {
    if (fromIndex > toIndex) {
        throw new IllegalArgumentException("fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")");
    }
    if (fromIndex < 0) {
        throw new ArrayIndexOutOfBoundsException(fromIndex);
    }
    if (toIndex > arrayLength) {
        throw new ArrayIndexOutOfBoundsException(toIndex);
    }
}
```

除了`rangeCheck()`以外，1参数方法和3参数方法调用的都是同一个方法，即`java.util.DualPivotQuicksort.sort(int[], int, int, int)`。其中，1参数方法由于要对整个数组排序，因此直接将`fromIndex`赋值为`0`并将`toIndex`赋值为`a.length`即可。

java.util.DualPivotQuicksort的类声明是`final class DualPivotQuicksort`，唯一构造方法的定义是`private DualPivotQuicksort() {}`这意味着这个类不能被继承且不能被包外调用，注定了此类仅能作为工具类。

### [I、[L

查看`java.util.DualPivotQuicksort.sort(int[], int, int, int)`，我们发现第2个参数的真实含义是并行度。这个参数只有`java.util.Arrays.parallelSort`才会引入，而普通的`java.util.Arrays.sort()`不会引入。

```java
static void sort(int[] a, int parallelism, int low, int high) {
    int size = high - low;
    if (parallelism > 1 && size > MIN_PARALLEL_SORT_SIZE) {
        int depth = getDepth(parallelism, size >> 12);
        int[] b = depth == 0 ? null : new int[size];
        new Sorter(null, a, b, low, size, low, depth).invoke();
    } else {
        sort(null, a, 0, low, high);
    }
}
```

由于并行度不大于1，所以这段代码相当于：

```java
static void sort(int[] a, int parallelism, int low, int high) {
    int size = high - low;
    sort(null, a, 0, low, high);
}
```

传入空Sorter，调用`java.util.DualPivotQuicksort.sort(Sorter, int[], int, int, int)`，这部分是排序算法的核心代码。

```java
static void sort(Sorter sorter, int[] a, int bits, int low, int high) {
    while (true) {
        int end = high - 1, size = high - low;

        /*
         * Run mixed insertion sort on small non-leftmost parts.
         */
        if (size < MAX_MIXED_INSERTION_SORT_SIZE + bits && (bits & 1) > 0) {
            mixedInsertionSort(a, low, high - 3 * ((size >> 5) << 3), high);
            return;
        }

        /*
         * Invoke insertion sort on small leftmost part.
         */
        if (size < MAX_INSERTION_SORT_SIZE) {
            insertionSort(a, low, high);
            return;
        }

        /*
         * Check if the whole array or large non-leftmost parts are nearly sorted and then merge runs.
         */
        if ((bits == 0 || size > MIN_TRY_MERGE_SIZE && (bits & 1) > 0)
                && tryMergeRuns(sorter, a, low, size)) {
            return;
        }

        /*
         * Switch to heap sort if execution time is becoming quadratic.
         */
        if ((bits += DELTA) > MAX_RECURSION_DEPTH) {
            heapSort(a, low, high);
            return;
        }

        /*
         * Use an inexpensive approximation of the golden ratio to select five sample elements and determine pivots.
         */
        int step = (size >> 3) * 3 + 3;

        /*
         * Five elements around (and including) the central element will be used for pivot selection as described below. The
         * unequal choice of spacing these elements was empirically determined to work well on a wide variety of inputs.
         */
        int e1 = low + step;
        int e5 = end - step;
        int e3 = (e1 + e5) >>> 1;
        int e2 = (e1 + e3) >>> 1;
        int e4 = (e3 + e5) >>> 1;
        int a3 = a[e3];

        /*
         * Sort these elements in place by the combination of 4-element sorting network and insertion sort.
         *
         *    5 ------o-----------o------------
         *            |           |
         *    4 ------|-----o-----o-----o------
         *            |     |           |
         *    2 ------o-----|-----o-----o------
         *                  |     |
         *    1 ------------o-----o------------
         */
        if (a[e5] < a[e2]) { int t = a[e5]; a[e5] = a[e2]; a[e2] = t; }
        if (a[e4] < a[e1]) { int t = a[e4]; a[e4] = a[e1]; a[e1] = t; }
        if (a[e5] < a[e4]) { int t = a[e5]; a[e5] = a[e4]; a[e4] = t; }
        if (a[e2] < a[e1]) { int t = a[e2]; a[e2] = a[e1]; a[e1] = t; }
        if (a[e4] < a[e2]) { int t = a[e4]; a[e4] = a[e2]; a[e2] = t; }

        if (a3 < a[e2]) {
            if (a3 < a[e1]) {
                a[e3] = a[e2]; a[e2] = a[e1]; a[e1] = a3;
            } else {
                a[e3] = a[e2]; a[e2] = a3;
            }
        } else if (a3 > a[e4]) {
            if (a3 > a[e5]) {
                a[e3] = a[e4]; a[e4] = a[e5]; a[e5] = a3;
            } else {
                a[e3] = a[e4]; a[e4] = a3;
            }
        }

        // Pointers
        int lower = low; // The index of the last element of the left part
        int upper = end; // The index of the first element of the right part

        /*
         * Partitioning with 2 pivots in case of different elements.
         */
        if (a[e1] < a[e2] && a[e2] < a[e3] && a[e3] < a[e4] && a[e4] < a[e5]) {

            /*
             * Use the first and fifth of the five sorted elements as the pivots.
             * These values are inexpensive approximation of tertiles. Note, that pivot1 < pivot2.
             */
            int pivot1 = a[e1];
            int pivot2 = a[e5];

            /*
             * The first and the last elements to be sorted are moved
             * to the locations formerly occupied by the pivots. When
             * partitioning is completed, the pivots are swapped back
             * into their final positions, and excluded from the next
             * subsequent sorting.
             */
            a[e1] = a[lower];
            a[e5] = a[upper];

            /*
             * Skip elements, which are less or greater than the pivots.
             */
            while (a[++lower] < pivot1);
            while (a[--upper] > pivot2);

            /*
             * Backward 3-interval partitioning
             *
             *   left part                 central part          right part
             * +------------------------------------------------------------+
             * |  < pivot1  |   ?   |  pivot1 <= && <= pivot2  |  > pivot2  |
             * +------------------------------------------------------------+
             *             ^       ^                            ^
             *             |       |                            |
             *           lower     k                          upper
             *
             * Invariants:
             *
             *              all in (low, lower] < pivot1
             *    pivot1 <= all in (k, upper)  <= pivot2
             *              all in [upper, end) > pivot2
             *
             * Pointer k is the last index of ?-part
             */
            for (int unused = --lower, k = ++upper; --k > lower; ) {
                int ak = a[k];
                if (ak < pivot1) { // Move a[k] to the left side
                    while (lower < k) {
                        if (a[++lower] >= pivot1) {
                            if (a[lower] > pivot2) {
                                a[k] = a[--upper];
                                a[upper] = a[lower];
                            } else {
                                a[k] = a[lower];
                            }
                            a[lower] = ak;
                            break;
                        }
                    }
                } else if (ak > pivot2) { // Move a[k] to the right side
                    a[k] = a[--upper];
                    a[upper] = ak;
                }
            }

            /*
             * Swap the pivots into their final positions.
             */
            a[low] = a[lower]; a[lower] = pivot1;
            a[end] = a[upper]; a[upper] = pivot2;

            /*
             * Sort non-left parts recursively (possibly in parallel), excluding known pivots.
             */
            if (size > MIN_PARALLEL_SORT_SIZE && sorter != null) {
                sorter.forkSorter(bits | 1, lower + 1, upper);
                sorter.forkSorter(bits | 1, upper + 1, high);
            } else {
                sort(sorter, a, bits | 1, lower + 1, upper);
                sort(sorter, a, bits | 1, upper + 1, high);
            }

        } else { // Use single pivot in case of many equal elements

            /*
             * Use the third of the five sorted elements as the pivot. This value is inexpensive approximation of the median.
             */
            int pivot = a[e3];

            /*
             * The first element to be sorted is moved to the location formerly occupied by the pivot.
             * After completion of partitioning the pivot is swapped back into its final position, and excluded from the next subsequent sorting.
             */
            a[e3] = a[lower];

            /*
             * Traditional 3-way (Dutch National Flag) partitioning
             *
             *   left part                 central part    right part
             * +------------------------------------------------------+
             * |   < pivot   |     ?     |   == pivot   |   > pivot   |
             * +------------------------------------------------------+
             *              ^           ^                ^
             *              |           |                |
             *            lower         k              upper
             *
             * Invariants:
             *
             *   all in (low, lower] < pivot
             *   all in (k, upper)  == pivot
             *   all in [upper, end] > pivot
             *
             * Pointer k is the last index of ?-part
             */
            for (int k = ++upper; --k > lower; ) {
                int ak = a[k];
                if (ak != pivot) {
                    a[k] = pivot;
                    if (ak < pivot) { // Move a[k] to the left side
                        while (a[++lower] < pivot);
                        if (a[lower] > pivot) {
                            a[--upper] = a[lower];
                        }
                        a[lower] = ak;
                    } else { // ak > pivot - Move a[k] to the right side
                        a[--upper] = ak;
                    }
                }
            }

            /*
             * Swap the pivot into its final position.
             */
            a[low] = a[lower]; a[lower] = pivot;

            /*
             * Sort the right part (possibly in parallel), excluding known pivot. All elements from the central part are equal and therefore already sorted.
             */
            if (size > MIN_PARALLEL_SORT_SIZE && sorter != null) {
                sorter.forkSorter(bits | 1, upper, high);
            } else {
                sort(sorter, a, bits | 1, upper, high);
            }
        }
        high = lower; // Iterate along the left part
    }
}
```

上面的代码中用到了部分常量：
- `MAX_MIXED_INSERTION_SORT_SIZE`：使用混合插入排序的最大数组大小，值为65。
- `MAX_INSERTION_SORT_SIZE`：使用插入排序的最大数组大小，值为44。
- `MIN_TRY_MERGE_SIZE`：尝试合并的最小数组大小，值为4096。
- `DELTA`：混合插入排序的阈值递增基准，值为6。
- `MAX_RECURSION_DEPTH`：使用堆排序之前的最大递归分区深度，值为384。
- `MIN_PARALLEL_SORT_SIZE`：并行执行排序的最小数组大小，值为4096。

我们去掉注释、替换常量、移除实际为null的sorter判断，代码简化为：

```java
static void sort(int[] a, int bits, int low, int high) {
    while (true) {
        int end = high - 1, size = high - low;
        if (size < 65 + bits && (bits & 1) > 0) {
            mixedInsertionSort(a, low, high - 3 * ((size >> 5) << 3), high);
            return;
        }
        if (size < 44) {
            insertionSort(a, low, high);
            return;
        }
        if ((bits == 0 || size > 4096 && (bits & 1) > 0) && tryMergeRuns(null, a, low, size)) {
            return;
        }
        if ((bits += 6) > 384) {
            heapSort(a, low, high);
            return;
        }
        int step = (size >> 3) * 3 + 3;
        int e1 = low + step;
        int e5 = end - step;
        int e3 = (e1 + e5) >>> 1;
        int e2 = (e1 + e3) >>> 1;
        int e4 = (e3 + e5) >>> 1;
        int a3 = a[e3];
        if (a[e5] < a[e2]) { int t = a[e5]; a[e5] = a[e2]; a[e2] = t; }
        if (a[e4] < a[e1]) { int t = a[e4]; a[e4] = a[e1]; a[e1] = t; }
        if (a[e5] < a[e4]) { int t = a[e5]; a[e5] = a[e4]; a[e4] = t; }
        if (a[e2] < a[e1]) { int t = a[e2]; a[e2] = a[e1]; a[e1] = t; }
        if (a[e4] < a[e2]) { int t = a[e4]; a[e4] = a[e2]; a[e2] = t; }
        if (a3 < a[e2]) {
            if (a3 < a[e1]) {
                a[e3] = a[e2]; a[e2] = a[e1]; a[e1] = a3;
            } else {
                a[e3] = a[e2]; a[e2] = a3;
            }
        } else if (a3 > a[e4]) {
            if (a3 > a[e5]) {
                a[e3] = a[e4]; a[e4] = a[e5]; a[e5] = a3;
            } else {
                a[e3] = a[e4]; a[e4] = a3;
            }
        }
        int lower = low;
        int upper = end;
        if (a[e1] < a[e2] && a[e2] < a[e3] && a[e3] < a[e4] && a[e4] < a[e5]) {
            int pivot1 = a[e1];
            int pivot2 = a[e5];
            a[e1] = a[lower];
            a[e5] = a[upper];
            while (a[++lower] < pivot1);
            while (a[--upper] > pivot2);
            for (int unused = --lower, k = ++upper; --k > lower; ) {
                int ak = a[k];
                if (ak < pivot1) {
                    while (lower < k) {
                        if (a[++lower] >= pivot1) {
                            if (a[lower] > pivot2) {
                                a[k] = a[--upper];
                                a[upper] = a[lower];
                            } else {
                                a[k] = a[lower];
                            }
                            a[lower] = ak;
                            break;
                        }
                    }
                } else if (ak > pivot2) {
                    a[k] = a[--upper];
                    a[upper] = ak;
                }
            }
            a[low] = a[lower]; a[lower] = pivot1;
            a[end] = a[upper]; a[upper] = pivot2;
            sort(null, a, bits | 1, lower + 1, upper);
            sort(null, a, bits | 1, upper + 1, high);
        } else {
            int pivot = a[e3];
            a[e3] = a[lower];
            for (int k = ++upper; --k > lower; ) {
                int ak = a[k];
                if (ak != pivot) {
                    a[k] = pivot;
                    if (ak < pivot) {
                        while (a[++lower] < pivot);
                        if (a[lower] > pivot) {
                            a[--upper] = a[lower];
                        }
                        a[lower] = ak;
                    } else {
                        a[--upper] = ak;
                    }
                }
            }
            a[low] = a[lower]; a[lower] = pivot;
            sort(null, a, bits | 1, upper, high);
        }
        high = lower;
    }
}
```

bits参数用于组合递归深度和位标志，用于控制排序算法的行为。bits的初始值为0，随着递归的加深而不断改变值。
- 右侧最低位用于表示数组是否是左侧部分的一部分。如果最低位为1，则表示数组是左侧部分的一部分；如果最低位为0，则表示数组不是左侧部分的一部分。
- 其他位用于表示递归深度。递归深度表示排序算法已经递归执行了多少次。通过将bits的其他位设置为1，可以记录递归的深度。每次递归调用sort方法时，递归深度会递增。

通过使用bits参数，可以在排序算法中根据递归深度和数组是否是左侧部分的一部分来做出不同的决策，以选择合适的排序策略和控制算法的行为。

该方法的主要处理逻辑如下：
1. 获取数组的起始索引low和结束索引high，以及数组的大小size。
2. 如果数组大小小于65+bits，并且数组是左侧部分的一部分，则用混合插入排序算法来对该部分进行排序，并返回。
3. 如果数组大小小于44，则用插入排序算法对整个部分进行排序，并返回。
4. 检查整个数组或较大的非左侧部分是否近乎有序，并尝试合并已排序的子序列。
5. 如果执行时间变为二次方时间（即递归深度超过384），则切换到堆排序算法对整个部分进行排序，并返回。
6. 执行快速排序算法
    1. 使用简单的黄金比例近似方法选择五个样本元素e1、e2、e3、e4、e5，并确定两个轴lower（左侧最后一个元素）、upper（右侧第一个元素）。
    2. 对e1、e2、e3、e4、e5进行排序，将它们放置在正确的位置上。
    3. 根据选定的轴，将数组分成左侧部分和右侧部分，并进行划分。
        -  如果有多个不同的元素，则使用双轴快速排序算法对左侧和右侧进行递归排序。
        - 如果有许多相等的元素，则使用单轴快速排序算法对右侧部分进行递归排序。

在递归的过程中，根据递归深度和分区标志位（bits），将子数组划分为更小的部分，并根据需要进行并行排序。

混合插入排序的实现是`java.util.DualPivotQuicksort.mixedInsertionSort(int[], int, int, int)`。

```java
private static void mixedInsertionSort(int[] a, int low, int end, int high) {
    if (end == high) {
        for (int i; ++low < end; ) {
            int ai = a[i = low];
            while (ai < a[--i]) {
                a[i + 1] = a[i];
            }
            a[i + 1] = ai;
        }
    } else {
        int pin = a[end];
        for (int i, p = high; ++low < end; ) {
            int ai = a[i = low];
            if (ai < a[i - 1]) {
                a[i] = a[--i];
                while (ai < a[--i]) {
                    a[i + 1] = a[i];
                }
                a[i + 1] = ai;
            } else if (p > i && ai > pin) {
                while (a[--p] > pin);
                if (p > i) {
                    ai = a[p];
                    a[p] = a[i];
                }
                while (ai < a[--i]) {
                    a[i + 1] = a[i];
                }
                a[i + 1] = ai;
            }
        }
        for (int i; low < high; ++low) {
            int a1 = a[i = low], a2 = a[++low];
            if (a1 > a2) {
                while (a1 < a[--i]) {
                    a[i + 2] = a[i];
                }
                a[++i + 1] = a1;
                while (a2 < a[--i]) {
                    a[i + 1] = a[i];
                }
                a[i + 1] = a2;
            } else if (a1 < a[i - 1]) {
                while (a2 < a[--i]) {
                    a[i + 2] = a[i];
                }
                a[++i + 1] = a2;
                while (a1 < a[--i]) {
                    a[i + 1] = a[i];
                }
                a[i + 1] = a1;
            }
        }
    }
}
```

混合插入排序是简单插入排序、引脚插入排序、成对插入排序的组合算法。
引脚插入排序是扩展的简单插入排序，其主要思想是将大于某个元素（称为引脚）的元素放置在数组的末尾，避免将这些元素通过整个数组进行昂贵的移动操作。在引脚插入排序中，遍历数组，并根据元素的大小进行插入操作。如果元素较小，则将其插入到已排序的部分中的正确位置；如果元素较大，则在已排序的部分中找到比引脚小的元素，并将较大的元素与之交换，然后再将较小的元素插入到已排序的部分中的正确位置。
成对插入排序是每次插入两个元素：首先插入较大的元素，然后插入较小的元素，但是插入位置是在插入较大元素的位置之后。成对插入排序也是根据元素的大小进行插入操作。如果较大的元素比已排序部分的最后一个元素要小，则将较大元素插入到正确位置；如果较小的元素比已排序部分的最后一个元素要小，则将较小元素插入到正确位置。

根据范围low、end、high的不同，混合插入排序算法采用不同的插入排序策略来进行排序：
- 如果end等于high，表示范围内只有一个元素，这时采用简单插入排序进行排序。简单插入排序遍历数组，将每个元素插入到已排序的部分中的正确位置。
- 如果end不等于high，表示范围内有多个元素，这时采用引脚插入排序和成对插入排序相结合的方式进行排序。

通过组合简单插入排序、引脚插入排序、成对插入排序这三种插入排序算法，混合插入排序算法能够充分利用已排序的部分和减少元素的移动操作，从而提高排序的效率。在双轴快速排序的上下文中，左侧部分的枢轴元素起到哨兵的作用，因为它小于给定部分的任何元素，所以可以在每次迭代中跳过对左侧范围的昂贵检查。

简单插入排序的实现是`java.util.DualPivotQuicksort.insertionSort(int[], int, int)`。

```java
private static void insertionSort(int[] a, int low, int high) {
    for (int i, k = low; ++k < high; ) {
        int ai = a[i = k];
        if (ai < a[i - 1]) {
            while (--i >= low && ai < a[i]) {
                a[i + 1] = a[i];
            }
            a[i + 1] = ai;
        }
    }
}
```

`java.util.DualPivotQuicksort.tryMergeRuns(Sorter, int[], int, int)`的内容略。

堆排序的实现是`java.util.DualPivotQuicksort.heapSort(int[], int, int)`。

```java
private static void heapSort(int[] a, int low, int high) {
    for (int k = (low + high) >>> 1; k > low; ) {
        pushDown(a, --k, a[k], low, high);
    }
    while (--high > low) {
        int max = a[low];
        pushDown(a, low, a[high], low, high);
        a[high] = max;
    }
}

private static void pushDown(int[] a, int p, int value, int low, int high) {
    for (int k ;; a[p] = a[p = k]) {
        k = (p << 1) - low + 2; // Index of the right child
        if (k > high) {
            break;
        }
        if (k == high || a[k] < a[k - 1]) {
            --k;
        }
        if (a[k] <= value) {
            break;
        }
    }
    a[p] = value;
}
```

在快速排序中，递归的深度取决于待排序数组的分区情况。当数组的分区不均匀、递归深度较大时，快速排序可能会出现性能下降的情况。

快速排序的性能主要受两个因素影响：分区的负载均衡和递归深度。如果数组的分区不均匀，即分区后的子数组大小差异很大，可能会导致某些子数组较大，递归深度较大。这样会增加递归调用的次数和栈空间的使用，可能导致栈溢出或性能下降。

相比之下，堆排序不依赖于递归，而是基于堆数据结构进行排序。堆排序的性能稳定，不会受到递归深度的影响。无论数组分区的情况如何，堆排序的时间复杂度都保持在$O(n\log{n})$级别。

因此，当待排序数组的分区情况不均匀、递归深度较大时，切换到堆排序可以避免递归带来的性能问题，确保排序算法的稳定性和可靠性。

需要注意的是，切换到堆排序可能会增加排序算法的额外开销，因为堆排序涉及到构建堆和调整堆的过程。因此，只有当递归深度到达一定程度后，才切换到堆排序。

### [F、[D

浮点数数组的排序处理比整数的排序处理要更复杂。

```java
static void sort(float[] a, int parallelism, int low, int high) {
    int numNegativeZero = 0;
    for (int k = high; k > low; ) {
        float ak = a[--k];
        if (ak == 0.0f && Float.floatToRawIntBits(ak) < 0) { // ak is -0.0f
            numNegativeZero += 1;
            a[k] = 0.0f;
        } else if (ak != ak) { // ak is NaN
            a[k] = a[--high];
            a[high] = ak;
        }
    }
    int size = high - low;
    if (parallelism > 1 && size > MIN_PARALLEL_SORT_SIZE) {
        int depth = getDepth(parallelism, size >> 12);
        float[] b = depth == 0 ? null : new float[size];
        new Sorter(null, a, b, low, size, low, depth).invoke();
    } else {
        sort(null, a, 0, low, high);
    }
    if (++numNegativeZero == 1) {
        return;
    }
    while (low <= high) {
        int middle = (low + high) >>> 1;
        if (a[middle] < 0) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }
    while (--numNegativeZero > 0) {
        a[++high] = -0.0f;
    }
}
```

该方法用于对指定范围的浮点数数组进行排序。
1. 统计负零的个数，并将负零转换为正零，同时将所有的 NaN（Not-a-Number）值移动到数组的末尾。
2. 对除了 NaN 值之外的所有元素进行排序。如果并行度parallelism大于 1，并且数组的大小size大于一个阈值 MIN_PARALLEL_SORT_SIZE（4096），则将数组划分为多个子区间进行并行排序，否则采用单线程进行排序。
3. 将正零重新转换为负零。

该方法需要特别处理负零和NaN值。这是因为浮点数的特殊性，需要保证排序的正确性和稳定性。算法通过判断并处理负零和NaN值，以及根据并行度和数组大小选择合适的排序策略，来实现高效的排序操作。此情况下，并行度不大于1，因此不考虑并行排序问题。

非并行的`java.util.DualPivotQuicksort.sort(Sorter, float[], int, int, int)`的基本逻辑和非并行的`java.util.DualPivotQuicksort.sort(Sorter, int[], int, int, int)`没有区别，不赘述。

[D的处理逻辑与[F的处理逻辑相同，不赘述。

## [B、[S、[C

[B、[S、[C类型的sort()方法的基本逻辑是相似的。单参数方法的逻辑是直接调用3参数的`java.util.DualPivotQuicksort.sort()`。

```java
public static void sort(byte[] a) {
    DualPivotQuicksort.sort(a, 0, a.length);
}
```

3参数sort()方法的逻辑是先做边界值合规检查再调用3参数的`java.util.DualPivotQuicksort.sort()`。

```java
public static void sort(byte[] a, int fromIndex, int toIndex) {
    rangeCheck(a.length, fromIndex, toIndex);
    DualPivotQuicksort.sort(a, fromIndex, toIndex);
}
```

[B、[S、[C类型涉及的`rangeCheck()`的逻辑与[I、[L、[F、[D类型涉及的`rangeCheck()`的逻辑相同，不赘述。

### [B

`java.util.DualPivotQuicksort.sort(byte[], int, int)`代码如下：

```java
static void sort(byte[] a, int low, int high) {
    if (high - low > MIN_BYTE_COUNTING_SORT_SIZE) {
        countingSort(a, low, high);
    } else {
        insertionSort(a, low, high);
    }
}
```

上面的代码中用到了部分常量：
- `MIN_BYTE_COUNTING_SORT_SIZE`：使用计数排序的最小byte数组大小，值为64。

该方法会检查待排序的数组区间长度，如果超过阈值64则视为“数据密集”，选择计数排序；否则选择插入排序。

计数排序是一种线性时间复杂度的排序算法，适用于待排序的元素范围较小的情况。它通过统计数组中每个元素的出现次数，然后根据这些统计信息将元素放回原数组的正确位置，从而实现排序。

```java
private static void countingSort(byte[] a, int low, int high) {
    int[] count = new int[NUM_BYTE_VALUES];
    for (int i = high; i > low; ++count[a[--i] & 0xFF]);
    if (high - low > NUM_BYTE_VALUES) {
        for (int i = MAX_BYTE_INDEX; --i > Byte.MAX_VALUE; ) {
            int value = i & 0xFF;
            for (low = high - count[value]; high > low; a[--high] = (byte) value);
        }
    } else {
        for (int i = MAX_BYTE_INDEX; high > low; ) {
            while (count[--i & 0xFF] == 0);
            int value = i & 0xFF;
            int c = count[value];
            do {
                a[--high] = (byte) value;
            } while (--c > 0);
        }
    }
}
```

插入排序是一种简单直观的排序算法，它通过构建有序序列，对未排序的元素逐个进行插入，从而实现排序。

```java
private static void insertionSort(byte[] a, int low, int high) {
    for (int i, k = low; ++k < high; ) {
        byte ai = a[i = k];
        if (ai < a[i - 1]) {
            while (--i >= low && ai < a[i]) {
                a[i + 1] = a[i];
            }
            a[i + 1] = ai;
        }
    }
}
```

因此，上述代码中的判断逻辑的目的是根据数组的大小选择最适合的排序算法。对于较大的数组，使用计数排序可以获得较好的性能；而对于较小的数组，插入排序的开销较小，可以更高效地完成排序操作。这样可以根据具体情况选择最优的排序策略，以提高排序的效率。

说的更直白一些，计数排序既然能突破基于比较的内排序算法的$O(n\log{n})$的限制，就说明它是不完全基于比较的。计数排序算法用空间换时间，因此只有数据足够“密集”时，它才是更高效的。

### [S、[C

[S、[C类型的sort()与[B类型的sort()有一定的相似性，都需要先判断是否足够密集以进入计数排序。区别在于，[B类型的sort()在数据不够密集时会选择插入排序，而[S、[C类型的sort()在数据不够密集时会继续进入类似于[I、[L的复杂快速排序算法。

```java
static void sort(short[] a, int low, int high) {
    if (high - low > MIN_SHORT_OR_CHAR_COUNTING_SORT_SIZE) {
        countingSort(a, low, high);
    } else {
        sort(a, 0, low, high);
    }
}
```

上面的代码中用到了部分常量：
- `MIN_BYTE_COUNTING_SORT_SIZE`：使用计数排序的最小short数组大小，值为1750。

`java.util.DualPivotQuicksort.countingSort(short[], int, int)`的基本逻辑和`java.util.DualPivotQuicksort.countingSort(byte[], int, int)`极为相似，不赘述。

`java.util.DualPivotQuicksort.sort(short[], int, int, int)`的基本逻辑和非并行的`java.util.DualPivotQuicksort.sort(Sorter, int[], int, int, int)`区别仅存于特殊判断上，后续的双轴快速排序和单轴快速排序不赘述。

```java
if (size < MAX_INSERTION_SORT_SIZE) {
    insertionSort(a, low, high);
    return;
}
if ((bits += DELTA) > MAX_RECURSION_DEPTH) {
    countingSort(a, low, high);
    return;
}
```

上面的代码中用到了部分常量：
- `MAX_INSERTION_SORT_SIZE`：使用插入排序的最大数组大小，值为44。
- `MAX_RECURSION_DEPTH`：使用堆排序之前的最大递归分区深度，值为384。

由于short的数值范围远小于int的数值范围，因此无需采用堆排序，直接采用计数排序即可。计数排序的相关内容不赘述。

[C的处理逻辑与[S的处理逻辑相同，不赘述。

# [Ljava.lang.Object

java.util.Arrays定义的sort()中，有2个需要java.lang.Object类型元素的数组，对应的数组类型是[Ljava.lang.Object。有1参数的方法用于整个数组排序、3参数方法用于范围内数组排序。

- `public static void sort(Object[] a)`
- `public static void sort(Object[] a, int fromIndex, int toIndex)`

`java.util.Arrays.sort(Object[] a)`的实现代码如下所示。

```java
public static void sort(Object[] a) {
    if (LegacyMergeSort.userRequested)
        legacyMergeSort(a);
    else
        ComparableTimSort.sort(a, 0, a.length, null, 0, 0);
}
```

和基本类型元素数组相似，`java.util.Arrays.sort(Object[] a, int fromIndex, int toIndex)`的实现代码比1参数的实现值多了一条`rangeCheck(a.length, fromIndex, toIndex);`语句。`rangeCheck()`的实现不赘述。

```java
public static void sort(Object[] a, int fromIndex, int toIndex) {
    rangeCheck(a.length, fromIndex, toIndex);
    if (LegacyMergeSort.userRequested)
        legacyMergeSort(a, fromIndex, toIndex);
    else
        ComparableTimSort.sort(a, fromIndex, toIndex, null, 0, 0);
}
```

LegacyMergeSort是java.util.Arrays的静态内部类，全名是`java.util.Arrays.LegacyMergeSort`，实现如下所示。

```java
static final class LegacyMergeSort {
    @SuppressWarnings("removal")
    private static final boolean userRequested =
        java.security.AccessController.doPrivileged(
            new sun.security.action.GetBooleanAction(
                "java.util.Arrays.useLegacyMergeSort")).booleanValue();
}
```

LegacyMergeSort包含一个静态常量userRequested。Java通过使用`java.security.AccessController.doPrivileged`方法来读取系统属性java.util.Arrays.useLegacyMergeSort的boolean值，并将其赋值给userRequested常量。

`LegacyMergeSort.userRequested`存在的意义是允许选择旧版本的归并排序实现，这是为了与某些存在问题的java.util.Comparator兼容而提供的选项。通过设置系统属性java.util.Arrays.useLegacyMergeSort为true或false，可以控制是否使用旧版本的归并排序算法。该选项只是为了向后兼容而存在，并且在未来的发布版本中将被删除。

当`LegacyMergeSort.userRequested`为true时，调用`java.util.Arrays.legacyMergeSort()`方法。

```java
private static void legacyMergeSort(Object[] a) {
    Object[] aux = a.clone();
    mergeSort(aux, a, 0, a.length, 0);
}
```

```java
private static void legacyMergeSort(Object[] a, int fromIndex, int toIndex) {
    Object[] aux = copyOfRange(a, fromIndex, toIndex);
    mergeSort(aux, a, fromIndex, toIndex, -fromIndex);
}
```

拷贝一份数组元素后调用`java.util.Arrays.mergeSort()`。

```java
@SuppressWarnings({"unchecked", "rawtypes"})
private static void mergeSort(Object[] src, Object[] dest, int low, int high, int off) {
    int length = high - low;
    // Insertion sort on smallest arrays
    if (length < INSERTIONSORT_THRESHOLD) {
        for (int i=low; i<high; i++)
        for (int j=i; j>low && ((Comparable) dest[j-1]).compareTo(dest[j])>0; j--)
            swap(dest, j, j-1);
        return;
    }
    // Recursively sort halves of dest into src
    int destLow  = low;
    int destHigh = high;
    low  += off;
    high += off;
    int mid = (low + high) >>> 1;
    mergeSort(dest, src, low, mid, -off);
    mergeSort(dest, src, mid, high, -off);
    // If list is already sorted, just copy from src to dest.  This is an optimization that results in faster sorts for nearly ordered lists.
    if (((Comparable)src[mid-1]).compareTo(src[mid]) <= 0) {
        System.arraycopy(src, low, dest, destLow, length);
        return;
    }
    // Merge sorted halves (now in src) into dest
    for(int i = destLow, p = low, q = mid; i < destHigh; i++) {
        if (q >= high || p < mid && ((Comparable)src[p]).compareTo(src[q])<=0)
            dest[i] = src[p++];
        else
            dest[i] = src[q++];
    }
}

private static void swap(Object[] x, int a, int b) {
    Object t = x[a];
    x[a] = x[b];
    x[b] = t;
}
```

首先，计算待排序范围的长度length，如果length小于7，则使用插入排序对该范围的元素进行排序。插入排序是一种简单直观的排序算法，适用于小规模的数组。

如果待排序范围的长度超过阈值，将使用归并排序进行排序。归并排序的思想是将数组分为两个部分，递归地对每个部分进行排序，然后再将两个有序的部分合并成一个有序的数组。

在归并排序的过程中，首先将待排序范围分成两半，分别递归地对这两个部分进行排序，通过调用mergeSort方法。然后，检查两个部分是否已经有序，如果已经有序，直接将结果拷贝到dest数组中。这是一个优化操作，对于接近有序的列表，可以减少排序的时间复杂度。

最后，使用双指针的方式将两个有序的部分合并成一个有序的数组。通过比较src[p]和src[q]的大小，选择较小的元素放入dest[i]，并将对应的指针p或q向前移动。重复该过程直到遍历完两个部分的所有元素，将最终结果存储在dest数组中。

归并排序是一种稳定的排序算法，时间复杂度为$O(n\log{n})$，其中n为待排序数组的长度。它的主要思想是分治法，将问题分解为更小的子问题，并通过递归解决。在归并排序中，合并两个有序的子数组是关键步骤，确保子数组的有序性是算法正确性的基础。

当`LegacyMergeSort.userRequested`为false时，调用`java.util.ComparableTimSort.sort()`方法。

```java
static void sort(Object[] a, int lo, int hi, Object[] work, int workBase, int workLen) {
    assert a != null && lo >= 0 && lo <= hi && hi <= a.length;
    int nRemaining  = hi - lo;
    if (nRemaining < 2)
        return;
    if (nRemaining < MIN_MERGE) {
        int initRunLen = countRunAndMakeAscending(a, lo, hi);
        binarySort(a, lo, hi, lo + initRunLen);
        return;
    }
    ComparableTimSort ts = new ComparableTimSort(a, work, workBase, workLen);
    int minRun = minRunLength(nRemaining);
    do {
        int runLen = countRunAndMakeAscending(a, lo, hi);
        if (runLen < minRun) {
            int force = nRemaining <= minRun ? nRemaining : minRun;
            binarySort(a, lo, lo + force, lo + runLen);
            runLen = force;
        }
        ts.pushRun(lo, runLen);
        ts.mergeCollapse();
        lo += runLen;
        nRemaining -= runLen;
    } while (nRemaining != 0);
    assert lo == hi;
    ts.mergeForceCollapse();
    assert ts.stackSize == 1;
}
```

该方法的原理是：
1. 首先，对输入参数进行合法性检查，确保数组a不为空，lo和hi的值在合理范围内。
2. 接下来，根据待排序范围的大小进行判断和处理：
    - 如果待排序范围的大小小于32，则执行一个简化的TimSort算法，即进行一次迭代，将数组划分为若干个自然有序的片段(runs)，并对每个片段进行排序。
    - 如果待排序范围的大小大于32，则使用完整的TimSort算法。该算法通过迭代地划分和合并自然有序的片段来完成排序。
        1. 在完整的TimSort算法中，首先定义了一个ComparableTimSort对象 ts，它负责执行TimSort算法的具体逻辑。
        2. 然后，通过循环迭代，不断识别下一个待排序的片段(run)，并将其推入待处理的片段栈中。如果当前片段较短，则将其扩展到最小长度 minRun，并使用二分插入排序对其进行排序。
        3. 在识别和处理每个片段后，使用mergeCollapse()方法来合并栈中的片段，以满足栈的不变性。
        4. 最后，通过调用mergeForceCollapse()方法将剩余的所有片段合并，完成排序过程。

TimSort是一种稳定的排序算法，整合了归并排序和插入排序。TimSort对于大部分类型的输入数据都具有很好的性能表现，并且在处理有序或部分有序的数组时具有优化效果。

`java.util.ComparableTimSort`与`java.util.TimSort`的算法框架基本一致，适用于实现`java.lang.Comparable`的对象数组，不需要显式传入`java.util.Comparator`。

```java
@SuppressWarnings({"fallthrough", "rawtypes", "unchecked"})
private static void binarySort(Object[] a, int lo, int hi, int start) {
    assert lo <= start && start <= hi;
    if (start == lo)
        start++;
    for ( ; start < hi; start++) {
        Comparable pivot = (Comparable) a[start];
        int left = lo;
        int right = start;
        assert left <= right;
        while (left < right) {
            int mid = (left + right) >>> 1;
            if (pivot.compareTo(a[mid]) < 0)
                right = mid;
            else
                left = mid + 1;
        }
        assert left == right;
        int n = start - left;
        switch (n) {
            case 2:  a[left + 2] = a[left + 1];
            case 1:  a[left + 1] = a[left];
                     break;
            default: System.arraycopy(a, left, a, left + 1, n);
        }
        a[left] = pivot;
    }
}
```

二分插入排序算法算法是一个简单插入排序的变种，它利用二分查找的思想来寻找插入位置，从而减少比较的次数。具体的步骤如下：
1. 首先，根据输入参数进行合法性检查，确保lo≤start≤hi。
2. 然后，从索引start开始迭代，对每个元素执行以下操作：
    1. 将当前元素作为pivot。
    2. 初始化左右指针left和right，分别指向范围的起始索引lo和当前元素的索引start。
    3. 循环执行以下步骤，直到left和right相等：
        1. 计算中间索引mid，使用二分查找的方式确定pivot应该插入的位置。
        2. 如果pivot小于中间位置的元素a[mid]，则将right更新为mid，否则将left更新为mid+1。
    4. 将pivot插入到left的位置。
    5. 将start-left个元素向右移动一个位置，为pivot腾出插入的位置。
    6. 将pivot放置到left的位置。
3. 排序完成后，数组范围[lo, hi)就是有序的。

二分插入排序算法是一种稳定的排序算法，它在处理小规模数据时表现良好，尤其适用于已经部分有序的数组范围。

# T[]

- `public static <T> void sort(T[] a, int fromIndex, int toIndex, Comparator<? super T> c)`
- `public static <T> void sort(T[] a, Comparator<? super T> c)`

参数化类型数组的sort()实现与Object类型数组的sort()实现类似，在`Comparator<? super T>`对象为null时转为Object类型数组的sort()实现，毕竟Java中java.lang.Object是所有其他类的基类。

```java
public static <T> void sort(T[] a, Comparator<? super T> c) {
    if (c == null) {
        sort(a);
    } else {
        if (LegacyMergeSort.userRequested)
            legacyMergeSort(a, c);
        else
            TimSort.sort(a, 0, a.length, c, null, 0, 0);
    }
}

public static <T> void sort(T[] a, int fromIndex, int toIndex, Comparator<? super T> c) {
    if (c == null) {
        sort(a, fromIndex, toIndex);
    } else {
        rangeCheck(a.length, fromIndex, toIndex);
        if (LegacyMergeSort.userRequested)
            legacyMergeSort(a, fromIndex, toIndex, c);
        else
            TimSort.sort(a, fromIndex, toIndex, c, null, 0, 0);
    }
}
```

同理，二者实现的区别仅在于一条`rangeCheck(a.length, fromIndex, toIndex);`语句。

`java.util.TimSort.sort()`与`java.util.ComparableTimSort.sort()`的实现有着同样的逻辑。

```java
static <T> void sort(T[] a, int lo, int hi, Comparator<? super T> c, T[] work, int workBase, int workLen) {
    assert c != null && a != null && lo >= 0 && lo <= hi && hi <= a.length;
    int nRemaining  = hi - lo;
    if (nRemaining < 2)
        return;
    if (nRemaining < MIN_MERGE) {
        int initRunLen = countRunAndMakeAscending(a, lo, hi, c);
        binarySort(a, lo, hi, lo + initRunLen, c);
        return;
    }
    TimSort<T> ts = new TimSort<>(a, c, work, workBase, workLen);
    int minRun = minRunLength(nRemaining);
    do {
        int runLen = countRunAndMakeAscending(a, lo, hi, c);
        if (runLen < minRun) {
            int force = nRemaining <= minRun ? nRemaining : minRun;
            binarySort(a, lo, lo + force, lo + runLen, c);
            runLen = force;
        }
        ts.pushRun(lo, runLen);
        ts.mergeCollapse();
        lo += runLen;
        nRemaining -= runLen;
    } while (nRemaining != 0);
    assert lo == hi;
    ts.mergeForceCollapse();
    assert ts.stackSize == 1;
}
```
