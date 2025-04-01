### Backend Patterns (Đã thực sự áp dụng):

1. **Factory Pattern**
   - **Files**: `ServiceFactory.js`, `StrategyFactory.js`
   - **Mục đích**: Tạo các service và strategy objects mà không cần expose creation logic.
   - **Ứng dụng**:
     - `ServiceFactory` tạo các service như `BannerService`, `WarpService`, `AuthService`.
     - `StrategyFactory` tạo các strategy như `PityStrategy`, `GuaranteeStrategy`, `RateStrategy`.
     - Được sử dụng trong `Container` để quản lý và khởi tạo các service và strategy.

2. **Decorator Pattern**
   - **Files**: `LoggingDecorator.js`, `CachingDecorator.js`
   - **Mục đích**: Thêm chức năng mới cho các đối tượng mà không thay đổi cấu trúc của chúng.
   - **Ứng dụng**:
     - `LoggingDecorator` thêm chức năng ghi log cho các phương thức của `BannerService`.
     - `CachingDecorator` có thể thêm chức năng caching cho các service.
     - Được áp dụng cho `BannerService` để theo dõi và ghi lại các hoạt động.

3. **Singleton Pattern**
   - **Files**: `Container.js`, `ChainBuilder.js`
   - **Mục đích**: Đảm bảo một class chỉ có một instance duy nhất và cung cấp một điểm truy cập toàn cục cho instance đó.
   - **Ứng dụng**:
     - `Container` quản lý các service và factory, đảm bảo chỉ có một instance duy nhất.
     - `ChainBuilder` xây dựng và quản lý chuỗi xử lý.

4. **Repository Pattern**
   - **Files**: `MongooseWarpStatsRepository.js`
   - **Mục đích**: Tạo một abstraction layer giữa business logic và data access logic.
   - **Ứng dụng**:
     - `MongooseWarpStatsRepository` quản lý các thao tác với database cho `WarpStats`.
     - Được sử dụng trong `BannerService` để truy xuất và cập nhật trạng thái banner.

5. **Chain of Responsibility Pattern**
   - **Files**: `ChainBuilder.js`
   - **Mục đích**: Cho phép một yêu cầu được xử lý bởi một chuỗi các đối tượng mà không cần biết đối tượng nào sẽ xử lý nó.
   - **Ứng dụng**:
     - `ChainBuilder` xây dựng chuỗi các handler như `ValidationHandler`, `LoggingHandler`.
     - Được sử dụng để xử lý các yêu cầu theo một chuỗi logic.

### Frontend Patterns (Đã thực sự áp dụng):

1. **Component Pattern**
   - **Files**: `Settings.js`, `Main.js`, `WarpSingle.js`, etc.
   - **Mục đích**: Tách UI thành các component độc lập, tái sử dụng được.
   - **Ứng dụng**:
     - Mỗi component đại diện cho một phần của UI, có thể tái sử dụng và dễ dàng quản lý.
     - Ví dụ: `Settings.js` quản lý giao diện cài đặt, `Main.js` quản lý giao diện chính.

2. **Context Pattern**
   - **Files**: `SoundContext.js`, `AuthContext.js`
   - **Mục đích**: Quản lý state global và chia sẻ data giữa các components mà không cần prop drilling.
   - **Ứng dụng**:
     - `SoundContext` quản lý trạng thái âm thanh, `AuthContext` quản lý trạng thái xác thực.
     - Các components có thể truy cập và thay đổi state mà không cần truyền props qua nhiều cấp.

3. **Service Pattern**
   - **Files**: `soundService.js`, `authService.js`
   - **Mục đích**: Tách các logic gọi API và xử lý nghiệp vụ ra khỏi components.
   - **Ứng dụng**:
     - `soundService` quản lý các thao tác liên quan đến âm thanh.
     - `authService` quản lý các thao tác xác thực người dùng.

### Tổng kết:
- **Backend**: Factory, Decorator, Singleton, Repository, Chain of Responsibility
- **Frontend**: Component, Context, Service

Các patterns này giúp hệ thống:
1. **Modular**: Dễ dàng thêm/sửa/xóa components và services.
2. **Maintainable**: Code được tổ chức tốt, dễ hiểu và maintain.
3. **Scalable**: Dễ dàng mở rộng với các tính năng mới.
4. **Testable**: Dễ dàng viết unit tests và mock dependencies.

Bạn có muốn tìm hiểu chi tiết về implementation của pattern nào cụ thể không?
