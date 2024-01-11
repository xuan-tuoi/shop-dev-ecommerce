------------------ bài 5: Zset ------

1. Cấu trúc

   - tương tự như set , tuy nhiên có sắp xếp với điểm số
   - sorted sets
   - là tập hợp các chuỗi (thành viên) duy nhất được sắp xếp theo điểm số liên quan.

2. Câu lệnh

# add phần tử cùng với score liên quan -> ZADD key score element

> zadd hackers 1940 "Alan Kay" 1957 "Sophie Wilson"
> (integer) 1
> zadd hackers 1912 "Alan Turing"
> (integer) 1

- "Khác score": sort theo score
- "Cùng score" nếu add các phần tử khác nhau nhưng mà cùng score thi các phần tử sẽ được sắp xếp theo thứ tự chữ cái trong từ điển
  > (zadd hackers 0 "Alan Kay" 0 "Sophie Wilson" 0 "Richard Stallman" 0
  > "Anita Borg" 0 "Yukihiro Matsumoto" 0 "Hedy Lamarr" 0 "Claude Shannon"
  > 0 "Linus Torvalds" 0 "Alan Turing"
  > )

# lấy ra các phần tử trong danh sách theo chiều tăng dần của score -> ZRANGE key start end

> zrange hackers 0 -1

# lấy ra các phần tử trong danh sách theo chiều giảm dần của score -> ZREVRANGE key start end

> zrevrange hackers 0 -1

# Nếu muốn lấy ra cung với score -> ZRANGE/ ZREVRANGE key start end withscores

> zrange hackers 0 -1 withscores

# lấy ra trong 1 khoảng range -> ZRANGEBYSCORE key start end

# lấy ra các phần tử trong 1 khoảng của từ điển -> ZRANGEBYLEX key

> zrangebylex hackers [B [P

# Xóa các phần tử trong khoảng range -> ZREMRANGEBYSCORE key start end

# get-rank operation to ask what is the position of an element in the set of the ordered elements. -> ZRANK key element -> return index (or nil) ( theo thứ tự từ bé đến lớn )

# cập nhật score -> chỉ cần dùng lại câu lệnh ZADD key new_score element

# lấy ra 3 phần tử có điểm số cao nhất và sắp xếp từ lớn tới bé

> ZREVRANGE hackers 0 2 withscores

3. kịch bản sử dụng

> Xếp hạng doanh số bán hàng : ---> 'ZREVRANGE shop:01 withscores'
> top server : ZREVRANGE
> rank of an element in set: ---> ZRANK server "xuantuoi"
