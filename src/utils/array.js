// Dùng để random 1 mảng theo yêu cẩu (chỉ có 1 hàm duy nhất)
export const shuffled = (list) => list.sort(() => Math.random() - 0.5); // Tạo ra các số ngẫu nhiên từ -0.5 -> 0.5
