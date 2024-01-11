--------------------Bài 3: List ------------

1. Cấu trúc của List
   Danh sách liên kết ,
2. Các lệnh thường gặp
   > Add giá trị vào bên trái
   > -> LPUSH list:01 a b c (left push)
   > lấy ra các giá trị từ vị trí start : end
   > -> LRANGE list:01 0 -1 ( lấy hết phần tử )
   > c b a
   > Add giá trị vào bên phải
   > -> RPUSH list:02 1 2 3
   > -> LRANGE listL02
   > 1 2 3
   > Xóa giá trị : LPOP field [count]
   > LPOP list:01 (xóa phần tử ngoài cùng bên trái \_ c )
   > return gias trị đó

# Blocking trong list \_ Queue hàng đợi

vd: 1 nhà báng hàng tung ra 1 vé vip, A và B cùng đồng thời giật vé này , A nhanh hơn và giật được vé vip này, B cũng giật thì lúc này B phải đợi nhà bán vé tung 1 vé khác ra thì B mới nhận được.
vd: > LPUSH l:ticket ticket:01 \_ nhà bán hàng tạo 1 vé ticket:01
A: BLPOP l:ticket 0 -> Giả sử A mua được vé -> return :
"l:ticket"
"ticket:01"
| | | | |
B: BLPOP l:ticket 0 ( vẫn đang chờ ... chưa kết thúc )

> Lúc này , nhà bán vé tạo thêm 1 vé ticket:02
> LPUSH l:ticket ticket:02 -> Ngay lúc này , B sẽ nhận được vé 02
> B : "l:ticket"
> "ticket:02"

# LINDEX key index -> Returns the element at index

> lpush top 1 2 3 4 5 6 7 8 \
> lrange top 0 -1

1. "\\" ~ 0
2. "8" ~ 1
3. "7" ~ 2
4. "6" ~ 3
5. "5"
6. "4"
7. "3"
8. "2"
9. "1"
   > lindex top 2 -> 7

# Độ ài list

> LLEN top -> 9

# Xóa 1 phần tử -> LREM key count elenment

> LREM top 1 8

# xóa phần tử trong khoảng start:stop -> LTRIM key start stop

trả về phần tử xóa đó và giá trị của key là chính là mảng được trả ra
-> có thể hiểu đơn giản method này gần filter, vì mảng hiện tại bị thay đổi giá trị = mảng bị cắt ra

# Sửa giá trị trong list -> LSET key index item

LSET top 0 9 (thay thế giá trị tại vị trí đầu tiên của mảng top bằng giá trị 9 )

# Chèn 1 giá trị vào trước hoặc sau 1 giá trị khác -> LINSERT key BEFORE|AFTER element value

> linsert top before 3 4 ( chèn 4 vào trước phần tử có giá trị = 3 trong danh sách top )

3. Kịch bản sử dụng
   Message Queue_hàng đợi tin nhắn trong List

- Bảo toàn thứ tự tin nhắn -> tin nhắn nào tới trước thì hiển thị trước (lpush hoặc lpop)
- Xử lí tin nhắn trùng lặp
- dùng cho stack | queue , các hàng đợi tin nhắn mesageQueue và ngăn xếp
- có các method push, pop
