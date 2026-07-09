export function calculate(values: Record<string, any>) {
    // 1. Ép kiểu an toàn các biến
    const grade = Number(values.concrete_grade) || 0; // Chuyển "30" thành 30
    const factor = Number(values.safety_factor) || 0; // Chuyển 4 thành 4
    
    // 2. Logic tính toán (Ví dụ giả định)
    // Nếu grade là 30, hệ số là 4 thì tính thế nào?
    // Bạn cần dùng các biến này thay vì để trống
    const result = grade * factor; 

    console.log("Tính toán với:", { grade, factor, result });

    return { 
        result: result, 
        message: `Đã tính với cấp độ bê tông ${grade}` 
    };
}