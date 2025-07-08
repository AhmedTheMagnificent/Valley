def combinationSum(candidates, target):
    if target == 0:
        return []
    if target < 0:
        return None
    for num in candidates:
        rem = target - num
        combination = combinationSum(candidates, rem)
        if combination is not None:
            combination.append(num)
        return combination

candidates = [2,3,5]
target = 8
print(combinationSum(candidates, target))


