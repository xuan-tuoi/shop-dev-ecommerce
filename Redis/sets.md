----------------- Bài 4: SET ---------

1. Cấu trúc

- là loại tập hợp chứa các phần tử như List tuy nhiên các phần tử trong Set là duy nhất , không lặp lại.

2. câu lệnh

# a) Thêm các phần tử vào SET

> SADD key elements -> return số lượng phần tử vừa add vào set

# b) lấy ra các phần tử trong set

> smembers key

# c) Xóa 1 phần tử trong set

> srem key element
> vd: srem top xuantuoi

# lấy số lượng các key trong set

> scard key -> retủn integer

# Thêm 1 giá trị trùng lặp -> return 0 tức là không insert thành công

# lấy ra 1 giá trị ngẫu nhiên trong set -> srandmember key [count]

# Di chuyển 1 giá trị từ mảng này qua mảng khác ->SMOVE source another value

# Tìm phần tử chung giữa 2 mảng -> SINTER A B

# Tìm phân tử khác nhau giữa mảng A với mảng B -> SDIFF A B

# Tìm phần tử khác giữa mảng b với mảng A -> SDIFF B A

vd: smove top bottom value12 (di chuyển phần tử có giá trị là value12 sang mảng bottom )

3. kịch bản sử dụng
   vd1: có 1 bài viết , có 3 người like
   sadd news01 uid:01 uid:02 uid:03
   -> vậy người uid:01 nhấn like 1 lần nữa được hay không -> KHÔNG , vì cơ chế của set là không thể lưu 1 giá trị 2 lần
   -> SMEMBERS : ai like
   -> SCARD: số lượng like trong 1 bài viết
   -> Kiểm tra xem uid:01 có like bài viết này hay không?
   SISMEMBER news01 uid:01
   vd2: Tìm bạn chung như Facebook
   SADD cr7 1 2 3 4 5 6
   SADD m10 34 6 2 7 5
   -> SINTER cr7 m10
   VD3 : lấy random 1 giá trị làm số may mắn
   SADD vietlot 1 2 3 4 5 6 7
   SRANDMEMBER vietlot 1
