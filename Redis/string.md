---------- Bài 01: String ------------
embstr: < 44bytes
vd: 0123456789012345678901234567890123456789abcd
lớn hơn 44bytes (embstr) => "raw"

> set num 1234
> OK
> object encoding num
> "int"
> set name xuantuoi
> OK
> get name
> "xuantuoi"
> EXISTS name (check xem key này có tồn tại hay không )
> (integer) 1 (tồn tại )
> STRLEN name (kiểm tra độ dài của key )
> (integer) 8
> DEL name (xóa key này đi , trả ra 1 khi xóa thanh công, còn trả về 0 nếu không thành công)

------ lệnh dùng để set hàng loạt key value ---------

> MSET key1 value1 key2 value2
> MSET user:1 '{"name": "xt", "age":22}'
> MSET user:1:name xuantuoi01 (set lại giá trị cho key name)
> OK
> MGET key1 key2 (lấy ra giá trị của key1 và key2)

1. 'value1'
2. 'value2'

------- về cache
vd: set lượt like cho item có key 0001:like

> set 0001:like 0

# sau khi có người nhấn nút like

> INCR 0001:like (IMCR ~ increment )
> (integer ) 1
> GET 0001:like
> "1"
> INCRBY 0001:like 6
> "7"
> DECR 0001:like
> "6"
> DECRBY 0001:like 3
> "3"

# Tìm kiếm tất cả các key bắt đầu bằng chuỗi

> KEYS '001:\*'

1. '0001: like'

# set thời gian cho key

> set name xuantuoi
> EXPIRE name 60 (60s)
> TTL name (kiểm tra thời gian tồn tại còn lại của key)
> SET name xt EX 60 ( set 60s cho key "name" )
> SETNX key value : đặt giá trị cho một key nếu key đó chưa tồn tại , nếu đã tồn tại thì k làm gì va cũng k thay đổi giá trị của key

#khóa phân tán

> set lock_key unique_value NX PX 10000
