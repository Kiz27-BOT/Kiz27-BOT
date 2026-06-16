# 🤖 LLM (Large Language Models)

Bộ sưu tập các notebook liên quan đến Mô hình Ngôn ngữ Lớn, RAG, và xử lý tự nhiên.

## 📋 Nội dung

### 1. **Pipeline_v10.ipynb** 🏆
**Mục đích**: Xây dựng pipeline tối ưu cho VTIT LLM RAG Contest

**Mục tiêu**:
- Accuracy ≥ 70%
- Thời gian xử lý ≤ 10 giây/câu hỏi

**Tính năng chính**:
- Xử lý tài liệu PDF và trích xuất thông tin
- Embedding và vector search
- Retrieval-Augmented Generation (RAG)
- Tối ưu hóa latency và accuracy

**Đầu vào**: 398 tài liệu PDF từ thư mục dữ liệu

**Đầu ra**: JSON file tổng hợp dữ liệu chatbot

**Kích thước**: 186 KB

---

### 2. **VTIT_LLM.ipynb** 💬
**Mục đích**: Xây dựng Chatbot AI Race Track

**Mô tả**:
Chatbot thông minh để trả lời các câu hỏi liên quan đến thông tin sản phẩm ô tô, giá xe, thông số kỹ thuật, v.v.

**Tính năng chính**:
- Quét thư mục đệ quy và đọc sâu tất cả file
- Hỗ trợ nhiều định dạng: PDF, DOCX, CSV, TXT, MD, JSON
- Trích xuất text từ PDF (PyMuPDF)
- Lưu trữ dữ liệu dạng JSON để nạp vào Vector Database
- Xây dựng kho dữ liệu chatbot toàn diện

**Quy trình xử lý**:
1. Kết nối Google Drive
2. Cài đặt libraries: pymupdf, python-docx, pandas
3. Quét thư mục gốc và tất cả thư mục con
4. Đọc và xử lý từng file theo định dạng
5. Trích xuất nội dung và lưu vào JSON

**Kích thước**: 102 KB

**GPU Accelerator**: T4 GPU được khuyến nghị

---

## 🛠️ Cách Sử Dụng

### Bước 1: Chuẩn bị môi trường
```bash
# Các libraries sẽ được cài đặt tự động trong notebook
pip install pymupdf python-docx pandas transformers torch
```

### Bước 2: Chạy Pipeline_v10
1. Mở notebook trong Google Colab
2. Mount Google Drive
3. Chỉnh sửa đường dẫn thư mục nếu cần
4. Chạy từ trên xuống
5. Lấy kết quả JSON tổng hợp

### Bước 3: Chạy VTIT_LLM
1. Chuẩn bị dữ liệu PDF/DOCX trong Google Drive
2. Mount Drive và chạy notebook
3. Nhận kết quả trong file `tong_hop_data_chatbot.json`

---

## 📊 Dữ liệu

### Đầu vào
- **Từ Pipeline_v10**: 398 tài liệu PDF về sản phẩm ô tô
- **Từ VTIT_LLM**: Tất cả file từ thư mục được chỉ định (PDF, DOCX, CSV, TXT, MD, JSON)

### Đầu ra
- **JSON file**: Chứa key-value:
  - `ten_file` - Tên file
  - `thu_muc_chua` - Thư mục chứa file
  - `duong_dan` - Đường dẫn tuyệt đối
  - `noi_dung` - Nội dung text đầy đủ

---

## 🎯 Mục tiêu & Ứng dụng

✅ Xây dựng hệ thống chatbot thông minh
✅ Trích xuất kiến thức từ tài liệu
✅ Tạo Vector Store cho RAG systems
✅ Tối ưu hóa accuracy & latency
✅ Hỗ trợ multiple file formats

---

## 📝 Ghi chú

- Sử dụng **Google Colab** với **GPU T4** để đạt hiệu suất tối ưu
- Thời gian xử lý 398 PDF tùy thuộc vào kích thước và độ phức tạp
- Dữ liệu trích xuất được lưu dưới dạng JSON để dễ dàng tích hợp với các hệ thống khác
- Các file hỗ trợ: `.pdf`, `.docx`, `.doc`, `.csv`, `.txt`, `.md`, `.json`

---

## 🔍 Troubleshooting

**Lỗi: "No module named 'fitz'"**
```python
!pip install pymupdf
```

**Lỗi: "Không tìm thấy thư mục"**
- Kiểm tra đường dẫn trong `THU_MUC_GOC`
- Đảm bảo thư mục được shared với Google account

**PDF không đọc được**
- Một số PDF có thể bị mã hóa
- Script sẽ bỏ qua và in message lỗi

---

## 📚 Tham khảo

- [PyMuPDF Documentation](https://pymupdf.readthedocs.io/)
- [Python-docx Documentation](https://python-docx.readthedocs.io/)
- [Hugging Face Transformers](https://huggingface.co/transformers/)
