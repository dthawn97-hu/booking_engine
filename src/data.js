// Dữ liệu mẫu — thay bằng API Bellhop khi nối booking engine thật.
export const img = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`
export const vnd = n => Math.round(n).toLocaleString('vi-VN') + '₫'

export const HOTELS = [
  { id: 'ha-noi', name: 'Khách sạn Hà Nội', city: 'Phố cổ, Hoàn Kiếm', f: 1, img: '1566073771259-6a8506099945', d: 'Căn phòng nhìn ra những mái ngói rêu và hàng sấu, cách Hồ Gươm vài phút đi bộ.' },
  { id: 'da-nang', name: 'Khách sạn Đà Nẵng', city: 'Bãi biển Mỹ Khê', f: 1.1, img: '1542314831-068cd1dbfeeb', d: 'Bước ra khỏi sảnh là chạm cát. Hồ bơi vô cực nhìn thẳng ra biển Đông.' },
  { id: 'hoi-an', name: 'Khách sạn Hội An', city: 'Cẩm Châu, Hội An', f: 0.95, img: '1564501049412-61c2a3083791', d: 'Nhà vườn thấp tầng giữa ruộng rau, đạp xe mười phút là tới phố đèn lồng.' },
]

export const ROOMS = [
  { id: 'standard', name: 'Phòng Standard', p: 1250000, size: 28, bed: '1 giường đôi', imgs: ['1631049307264-da0ec9d70304', '1582719478250-c89cae4dc85b', '1590490360182-c33d57733427', '1611892440504-42a792e24d32'] },
  { id: 'deluxe', name: 'Phòng Deluxe', p: 1850000, size: 36, bed: '1 giường King', hot: true, imgs: ['1582719478250-c89cae4dc85b', '1631049307264-da0ec9d70304', '1611892440504-42a792e24d32', '1590490360182-c33d57733427'] },
  { id: 'family', name: 'Phòng Family', p: 2400000, size: 48, bed: '2 giường đôi', imgs: ['1590490360182-c33d57733427', '1611892440504-42a792e24d32', '1631049307264-da0ec9d70304', '1582719478250-c89cae4dc85b'] },
  { id: 'suite', name: 'Suite Hướng Biển', p: 3200000, size: 64, bed: '1 giường King + phòng khách', imgs: ['1611892440504-42a792e24d32', '1590490360182-c33d57733427', '1582719478250-c89cae4dc85b', '1631049307264-da0ec9d70304'] },
]

export const SERVICES = [
  { n: 'Nhà hàng', d: 'Món Việt theo mùa, nguyên liệu lấy từ vùng lân cận. Phục vụ 6:00–22:00.', img: '1517248135467-4c7edcad34c4' },
  { n: 'Spa & massage', d: 'Liệu trình 60 và 90 phút với tinh dầu thảo mộc. Nên đặt trước.', img: '1540555700478-4be289fbecef' },
  { n: 'Hồ bơi', d: 'Mở cửa 6:00–21:00, có khu riêng cho trẻ em và ghế tắm nắng.', img: '1576013551627-0cc20b96c2a7' },
  { n: 'Đưa đón sân bay', d: 'Xe 4 và 7 chỗ, tài xế chờ sẵn với biển tên. Đặt trước 24 giờ.', img: '1449965408869-eaa3f722e40d' },
  { n: 'Tour địa phương', d: 'Đi bộ, đạp xe, ẩm thực đường phố cùng hướng dẫn viên người bản địa.', img: '1528127269322-539801943592' },
  { n: 'Phòng họp & sự kiện', d: 'Sức chứa đến 80 khách, có máy chiếu, âm thanh và dịch vụ trà nghỉ.', img: '1497366216548-37526070297c' },
]

export const OFFERS = [
  { n: 'Ở 3 đêm, tặng 1 đêm', d: 'Áp dụng cho Phòng Deluxe và Suite, từ Chủ nhật đến Thứ năm.', tag: 'Tiết kiệm 25%', room: 'deluxe', img: '1582719478250-c89cae4dc85b' },
  { n: 'Bữa sáng miễn phí', d: 'Đặt trực tiếp trên website, nhận bữa sáng cho 2 người mỗi ngày.', tag: 'Đặt trực tiếp', room: 'standard', img: '1631049307264-da0ec9d70304' },
  { n: 'Kỳ nghỉ gia đình', d: 'Trẻ dưới 12 tuổi ở và ăn sáng miễn phí. Tặng vé hồ bơi cho cả nhà.', tag: 'Gia đình', room: 'family', img: '1590490360182-c33d57733427' },
  { n: 'Ưu đãi đặt sớm', d: 'Đặt trước 30 ngày, giảm 15% và được hủy miễn phí trước 7 ngày.', tag: 'Giảm 15%', room: 'suite', img: '1611892440504-42a792e24d32' },
]

export const NEWS = [
  { n: 'Năm quán cà phê nên ghé quanh phố cổ Hà Nội', date: '12/10/2026', d: 'Gợi ý của nhân viên lễ tân cho buổi sáng chậm rãi.', img: '1495474472287-4d71bcdd2085' },
  { n: 'Lịch lễ hội đèn lồng Hội An mùa này', date: '03/10/2026', d: 'Những đêm rằm đẹp nhất và cách đi để tránh đông.', img: '1528127269322-539801943592' },
  { n: 'Thực đơn mới của nhà hàng mùa thu', date: '25/09/2026', d: 'Bếp trưởng giới thiệu sáu món dùng nguyên liệu địa phương.', img: '1414235077428-338989a2e8c0' },
]
