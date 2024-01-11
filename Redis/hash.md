------------ Bài 02: HASH ---------

> HSET user:01 name xt
> OK
> HSET user:01 name xt age 22 address HaNoi
> OK
> HGET user:01 name
> "xt"

# lưu trữ nhiều cặp giá trị

> HMSET user:02 name tip age 39
> HMGET user:02 name age

# xóa giá trị trong trường

> HDEL user:02 age
> HGET user:02 name age
> -> tip nil

# kiểm tra số lượng key của 1 đối tượng

> HLEN user:02
> 1

## lấy tất cả các key

> HGETALL user:02
> "name"
> "tip"

## kiểm tra có tồn tại không

HEXISTS user:01 age

> (integer) 1

# hash và string khác nhau cái gì

# kịch bản sử dụng

-> Lấy hết tất cả các sản phẩm trong giỏ hàng : HGETALL
-> Thêm 1 sảN phẩm vào giỏ hàng HINCRBY
-> xóa sản phẩm trong giỏ hàng HDEL
-> lấy ra sản phẩm : HGET key value
