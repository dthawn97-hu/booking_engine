// Dữ liệu mẫu — thay bằng API Bellhop khi nối booking engine thật.
export const img = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`
export const vnd = n => Math.round(n).toLocaleString('vi-VN') + '₫'
export const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-')

export const TYPES = ['Resort', 'Boutique', 'Business', 'Express']
export const PURPOSES = ['Công tác dài ngày', 'Công tác ngắn ngày', 'Du lịch nghỉ dưỡng', 'Khám phá thành phố', 'Lưu trú dài hạn', 'Staycation']
export const CITIES = ['Hà Nội', 'Đà Nẵng', 'Hội An', 'Đà Lạt', 'TP. Hồ Chí Minh']

// p = giá Standard / đêm
export const HOTELS = [
  { id: 'pho-co-ha-noi', name: 'Phố Cổ Boutique Hà Nội', type: 'Boutique', city: 'Hà Nội', area: 'Phố cổ', addr: '27 Hàng Bạc, Hoàn Kiếm, Hà Nội', p: 1650000, hot: 'Phổ biến nhất', tags: ['Khám phá thành phố', 'Công tác ngắn ngày'], am: ['Lễ tân 24/7', 'Bữa sáng', 'Wi-Fi'], img: '1566073771259-6a8506099945', d: 'Căn phòng nhìn ra những mái ngói rêu và hàng sấu, cách Hồ Gươm vài phút đi bộ.' },
  { id: 'ho-tay-residence', name: 'Hồ Tây Residence', type: 'Business', city: 'Hà Nội', area: 'Tây Hồ', addr: '12 Quảng An, Tây Hồ, Hà Nội', p: 1150000, tags: ['Công tác dài ngày', 'Lưu trú dài hạn'], am: ['Bếp riêng', 'Giặt ủi', 'Phòng gym'], img: '1551882547-ff40c63fe5fa', d: 'Căn hộ dịch vụ ven hồ, có bếp riêng và giặt ủi cho người ở dài ngày.' },
  { id: 'my-khe-da-nang', name: 'Mỹ Khê Beach Hotel', type: 'Resort', city: 'Đà Nẵng', area: 'Biển Mỹ Khê', addr: '88 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', p: 2100000, hot: 'Phổ biến nhất', tags: ['Du lịch nghỉ dưỡng', 'Staycation'], am: ['Hồ bơi', 'Spa', 'Sát biển'], img: '1542314831-068cd1dbfeeb', d: 'Bước ra khỏi sảnh là chạm cát. Hồ bơi vô cực nhìn thẳng ra biển Đông.' },
  { id: 'san-bay-da-nang', name: 'Express Đà Nẵng Sân Bay', type: 'Express', city: 'Đà Nẵng', area: 'Gần sân bay', addr: '19 Duy Tân, Hải Châu, Đà Nẵng', p: 650000, tags: ['Công tác ngắn ngày'], am: ['Đưa đón sân bay', 'Bữa sáng'], img: '1520250497591-112f2f40a3f4', d: 'Phòng gọn, sạch, cách sân bay 5 phút. Phù hợp cho chuyến đi ngắn.' },
  { id: 'vuon-hoi-an', name: 'Hội An Garden Villa', type: 'Resort', city: 'Hội An', area: 'Cẩm Châu', addr: '41 Phan Bội Châu, Cẩm Châu, Hội An', p: 1450000, tags: ['Du lịch nghỉ dưỡng', 'Khám phá thành phố'], am: ['Hồ bơi', 'Spa', 'Xe đạp miễn phí'], img: '1564501049412-61c2a3083791', d: 'Nhà vườn thấp tầng giữa ruộng rau, đạp xe mười phút là tới phố đèn lồng.' },
  { id: 'doi-thong-da-lat', name: 'Đồi Thông Đà Lạt', type: 'Boutique', city: 'Đà Lạt', area: 'Trung tâm', addr: '11 Phan Đình Phùng, Đà Lạt', p: 1050000, tags: ['Du lịch nghỉ dưỡng', 'Staycation'], am: ['Lò sưởi', 'Cà phê sáng', 'Gym'], img: '1571896349842-33c89424de2d', d: 'Biệt thự gỗ giữa rừng thông, buổi sáng có sương và cà phê nóng ngay ban công.' },
  { id: 'sai-gon-central', name: 'Sài Gòn Central', type: 'Business', city: 'TP. Hồ Chí Minh', area: 'Quận 1', addr: '37 Hai Bà Trưng, Quận 1, TP.HCM', p: 1900000, tags: ['Công tác ngắn ngày', 'Công tác dài ngày', 'Khám phá thành phố'], am: ['Phòng họp', 'Gym', 'Lễ tân 24/7'], img: '1445019980597-93fa8acb246c', d: 'Giữa trung tâm Quận 1, đi bộ tới nhà hát, chợ Bến Thành và các văn phòng lớn.' },
  { id: 'express-quan-3', name: 'Express Sài Gòn Quận 3', type: 'Express', city: 'TP. Hồ Chí Minh', area: 'Quận 3', addr: '210 Võ Văn Tần, Quận 3, TP.HCM', p: 750000, tags: ['Công tác ngắn ngày', 'Khám phá thành phố'], am: ['Bữa sáng', 'Wi-Fi'], img: '1578683010236-d716f9a3f461', d: 'Phòng tiện nghi gọn gàng trong khu yên tĩnh, gần quán cà phê và nhà hàng.' },
]

// m = hệ số giá so với Standard
export const ROOMS = [
  { id: 'standard', name: 'Phòng Standard', m: 1, size: 28, bed: '1 giường đôi', imgs: ['1631049307264-da0ec9d70304', '1582719478250-c89cae4dc85b', '1590490360182-c33d57733427', '1611892440504-42a792e24d32'] },
  { id: 'deluxe', name: 'Phòng Deluxe', m: 1.5, size: 36, bed: '1 giường King', imgs: ['1582719478250-c89cae4dc85b', '1631049307264-da0ec9d70304', '1611892440504-42a792e24d32', '1590490360182-c33d57733427'] },
  { id: 'family', name: 'Phòng Family', m: 1.9, size: 48, bed: '2 giường đôi', imgs: ['1590490360182-c33d57733427', '1611892440504-42a792e24d32', '1631049307264-da0ec9d70304', '1582719478250-c89cae4dc85b'] },
  { id: 'suite', name: 'Suite', m: 2.6, size: 64, bed: '1 giường King + phòng khách', imgs: ['1611892440504-42a792e24d32', '1590490360182-c33d57733427', '1582719478250-c89cae4dc85b', '1631049307264-da0ec9d70304'] },
]

export const SERVICES = [
  { n: 'Nhà hàng', d: 'Món Việt theo mùa, nguyên liệu lấy từ vùng lân cận. Phục vụ 6:00–22:00.', img: '1517248135467-4c7edcad34c4' },
  { n: 'Spa & massage', d: 'Liệu trình 60 và 90 phút với tinh dầu thảo mộc. Nên đặt trước.', img: '1540555700478-4be289fbecef' },
  { n: 'Hồ bơi', d: 'Mở cửa 6:00–21:00, có khu riêng cho trẻ em và ghế tắm nắng.', img: '1576013551627-0cc20b96c2a7' },
]
export const SMALL_SERVICES = [
  ['Đưa đón sân bay', 'Xe 4 và 7 chỗ, đặt trước 24 giờ.'], ['Giặt ủi', 'Nhận trước 9:00, trả trong ngày.'], ['Gửi hành lý', 'Miễn phí trước giờ nhận phòng và sau giờ trả phòng.'],
  ['Thuê xe đạp, xe máy', 'Có bản đồ gợi ý lộ trình quanh khu vực.'], ['Dịch vụ phòng 24/7', 'Đồ ăn nhẹ và nước uống gọi từ phòng.'], ['Tour địa phương', 'Đi bộ, ẩm thực đường phố cùng người bản địa.'],
  ['Trông trẻ', 'Nhân viên được đào tạo, đặt trước 12 giờ.'], ['Phòng họp', 'Sức chứa đến 80 khách, có máy chiếu.'],
]

export const NEWS_CATS = ['Điểm đến', 'Ẩm thực', 'Tin khách sạn']
export const NEWS = [
  { id: 1, n: 'Năm quán cà phê nên ghé quanh phố cổ Hà Nội', cat: 'Điểm đến', date: '12/10/2026', d: 'Gợi ý của nhân viên lễ tân cho buổi sáng chậm rãi.', img: '1495474472287-4d71bcdd2085', top: true },
  { id: 2, n: 'Lịch lễ hội đèn lồng Hội An mùa này', cat: 'Điểm đến', date: '03/10/2026', d: 'Những đêm rằm đẹp nhất và cách đi để tránh đông.', img: '1528127269322-539801943592', top: true },
  { id: 3, n: 'Thực đơn mới của nhà hàng mùa thu', cat: 'Ẩm thực', date: '25/09/2026', d: 'Bếp trưởng giới thiệu sáu món dùng nguyên liệu địa phương.', img: '1414235077428-338989a2e8c0' },
  { id: 4, n: 'Khai trương Express Sài Gòn Quận 3', cat: 'Tin khách sạn', date: '18/09/2026', d: 'Khách sạn thứ tám trong chuỗi, giảm 20% trong tháng đầu.', img: '1578683010236-d716f9a3f461', top: true },
  { id: 5, n: 'Ba bữa sáng đáng dậy sớm ở Đà Nẵng', cat: 'Ẩm thực', date: '10/09/2026', d: 'Từ mì Quảng đến bánh xèo, đi bộ từ khách sạn là tới.', img: '1517248135467-4c7edcad34c4' },
  { id: 6, n: 'Cuối tuần ở Đà Lạt: đi đâu khi trời mưa', cat: 'Điểm đến', date: '02/09/2026', d: 'Bảo tàng nhỏ, quán trà và những con dốc nên đi bộ.', img: '1571896349842-33c89424de2d' },
  { id: 7, n: 'Nâng cấp phòng Deluxe tại Mỹ Khê', cat: 'Tin khách sạn', date: '28/08/2026', d: 'Giường mới, ban công mở rộng, giữ nguyên giá.', img: '1582719478250-c89cae4dc85b' },
]

export const TIERS = [
  { n: 'Thành viên', pt: 'Đăng ký miễn phí', perks: ['Giảm 5% giá phòng khi đặt trên website', 'Tích 1 điểm cho mỗi 100.000₫', 'Nhận ưu đãi sinh nhật'] },
  { n: 'Vàng', pt: 'Từ 10 đêm/năm', perks: ['Giảm 10% giá phòng', 'Nhận phòng sớm, trả phòng muộn khi còn trống', 'Bữa sáng miễn phí cho 1 người'], hot: true },
  { n: 'Bạch kim', pt: 'Từ 30 đêm/năm', perks: ['Giảm 15% giá phòng', 'Nâng hạng phòng khi còn trống', 'Bữa sáng cho 2 người, đưa đón sân bay 1 lượt/năm'] },
]
export const MEMBER_OFFERS = [
  { n: 'Ở 3 đêm, tặng 1 đêm', d: 'Áp dụng cho Deluxe và Suite, từ Chủ nhật đến Thứ năm.', tag: 'Tiết kiệm 25%', img: '1582719478250-c89cae4dc85b' },
  { n: 'Kỳ nghỉ gia đình', d: 'Trẻ dưới 12 tuổi ở và ăn sáng miễn phí.', tag: 'Gia đình', img: '1590490360182-c33d57733427' },
  { n: 'Đặt sớm 30 ngày', d: 'Giảm 15% và hủy miễn phí trước 7 ngày.', tag: 'Giảm 15%', img: '1611892440504-42a792e24d32' },
]

export const PARTNERS = [
  { n: 'Hãng hàng không', d: 'Đổi điểm bay lấy đêm nghỉ và ngược lại.' }, { n: 'Ngân hàng & thẻ', d: 'Trả góp 0% và hoàn tiền cho chủ thẻ liên kết.' },
  { n: 'Đơn vị lữ hành', d: 'Gói tour và phòng với giá đại lý.' }, { n: 'Nhà hàng & spa địa phương', d: 'Giảm giá cho khách lưu trú.' },
]
export const PARTNER_OFFERS = [
  { n: 'Chủ thẻ ngân hàng liên kết', d: 'Giảm thêm 10% và trả góp 0% kỳ hạn 3 tháng.' },
  { n: 'Khách đi theo tour đối tác', d: 'Giá phòng riêng, miễn phí hủy trước 72 giờ.' },
  { n: 'Doanh nghiệp ký hợp đồng', d: 'Giá cố định theo năm, thanh toán công nợ 30 ngày.' },
]
