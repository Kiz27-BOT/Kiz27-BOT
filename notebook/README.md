# 📓 Notebook Collection

Bộ sưu tập các Jupyter Notebooks với các dự án AI/ML và xử lý dữ liệu nâng cao.

## 📁 Cấu trúc Thư mục

Repository này được tổ chức thành 4 thư mục chính, mỗi thư mục chứa các notebook riêng biệt:

### 1. **LLM/** - Large Language Models (Mô hình Ngôn ngữ Lớn)
Xử lý các tác vụ liên quan đến Large Language Models, RAG (Retrieval-Augmented Generation), và xử lý tự nhiên.
- **Pipeline_v10.ipynb** - Pipeline tối ưu hóa cho VTIT LLM RAG Contest (Accuracy ≥70%, Time ≤10s/câu)
- **VTIT_LLM.ipynb** - Chatbot AI Race Track với xử lý tài liệu PDF, embedding, và truy xuất thông tin

### 2. **MMD/** - Multimodal Data (Dữ liệu Đa phương tiện)
Benchmark và phát triển các mô hình xử lý dữ liệu đa phương tiện.
- **MMD_Benmark (1).ipynb** - Đánh giá hiệu suất models multimodal (2MB)
- **MMD_Benmark_serio.ipynb** - Benchmark nghiêm túc cho các mô hình MMD
- **MMDv3_improved (3).ipynb** - Phiên bản v3 cải tiến của multimodal models

### 3. **PDF_retain/** - PDF Processing (Xử lý PDF)
Xử lý, trích xuất và dịch thuật tài liệu PDF.
- **PDF_Translate.ipynb** - Dịch thuật tài liệu PDF
- **PDF_Vietnamese_Translator.ipynb** - Công cụ dịch PDF tiếng Việt

### 4. **RS/** - Recommendation Systems (Hệ thống Khuyến nghị)
Xây dựng, benchmark và triển khai các hệ thống khuyến nghị sản phẩm.
- **RS5_v5.ipynb** - Phiên bản 5 của recommendation system
- **RecommenderSystem_RecSas_MERGED_FULL_FIXED (1).ipynb** - Hệ thống khuyến nghị tích hợp đầy đủ
- **deploy_merged_complete.ipynb** - Triển khai hệ thống khuyến nghị hoàn chỉnh
- **content.js** - Script JavaScript hỗ trợ cho hệ thống
- **manifest.json** - Cấu hình manifest cho ứng dụng

## 🚀 Cách Sử Dụng

1. **Chọn thư mục phù hợp** với tác vụ của bạn
2. **Mở notebook** trong Google Colab hoặc Jupyter
3. **Cài đặt dependencies** (thường có trong cell đầu tiên)
4. **Chạy tuần tự** từ trên xuống dưới

## 💾 Dependencies

Tùy vào notebook, bạn có thể cần:
- `pandas` - Xử lý dữ liệu
- `pymupdf` (fitz) - Đọc PDF
- `python-docx` - Xử lý Word documents
- `transformers` - Hugging Face models
- `torch` - PyTorch framework
- Google Colab runtime (GPU recommended)

## 📊 Thông tin Kho lưu trữ

- **Ngôn ngữ chính**: Jupyter Notebook (99.5%), JavaScript (0.5%)
- **Kích thước tổng cộng**: ~5.3 MB (tất cả notebooks)
- **Tính năng**: RAG, Embedding, PDF processing, Recommendation systems, Multimodal models

## 📝 Ghi chú

- Hầu hết các notebooks được thiết kế để chạy trên **Google Colab**
- Một số notebooks yêu cầu **GPU** để chạy hiệu quả
- Các tài liệu và dữ liệu tham chiếu thường nằm trong thư mục riêng biệt

## 🔗 Liên kết nhanh

- [LLM Notebooks](./LLM/README.md)
- [MMD Notebooks](./MMD/README.md)
- [PDF Processing](./PDF_retain/README.md)
- [Recommendation Systems](./RS/README.md)
