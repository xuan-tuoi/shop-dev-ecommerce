--------------- Transaction ----------

1. Tổng quan

- transaction trong db như MySQL, mongoDB : là tập hợp của các lệnh và nó trả vê 1 là thành công va 2 là thất bại. Transaction thực hiện 1 tập các câu lệnh , yêu cầu từ máy khách gửi tới
- mức cô lập của redis : Tất cả các lệnh trong một giao dịch được đánh số thứ tự và được thực hiện tuần tự. Một yêu cầu được gửi bởi một khách hàng khác sẽ không bao giờ được phục vụ trong quá trình thực hiện Giao dịch Redis. Điều này đảm bảo rằng các lệnh được thực thi như một thao tác đơn lẻ.
- Transaction Redis cho phép thực hiện một nhóm lệnh trong một bước duy nhất
- Các lệnh trong transaction không có tính nguyên tử : nếu 1 lệnh thất bại , thì các lệnh khác vẫn thực hiện được

2. Key word

- watch: dám sát 1 key ~ khóa lạc quan
- Multi : đánh dấu bắt đầu của
- Discard: hủy giao dịch

3. Câu lệnh

   > MULTI : Bắt đầu 1 redis transaction
   > -> tất cả các lệnh sau lệnh MULTI sẽ được đưa vào hàng đợi để thực hiện tuần tự hóa .
   > -> Các lệnh chỉ được thực thi khi chạy câu lệnh EXEC (execute) , sau câu lệnh EXEC thì mọi câu lệnh phía sau sẽ trở lại như bình thường

   # hủy bỏ 1 transaction -> DISCARD

   # Nếu như có 1 lệnh "a command fails" thì tất cả các lệnh bị hủy bỏ và nó trả ra 1 error: transaction discarded because ò previous errors

   # Khi 1 lệnh bị lỗi logic (increment cho string) thì các lệnh sau vẫn được thực thi, còn lệnh bị lỗi thì sẽ trả ra message lỗi

   # WATCH: giống như 1 khóa tối ưu theo dõi biến

   vd: trong kho hàng có 1000 sản phẩm

   > SET store:01 1000
   > WATCH store:01 // theo dõi kho hàng 01
   > bắt đầu thực hiện 1 giao dịch và mua 100 sản phẩm
   > MULTI
   > DECRYBY store:01 100 -> QUEUED (1)

Lúc này, trong kho nhập thêm 8000 sản phẩm khấc nữa-> set store:01 9000
-> Khi mà thực hiện transaction giảm 100

> EXEC -> (nil) // giao dịch hủy bỏ vì nhận thấy có 1 sự thay đổi của store:01 ngoài transaction
